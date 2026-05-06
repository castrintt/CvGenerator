import type {CollisionDetection} from '@dnd-kit/core';
import {closestCenter, pointerWithin} from '@dnd-kit/core';
import type {JobApplication} from '../../../business/domain/models/jobApplication.model';
import {toSafeHttpHref} from '../../../business/shared/validation/safe-http-url';

/**
 * URL segura para usar em href (apenas http/https). Entradas como "youtube.com" viram https://youtube.com.
 * Retorna string vazia para protocolos perigosos ou URLs inválidas.
 */
export const toExternalHref = (raw: string): string => toSafeHttpHref(raw);

export const formatDateBR = (isoDate: string): string => {
    if (!isoDate) return '';
    const [y, m, d] = isoDate.split('-');
    return d && m && y ? `${d}/${m}/${y}` : isoDate;
};

/** Converte DD/MM/AAAA para AAAA-MM-DD (ISO). Retorna string vazia se inválido. */
export const brToIso = (brDate: string): string => {
    const trimmed = brDate.trim().replace(/\s/g, '');
    if (!trimmed) return '';
    const parts = trimmed.split('/');
    if (parts.length !== 3) return '';
    const [d, m, y] = parts;
    const day = parseInt(d, 10);
    const month = parseInt(m, 10);
    const year = parseInt(y, 10);
    if (isNaN(day) || isNaN(month) || isNaN(year)) return '';
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) return '';
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${year}-${pad(month)}-${pad(day)}`;
};

/** Máscara para input DD/MM/AAAA */
export const maskDateBr = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
};

export function resolveDropSectionId(
    overId: string | null,
    sectionIds: string[],
    jobApplicationsBySection: Record<string, JobApplication[]>,
): string | null {
    if (!overId) return null;
    if (sectionIds.includes(overId)) return overId;
    for (const sid of sectionIds) {
        const jobs = jobApplicationsBySection[sid] ?? [];
        if (jobs.some((j) => j.id === overId)) return sid;
    }
    return null;
}

export const collisionDetectionStrategy: CollisionDetection = (args) => {
    const type = args.active.data.current?.type as string | undefined;
    if (type === 'section') {
        return closestCenter(args);
    }
    return pointerWithin(args);
};
