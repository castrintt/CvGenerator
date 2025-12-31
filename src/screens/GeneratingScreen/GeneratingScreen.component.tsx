import React from 'react';
import {Container, Message, Spinner, SuccessIcon} from './GeneratingScreen.styles';
import {motion} from 'framer-motion';
import type {GeneratingScreenComponentProps} from "./GeneratingScreen.types.tsx";


export const GeneratingScreenComponent: React.FC<GeneratingScreenComponentProps> = ({controller}) => {
    return (
        <Container>
            {controller.states.isGenerating ? (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                >
                    <Spinner/>
                    <Message>Gerando seu currículo profissional...</Message>
                </motion.div>
            ) : (
                <motion.div
                    initial={{scale: 0.5, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    transition={{type: 'spring', stiffness: 200, damping: 10}}
                    style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                >
                    <SuccessIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    </SuccessIcon>
                    <Message>Currículo Pronto!</Message>
                </motion.div>
            )}
        </Container>
    );
};