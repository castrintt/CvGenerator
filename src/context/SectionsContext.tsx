import React, {createContext, ReactNode, useContext, useState, useEffect, useCallback} from 'react';
import type {Section} from '../../business/domain/models/section.model';
import {DEFAULT_SECTIONS} from '../../business/domain/models/section.model';

const STORAGE_KEY = 'cvgenerator_sections';

const LEGACY_SECTION_IDS = ['applied', 'in_progress', 'positive_feedback', 'rejected'];

function getDefaultSections(): Section[] {
    return DEFAULT_SECTIONS.map((s, i) => ({
        ...s,
        id: LEGACY_SECTION_IDS[i] ?? `section-${i}`,
    }));
}

interface SectionsContextType {
    sections: Section[];
    addSection: (name: string) => Section;
    updateSection: (id: string, data: Partial<Pick<Section, 'name' | 'colorKey'>>) => void;
    removeSection: (id: string) => void;
    reorderSections: (fromIndex: number, toIndex: number) => void;
    getSectionById: (id: string) => Section | undefined;
}

const SectionsContext = createContext<SectionsContextType | undefined>(undefined);

const generateId = () => `section-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const SectionsProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [sections, setSections] = useState<Section[]>(getDefaultSections);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    const filtered = parsed.filter((s: Section) => s.id !== 'cold');
                    setSections(filtered.sort((a: Section, b: Section) => a.order - b.order));
                    if (filtered.length !== parsed.length) {
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
                    }
                }
            } catch {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sections));
    }, [sections]);

    const addSection = useCallback((name: string) => {
        const newSection: Section = {
            id: generateId(),
            name: name.trim() || 'Nova seção',
            order: 0,
            colorKey: 'custom',
        };
        setSections((prev) =>
            [newSection, ...prev].map((s, i) => ({...s, order: i}))
        );
        return newSection;
    }, []);

    const updateSection = useCallback((id: string, data: Partial<Pick<Section, 'name' | 'colorKey'>>) => {
        setSections((prev) =>
            prev.map((s) => (s.id === id ? {...s, ...data} : s))
        );
    }, []);

    const removeSection = useCallback((id: string) => {
        setSections((prev) => prev.filter((s) => s.id !== id));
    }, []);

    const reorderSections = useCallback((fromIndex: number, toIndex: number) => {
        setSections((prev) => {
            const copy = [...prev];
            const [removed] = copy.splice(fromIndex, 1);
            copy.splice(toIndex, 0, removed);
            return copy.map((s, i) => ({...s, order: i}));
        });
    }, []);

    const getSectionById = useCallback(
        (id: string) => sections.find((s) => s.id === id),
        [sections]
    );

    return (
        <SectionsContext.Provider
            value={{
                sections,
                addSection,
                updateSection,
                removeSection,
                reorderSections,
                getSectionById,
            }}
        >
            {children}
        </SectionsContext.Provider>
    );
};

export const useSections = () => {
    const context = useContext(SectionsContext);
    if (!context) {
        throw new Error('useSections must be used within a SectionsProvider');
    }
    return context;
};
