import {z} from 'zod';
import {INPUT_LIMITS} from './limits';

/**
 * Normaliza entrada para URL absoluta http(s) ou retorna string vazia se inválida ou perigosa.
 * Bloqueia javascript:, data:, vbscript:, etc.
 */
export const toSafeHttpHref = (raw: string): string => {
    const trimmed = raw.trim();
    if (!trimmed) {
        return '';
    }

    let candidate = trimmed;
    if (trimmed.startsWith('//')) {
        candidate = `https:${trimmed}`;
    } else if (!/^https?:\/\//i.test(trimmed)) {
        if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) {
            return '';
        }
        candidate = `https://${trimmed}`;
    }

    try {
        const parsed = new URL(candidate);
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
            return '';
        }
        if (!parsed.hostname) {
            return '';
        }
        return parsed.href;
    } catch {
        return '';
    }
};

export const INVALID_HTTP_URL_MESSAGE = 'URL inválida. Use http:// ou https://';

export const zodOptionalHttpUrlField = (maxLength: number) =>
    z
        .string()
        .trim()
        .max(maxLength, `Máximo de ${maxLength} caracteres`)
        .superRefine((value, ctx) => {
            if (value !== '' && toSafeHttpHref(value) === '') {
                ctx.addIssue({code: z.ZodIssueCode.custom, message: INVALID_HTTP_URL_MESSAGE});
            }
        })
        .transform((value) => (value === '' ? '' : (toSafeHttpHref(value) ?? '')));

export const zodOptionalProfileLinkField = zodOptionalHttpUrlField(INPUT_LIMITS.optionalProfileUrl);

export const zodJobApplicationLinkField = zodOptionalHttpUrlField(INPUT_LIMITS.jobLink);

/** Campo opcional no formulário do currículo (LinkedIn / site): aceita vazio ou URL http(s) normalizada. */
export const zodResumeOptionalProfileLinkField = z.preprocess(
    (value) => (value === undefined || value === null ? '' : String(value)),
    z
        .string()
        .trim()
        .max(INPUT_LIMITS.optionalProfileUrl, `Máximo de ${INPUT_LIMITS.optionalProfileUrl} caracteres`)
        .superRefine((trimmed, ctx) => {
            if (trimmed !== '' && toSafeHttpHref(trimmed) === '') {
                ctx.addIssue({code: z.ZodIssueCode.custom, message: INVALID_HTTP_URL_MESSAGE});
            }
        })
        .transform((trimmed) => (trimmed === '' ? undefined : toSafeHttpHref(trimmed))),
);
