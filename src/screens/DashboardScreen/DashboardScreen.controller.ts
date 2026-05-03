import {useEffect, useReducer} from 'react';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import type {SubmitHandler} from 'react-hook-form';
import type {DragEndEvent, DragStartEvent} from '@dnd-kit/core';
import {PointerSensor, useSensor, useSensors} from '@dnd-kit/core';
import {useAuth} from '../../context/AuthContext';
import {useJobApplications} from '../../context/JobApplicationsContext';
import {useSections} from '../../context/SectionsContext';
import type {JobApplication} from '../../../business/domain/models/jobApplication.model';
import type {Section} from '../../../business/domain/models/section.model';
import type {JobApplicationFormValues, SectionFormValues} from './DashboardScreen.types';
import {
    brToIso,
    collisionDetectionStrategy,
    formatDateBR,
    resolveDropSectionId,
} from './DashboardScreen.utils';
import {
    dashboardScreenReducer,
    initialDashboardScreenUiState,
} from './DashboardScreen.reducer';

export const UseDashboardScreenController = () => {
    const navigate = useNavigate();
    const {user, logout: authLogout} = useAuth();
    const {
        addJobApplication,
        updateJobApplication,
        removeJobApplication,
        moveJobApplication,
        refreshJobApplicationsFromBackend,
        getBySection,
    } = useJobApplications();
    const {sections, addSection, updateSection, removeSection, reorderSections} = useSections();

    const sensors = useSensors(
        useSensor(PointerSensor, {activationConstraint: {distance: 8}}),
    );

    const [ui, dispatch] = useReducer(
        dashboardScreenReducer,
        initialDashboardScreenUiState,
    );
    const {editModal, viewModalJob, sectionModal, overId, activeId, deleteSectionConfirm} = ui;

    const jobForm = useForm<JobApplicationFormValues>({
        defaultValues: {company: '', position: '', appliedDate: '', link: '', notes: ''},
    });

    const sectionForm = useForm<SectionFormValues>({
        defaultValues: {name: ''},
    });

    useEffect(() => {
        if (editModal.sectionId === null) {
            jobForm.reset({company: '', position: '', appliedDate: '', link: '', notes: ''});
            return;
        }
        const job = editModal.jobApplication;
        jobForm.reset({
            company: job?.company ?? '',
            position: job?.position ?? '',
            appliedDate: job ? formatDateBR(job.appliedDate) : formatDateBR(new Date().toISOString().slice(0, 10)),
            link: job?.link ?? '',
            notes: job?.notes ?? '',
        });
    }, [editModal]);

    useEffect(() => {
        if (!sectionModal.section && !sectionModal.isNew) {
            sectionForm.reset({name: ''});
            return;
        }
        sectionForm.reset({name: sectionModal.section?.name ?? ''});
    }, [sectionModal]);

    const logout = async () => {
        await authLogout();
        navigate('/');
    };

    const navigateToProfile = () => {
        navigate('/profile');
    };

    const orderedSections = [...sections].sort((a, b) => a.order - b.order);

    const jobApplicationsBySection = orderedSections.reduce(
        (acc, s) => {
            acc[s.id] = getBySection(s.id);
            return acc;
        },
        {} as Record<string, JobApplication[]>,
    );

    const sectionIds = orderedSections.map((s) => s.id);

    const allJobApplications = orderedSections.flatMap(
        (s) => jobApplicationsBySection[s.id] ?? [],
    );
    const activeJobApplication = activeId
        ? allJobApplications.find((item) => item.id === activeId)
        : undefined;
    const activeSection =
        activeId && orderedSections.some((s) => s.id === activeId)
            ? orderedSections.find((s) => s.id === activeId) ?? null
            : null;

    const openAddModal = (sectionId: string) => {
        dispatch({type: 'OPEN_EDIT_MODAL_ADD', sectionId});
    };

    const openEditModal = (item: JobApplication) => {
        dispatch({type: 'OPEN_EDIT_MODAL_EDIT', jobApplication: item});
    };

    const openViewModal = (item: JobApplication) => {
        dispatch({type: 'OPEN_VIEW_JOB_MODAL', jobApplication: item});
    };

    const closeViewModal = () => {
        dispatch({type: 'CLOSE_VIEW_JOB_MODAL'});
    };

    const closeModal = () => {
        dispatch({type: 'CLOSE_EDIT_MODAL'});
    };

    const openSectionModal = (section: Section | null, isNew: boolean) => {
        dispatch({type: 'OPEN_SECTION_MODAL', section, isNew});
    };

    const closeSectionModal = () => {
        dispatch({type: 'CLOSE_SECTION_MODAL'});
    };

    const handleAddSection = () => {
        openSectionModal(null, true);
    };

    const handleDragStart = (event: DragStartEvent) => {
        dispatch({type: 'DRAG_START', activeId: String(event.active.id)});
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        const activeIdStr = String(active.id);
        const activeType = active.data.current?.type as string | undefined;
        const overIdStr = over ? String(over.id) : null;

        dispatch({type: 'DRAG_END_CLEAR'});

        if (activeType === 'section' && sectionIds.includes(activeIdStr)) {
            const fromIndex = sectionIds.indexOf(activeIdStr);
            const toIndex = overIdStr ? sectionIds.indexOf(overIdStr) : -1;
            if (toIndex >= 0 && fromIndex !== toIndex) {
                reorderSections(fromIndex, toIndex);
            }
            return;
        }

        if (activeType === 'job') {
            const targetSectionId = resolveDropSectionId(
                overIdStr,
                sectionIds,
                jobApplicationsBySection,
            );
            if (targetSectionId) {
                moveJobApplication(activeIdStr, targetSectionId);
            }
        }
    };

    const handleDragOver = (event: {over: {id: unknown} | null}) => {
        dispatch({
            type: 'DRAG_OVER',
            overId: event.over ? String(event.over.id) : null,
        });
    };

    const onSubmitJobApplicationForm: SubmitHandler<JobApplicationFormValues> = async (values) => {
        if (!editModal.sectionId) return;

        const todayIso = new Date().toISOString().slice(0, 10);
        const isoDate = brToIso(values.appliedDate);

        if (editModal.isNew && !editModal.jobApplication) {
            await addJobApplication(editModal.sectionId, {
                company: values.company,
                position: values.position,
                appliedDate: isoDate || todayIso,
                link: values.link || undefined,
                notes: values.notes || undefined,
            });
            closeModal();
            return;
        }

        if (!editModal.jobApplication) return;

        await updateJobApplication(editModal.jobApplication.id, {
            company: values.company,
            position: values.position,
            appliedDate: isoDate || editModal.jobApplication.appliedDate,
            link: values.link || undefined,
            notes: values.notes || undefined,
        });
        closeModal();
    };

    const onSubmitSectionForm: SubmitHandler<SectionFormValues> = (values) => {
        const sectionName = values.name.trim() || 'Nova seção';

        if (sectionModal.isNew && !sectionModal.section) {
            addSection(sectionName);
            closeSectionModal();
            return;
        }

        if (!sectionModal.section) return;
        updateSection(sectionModal.section.id, {name: sectionName});
        closeSectionModal();
    };

    const handleDeleteSection = (sectionId: string) => {
        const section = orderedSections.find((s) => s.id === sectionId);
        if (!section) return;
        const cardsCount = jobApplicationsBySection[sectionId]?.length ?? 0;
        dispatch({
            type: 'SET_DELETE_SECTION_CONFIRM',
            payload: {
                sectionId,
                sectionName: section.name,
                cardsCount,
            },
        });
    };

    const confirmDeleteSection = async () => {
        if (!deleteSectionConfirm) return;
        const {sectionId} = deleteSectionConfirm;
        dispatch({type: 'CLEAR_DELETE_SECTION_CONFIRM'});
        await removeSection(sectionId);
        await refreshJobApplicationsFromBackend();
    };

    const cancelDeleteSection = () => {
        dispatch({type: 'CLEAR_DELETE_SECTION_CONFIRM'});
    };

    const isSectionModalOpen = sectionModal.isNew || sectionModal.section !== null;
    const isViewJobModalOpen = viewModalJob !== null;
    const isJobEditModalOpen =
        editModal.sectionId !== null && (editModal.jobApplication !== null || editModal.isNew);

    return {
        actions: {
            removeJobApplication,
            logout,
            navigateToProfile,
            openAddModal,
            openEditModal,
            openViewModal,
            closeViewModal,
            closeModal,
            openSectionModal,
            closeSectionModal,
            handleAddSection,
            handleDragStart,
            handleDragEnd,
            handleDragOver,
            onSubmitJobApplicationForm,
            onSubmitSectionForm,
            handleDeleteSection,
            confirmDeleteSection,
            cancelDeleteSection,
        },
        states: {
            sections: orderedSections,
            jobApplicationsBySection,
            userEmail: user?.email ?? '',
            userName: user?.name ?? '',
            sensors,
            collisionDetection: collisionDetectionStrategy,
            overId,
            activeId,
            editModal,
            sectionModal,
            deleteSectionConfirm,
            sectionIds,
            activeJobApplication,
            activeSection,
            isJobEditModalOpen,
            isViewJobModalOpen,
            viewModalJob,
            isSectionModalOpen,
            jobForm,
            sectionForm,
        },
    };
};
