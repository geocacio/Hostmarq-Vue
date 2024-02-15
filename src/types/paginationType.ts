import type { User } from "./userType";
export interface PaginationLink {
    url: string;
    label: string;
    active: boolean;
  }
  
  export interface Pagination {
    data: User[];
    links: PaginationLink[];
  }