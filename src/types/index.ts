import { type AlertProps } from "@mui/material";

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export interface GitHubResponse {
  items: GitHubUser[];
  total_count: number;
  incomplete_results: boolean;
}

export interface UserFormData {
  username: string;
}

export interface UserCardProps {
  user: GitHubUser;
  isLastCard?: boolean;
  lastCardRef?: (node?: Element | null) => void;
}

export interface InfoBoxProps {
  type: AlertProps["severity"];
  message: string;
}
