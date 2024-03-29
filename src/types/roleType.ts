import type {Permission} from './permissionType';

export interface Role{
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    pivot: {
        user_id: number;
        role_id: number;
    };
    permissions?: Permission[];
}