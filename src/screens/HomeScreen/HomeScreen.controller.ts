import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';

export const UseHomeScreenController = () => {
    const navigate = useNavigate();
    const {user} = useAuth();

    const goToLogin = () => navigate('/login');
    const goToResume = () => navigate('/resume');
    const goToDashboard = () => navigate('/dashboard');

    return {
        actions: {
            goToLogin,
            goToResume,
            goToDashboard,
        },
        states: {
            isLoggedIn: !!user,
        },
    };
};
