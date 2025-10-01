// src/components/icons.tsx
import {
  IconAlertTriangle,
  IconArrowRight,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconCommand,
  IconCreditCard,
  IconFile,
  IconFileText,
  IconHelpCircle,
  IconPhoto,
  IconDeviceLaptop,
  IconLayoutDashboard,
  IconLoader2,
  IconLogin,
  IconProps,
  IconShoppingBag,
  IconMoon,
  IconDotsVertical,
  IconPizza,
  IconPlus,
  IconSettings,
  IconSun,
  IconTrash,
  IconBrandTwitter,
  IconUser,
  IconUserCircle,
  IconUserEdit,
  IconUserX,
  IconX,
  IconLayoutKanban,
  IconBrandGithub,
  IconTrophy,
  IconCode,
  IconMedal
} from '@tabler/icons-react';

export type Icon = React.ComponentType<IconProps>;

/**
 * Centralized icon registry for nav, CmdK, and UI components.
 * Extend this whenever new icons are needed.
 */
export const Icons = {
  // Core
  dashboard: IconLayoutDashboard,
  logo: IconCommand,
  login: IconLogin,
  close: IconX,
  spinner: IconLoader2,
  settings: IconSettings,
  billing: IconCreditCard,

  // Users
  user: IconUser,
  user2: IconUserCircle,
  userPen: IconUserEdit,
  employee: IconUserX,

  // Navigation
  chevronLeft: IconChevronLeft,
  chevronRight: IconChevronRight,
  arrowRight: IconArrowRight,
  ellipsis: IconDotsVertical,

  // Content
  product: IconShoppingBag,
  post: IconFileText,
  page: IconFile,
  media: IconPhoto,

  // Actions
  add: IconPlus,
  trash: IconTrash,
  warning: IconAlertTriangle,
  check: IconCheck,

  // Dashboard Extras
  leaderboard: IconTrophy,
  codewars: IconCode, // 🆕 Specific icon for Codewars
  competition: IconMedal, // 🆕 More meaningful than generic "add"

  // Themes
  sun: IconSun,
  moon: IconMoon,
  laptop: IconDeviceLaptop,

  // Fun / Misc
  pizza: IconPizza,

  // Brands
  github: IconBrandGithub,
  twitter: IconBrandTwitter,
  help: IconHelpCircle
} as const;

export type IconName = keyof typeof Icons;
