import React, { createContext, ReactNode, useContext, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { container } from '../../business/ioc/ioc.config';
import { CategorySymbols } from '../../business/ioc/symbols/category.symbols';
import type { ICategoryService } from '../../business/domain/interfaces/i-category.service';
import type { Section } from '../../business/domain/models/section.model';
import { selectUserId } from '../store/auth.slice';

interface SectionsContextType {
    sections: Section[];
    isLoading: boolean;
    addSection: (name: string) => Section;
    updateSection: (id: string, data: Partial<Pick<Section, 'name' | 'colorKey'>>) => void;
    removeSection: (id: string) => void;
    reorderSections: (fromIndex: number, toIndex: number) => void;
}

const SectionsContext = createContext<SectionsContextType | undefined>(undefined);

const categoryService = container.get<ICategoryService>(CategorySymbols.CategoryService);

const generateId = () => `section-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const SectionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [sections, setSections] = useState<Section[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const userId = useSelector(selectUserId);

    useEffect(() => {
        if (!userId) return;

        setIsLoading(true);
        categoryService
            .findAllCategories(userId)
            .then(({ sections: fetchedSections }) => {
                setSections(fetchedSections);
            })
            .catch(() => {
                setSections([]);
            })
            .finally(() => setIsLoading(false));
    }, [userId]);

    const addSection = useCallback(
        (name: string): Section => {
            const order = sections.length;
            const newSection: Section = {
                id: generateId(),
                name,
                order,
                colorKey: 'custom',
            };
            setSections((prev) => [...prev, newSection]);

            if (userId) {
                categoryService
                    .createCategory({ userId, name, order })
                    .catch(() => {
                        setSections((prev) => prev.filter((s) => s.id !== newSection.id));
                    });
            }

            return newSection;
        },
        [sections.length, userId],
    );

    const updateSection = useCallback(
        (id: string, data: Partial<Pick<Section, 'name' | 'colorKey'>>) => {
            setSections((prev) =>
                prev.map((s) => (s.id === id ? { ...s, ...data } : s)),
            );

            const updated = sections.find((s) => s.id === id);
            if (updated && userId) {
                categoryService
                    .updateCategory({
                        id,
                        name: data.name ?? updated.name,
                        order: updated.order,
                    })
                    .catch(() => {
                        setSections((prev) =>
                            prev.map((s) => (s.id === id ? updated : s)),
                        );
                    });
            }
        },
        [sections, userId],
    );

    const removeSection = useCallback(
        (id: string) => {
            setSections((prev) => prev.filter((s) => s.id !== id));

            categoryService.deleteCategory(id).catch(() => {
                /* optimistic — errors handled silently */
            });
        },
        [],
    );

    const reorderSections = useCallback(
        (fromIndex: number, toIndex: number) => {
            setSections((prev) => {
                const reordered = [...prev];
                const [moved] = reordered.splice(fromIndex, 1);
                reordered.splice(toIndex, 0, moved);
                const withNewOrder = reordered.map((s, idx) => ({ ...s, order: idx }));

                if (userId) {
                    withNewOrder.forEach((s) => {
                        categoryService
                            .updateCategory({ id: s.id, name: s.name, order: s.order })
                            .catch(() => { /* silently ignore — UI already reflects change */ });
                    });
                }

                return withNewOrder;
            });
        },
        [userId],
    );

    return (
        <SectionsContext.Provider
            value={{ sections, isLoading, addSection, updateSection, removeSection, reorderSections }}
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
