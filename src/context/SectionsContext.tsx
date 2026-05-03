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
    addSection: (name: string) => Promise<void>;
    updateSection: (id: string, data: Partial<Pick<Section, 'name' | 'colorKey'>>) => Promise<void>;
    removeSection: (id: string) => Promise<void>;
    reorderSections: (fromIndex: number, toIndex: number) => Promise<void>;
}

const SectionsContext = createContext<SectionsContextType | undefined>(undefined);

const categoryService = container.get<ICategoryService>(CategorySymbols.CategoryService);

export const SectionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [sections, setSections] = useState<Section[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const userId = useSelector(selectUserId);

    const refreshSectionsFromBackend = useCallback(async () => {
        if (!userId) return;
        setIsLoading(true);
        try {
            const { sections: fetchedSections } = await categoryService.findAllCategories(userId);
            setSections(fetchedSections);
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if (!userId) {
            setSections([]);
            return;
        }
        refreshSectionsFromBackend();
    }, [refreshSectionsFromBackend, userId]);

    const addSection = useCallback(
        async (name: string): Promise<void> => {
            if (!userId) return;
            const order = sections.length;
            await categoryService.createCategory({ userId, name, order });
            await refreshSectionsFromBackend();
        },
        [sections.length, userId, refreshSectionsFromBackend],
    );

    const updateSection = useCallback(
        async (id: string, data: Partial<Pick<Section, 'name' | 'colorKey'>>): Promise<void> => {
            const current = sections.find((s) => s.id === id);
            if (!current) return;
            await categoryService.updateCategory({
                id,
                name: data.name ?? current.name,
                order: current.order,
            });
            await refreshSectionsFromBackend();
        },
        [sections, refreshSectionsFromBackend],
    );

    const removeSection = useCallback(
        async (id: string): Promise<void> => {
            await categoryService.deleteCategory(id);
            await refreshSectionsFromBackend();
        },
        [refreshSectionsFromBackend],
    );

    const reorderSections = useCallback(
        async (fromIndex: number, toIndex: number): Promise<void> => {
            const reordered = [...sections];
            const [moved] = reordered.splice(fromIndex, 1);
            reordered.splice(toIndex, 0, moved);
            const withNewOrder = reordered.map((s, idx) => ({ ...s, order: idx }));

            setSections(withNewOrder);

            try {
                await Promise.all(
                    withNewOrder.map((s) =>
                        categoryService.updateCategory({ id: s.id, name: s.name, order: s.order }),
                    ),
                );
            } finally {
                await refreshSectionsFromBackend();
            }
        },
        [sections, refreshSectionsFromBackend],
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
