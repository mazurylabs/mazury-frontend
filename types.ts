export type ColorName = 'purple' | 'pink' | 'green' | 'brown' | 'lemon' | 'white' | 'black';

export interface Color {
  name: ColorName;
  hex: string;
}

export type ProfileSection = 'Activity' | 'Badges' | 'Referrals' | 'Blog posts' | 'DAOs';