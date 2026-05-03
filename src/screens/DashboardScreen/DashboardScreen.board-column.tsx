import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {
    AddJobButton,
    CardsList,
    Column,
    ColumnCountBadge,
    ColumnDragHandle,
    ColumnEmptyIcon,
    ColumnEmptyState,
    ColumnHeaderLeft,
    ColumnMenuButton,
    ColumnMenuDropdown,
    ColumnMenuDropdownItem,
    ColumnMenuWrapper,
    SectionEditHeader,
    SortableSection,
} from './DashboardScreen.styles';
import {JobApplicationCard} from '../../components/JobApplicationCard/job-application-card';
import type {DashboardScreenBoardColumnProps} from './DashboardScreen.types';

export const DashboardScreenBoardColumn: React.FC<DashboardScreenBoardColumnProps> = ({
    section,
    jobApplications,
    onAdd,
    onView,
    onEdit,
    onRemove,
    onEditSection,
    onDeleteSection,
    overId,
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: section.id,
        data: {type: 'section' as const},
    });

    const style = transform
        ? {
              transform: CSS.Transform.toString(transform),
              transition,
          }
        : undefined;

    const isOver =
        overId === section.id || jobApplications.some((item) => item.id === overId);

    const closeMenu = useCallback(() => setIsMenuOpen(false), []);

    useEffect(() => {
        if (!isMenuOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                closeMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen, closeMenu]);

    const handleEditSection = (e: React.MouseEvent) => {
        e.stopPropagation();
        closeMenu();
        onEditSection();
    };

    const handleDeleteSection = (e: React.MouseEvent) => {
        e.stopPropagation();
        closeMenu();
        onDeleteSection();
    };

    return (
        <SortableSection ref={setNodeRef} style={style} $isDragging={isDragging}>
            <Column $isOver={isOver} $colorKey={section.colorKey}>
                <SectionEditHeader>
                    <ColumnHeaderLeft {...listeners} {...attributes}>
                        <ColumnDragHandle>⠿</ColumnDragHandle>
                        <h3>{section.name}</h3>
                        <ColumnCountBadge>{jobApplications.length}</ColumnCountBadge>
                    </ColumnHeaderLeft>

                    <ColumnMenuWrapper
                        ref={menuRef}
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ColumnMenuButton
                            type="button"
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                            title="Opções da categoria"
                        >
                            ⋮
                        </ColumnMenuButton>
                        <ColumnMenuDropdown $open={isMenuOpen}>
                            <ColumnMenuDropdownItem type="button" onClick={handleEditSection}>
                                Editar nome
                            </ColumnMenuDropdownItem>
                            <ColumnMenuDropdownItem type="button" $danger onClick={handleDeleteSection}>
                                Excluir categoria
                            </ColumnMenuDropdownItem>
                        </ColumnMenuDropdown>
                    </ColumnMenuWrapper>
                </SectionEditHeader>

                <CardsList>
                    {jobApplications.length === 0 ? (
                        <ColumnEmptyState>
                            <ColumnEmptyIcon>📥</ColumnEmptyIcon>
                            Nenhuma vaga nesta categoria ainda.
                        </ColumnEmptyState>
                    ) : (
                        jobApplications.map((item) => (
                            <JobApplicationCard
                                key={item.id}
                                jobApplication={item}
                                colorKey={section.colorKey}
                                onView={() => onView(item)}
                                onEdit={() => onEdit(item)}
                                onRemove={() => onRemove(item.id)}
                            />
                        ))
                    )}
                </CardsList>

                <AddJobButton
                    type="button"
                    onClick={onAdd}
                    onPointerDown={(e) => e.stopPropagation()}
                >
                    + Adicionar vaga
                </AddJobButton>
            </Column>
        </SortableSection>
    );
};
