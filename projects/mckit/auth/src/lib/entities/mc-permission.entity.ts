export class MCPermission {
    public id?: string;
    /**
     * Name of the permission.
     * Format: subject:action
     * Example: users:read
     */
    public name?: string;
    /**
     * Subject of the permission.
     * Format: users
     */
    public subject?: string;
    /**
     * Action of the permission.
     * Format: read
     */
    public action?: string;
    /**
     * Optional: ['title', 'status'] (if only can edit certain fields)
     */
    public fields?: any;
    /**
     * Conditions CASL: '{authorId: ${user.id}}'
     */
    public conditions?: any;
    /**
     * Mensaje descriptivo si se le deniega el acceso 
     */
    public reason?: string;

    public created_at?: string;

    /**
     * Creates an MCPermission instance from a string ('subject:action') or partial object.
     */
    public static from(value: string | Partial<MCPermission>): MCPermission {
        const perm = new MCPermission();
        if (typeof value === 'string') {
            const trimmed = value.trim();
            perm.name = trimmed;
            if (trimmed.includes(':')) {
                const parts = trimmed.split(':');
                perm.subject = parts[0];
                perm.action = parts.slice(1).join(':');
            } else {
                perm.subject = trimmed;
                perm.action = '*';
            }
        } else if (value) {
            Object.assign(perm, value);
            if (!perm.name && perm.subject && perm.action) {
                perm.name = `${perm.subject}:${perm.action}`;
            } else if (perm.name && (!perm.subject || !perm.action)) {
                if (perm.name.includes(':')) {
                    const parts = perm.name.split(':');
                    perm.subject = perm.subject || parts[0];
                    perm.action = perm.action || parts.slice(1).join(':');
                } else {
                    perm.subject = perm.subject || perm.name;
                    perm.action = perm.action || '*';
                }
            }
        }
        return perm;
    }

    /**
     * Extracts or creates the formatted permission name ('subject:action').
     */
    public static toName(value: MCPermission | string | { subject?: string; action?: string; name?: string }): string {
        if (typeof value === 'string') {
            return value.trim();
        }
        if (value.name) {
            return value.name.trim();
        }
        if (value.subject && value.action) {
            return `${value.subject.trim()}:${value.action.trim()}`;
        }
        return value.subject ? `${value.subject.trim()}:*` : '';
    }

    /**
     * Evaluates if a granted permission matches a requested permission, supporting wildcards.
     */
    public static matches(
        granted: MCPermission | string,
        requested: MCPermission | string | { subject?: string; action?: string; name?: string },
        allowWildcards: boolean = true
    ): boolean {
        const grantedName = MCPermission.toName(granted).toLowerCase();
        const requestedName = MCPermission.toName(requested).toLowerCase();

        if (!grantedName || !requestedName) {
            return false;
        }

        if (grantedName === requestedName) {
            return true;
        }

        if (!allowWildcards) {
            return false;
        }

        // Global wildcards
        if (grantedName === '*' || grantedName === '*:*' || grantedName === 'all' || grantedName === 'manage:all') {
            return true;
        }

        const grantedObj = typeof granted === 'string' ? MCPermission.from(granted) : granted;
        const reqObj = typeof requested === 'string' ? MCPermission.from(requested) : MCPermission.from(requested);

        const gSubject = (grantedObj.subject || '').toLowerCase();
        const gAction = (grantedObj.action || '').toLowerCase();
        const rSubject = (reqObj.subject || '').toLowerCase();
        const rAction = (reqObj.action || '').toLowerCase();

        const subjectMatches = gSubject === '*' || gSubject === 'all' || gSubject === rSubject;
        const actionMatches = gAction === '*' || gAction === 'all' || gAction === rAction;

        return subjectMatches && actionMatches;
    }
}
