type IconStates = Record<'active' | 'inactive', string>;

export interface SettingsCardProps {
  title: string;
  links: string[];
}

export interface SettingsLinkProps extends SettingsCardProps {}

export interface SettingsLayoutProps {
  content?: React.ReactNode;
}
