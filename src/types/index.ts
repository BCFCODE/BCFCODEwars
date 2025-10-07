import type { IconName } from '@/components/icons';

export interface NavItem {
  title: string;
  url: string;
  icon: IconName;
  shortcut?: string[];
  isActive?: boolean;
  items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export { type UsersTableData } from './users-table';

export { type CodewarsTableData } from './codewars-table';

export type TableTab = 'codewars' | 'users';

export {
  type CodewarsProfileData,
  codewarsProfileDataSchema,
  type isConnectedToCodewars,
  isConnectedToCodewarsSchema
} from './codewars-profile';

export { type Kata, kataSchema } from './codewars-katas';

export {
  type CodeChallenge,
  CodeChallengeSchema,
  type recentlySolvedKata,
  recentlySolvedKataSchema
} from './codewars-code-challenge';

export {
  type CodewarsUser,
  CodewarsUserSchema,
  type CodewarsApiUser,
  CodewarsApiSchema
} from './codewars-user';
