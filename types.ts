import type { FC } from 'react';

export type ColorName =
  | 'indigo'
  | 'fuchsia'
  | 'emerald'
  | 'amber'
  | 'purple'
  | 'white'
  | 'black';

export interface Color {
  name: ColorName;
  hex: string;
}

export type ProfileSection =
  | 'Activity'
  | 'Credentials'
  | 'Referrals'
  | 'Writing'
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

export interface PersonBasicDetails {
  eth_address: string;
  ens_name: string;
  username: string;
  avatar: string;
}

export interface BadgeType {
  id: string;
  total_supply?: number;
  created_at: string;
  updated_at: string;
  image: string;
  score_bonus?: number;
  related_skill?: string;
  title: string;
  slug: string;
  description: string;
  video: string;
  issuer: {
    name: BadgeIssuer;
  };
  poap_badge_extra_data?: any;
}

export interface Badge {
  id: string;
  owner: PersonBasicDetails;
  badge_type: BadgeType;
  created_at: string;
  updated_at: string;
  minted: boolean;
  minted_at: string;
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
  skills?: { name: string; slug: string }[];
}

export type Role =
  | 'role_developer'
  | 'role_designer'
  | 'role_trader'
  | 'role_creator'
  | 'role_researcher'
  | 'role_investor'
  | 'role_community_manager';

export type TrimmedRole =
  | 'developer'
  | 'designer'
  | 'trader'
  | 'creator'
  | 'researcher'
  | 'investor'
  | 'community_manager';

export type MappedRoles<T> = {
  [Key in Role]: T;
};

export type MappedTrimmedRoles<T> = {
  [Key in TrimmedRole]: T;
};

export interface Profile
  extends Partial<MappedSkills<number>>,
    Partial<MappedRoles<boolean>> {
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
  github_last_checked?: string | null;
  open_to_opportunities: boolean;
  onboarded: boolean;
  email: string;
  email_verified?: boolean;
  website: string;
  full_name?: string;
}

export interface ListResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ThemeColor {
  [5]?: string;
  [10]?: string;
  [20]?: string;
  [30]?: string;
  [40]?: string;
  [50]?: string;
  [60]?: string;
  [70]?: string;
  [80]?: string;
  [90]?: string;
  [100]?: string;
  [200]?: string;
  [300]?: string;
  [400]?: string;
  [500]?: string;
  [600]?: string;
  [700]?: string;
  [800]?: string;
  [900]?: string;
}

export type APIResponse<T = any> = {
  data: T | null;
  error: Error | unknown;
};

export type ActivityType =
  | 'new-badge'
  | 'new-referral-given'
  | 'new-referral-received'
  // | 'new-post'
  | 'new-event-attended';

export interface Activity {
  activity_datetime: string;
  id: string;
  user: PersonBasicDetails;
  created_at: string;
  updated_at: string;
  type: ActivityType;
  description: string;
  image: string;
  // Details of the current user in case we need them for activities related to referrals
  currentUser?: PersonBasicDetails;
  metadata: {
    badge?: {
      image_url: string;
      name: string;
      slug: string;
    };

    referral_author?: Partial<PersonBasicDetails>;
    referral_receiver?: Partial<PersonBasicDetails>;
    referral?: {
      content: string;
    };

    event?: {
      name: string;
      image_url: string;
    };
  };
}

export interface MirrorPost {
  author: {
    address: string;
  };
  body: string;
  digest: string;
  featuredImage: {
    url: string;
  } | null;
  originalDigest: string;
  publishStatus: string;
  publishedAtTimestamp: number | null;
  timestamp: number;
  title: string;
}

export interface Post {
  id: string;
  author: {
    eth_address: string;
  };
  posted_at: string;
  title: string;
  background_image: string;
  preview: string;
  url: string;
}

export type FCWithClassName<P = {}> = FC<P & { className?: string }>;

export type BadgeIssuer =
  | 'mazury'
  | 'poap'
  | 'buildspace'
  | 'gitpoap'
  | 'kudos'
  | '101';

export type FilterType =
  | 'Credentials'
  | 'Roles'
  | 'Referred skills'
  | 'Number of referrals'
  | 'empty';

export interface FilterState {
  query: string;
  role: string;
  skills: string[];
  badges: string[];
  contactable: boolean;
}

export type ValueOf<T> = T[keyof T];

export type AuthVerifyResponse = {
  access_token: string;
  refresh: string;
  success: boolean;
};
