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
                    <SuccessIcon>✓</SuccessIcon>
                    <Message>Currículo Pronto!</Message>
                </motion.div>
            )}
        </Container>
    );
};