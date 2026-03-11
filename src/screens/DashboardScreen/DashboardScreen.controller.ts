import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';
import {useJobApplications} from '../../context/JobApplicationsContext';
import {useSections} from '../../context/SectionsContext';
import type {JobApplication} from '../../../business/domain/models/jobApplication.model';

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
    const {
        sections,
        addSection,
        updateSection,
        removeSection,
        reorderSections,
    } = useSections();

    const logout = () => {
        authLogout();
        navigate('/');
    };

    const orderedSections = [...sections].sort((a, b) => a.order - b.order);

    const jobApplicationsBySection = orderedSections.reduce(
        (acc, s) => {
            acc[s.id] = getBySection(s.id);
            return acc;
        },
        {} as Record<string, JobApplication[]>
    );

    const handleAddJobApplication = (sectionId: string) => {
        const today = new Date().toISOString().slice(0, 10);
        return addJobApplication(sectionId, {
            company: '',
            position: '',
            appliedDate: today,
        });
    };

    const handleDragEnd = (activeId: string, overId: string | null) => {
        if (!overId) return;
        const sectionIds = orderedSections.map((s) => s.id);
        const sectionIndex = sectionIds.indexOf(overId);
        if (sectionIndex >= 0 && (activeId.startsWith('job-') || activeId.startsWith('cand-'))) {
            moveJobApplication(activeId, overId);
        }
    };

    const handleSectionReorder = (fromIndex: number, toIndex: number) => {
        reorderSections(fromIndex, toIndex);
    };

    const handleDeleteSection = (sectionId: string) => {
        const jobsInSection = getBySection(sectionId).length;
        if (jobsInSection > 0) {
            removeAllFromSection(sectionId);
        }
        removeSection(sectionId);
    };

    return {
        actions: {
            addJobApplication: handleAddJobApplication,
            updateJobApplication,
            removeJobApplication,
            moveJobApplication,
            handleDragEnd,
            logout,
            addSection,
            updateSection,
            removeSection: handleDeleteSection,
            reorderSections: handleSectionReorder,
        },
        states: {
            sections: orderedSections,
            jobApplicationsBySection,
            userEmail: user?.email ?? '',
        },
    };
};
