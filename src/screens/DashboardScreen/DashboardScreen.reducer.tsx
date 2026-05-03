import type {JobApplication} from '../../../business/domain/models/jobApplication.model';
import type {Section} from '../../../business/domain/models/section.model';
import type {
    DeleteSectionConfirmState,
    EditModalState,
    SectionModalState,
} from './DashboardScreen.types';

export type DashboardScreenUiState = {
    editModal: EditModalState;
    viewModalJob: JobApplication | null;
    sectionModal: SectionModalState;
    overId: string | null;
    activeId: string | null;
    deleteSectionConfirm: DeleteSectionConfirmState;
};

export const initialDashboardScreenUiState: DashboardScreenUiState = {
    editModal: {
        jobApplication: null,
        sectionId: null,
        isNew: false,
    },
    viewModalJob: null,
    sectionModal: {
        section: null,
        isNew: false,
    },
    overId: null,
    activeId: null,
    deleteSectionConfirm: null,
};

export type DashboardScreenAction =
    | {type: 'OPEN_EDIT_MODAL_ADD'; sectionId: string}
    | {type: 'OPEN_EDIT_MODAL_EDIT'; jobApplication: JobApplication}
    | {type: 'CLOSE_EDIT_MODAL'}
    | {type: 'OPEN_VIEW_JOB_MODAL'; jobApplication: JobApplication}
    | {type: 'CLOSE_VIEW_JOB_MODAL'}
    | {type: 'OPEN_SECTION_MODAL'; section: Section | null; isNew: boolean}
    | {type: 'CLOSE_SECTION_MODAL'}
    | {type: 'DRAG_START'; activeId: string}
    | {type: 'DRAG_END_CLEAR'}
    | {type: 'DRAG_OVER'; overId: string | null}
    | {
          type: 'SET_DELETE_SECTION_CONFIRM';
          payload: NonNullable<DeleteSectionConfirmState>;
      }
    | {type: 'CLEAR_DELETE_SECTION_CONFIRM'};

export function dashboardScreenReducer(
    state: DashboardScreenUiState,
    action: DashboardScreenAction,
): DashboardScreenUiState {
    switch (action.type) {
        case 'OPEN_EDIT_MODAL_ADD':
            return {
                ...state,
                viewModalJob: null,
                editModal: {
                    jobApplication: null,
                    sectionId: action.sectionId,
                    isNew: true,
                },
            };
        case 'OPEN_EDIT_MODAL_EDIT':
            return {
                ...state,
                viewModalJob: null,
                editModal: {
                    jobApplication: action.jobApplication,
                    sectionId: action.jobApplication.sectionId,
                    isNew: false,
                },
            };
        case 'CLOSE_EDIT_MODAL':
            return {
                ...state,
                editModal: {
                    jobApplication: null,
                    sectionId: null,
                    isNew: false,
                },
            };
        case 'OPEN_VIEW_JOB_MODAL':
            return {
                ...state,
                viewModalJob: action.jobApplication,
                editModal: {
                    jobApplication: null,
                    sectionId: null,
                    isNew: false,
                },
            };
        case 'CLOSE_VIEW_JOB_MODAL':
            return {
                ...state,
                viewModalJob: null,
            };
        case 'OPEN_SECTION_MODAL':
            return {
                ...state,
                sectionModal: {
                    section: action.section,
                    isNew: action.isNew,
                },
            };
        case 'CLOSE_SECTION_MODAL':
            return {
                ...state,
                sectionModal: {
                    section: null,
                    isNew: false,
                },
            };
        case 'DRAG_START':
            return {
                ...state,
                activeId: action.activeId,
            };
        case 'DRAG_END_CLEAR':
            return {
                ...state,
                activeId: null,
                overId: null,
            };
        case 'DRAG_OVER':
            return {
                ...state,
                overId: action.overId,
            };
        case 'SET_DELETE_SECTION_CONFIRM':
            return {
                ...state,
                deleteSectionConfirm: action.payload,
            };
        case 'CLEAR_DELETE_SECTION_CONFIRM':
            return {
                ...state,
                deleteSectionConfirm: null,
            };
        default: {
            const exhaustive: never = action;
            return exhaustive;
        }
    }
}
