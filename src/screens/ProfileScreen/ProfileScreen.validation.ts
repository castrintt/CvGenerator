import {z} from 'zod';
import {INPUT_LIMITS} from '../../../business/shared/validation/limits';

const MINIMUM_PASSWORD_LENGTH = 8;

const hasPasswordComplexity = (password: string): boolean =>
    /\d/.test(password) && /[^a-zA-Z0-9]/.test(password);

export const profilePersonalDataSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'O nome não pode estar vazio.')
        .max(INPUT_LIMITS.personName, `Máximo de ${INPUT_LIMITS.personName} caracteres`),
    email: z
        .string()
        .trim()
        .email('E-mail inválido.')
        .max(INPUT_LIMITS.email, `Máximo de ${INPUT_LIMITS.email} caracteres`),
});

export const profilePasswordChangeSchema = z
    .object({
        currentPassword: z.string().min(1, 'Informe a senha atual.'),
        newPassword: z
            .string()
            .min(
                MINIMUM_PASSWORD_LENGTH,
                `A nova senha deve ter pelo menos ${MINIMUM_PASSWORD_LENGTH} caracteres.`,
            )
            .max(INPUT_LIMITS.password, `Máximo de ${INPUT_LIMITS.password} caracteres`)
            .refine(hasPasswordComplexity, {
                message: 'A nova senha precisa conter pelo menos um número e um caractere especial.',
            }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'A confirmação de senha não coincide com a nova senha.',
        path: ['confirmPassword'],
    });
