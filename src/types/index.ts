import { Icons } from '@/components/icons';

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
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
