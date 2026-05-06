import {jobApplicationFormSchema, sectionFormSchema} from '../../src/screens/DashboardScreen/DashboardScreen.schemas';

describe('DashboardScreen form schemas', () => {
    const baseJob = {
        company: 'Acme',
        position: 'Dev',
        appliedDate: '15/05/2024',
        link: '',
        notes: '',
    };

    it('rejects non-http link protocol', () => {
        const result = jobApplicationFormSchema.safeParse({
            ...baseJob,
            link: 'javascript:alert(1)',
        });
        expect(result.success).toBe(false);
    });

    it('accepts empty optional link', () => {
        const result = jobApplicationFormSchema.safeParse(baseJob);
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.link).toBe('');
        }
    });

    it('normalizes valid bare host link', () => {
        const result = jobApplicationFormSchema.safeParse({
            ...baseJob,
            link: 'linkedin.com/in/user',
        });
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.link).toBe('https://linkedin.com/in/user');
        }
    });

    it('section name is required', () => {
        const result = sectionFormSchema.safeParse({name: '   '});
        expect(result.success).toBe(false);
    });

    it('section accepts trimmed name', () => {
        const result = sectionFormSchema.safeParse({name: '  Kanban  '});
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.name).toBe('Kanban');
        }
    });
});
