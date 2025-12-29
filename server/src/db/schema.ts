import { initDatabase } from './index.js';

async function main() {
  console.log('Initializing database...');
  await initDatabase();
  console.log('Database initialized successfully!');
  process.exit(0);
}

main().catch((err) => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
