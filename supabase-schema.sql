-- Run this in your Supabase SQL editor

CREATE TABLE files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  file_name TEXT NOT NULL,
  uploader_name TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON files FOR SELECT USING (true);
CREATE POLICY "Public insert" ON files FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete" ON files FOR DELETE USING (true);
