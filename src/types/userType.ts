import type { Role } from "./roleType";
import type { SocialNetwork } from "./socialNetworkType";
import type { Club } from "./clubType";

export interface User {
  id: number;
  club_id: number;
  registration: string;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  cnh: string;
  cnh_issue_date: string;
  cnh_expiration_date: string;
  sisgcorp_password: string;
  blood_type: string;
  dispatcher: string;
  status: string;
  club: Club;
  roles: Role[];
  social_networks: SocialNetwork[];
  phone: string;
}
