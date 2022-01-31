export type ColorName =
  | 'purple'
  | 'pink'
  | 'green'
  | 'brown'
  | 'lemon'
  | 'white'
  | 'black';

export interface Color {
  name: ColorName;
  hex: string;
}

export type ProfileSection =
  | 'Activity'
  | 'Badges'
  | 'Referrals'
  | 'Blog posts'
  | 'DAOs';

export type Skill =
  | 'frontendDev'
  | 'backendDev'
  | 'smartContractDev'
  | 'protocolDev'
  | 'design'
  | 'growthMarketing'
  | 'writing'
  | 'productManagement'
  | 'projectManagement'
  | 'dataScience'
  | 'art'
  | 'defiDegen'
  | 'nftDegen'
  | 'teaching'
  | 'memes'
  | 'community';

interface PersonBasicDetails {
  eth_address: string;
  ens_name: string;
  username: string;
  avatar: string;
}

export interface BadgeType {
  id: string;
  created_at: string;
  updated_at: string;
  image: string;
  score_bonus: number;
  related_skill: string;
  title: string;
  slug: string;
  description: string;
}

export interface Badge {
  id: string;
  owner: PersonBasicDetails;
  badge_type: BadgeType;
  created_at: string;
  updated_at: string;
}

export type MappedSkills<T> = {
  [Key in Skill]: T;
};

export interface Referral extends MappedSkills<boolean> {
  id: string;
  receiver: PersonBasicDetails;
  author: PersonBasicDetails;
  created_at: string;
  updated_at: string;
  datetime: string;
  content: string;
}

export type Role =
  | 'role_developer'
  | 'role_designer'
  | 'role_trader'
  | 'role_creator'
  | 'role_researcher'
  | 'role_investor'
  | 'role_community_manager';

export type MappedRoles<T> = {
  [Key in Role]: T;
};

export interface Profile extends MappedSkills<number>, MappedRoles<boolean> {
  id: string;
  top_badges: Badge[];
  referred_by: PersonBasicDetails[];
  created_at: string;
  updated_at: string;
  avatar: string;
  eth_address: string;
  bio: string;
  username: string;
  ens_name: string;
  claimed: boolean;
  signing_nonce: number;
  verified: boolean;
  github: string;
  twitter: string;
  github_last_checked: string;
  open_to_opportunities: boolean;
  onboarded: boolean;
  email: string;
  website: string;
}

export interface ListResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
