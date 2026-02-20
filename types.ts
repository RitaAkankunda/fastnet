
export interface Package {
  id: string;
  name: string;
  price: number;
  duration: string;
  uptime: string;
  description: string;
}

export interface PortalSettings {
  networkName: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  currency: string;
  showVoucher: boolean;
  backendUrl: string;
}

export enum Tab {
  PREVIEW = 'preview',
  BUILDER = 'builder',
  SCRIPTS = 'scripts',
  PAYMENTS = 'payments',
  GUIDE = 'guide'
}
