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
}
