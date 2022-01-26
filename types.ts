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

interface PersonBasicDetails {
  eth_address: string;
  ens_name: string;
  username: string;
  avatar: string;
}

interface BadgeType {
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

export interface Profile {
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
  frontendDev: number;
  backendDev: number;
  smartContractDev: number;
  protocolDev: number;
  design: number;
  growthMarketing: number;
  writing: number;
  productManagement: number;
  proejctManagement: number;
  dataScience: number;
  art: number;
  defiDegen: number;
  nftDegen: number;
  teaching: number;
  memes: number;
  community: number;
  signing_nonce: number;
  verified: boolean;
  github: string;
  twitter: string;
  github_last_checked: string;
  open_to_opportunities: boolean;
  role_developer: boolean;
  role_designer: boolean;
  role_trader: boolean;
  role_creator: boolean;
  role_researcher: boolean;
  role_investor: boolean;
  role_community_manager: boolean;
  onboarded: boolean;
  email: string;
  website: string;
}
