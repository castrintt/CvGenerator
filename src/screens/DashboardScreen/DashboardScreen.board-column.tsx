import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {
    AddButton,
    CardsList,
    Column,
    SectionDeleteBtn,
    SectionDragHandle,
    SectionEditActions,
    SectionEditHeader,
    SortableSection,
} from './DashboardScreen.styles';
import {DashboardScreenJobApplicationCard} from './DashboardScreen.job-application-card';
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

    return (
        <SortableSection ref={setNodeRef} style={style} $isDragging={isDragging}>
            <Column $isOver={isOver} $colorKey={section.colorKey}>
                <SectionEditHeader>
                    <SectionDragHandle {...listeners} {...attributes}>
                        <h3>{section.name}</h3>
                    </SectionDragHandle>
                    <AddButton type="button" onClick={onAdd} title="Adicionar candidatura">
                        +
                    </AddButton>
                    <SectionEditActions
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button type="button" onClick={onEditSection} title="Editar nome da seção">
                            ✎
                        </button>
                        <SectionDeleteBtn type="button" onClick={onDeleteSection} title="Excluir seção">
                            ✕
                        </SectionDeleteBtn>
                    </SectionEditActions>
                </SectionEditHeader>
                <CardsList>
                    {jobApplications.map((item) => (
                        <DashboardScreenJobApplicationCard
                            key={item.id}
                            jobApplication={item}
                            colorKey={section.colorKey}
                            onView={() => onView(item)}
                            onEdit={() => onEdit(item)}
                            onRemove={() => onRemove(item.id)}
                        />
                    ))}
                </CardsList>
            </Column>
        </SortableSection>
    );
};
