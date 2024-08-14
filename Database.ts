import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite/next';

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  // await db.execAsync(`DROP TABLE IF EXISTS stories;`);
  const DATABASE_VERSION = 1;
  let { user_version: currentDbVersion } = await db.getFirstAsync<{
    user_version: number;
  }>('PRAGMA user_version');
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(`
  PRAGMA journal_mode = 'wal';
  CREATE TABLE stories (id TEXT PRIMARY KEY NOT NULL, content TEXT NOT NULL, prompt TEXT NOT NULL,  model TEXT NOT NULL, created INTEGER NOT NULL);
  `);
    await db.runAsync(
      'INSERT INTO stories (id, content, prompt, model, created) VALUES (?, ?, ?, ?, ?)',
      '123AAA',
      'hello! this is a sample story',
      'sample prompt',
      'sample model',
      1625812457
    );
    await db.runAsync(
      'INSERT INTO stories (id, content, prompt, model, created) VALUES (?, ?, ?, ?, ?)',
      '345',
      'ola! this is a sample story',
      'sample prompt ola',
      'sample model',
      1625812459
    );
    currentDbVersion = 1;
  }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

function convertUnixTimestampToDate(unixTimestamp) {
  // Convert Unix timestamp to milliseconds
  const date = new Date(unixTimestamp * 1000);

  // Format the date as needed (e.g., to a readable string)
  return date.toLocaleString(); // Example: "7/9/2021, 11:20:57 AM"
}

// Example usage:
const timestamp = 1625812457;
const formattedDate = convertUnixTimestampToDate(timestamp);
console.log(formattedDate);

async function checkDb() {
  const db = await openDatabaseAsync('storytime.db');

  console.log(
    '// `getFirstAsync()` is useful when you want to get a single row from the database.'
  );

  // `getFirstAsync()` is useful when you want to get a single row from the database.
  const firstRow = await db.getFirstAsync('SELECT * FROM stories');
  console.log(firstRow);

  console.log(
    '// `getAllAsync()` is useful when you want to get all results as an array of objects.'
  );
  // `getAllAsync()` is useful when you want to get all results as an array of objects.
  const allRows = await db.getAllAsync('SELECT * FROM stories');
  for (const row of allRows) {
    console.log(row);
  }

  console.log(
    '// `getEachAsync()` is useful when you want to iterate SQLite query cursor.'
  );
  // `getEachAsync()` is useful when you want to iterate SQLite query cursor.
  for await (const row of db.getEachAsync('SELECT * FROM stories')) {
    console.log(row);
  }
}

checkDb();
