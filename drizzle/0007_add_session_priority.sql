-- Add priority field to chatSessions for sales intelligence classification
-- Values: 'hot' | 'warm' | 'low' (default 'low')
ALTER TABLE "chatSessions" ADD COLUMN IF NOT EXISTS "priority" varchar(16) DEFAULT 'low';
