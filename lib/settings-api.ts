// lib/settings-api.ts
import { AdminSettings, SettingsAPIResponse, RazorpayValidationResponse } from '@/types/settings';

const API_URL = process.env.NEXT_PUBLIC_API_URL ;

export const settingsAPI = {
  // Get public settings (no authentication required)
  getPublicSettings: async (): Promise<SettingsAPIResponse> => {
    try {
      const response = await fetch(`${API_URL}/settings/public`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Public settings response:', data); // Debug
      return data; // Direct response
    } catch (error) {
      console.error('Error fetching public settings:', error);
      throw error;
    }
  },
  
  // Get all settings (admin only)
  getAllSettings: async (): Promise<SettingsAPIResponse> => {
    try {
      // Get token from localStorage or your auth context
      const token = localStorage.getItem('token') || '';
      
      const response = await fetch(`${API_URL}/settings`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('All settings response:', data); // Debug
      return data; // Direct response
    } catch (error) {
      console.error('Error fetching all settings:', error);
      throw error;
    }
  },
  
  // Update settings (admin only)
  updateSettings: async (settingsData: Partial<AdminSettings>): Promise<SettingsAPIResponse> => {
    try {
      // Get token from localStorage or your auth context
      const token = localStorage.getItem('token') || '';
      
      const response = await fetch(`${API_URL}/settings`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settingsData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data; // Direct response
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  },
  
  // Validate Razorpay Key ID (admin only)
  validateRazorpayKey: async (razorpayKeyId: string): Promise<RazorpayValidationResponse> => {
    try {
      // Get token from localStorage or your auth context
      const token = localStorage.getItem('token') || '';
      
      const response = await fetch(`${API_URL}/settings/validate-razorpay`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ razorpayKeyId })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data; // Direct response
    } catch (error) {
      console.error('Error validating razorpay key:', error);
      throw error;
    }
  }
};