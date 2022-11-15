import {
  openDatabase,
  enablePromise,
  type SQLiteDatabase,
} from 'react-native-sqlite-storage';

export async function queryTables() {
  const db = await SQLiteConnection();

  const sql = "SELECT tbl_name FROM sqlite_schema WHERE type ='table';";

  const result = await db.executeSql(sql);

  return result[0].rows.raw();
}

export async function queryDataFromTable(tbl_name: string) {
  const db = await SQLiteConnection();

  const sql = `SELECT * FROM ${tbl_name}`;
  const result = await db.executeSql(sql);

  return result[0].rows.raw();
}

export async function queryRelations() {
  const tables = await queryTables();

  for (const tbl_name of tables) {
    console.log(await queryDataFromTable(tbl_name));
  }
}

export async function SQLiteConnection(): Promise<SQLiteDatabase> {
  enablePromise(true);

  return await openDatabase({
    name: 'main.db',
    createFromLocation: 'Documents/main.db',
    location: 'Documents',
  });
}
