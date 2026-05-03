import styled from 'styled-components';

export const Container = styled.div`
    min-height: 100vh;
    min-height: 100dvh;
    height: 100vh;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    background-color: var(--background-color);
    color: var(--text-primary);
    padding: 20px 24px 24px;
    padding-right: 100px;
    box-sizing: border-box;
    overflow: hidden;

    @media (max-width: 768px) {
        padding-right: 80px;
    }

    @media (max-width: 480px) {
        padding: 16px;
        padding-right: 68px;
    }
`;

export const Header = styled.header`
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border-color);
    flex-wrap: wrap;
    gap: 16px;
    min-height: 44px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }

    @media (max-width: 480px) {
        margin-bottom: 20px;
        padding-bottom: 16px;
    }

    h1 {
        font-size: 24px;
        margin: 0;
        color: var(--text-primary);

        &:before {
            content: '';
            display: inline-block;
            width: 4px;
            height: 24px;
            background-color: var(--accent-color);
            margin-right: 12px;
            vertical-align: middle;
            border-radius: 2px;
        }

        @media (max-width: 480px) {
            font-size: 20px;

            &:before {
                height: 20px;
            }
        }
    }
`;

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;

    span {
        color: var(--text-secondary);
        font-size: 14px;

        @media (max-width: 480px) {
            font-size: 12px;
            max-width: 120px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    button {
        min-height: 44px;
    }
`;

/** Bloco único de ajuda (seções) no dashboard */
export const HelpSection = styled.div`
    flex-shrink: 0;
    background: rgba(45, 156, 219, 0.08);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 14px 18px;
    margin-bottom: 20px;
    color: var(--text-secondary);
    font-size: 13px;
    line-height: 1.55;

    strong {
        color: var(--text-primary);
        font-weight: 600;
    }

    @media (max-width: 480px) {
        padding: 12px 14px;
        font-size: 12px;
    }
`;

/** Envolve o board e o overlay para o board ocupar a altura restante da viewport */
export const BoardShell = styled.div`
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    position: relative;
`;

export const Board = styled.div`
    flex: 1;
    min-height: 0;
    display: flex;
    align-items: stretch;
    gap: 24px;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 8px;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
        height: 8px;
    }
    &::-webkit-scrollbar-track {
        background: var(--secondary-color);
        border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background: var(--border-color);
        border-radius: 4px;
    }

    @media (max-width: 480px) {
        gap: 16px;
    }
`;

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

export const Column = styled.div<{ $isOver?: boolean; $colorKey?: string }>`
    flex: 1;
    min-height: 0;
    min-width: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    background: ${(p) => (p.$colorKey ? sectionBgVar[p.$colorKey] ?? 'var(--card-bg)' : 'var(--card-bg)')};
    border: 2px dashed ${(p) => {
        if (p.$isOver) return 'var(--accent-color)';
        return p.$colorKey ? (sectionBorderVar[p.$colorKey] ?? 'var(--border-color)') : 'var(--border-color)';
    }};
    border-radius: 12px;
    padding: 16px;
    transition: border-color 0.2s, background 0.2s;
    ${(p) => p.$isOver && 'background: rgba(45, 156, 219, 0.15) !important;'}

    @media (max-width: 480px) {
        padding: 12px;
    }
`;

export const ColumnHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    h3 {
        font-size: 14px;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0;
    }
`;

export const AddButton = styled.button`
    background: var(--accent-color);
    color: white;
    border: none;
    border-radius: 6px;
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.9;
    }

    @media (max-width: 480px) {
        width: 40px;
        height: 40px;
        min-width: 40px;
        min-height: 40px;
    }
`;

export const CardsList = styled.div`
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding-right: 4px;
    margin-right: -4px;

    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-track {
        background: var(--secondary-color);
        border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background: var(--border-color);
        border-radius: 4px;
    }
`;

export const DragOverlayCard = styled.div`
    background: var(--input-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 12px;
    cursor: grabbing;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    transform: rotate(2deg);
    opacity: 1;

    h4 {
        font-size: 14px;
        margin: 0 0 4px 0;
        color: var(--text-primary);
    }

    p {
        font-size: 12px;
        color: var(--text-secondary);
        margin: 0;
    }
`;

export const Card = styled.div<{ $isDragging?: boolean; $colorKey?: string }>`
    background: ${(p) => (p.$colorKey ? sectionBgVar[p.$colorKey] ?? 'var(--input-bg)' : 'var(--input-bg)')};
    border: 1px solid ${(p) => (p.$colorKey ? sectionBorderVar[p.$colorKey] ?? 'var(--border-color)' : 'var(--border-color)')};
    border-radius: 8px;
    padding: 12px;
    cursor: grab;
    transition: box-shadow 0.2s;
    opacity: ${(p) => (p.$isDragging ? 0.5 : 1)};

    &:active {
        cursor: grabbing;
    }

    &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    h4 {
        font-size: 14px;
        margin: 0 0 4px 0;
        color: var(--text-primary);

        @media (max-width: 480px) {
            font-size: 13px;
        }
    }

    p {
        font-size: 12px;
        color: var(--text-secondary);
        margin: 0;

        @media (max-width: 480px) {
            font-size: 11px;
        }
    }
`;

export const CardActions = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 8px;

    button {
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        font-size: 12px;
        padding: 8px;
        min-height: 36px;

        &:hover {
            color: var(--accent-color);
        }

        @media (max-width: 480px) {
            padding: 10px;
            min-height: 44px;
        }
    }
`;

export const HeaderActions = styled.div`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
`;

export const SortableSection = styled.div<{ $isDragging?: boolean }>`
    flex: 0 0 280px;
    max-width: 280px;
    min-height: 0;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    opacity: ${(p) => (p.$isDragging ? 0.7 : 1)};

    @media (max-width: 480px) {
        flex: 0 0 260px;
        max-width: 260px;
    }
`;

/** Área pelo qual se arrasta a coluna para reordenar (não inclui cards de vaga) */
export const SectionDragHandle = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
    cursor: grab;
    padding: 4px 6px 4px 0;
    margin: -4px 0;
    border-radius: 6px;

    &:active {
        cursor: grabbing;
    }

    h3 {
        font-size: 14px;
        font-weight: 600;
        margin: 0;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export const SectionEditHeader = styled.div`
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    gap: 8px;

    h3 {
        font-size: 14px;
        font-weight: 600;
        margin: 0;
        flex: 1;
    }
`;

export const SectionEditActions = styled.div`
    display: flex;
    gap: 4px;

    button {
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        padding: 6px;
        font-size: 14px;
        border-radius: 4px;

        &:hover {
            background: var(--secondary-color);
            color: var(--text-primary);
        }
    }
`;

export const SectionDeleteBtn = styled.button`
    color: #EB5757 !important;

    &:hover {
        color: #EB5757 !important;
        background: rgba(235, 87, 87, 0.1) !important;
    }
`;

export const RemoveCardBtn = styled.button`
    color: #EB5757 !important;

    &:hover {
        color: #EB5757 !important;
        opacity: 0.8;
    }
`;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
    overflow-y: auto;

    @media (max-width: 480px) {
        padding: 16px;
        align-items: flex-start;
        padding-top: 40px;
    }
`;

export const ModalContent = styled.div`
    background: var(--card-bg);
    border-radius: 12px;
    padding: 24px;
    width: 100%;
    max-width: 400px;
    border: 1px solid var(--border-color);

    @media (max-width: 480px) {
        padding: 20px 16px;
    }

    h3 {
        margin: 0 0 20px 0;
        font-size: 18px;

        @media (max-width: 480px) {
            font-size: 16px;
        }
    }
`;

export const ModalActions = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 24px;
    justify-content: flex-end;
    flex-wrap: wrap;

    button {
        min-height: 44px;
    }
`;

export const DeleteModalContent = styled(ModalContent)`
    text-align: center;

    h3 {
        text-align: center;
    }
`;

export const DeleteModalActions = styled(ModalActions)`
    justify-content: center;
`;

export const DeleteModalBody = styled.div`
    color: var(--text-primary);
    font-size: 14px;
    line-height: 1.6;
    text-align: center;

    p {
        margin: 0 0 12px 0;
    }

    p:last-of-type {
        margin-bottom: 0;
    }
`;

export const DeleteModalWarning = styled.p`
    color: var(--text-secondary);
`;

export const DeleteModalSectionName = styled.strong`
    color: var(--accent-color);
    font-weight: 600;
`;

export const DeleteModalConfirm = styled.p`
    font-weight: 600;
    color: var(--text-primary);
    margin-top: 16px !important;
`;

export const FormRow = styled.div`
    margin-bottom: 16px;

    label {
        display: block;
        font-size: 13px;
        font-weight: 500;
        margin-bottom: 6px;
        color: var(--text-primary);
    }

    input, textarea {
        width: 100%;
        padding: 12px 14px;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        font-size: 16px;
        background: var(--input-bg);
        color: var(--text-primary);
        min-height: 44px;

        &:focus {
            outline: none;
            border-color: var(--accent-color);
        }

        @media (max-width: 480px) {
            font-size: 16px;
        }
    }

    textarea {
        min-height: 80px;
        resize: vertical;
    }
`;

export const ReadOnlyValue = styled.div`
    padding: 12px 14px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-size: 16px;
    background: var(--input-bg);
    color: var(--text-primary);
    min-height: 44px;
    white-space: pre-wrap;
    word-break: break-word;

    a {
        color: var(--accent-color);
    }
`;
