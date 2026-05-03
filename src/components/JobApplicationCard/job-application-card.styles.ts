import styled from 'styled-components';

const sectionBgVar: Record<string, string> = {
    applied: 'var(--section-applied-bg)',
    in_progress: 'var(--section-in-progress-bg)',
    positive_feedback: 'var(--section-positive-bg)',
    rejected: 'var(--section-rejected-bg)',
    custom: 'var(--section-custom-bg)',
};

const sectionBorderVar: Record<string, string> = {
    applied: 'var(--section-applied-border)',
    in_progress: 'var(--section-in-progress-border)',
    positive_feedback: 'var(--section-positive-border)',
    rejected: 'var(--section-rejected-border)',
    custom: 'var(--section-custom-border)',
};

export const Card = styled.div<{$isDragging?: boolean; $colorKey?: string}>`
    background: ${(p) => (p.$colorKey ? sectionBgVar[p.$colorKey] ?? 'var(--input-bg)' : 'var(--input-bg)')};
    border: 1px solid
        ${(p) =>
            p.$colorKey ? sectionBorderVar[p.$colorKey] ?? 'var(--border-color)' : 'var(--border-color)'};
    border-radius: 10px;
    padding: 12px 12px 10px;
    cursor: grab;
    transition: box-shadow 0.2s;
    opacity: ${(p) => (p.$isDragging ? 0.4 : 1)};
    position: relative;

    &:active {
        cursor: grabbing;
    }

    &:hover {
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.09);
    }

    &:hover > [data-card-actions] {
        opacity: 1;
        pointer-events: auto;
    }

    h4 {
        font-size: 13px;
        font-weight: 600;
        margin: 0 0 3px 0;
        color: var(--text-primary);
        padding-right: 20px;

        @media (max-width: 480px) {
            font-size: 13px;
        }
    }

    p {
        font-size: 12px;
        color: var(--text-secondary);
        margin: 0;
    }
`;

export const CardDragHandleIcon = styled.span`
    position: absolute;
    top: 10px;
    right: 10px;
    color: var(--text-secondary);
    font-size: 13px;
    opacity: 0.35;
    user-select: none;
    line-height: 1;
`;

export const CardPosition = styled.p`
    font-size: 12px;
    color: var(--text-secondary);
    margin: 0 0 6px 0 !important;
`;

export const CardNotesExcerpt = styled.p`
    font-size: 11px;
    color: var(--text-secondary);
    margin: 0 0 8px 0 !important;
    opacity: 0.8;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.4;
`;

export const CardDateRow = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: var(--text-secondary);
    margin-top: 6px;
`;

export const CardExternalLink = styled.a`
    color: var(--accent-color);
    display: flex;
    align-items: center;
    font-size: 11px;
    opacity: 0.8;
    transition: opacity 0.15s;

    &:hover {
        opacity: 1;
    }
`;

export const CardActions = styled.div`
    display: flex;
    gap: 6px;
    margin-top: 10px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s;

    button {
        background: none;
        border: 1px solid var(--border-color);
        color: var(--text-secondary);
        cursor: pointer;
        font-size: 11px;
        padding: 5px 8px;
        border-radius: 5px;
        min-height: 28px;
        transition: border-color 0.15s, color 0.15s, background 0.15s;

        &:hover {
            color: var(--accent-color);
            border-color: var(--accent-color);
            background: rgba(45, 156, 219, 0.06);
        }

        @media (max-width: 480px) {
            padding: 8px 10px;
            min-height: 36px;
        }
    }
`;

export const RemoveCardBtn = styled.button`
    color: #eb5757 !important;
    border-color: rgba(235, 87, 87, 0.3) !important;

    &:hover {
        color: #eb5757 !important;
        border-color: #eb5757 !important;
        background: rgba(235, 87, 87, 0.06) !important;
    }
`;
