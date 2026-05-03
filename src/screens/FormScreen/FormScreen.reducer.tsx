import {ResumeTemplate} from '../../../business/domain/models/curriculum.model';

export type FormScreenUiState = {
    activeSection: string;
    previewTemplateId: ResumeTemplate | null;
    actionModalTemplateId: ResumeTemplate | null;
    scale: number;
};

export const initialFormScreenUiState: FormScreenUiState = {
    activeSection: 'personal',
    previewTemplateId: null,
    actionModalTemplateId: null,
    scale: 1,
};

export type FormScreenAction =
    | {type: 'SET_ACTIVE_SECTION'; section: string}
    | {type: 'OPEN_ACTION_MODAL'; templateId: ResumeTemplate}
    | {type: 'CLOSE_ACTION_MODAL'}
    | {type: 'OPEN_PREVIEW_FROM_MODAL'}
    | {type: 'CLOSE_PREVIEW'}
    | {type: 'SET_SCALE'; scale: number};

export function formScreenReducer(
    state: FormScreenUiState,
    action: FormScreenAction,
): FormScreenUiState {
    switch (action.type) {
        case 'SET_ACTIVE_SECTION':
            return {
                ...state,
                activeSection: action.section,
            };
        case 'OPEN_ACTION_MODAL':
            return {
                ...state,
                actionModalTemplateId: action.templateId,
            };
        case 'CLOSE_ACTION_MODAL':
            return {
                ...state,
                actionModalTemplateId: null,
            };
        case 'OPEN_PREVIEW_FROM_MODAL': {
            const next: FormScreenUiState = {
                ...state,
                actionModalTemplateId: null,
            };
            if (state.actionModalTemplateId !== null) {
                return {
                    ...next,
                    previewTemplateId: state.actionModalTemplateId,
                };
            }
            return next;
        }
        case 'CLOSE_PREVIEW':
            return {
                ...state,
                previewTemplateId: null,
            };
        case 'SET_SCALE':
            return {
                ...state,
                scale: action.scale,
            };
        default: {
            const exhaustive: never = action;
            return exhaustive;
        }
    }
}
