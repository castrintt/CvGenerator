import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';
import {useJobApplications} from '../../context/JobApplicationsContext';
import type {JobApplicationSectionId} from '../../../business/domain/models/jobApplication.model';
import type {JobApplication} from '../../../business/domain/models/jobApplication.model';

const SECTION_ORDER: JobApplicationSectionId[] = [
    'applied',
    'in_progress',
    'positive_feedback',
    'rejected',
    'cold',
];

export const UseDashboardScreenController = () => {
    const navigate = useNavigate();
    const {user, logout: authLogout} = useAuth();
    const {
        addJobApplication,
        updateJobApplication,
        removeJobApplication,
        moveJobApplication,
        getBySection,
    } = useJobApplications();

    const logout = () => {
        authLogout();
        navigate('/');
    };

    const jobApplicationsBySection = SECTION_ORDER.reduce(
        (acc, id) => {
            acc[id] = getBySection(id);
            return acc;
        },
        {} as Record<JobApplicationSectionId, JobApplication[]>
    );

    const handleAddJobApplication = (sectionId: JobApplicationSectionId) => {
        const today = new Date().toISOString().slice(0, 10);
        return addJobApplication(sectionId, {
            company: '',
            position: '',
            appliedDate: today,
        });
    };

    const handleDragEnd = (activeId: string, overId: string | null) => {
        if (!overId) return;
        const sectionId = SECTION_ORDER.find((id) => id === overId);
        if (sectionId && (activeId.startsWith('job-') || activeId.startsWith('cand-'))) {
            moveJobApplication(activeId, sectionId);
        }
    };

    return {
        actions: {
            addJobApplication: handleAddJobApplication,
            updateJobApplication,
            removeJobApplication,
            moveJobApplication,
            handleDragEnd,
            logout,
        },
        states: {
            jobApplicationsBySection,
            userEmail: user?.email ?? '',
        },
    };
};
