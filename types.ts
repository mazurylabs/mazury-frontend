export type ColorName = 'purple' | 'pink' | 'green' | 'brown' | 'lemon' | 'white' | 'black';

export interface Color {
  name: ColorName;
  hex: string;
}

export type ProfileSections = 'Activity' | 'Badges' | 'Referrals' | 'Blog posts' | 'DAOs';