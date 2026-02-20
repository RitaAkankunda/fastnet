
import { Package } from './types';

export const PACKAGES: Package[] = [
  {
    id: 'daily',
    name: 'Daily Pass',
    price: 1000,
    duration: '24 Hours',
    uptime: '1d',
    description: 'Perfect for a full day of browsing and streaming.'
  },
  {
    id: '3days',
    name: '3-Day Special',
    price: 2500,
    duration: '72 Hours',
    uptime: '3d',
    description: 'Get more time and save on the daily rate.'
  },
  {
    id: 'weekly',
    name: 'Weekly Pass',
    price: 6000,
    duration: '7 Days',
    uptime: '7d',
    description: 'Our most popular choice for regular users.'
  },
  {
    id: 'monthly',
    name: 'Monthly Premium',
    price: 25000,
    duration: '30 Days',
    uptime: '30d',
    description: 'Ultimate value for heavy internet users.'
  }
];

export const BRAND_COLORS = {
  primary: '#1e3a8a', // blue-900
  secondary: '#facc15', // yellow-400
  accent: '#3b82f6', // blue-500
};
