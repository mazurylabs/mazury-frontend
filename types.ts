import { AxiosRequestConfig } from 'axios';
import type { FC } from 'react';

export interface AxiosResponse<T = never> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig<T>;
  request?: any;
}

export type ColorName =
  | 'indigo'
  | 'fuchsia'
  | 'emerald'
  | 'amber'
  | 'purple'
  | 'white'
  | 'black';

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

export interface ConnectionType {
  requested_profile: { avatar: string; eth_address: string; username: string };
  status: 'pending' | 'accepted' | 'declined';
}

export type Tag = {
  name: string;
  level: '1' | '2' | '3';
};

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
  openseaUrl?: string;
  rainbowUrl?: string;
  poapUrl?: string;
  kudosUrl?: string;
  tags: Tag[];
}

export interface Badge {
  id: string;
  owner: PersonBasicDetails;
  badge_type: BadgeType;
  highlighted: boolean;
  created_at: string;
  updated_at: string;
  minted: boolean;
  minted_at: string;
  external_links?: any;
  hidden: boolean;
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

export interface TeamData {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  plan: string;
}

export interface TeamProfile {
  id: string;
  eth_address: string;
  ens_name: string;
  username: string;
  avatar: string;
}
export interface TeamMembership {
  profile: TeamProfile;
  team_data: TeamData;
  role: 'admin' | 'member';
}

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
  linkedIn: string;
  github_last_checked?: string | null;
  open_to_opportunities: boolean;
  working_remotely: boolean;
  onboarded: boolean;
  email: string;
  email_verified?: boolean;
  website: string;
  full_name?: string;
  credentials_count?: number;
  is_recruiter: boolean;
  how_did_you_find_us: string;
  location: string;
  privacy_consent?: boolean;
  followers_count?: number;
  lens_id?: string;
  lens_handle?: string;
  cover?: string;
  title?: string;
  team_membership: TeamMembership;
}

interface LensProfile {
  handle: string;
  id: string;
  name: string;
  picture: { original: { url: string } };
  ownedBy: string;
}

export interface MutualFollowers {
  items: LensProfile[];
  pageInfo: Record<'totalCount', string>;
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
    avatar: string;
    ens_name: string;
    username: string;
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
    avatar: string;
    username: string;
    ens_name: string;
  };
  posted_at: string;
  title: string;
  background_image: string;
  preview: string;
  url: string;
  source: 'mirror' | 'gm';
}

export type FCWithClassName<P = {}> = FC<P & { className?: string }>;

export type BadgeIssuer =
  | 'mazury'
  | 'poap'
  | 'buildspace'
  | 'gitpoap'
  | 'sismo'
  | 'kudos'
  | '101';

export type FilterType =
  | 'Mazury'
  | 'POAP'
  | 'GitPOAP'
  | 'Buildspace'
  | 'Sismo'
  | '101'
  | 'Kudos'
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

export type CredentialCount = {
  total: number;
  mazury: number;
  poap: number;
  buildspace: number;
  kudos: number;
  gitpoap: number;
  '101': number;
  sismo: number;
};

export interface CredentialsCount {
  credentials: {
    101: string;
    buildspace: string;
    gitpoap: string;
    kudos: string;
    mazury: string;
    poap: string;
    sismo: string;
    total: string;
  };
  posts: {
    total: string;
  };
}

export interface LensPublication {
  items: {
    id: string;
    metadata: { content: string; name: string };
    stats: {
      totalAmountOfCollects: string;
      totalAmountOfComments: string;
      totalAmountOfMirrors: string;
      totalDownvote: string;
      totalUpvotes: string;
    };
  }[];
}

export type ProjectProfileStatus =
  | 'contacted'
  | 'uncontacted'
  | 'toBeContacted';

export interface ProjectProfile {
  avatar: string;
  eth_address: string;
  status: ProjectProfileStatus;
  title: string;
  location: string;
  comments: string;
  followers: string;
  twitter: string;
  lens_handle: string;
  github: string;
  username: string;
  followers_count: number;
  mazury_talent_verified: true;
}

export interface Project {
  created_at: string;
  updated_at: string;
  id: string;
  name: string;
  owner: {
    eth_address: string;
    username: string;
    avatar: string;
    mazury_talent_verified: false;
  };
  saved_profiles_preview: ProjectProfile[];
  saved_profiles_preview_count: number;
  already_in_project: boolean;
  opportunity_id: string;
}

export interface OpportunityType<T> {
  id: string;
  type: 'job' | 'other';
  work_mode: 'remote' | 'hybrid' | 'on-site';
  job_category:
    | 'frontend_engineer'
    | 'backend_engineer'
    | 'full_stack_engineer'
    | 'android_engineer'
    | 'ios_engineer'
    | 'product_designer'
    | 'product_manager'
    | 'finance'
    | 'recruiter'
    | 'business_development'
    | 'sales'
    | 'marketing'
    | 'community'
    | 'other';
  title: string;
  location: string;
  website: string;
  salary: string;
  description: string;
  published: boolean;
  company_info: T;
  project: string;
  can_edit: boolean;
  applicants_count: number;
}

export interface CompanyType {
  id: string;
  name: string;
  size: string;
  logo: string;
  description: string;
  contact_email: string;
}

export type TeamPlans =
  | 'talent'
  | 'non_paying_recruiter'
  | 'individual_recruiter'
  | 'team'
  | 'enterprise';

export interface PlanFeature {
  id: string;
  line: string;
}

export interface PricingPlan {
  id: string;
  created_at: string;
  updated_at: string;
  product_id: string;
  name: string;
  description: string;
  price: {
    id: string;
    price_id: string;
    unit_amount: string;
    currency: string;
  };
}
