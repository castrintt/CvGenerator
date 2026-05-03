export const maskPhone = (value: string): string => {
    if (!value) return '';
    const digits = value.replace(/\D/g, '');
    const truncated = digits.slice(0, 11);

    if (truncated.length > 10) {
        return truncated.replace(/^(\d{2})(\d{1})(\d{4})(\d{4}).*/, '($1) $2 $3-$4');
    }
    if (truncated.length > 6) {
        return truncated.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    }
    if (truncated.length > 2) {
        return truncated.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
    }
    return truncated;
};

export const maskMonthYear = (value: string): string => {
    if (!value) return '';
    const digits = value.replace(/\D/g, '').slice(0, 6);

    if (digits.length > 2) {
        return digits.replace(/^(\d{2})(\d{0,4}).*/, '$1/$2');
    }
    return digits;
};
