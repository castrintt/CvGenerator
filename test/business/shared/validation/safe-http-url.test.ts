import {toSafeHttpHref} from '../../../../business/shared/validation/safe-http-url';

describe('toSafeHttpHref', () => {
    it('returns empty for blank input', () => {
        expect(toSafeHttpHref('')).toBe('');
        expect(toSafeHttpHref('   ')).toBe('');
    });

    it('blocks dangerous protocols', () => {
        expect(toSafeHttpHref('javascript:alert(1)')).toBe('');
        expect(toSafeHttpHref('data:text/html,<script>void(0)</script>')).toBe('');
        expect(toSafeHttpHref('vbscript:msgbox')).toBe('');
    });

    it('accepts http and https URLs', () => {
        expect(toSafeHttpHref('https://example.com/path')).toBe('https://example.com/path');
        expect(toSafeHttpHref('http://example.com')).toBe('http://example.com/');
    });

    it('prefixes bare host with https', () => {
        expect(toSafeHttpHref('example.com')).toBe('https://example.com/');
        expect(toSafeHttpHref('jobs.site.com/vaga')).toBe('https://jobs.site.com/vaga');
    });

    it('normalizes protocol-relative URLs to https', () => {
        expect(toSafeHttpHref('//example.com/x')).toBe('https://example.com/x');
    });
});
