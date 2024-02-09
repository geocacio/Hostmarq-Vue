export interface Auth{
    token:      string;
    user:       object | null;
    userRoles:  string[];
    userPermissions: string[];
}