export interface Permission{
    id: number;
    name: string;
    description?: string;
    pivot: {
        role_id: number;
        permission_id: number;
    };
}