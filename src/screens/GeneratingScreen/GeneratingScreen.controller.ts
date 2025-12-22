import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

export const UseGeneratingScreenController = () => {
    const navigate = useNavigate();
    const [isGenerating, setIsGenerating] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsGenerating(false);
            setTimeout(() => {
                navigate('/feedback');
            }, 1500);
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return {
        states: {
            isGenerating
        }
    };
};