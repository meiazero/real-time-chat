-- init.sql

-- Create users table if not exists
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  avatar VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create guilds table if not exists
CREATE TABLE IF NOT EXISTS guilds (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  owner VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner) REFERENCES users(id)
);

-- Create guild_members table if not exists (junction table for many-to-many relationship between guilds and users)
CREATE TABLE IF NOT EXISTS guild_members (
  guild_id VARCHAR(255),
  user_id VARCHAR(255),
  PRIMARY KEY (guild_id, user_id),
  FOREIGN KEY (guild_id) REFERENCES guilds(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create text_channels table if not exists
CREATE TABLE IF NOT EXISTS text_channels (
  id VARCHAR(255) PRIMARY KEY,
  guild_id VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (guild_id) REFERENCES guilds(id)
);

-- Create messages table if not exists
CREATE TABLE IF NOT EXISTS messages (
  id VARCHAR(255) PRIMARY KEY,
  content TEXT NOT NULL,
  author VARCHAR(255),
  channel VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author) REFERENCES users(id),
  FOREIGN KEY (channel) REFERENCES text_channels(id)
);