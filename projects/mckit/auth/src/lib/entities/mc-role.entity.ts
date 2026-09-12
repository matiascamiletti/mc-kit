import { MCPermission } from './mc-permission.entity';

export class MCRole {
    public id?: string | number;
    /**
     * Name of the role (e.g. 'admin', 'editor', 'viewer').
     */
    public name?: string;
    /**
     * Description of the role.
     */
    public description?: string;
    /**
     * Permissions associated with this role.
     */
    public permissions?: (MCPermission | string)[];

    public created_at?: string;

    /**
     * Creates an MCRole instance from string, number, or partial object.
     */
    public static from(value: string | number | Partial<MCRole>): MCRole {
        const role = new MCRole();
        if (typeof value === 'string' || typeof value === 'number') {
            role.name = String(value).trim();
            role.id = value;
        } else if (value) {
            Object.assign(role, value);
        }
        return role;
    }

    /**
     * Extracts the normalized name/identifier from a role representation.
     */
    public static toName(value: MCRole | string | number): string {
        if (typeof value === 'string' || typeof value === 'number') {
            return String(value).trim();
        }
        if (value.name) {
            return String(value.name).trim();
        }
        if (value.id !== undefined) {
            return String(value.id).trim();
        }
        return '';
    }

    /**
     * Evaluates if a user role matches a target role (case-insensitive for string names).
     */
    public static matches(userRole: MCRole | string | number, targetRole: MCRole | string | number): boolean {
        const u = MCRole.toName(userRole).toLowerCase();
        const t = MCRole.toName(targetRole).toLowerCase();
        return Boolean(u && t && u === t);
    }
}
