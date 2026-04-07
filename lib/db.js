import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'digibday.db');
const db = new Database(dbPath);

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS wishes (
    id TEXT PRIMARY KEY,
    gift_type TEXT,
    theme_color TEXT,
    recipient_name TEXT,
    message_type TEXT,
    message TEXT,
    music_choice TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS donations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export default db;
