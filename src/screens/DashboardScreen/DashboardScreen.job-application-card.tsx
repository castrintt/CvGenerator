import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {Card, CardActions, RemoveCardBtn} from './DashboardScreen.styles';
import {formatDateBR} from './DashboardScreen.utils';
import type {DashboardScreenJobApplicationCardProps} from './DashboardScreen.types';

export const DashboardScreenJobApplicationCard: React.FC<DashboardScreenJobApplicationCardProps> = ({
    jobApplication,
    colorKey,
    onEdit,
    onRemove,
}) => {
    const {attributes, listeners, setNodeRef, isDragging} = useDraggable({
        id: jobApplication.id,
        data: {type: 'job' as const},
    });

    const displayCompany = jobApplication.company || 'Empresa não informada';
    const displayPosition = jobApplication.position || 'Cargo não informado';

    return (
        <Card
            ref={setNodeRef}
            $isDragging={isDragging}
            $colorKey={colorKey}
            {...listeners}
            {...attributes}
        >
            <h4>{displayCompany}</h4>
            <p>{displayPosition}</p>
            <p style={{fontSize: 11, marginTop: 4}}>{formatDateBR(jobApplication.appliedDate)}</p>
            <CardActions>
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
