// types/settings.ts
export interface PublicSettings {
  razorpayEnabled: boolean;
  razorpayKeyId: string;
  cashOnDeliveryEnabled: boolean;
  contactNumber: string;
  contactEmail: string;
  companyAddress: string;
  siteName: string;
  siteTitle: string;
  siteDescription: string; // Add this if missing
  footerText: string;
  footerLinks: Array<{
    name: string;
    url: string;
  }>;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  maintenanceMode: boolean; // Add this
  metaKeywords: string[]; // Add this
  googleAnalyticsId: string; // Add this
}

export interface AdminSettings extends PublicSettings {
  razorpayKeySecret: string;
  updatedBy?: string;
  updatedAt?: Date;
}

export interface SettingsAPIResponse {
  success: boolean;
  message?: string;
  data: PublicSettings | AdminSettings;
}

export interface RazorpayValidationResponse {
  success: boolean;
  message: string;
  valid: boolean;
}