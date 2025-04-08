export interface User {
  id: string;
  email: string;
  subscription_tier: 'free' | 'premium';
  token_balance: number;
}

export interface MarketData {
  id: string;
  asset: string;
  timestamp: string;
  value: Record<string, any>;
}

export interface Alert {
  id: string;
  user_id: string;
  trigger: string;
  status: 'active' | 'triggered' | 'disabled';
}