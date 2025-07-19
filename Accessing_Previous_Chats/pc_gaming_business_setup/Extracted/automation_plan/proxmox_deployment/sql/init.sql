
-- Initialize database for investor website with NextAuth.js schema
-- Based on @auth/pg-adapter schema requirements

-- Create database user if not exists (for manual setup)
-- DO $$ 
-- BEGIN
--     IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'investor_user') THEN
--         CREATE ROLE investor_user LOGIN PASSWORD 'secure_password_change_me';
--     END IF;
-- END
-- $$;

-- Grant necessary permissions
-- GRANT ALL PRIVILEGES ON DATABASE investor_db TO investor_user;

-- NextAuth.js required tables for @auth/pg-adapter
CREATE TABLE IF NOT EXISTS verification_token (
    identifier TEXT NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    token TEXT NOT NULL,
    PRIMARY KEY (identifier, token)
);

CREATE TABLE IF NOT EXISTS accounts (
    id SERIAL,
    "userId" INTEGER NOT NULL,
    type VARCHAR(255) NOT NULL,
    provider VARCHAR(255) NOT NULL,
    "providerAccountId" VARCHAR(255) NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at BIGINT,
    id_token TEXT,
    scope TEXT,
    session_state TEXT,
    token_type TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL,
    "userId" INTEGER NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    "sessionToken" VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL,
    name VARCHAR(255),
    email VARCHAR(255),
    "emailVerified" TIMESTAMPTZ,
    image TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- Create indexes for performance
CREATE UNIQUE INDEX IF NOT EXISTS accounts_provider_providerAccountId_key 
    ON accounts(provider, "providerAccountId");
CREATE INDEX IF NOT EXISTS accounts_userId_idx ON accounts("userId");
CREATE UNIQUE INDEX IF NOT EXISTS sessions_sessionToken_key ON sessions("sessionToken");
CREATE INDEX IF NOT EXISTS sessions_userId_idx ON sessions("userId");
CREATE UNIQUE INDEX IF NOT EXISTS users_email_key ON users(email);

-- Additional tables for investor-specific functionality
CREATE TABLE IF NOT EXISTS investor_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    investor_type VARCHAR(50) DEFAULT 'individual', -- 'individual', 'institutional', 'accredited'
    investment_experience VARCHAR(50) DEFAULT 'beginner', -- 'beginner', 'intermediate', 'advanced'
    risk_tolerance VARCHAR(50) DEFAULT 'moderate', -- 'conservative', 'moderate', 'aggressive'
    investment_goals TEXT,
    annual_income_range VARCHAR(50),
    net_worth_range VARCHAR(50),
    accredited_investor BOOLEAN DEFAULT FALSE,
    kyc_verified BOOLEAN DEFAULT FALSE,
    kyc_verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS investment_opportunities (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100), -- 'gaming', 'esports', 'tech', 'entertainment'
    minimum_investment DECIMAL(15,2),
    target_amount DECIMAL(15,2),
    current_amount DECIMAL(15,2) DEFAULT 0,
    expected_return DECIMAL(5,2), -- percentage
    investment_period_months INTEGER,
    risk_level VARCHAR(50) DEFAULT 'moderate',
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'funded', 'closed', 'draft'
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_investments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    opportunity_id INTEGER NOT NULL REFERENCES investment_opportunities(id) ON DELETE CASCADE,
    amount DECIMAL(15,2) NOT NULL,
    investment_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled'
    transaction_id VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gaming_metrics (
    id SERIAL PRIMARY KEY,
    opportunity_id INTEGER REFERENCES investment_opportunities(id) ON DELETE CASCADE,
    metric_name VARCHAR(100) NOT NULL, -- 'daily_active_users', 'revenue', 'downloads', etc.
    metric_value DECIMAL(15,2),
    metric_date DATE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for investor tables
CREATE INDEX IF NOT EXISTS investor_profiles_user_id_idx ON investor_profiles(user_id);
CREATE INDEX IF NOT EXISTS investment_opportunities_category_idx ON investment_opportunities(category);
CREATE INDEX IF NOT EXISTS investment_opportunities_status_idx ON investment_opportunities(status);
CREATE INDEX IF NOT EXISTS user_investments_user_id_idx ON user_investments(user_id);
CREATE INDEX IF NOT EXISTS user_investments_opportunity_id_idx ON user_investments(opportunity_id);
CREATE INDEX IF NOT EXISTS gaming_metrics_opportunity_id_idx ON gaming_metrics(opportunity_id);
CREATE INDEX IF NOT EXISTS gaming_metrics_date_idx ON gaming_metrics(metric_date);

-- Insert sample data for development
INSERT INTO investment_opportunities (title, description, category, minimum_investment, target_amount, expected_return, investment_period_months, risk_level, status, start_date, end_date) VALUES
('Arcade Warriors Mobile Game', 'Revolutionary mobile gaming experience combining classic arcade gameplay with modern monetization strategies', 'gaming', 1000.00, 500000.00, 15.5, 24, 'moderate', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '6 months'),
('Esports Tournament Platform', 'Next-generation platform for organizing and streaming esports tournaments with integrated betting and NFT rewards', 'esports', 5000.00, 2000000.00, 22.0, 36, 'aggressive', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '3 months'),
('VR Gaming Studio Expansion', 'Funding expansion of successful VR gaming studio to develop AAA virtual reality experiences', 'gaming', 2500.00, 1000000.00, 18.5, 30, 'moderate', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '4 months');

-- Grant permissions to application user
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO investor_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO investor_user;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_investor_profiles_updated_at BEFORE UPDATE ON investor_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_investment_opportunities_updated_at BEFORE UPDATE ON investment_opportunities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_investments_updated_at BEFORE UPDATE ON user_investments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
