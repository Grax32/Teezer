
export const getValueFromChangerString = (value: string | [string]): string => {
    if (value instanceof Array) {
        return value[0] ?? '';
    }
    return value ?? '';
};