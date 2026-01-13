// types/settings.ts

export interface ReturnProcessStep {
  title: string;
  description: string;
}

export interface TermsSection {
  number: number;
  title: string;
  content: string;
}

export interface PublicSettings {
  razorpayEnabled: boolean;
  razorpayKeyId: string;
  cashOnDeliveryEnabled: boolean;
  contactNumber: string;
  contactEmail: string;
  companyAddress: string;
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  footerText: string;
  footerLinks: Array<{
    name: string;
    url: string;
  }>;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  maintenanceMode: boolean;
  metaKeywords: string[];
  googleAnalyticsId: string;
  
  // Shipping Settings
  shippingInfo: string;
  orderProcessingTime: string;
  standardShippingDelivery: string;
  standardShippingCost: string;
  standardFreeShippingThreshold: string;
  expressShippingDelivery: string;
  expressShippingCost: string;
  expressFreeShippingThreshold: string;
  overnightShippingDelivery: string;
  overnightShippingCost: string;
  internationalShippingDelivery: string;
  internationalShippingNote: string;
  
  // Returns & Refunds Policy Settings
  returnsPolicyTitle: string;
  returnsPolicyDescription: string;
  returnProcessSteps: ReturnProcessStep[];
  returnTimeframe: string;
  returnConditions: string[];
  customerShippingResponsibility: string;
  nonReturnableItems: string[];
  defectiveItemsNote: string;
  refundProcessingTime: string;
  refundNote: string;
  refundAmountFormula: string;
  refundAmountDescription: string;
  exchangePolicy: string;
  
  // Privacy Policy Settings
  privacyPolicyTitle: string;
  privacyPolicyLastUpdated: string;
  privacyPolicyEffectiveImmediately: boolean;
  privacyPolicyIntroduction: string;
  dataWeCollect: string[];
  howWeUseInformation: string[];
  privacyIntroductionSection: string;
  informationWeCollectSection: string;
  howWeUseInformationSection: string;
  dataSecuritySection: string;
  dataProtectionRightsSection: string;
  contactUsSection: string;
  dataProtectionRightsList: string[];
  securityMeasuresSection: string;
  
  // Terms of Service Settings - NEW
  termsOfServiceTitle: string;
  termsOfServiceLastUpdated: string;
  termsImportantNotice: string;
  termsUserRequirements: string[];
  termsSections: TermsSection[];
  termsIntellectualProperty: string;
  termsLimitationLiability: string;
  termsChangesNotice: string;
  termsContactInfo: string;
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

export interface SettingsFormData {
  razorpayEnabled: boolean;
  razorpayKeyId: string;
  cashOnDeliveryEnabled: boolean;
  contactNumber: string;
  contactEmail: string;
  companyAddress: string;
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  footerText: string;
  footerLinks: Array<{
    name: string;
    url: string;
  }>;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  maintenanceMode: boolean;
  metaKeywords: string[];
  googleAnalyticsId: string;
  
  // Shipping Settings
  shippingInfo: string;
  orderProcessingTime: string;
  standardShippingDelivery: string;
  standardShippingCost: string;
  standardFreeShippingThreshold: string;
  expressShippingDelivery: string;
  expressShippingCost: string;
  expressFreeShippingThreshold: string;
  overnightShippingDelivery: string;
  overnightShippingCost: string;
  internationalShippingDelivery: string;
  internationalShippingNote: string;
  
  // Returns & Refunds Policy Settings
  returnsPolicyTitle: string;
  returnsPolicyDescription: string;
  returnProcessSteps: ReturnProcessStep[];
  returnTimeframe: string;
  returnConditions: string[];
  customerShippingResponsibility: string;
  nonReturnableItems: string[];
  defectiveItemsNote: string;
  refundProcessingTime: string;
  refundNote: string;
  refundAmountFormula: string;
  refundAmountDescription: string;
  exchangePolicy: string;
  
  // Privacy Policy Settings
  privacyPolicyTitle: string;
  privacyPolicyLastUpdated: string;
  privacyPolicyEffectiveImmediately: boolean;
  privacyPolicyIntroduction: string;
  dataWeCollect: string[];
  howWeUseInformation: string[];
  privacyIntroductionSection: string;
  informationWeCollectSection: string;
  howWeUseInformationSection: string;
  dataSecuritySection: string;
  dataProtectionRightsSection: string;
  contactUsSection: string;
  dataProtectionRightsList: string[];
  securityMeasuresSection: string;
  
  // Terms of Service Settings - NEW
  termsOfServiceTitle: string;
  termsOfServiceLastUpdated: string;
  termsImportantNotice: string;
  termsUserRequirements: string[];
  termsSections: TermsSection[];
  termsIntellectualProperty: string;
  termsLimitationLiability: string;
  termsChangesNotice: string;
  termsContactInfo: string;
}

export interface SettingsState extends PublicSettings {
  loading: boolean;
  saving: boolean;
  error: string | null;
}

// Individual settings interfaces for API methods
export interface ShippingSettings {
  shippingInfo: string;
  orderProcessingTime: string;
  standardShippingDelivery: string;
  standardShippingCost: string;
  standardFreeShippingThreshold: string;
  expressShippingDelivery: string;
  expressShippingCost: string;
  expressFreeShippingThreshold: string;
  overnightShippingDelivery: string;
  overnightShippingCost: string;
  internationalShippingDelivery: string;
  internationalShippingNote: string;
}

export interface ReturnsPolicySettings {
  returnsPolicyTitle: string;
  returnsPolicyDescription: string;
  returnProcessSteps: ReturnProcessStep[];
  returnTimeframe: string;
  returnConditions: string[];
  customerShippingResponsibility: string;
  nonReturnableItems: string[];
  defectiveItemsNote: string;
  refundProcessingTime: string;
  refundNote: string;
  refundAmountFormula: string;
  refundAmountDescription: string;
  exchangePolicy: string;
}

export interface PrivacyPolicySettings {
  privacyPolicyTitle: string;
  privacyPolicyLastUpdated: string;
  privacyPolicyEffectiveImmediately: boolean;
  privacyPolicyIntroduction: string;
  dataWeCollect: string[];
  howWeUseInformation: string[];
  privacyIntroductionSection: string;
  informationWeCollectSection: string;
  howWeUseInformationSection: string;
  dataSecuritySection: string;
  dataProtectionRightsSection: string;
  contactUsSection: string;
  dataProtectionRightsList: string[];
  securityMeasuresSection: string;
}

export interface TermsOfServiceSettings {
  termsOfServiceTitle: string;
  termsOfServiceLastUpdated: string;
  termsImportantNotice: string;
  termsUserRequirements: string[];
  termsSections: TermsSection[];
  termsIntellectualProperty: string;
  termsLimitationLiability: string;
  termsChangesNotice: string;
  termsContactInfo: string;
}