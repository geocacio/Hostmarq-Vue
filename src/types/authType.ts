import type { Club } from "./clubType";

export interface Auth{
    token:      string;
    user:       object | null;
    userRoles:  string[];
    userPermissions: string[];
    club?:       Club | null;
}