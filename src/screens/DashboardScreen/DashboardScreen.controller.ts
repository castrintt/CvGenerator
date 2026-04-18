import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import type {DragEndEvent, DragStartEvent} from '@dnd-kit/core';
import {PointerSensor, useSensor, useSensors} from '@dnd-kit/core';
import {useAuth} from '../../context/AuthContext';
import {useJobApplications} from '../../context/JobApplicationsContext';
import {useSections} from '../../context/SectionsContext';
import type {JobApplication} from '../../../business/domain/models/jobApplication.model';
import type {Section} from '../../../business/domain/models/section.model';
import {
    brToIso,
    collisionDetectionStrategy,
    isJobDragId,
    resolveDropSectionId,
} from './DashboardScreen.utils';
import type {
    DeleteSectionConfirmState,
    EditModalState,
    SectionModalState,
} from './DashboardScreen.types';

export const UseDashboardScreenController = () => {
    const navigate = useNavigate();
    const {user, logout: authLogout} = useAuth();
    const {
        addJobApplication,
        updateJobApplication,
        removeJobApplication,
        moveJobApplication,
        removeAllFromSection,
        getBySection,
    } = useJobApplications();
    const {sections, addSection, updateSection, removeSection, reorderSections} = useSections();

    const sensors = useSensors(
        useSensor(PointerSensor, {activationConstraint: {distance: 8}}),
    );

    const [editModal, setEditModal] = useState<EditModalState>({
        jobApplication: null,
        sectionId: null,
        isNew: false,
    });
    const [sectionModal, setSectionModal] = useState<SectionModalState>({
        section: null,
        isNew: false,
    });
    const [overId, setOverId] = useState<string | null>(null);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [deleteSectionConfirm, setDeleteSectionConfirm] =
        useState<DeleteSectionConfirmState>(null);

    const logout = async () => {
        await authLogout();
        navigate('/');
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
        setEditModal({jobApplication: null, sectionId, isNew: true});
    };

    const openEditModal = (item: JobApplication) => {
        setEditModal({jobApplication: item, sectionId: item.sectionId, isNew: false});
    };

    const closeModal = () => {
        setEditModal({jobApplication: null, sectionId: null, isNew: false});
    };

    const openSectionModal = (section: Section | null, isNew: boolean) => {
        setSectionModal({section, isNew});
    };

    const closeSectionModal = () => {
        setSectionModal({section: null, isNew: false});
    };

    const handleAddSection = () => {
        openSectionModal(null, true);
    };

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(String(event.active.id));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        const activeIdStr = String(active.id);
        const activeType = active.data.current?.type as string | undefined;
        const overIdStr = over ? String(over.id) : null;

        setActiveId(null);
        setOverId(null);

        if (activeType === 'section' && sectionIds.includes(activeIdStr)) {
            const fromIndex = sectionIds.indexOf(activeIdStr);
            const toIndex = overIdStr ? sectionIds.indexOf(overIdStr) : -1;
            if (toIndex >= 0 && fromIndex !== toIndex) {
                reorderSections(fromIndex, toIndex);
            }
            return;
        }

        if (activeType === 'job' && isJobDragId(activeIdStr)) {
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
        setOverId(event.over ? String(event.over.id) : null);
    };

    const handleSaveEdit = () => {
        if (!editModal.sectionId) return;
        const form = document.getElementById('edit-job-form') as HTMLFormElement;
        if (!form) return;
        const formData = new FormData(form);
        const brDate = String(formData.get('appliedDate') ?? '').trim();
        const isoDate = brToIso(brDate);
        const todayIso = new Date().toISOString().slice(0, 10);

        if (editModal.isNew && !editModal.jobApplication) {
            const appliedDate = isoDate || todayIso;
            addJobApplication(editModal.sectionId, {
                company: String(formData.get('company') ?? ''),
                position: String(formData.get('position') ?? ''),
                appliedDate,
                link: String(formData.get('link') || '') || undefined,
                notes: String(formData.get('notes') || '') || undefined,
            });
            closeModal();
            return;
        }

        if (!editModal.jobApplication) return;
        const appliedDate = isoDate || editModal.jobApplication.appliedDate;
        updateJobApplication(editModal.jobApplication.id, {
            company: String(formData.get('company') ?? ''),
            position: String(formData.get('position') ?? ''),
            appliedDate,
            link: String(formData.get('link') || '') || undefined,
            notes: String(formData.get('notes') || '') || undefined,
        });
        closeModal();
    };

    const handleSaveSection = () => {
        const form = document.getElementById('edit-section-form') as HTMLFormElement;
        if (!form) return;
        const formData = new FormData(form);
        const name = String(formData.get('name') ?? '').trim() || 'Nova seção';

        if (sectionModal.isNew && !sectionModal.section) {
            addSection(name);
            closeSectionModal();
            return;
        }

        if (!sectionModal.section) return;
        updateSection(sectionModal.section.id, {name});
        closeSectionModal();
    };

    const handleDeleteSection = (sectionId: string) => {
        const section = orderedSections.find((s) => s.id === sectionId);
        const cardsCount = jobApplicationsBySection[sectionId]?.length ?? 0;
        if (cardsCount > 0 && section) {
            setDeleteSectionConfirm({
                sectionId,
                sectionName: section.name,
                cardsCount,
            });
        } else {
            if (window.confirm('Excluir esta seção?')) {
                removeSection(sectionId);
            }
        }
    };

    const confirmDeleteSection = () => {
        if (!deleteSectionConfirm) return;
        const {sectionId} = deleteSectionConfirm;
        removeAllFromSection(sectionId);
        removeSection(sectionId);
        setDeleteSectionConfirm(null);
    };

    const cancelDeleteSection = () => {
        setDeleteSectionConfirm(null);
    };

    const isSectionModalOpen = sectionModal.isNew || sectionModal.section !== null;
    const isJobEditModalOpen =
        editModal.sectionId !== null && (editModal.jobApplication !== null || editModal.isNew);
    const newJobDefaultDateIso = new Date().toISOString().slice(0, 10);

    return {
        actions: {
            removeJobApplication,
            logout,
            openAddModal,
            openEditModal,
            closeModal,
            openSectionModal,
            closeSectionModal,
            handleAddSection,
            handleDragStart,
            handleDragEnd,
            handleDragOver,
            handleSaveEdit,
            handleSaveSection,
            handleDeleteSection,
            confirmDeleteSection,
            cancelDeleteSection,
        },
        states: {
            sections: orderedSections,
            jobApplicationsBySection,
            userEmail: user?.email ?? '',
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
            isSectionModalOpen,
            newJobDefaultDateIso,
        },
    };
};
