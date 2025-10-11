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
    url: '/dashboard/codewars',
    icon: 'codewars',
    isActive: false,
    shortcut: ['c', 'c'],
    items: [
      {
        title: 'Champions',
        url: '/dashboard/codewars/champions',
        icon: 'champions',
        shortcut: ['l', 'u']
      },
      {
        title: 'Connect',
        url: '/dashboard/codewars/connect',
        icon: 'link',
        shortcut: ['c', 'l']
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

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];
