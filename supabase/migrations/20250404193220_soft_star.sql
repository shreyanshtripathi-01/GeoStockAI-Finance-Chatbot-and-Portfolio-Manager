/*
  # Initial Schema Setup for GeoStock AI

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `subscription_tier` (text)
      - `token_balance` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `market_data`
      - `id` (uuid, primary key)
      - `asset` (text)
      - `timestamp` (timestamp)
      - `value` (jsonb)
      - `created_at` (timestamp)
    
    - `alerts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `trigger` (text)
      - `status` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  subscription_tier text NOT NULL DEFAULT 'free',
  token_balance integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_subscription CHECK (subscription_tier IN ('free', 'premium'))
);

-- Create market_data table
CREATE TABLE IF NOT EXISTS market_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset text NOT NULL,
  timestamp timestamptz NOT NULL,
  value jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  trigger text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('active', 'triggered', 'disabled'))
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can read market data"
  ON market_data
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can read own alerts"
  ON alerts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own alerts"
  ON alerts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own alerts"
  ON alerts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();