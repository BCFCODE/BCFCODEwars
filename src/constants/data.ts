// nav-config.ts
import { NavItem } from '@/types';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'Codewars',
    url: '/dashboard/profile/codewars',
    icon: 'codewars', // 🆕 instead of "userPen"
    isActive: false,
    shortcut: ['c', 'c'],
    items: [
      {
        title: 'Competition',
        url: '/dashboard/recently-solved-history',
        icon: 'competition', // 🆕 instead of "add"
        shortcut: ['l', 'u']
      }
    ]
  },
  {
    title: 'Leaderboard',
    url: '/dashboard/leaderboard',
    icon: 'leaderboard',
    shortcut: ['l', 'l'],
    isActive: false,
    items: [
      {
        title: 'Users',
        url: '/dashboard/leaderboard/users',
        icon: 'user',
        shortcut: ['l', 'u']
      },
      {
        title: 'Codewars',
        url: '/dashboard/leaderboard/codewars',
        icon: 'check',
        shortcut: ['c', 'c']
      }
    ]
  },
  {
    title: 'Account',
    url: '/dashboard/profile',
    icon: 'billing',
    isActive: true,
    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'userPen',
        shortcut: ['m', 'm']
      }
    ]
  }
];
