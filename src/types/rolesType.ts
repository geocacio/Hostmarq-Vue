import type { Permission } from './permissionType';

export interface Role {
    created_at?: string;
    description?: string;
    id?: number;
    name?: string;
    permissions?: Permission;
    updated_at?: string;
}