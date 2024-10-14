export function joinTags(tags: string[]): string {
    if (typeof tags === 'string') {
        return tags;
    }
    return tags.join(', ');
}

export function splitTags(tags: string | string[]): string[] {
    if (Array.isArray(tags)) {
        return tags;
    }
    return tags.split(',').map((tag) => tag.trim());
}
