import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {
    Card,
    CardActions,
    CardDateRow,
    CardDragHandleIcon,
    CardExternalLink,
    CardNotesExcerpt,
    CardPosition,
    RemoveCardBtn,
} from './job-application-card.styles';
import {formatDateBR, toExternalHref} from '../../screens/DashboardScreen/DashboardScreen.utils';
import type {JobApplicationCardProps} from './job-application-card.types';

const NOTES_EXCERPT_MAX_LENGTH = 100;

export const JobApplicationCard: React.FC<JobApplicationCardProps> = ({
    jobApplication,
    colorKey,
    onView,
    onEdit,
    onRemove,
}) => {
    const {attributes, listeners, setNodeRef, isDragging} = useDraggable({
        id: jobApplication.id,
        data: {type: 'job' as const},
    });

    const displayCompany = jobApplication.company || 'Empresa não informada';
    const displayPosition = jobApplication.position || 'Cargo não informado';

    const notesExcerpt = jobApplication.notes?.trim()
        ? jobApplication.notes.length > NOTES_EXCERPT_MAX_LENGTH
            ? jobApplication.notes.slice(0, NOTES_EXCERPT_MAX_LENGTH).trimEnd() + '…'
            : jobApplication.notes
        : null;

    const safeJobLinkHref = jobApplication.link?.trim()
        ? toExternalHref(jobApplication.link)
        : '';
    const hasSafeJobLink = Boolean(safeJobLinkHref);

    return (
        <Card
            ref={setNodeRef}
            $isDragging={isDragging}
            $colorKey={colorKey}
            {...listeners}
            {...attributes}
        >
            <CardDragHandleIcon>⠿</CardDragHandleIcon>
            <h4>{displayCompany}</h4>
            <CardPosition>{displayPosition}</CardPosition>

            {notesExcerpt && <CardNotesExcerpt>{notesExcerpt}</CardNotesExcerpt>}

            <CardDateRow>
                <span>Candidatado em {formatDateBR(jobApplication.appliedDate)}</span>
                {hasSafeJobLink && (
                    <CardExternalLink
                        href={safeJobLinkHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                        title="Abrir vaga"
                    >
                        ↗
                    </CardExternalLink>
                )}
            </CardDateRow>

            <CardActions
                data-card-actions
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
            >
                <button type="button" onClick={onView}>
                    Visualizar
                </button>
                <button type="button" onClick={onEdit}>
                    Editar
                </button>
                <RemoveCardBtn type="button" onClick={onRemove}>
                    Excluir
                </RemoveCardBtn>
            </CardActions>
        </Card>
    );
};
