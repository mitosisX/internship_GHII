import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("a3.db");

export function CreateTable() {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Repos (id INTEGER PRIMARY KEY AUTOINCREMENT, fullName TEXT, isPrivate TEXT, login TEXT, avatarURL TEXT, type TEXT, description TEXT);"
    );
  });

  console.log("Table has been created!");
}

export function InsertData(data) {
  db.transaction((tx) => {
    // tx.executeSql("INSERT INTO Repos (id) VALUES (?);", [1]);
    tx.executeSql(
      "INSERT INTO Repos (fullName, isPrivate, login, avatarURL, type, description) VALUES (?, ?, ?, ?, ?, ?);",
      data
    );
    // ("CREATE TABLE IF NOT EXISTS Repos (id INTEGER PRIMARY KEY AUTOINCREMENT, fullName TEXT, isPrivate BOOLEAN, login TEXT, avatarURL TEXT, type TEXT, description TEXT);");

    // console.log(fullName, private_, login, avatar_url, type, description);

    console.log("Data inserted");
  });
}

export function getAllData(callback) {
  db.transaction((tx) => {
    tx.executeSql("SELECT * FROM Repos;", [], (_, { rows }) => {
      const data = rows._array; // Extract data from the result set
      callback(data);
    });
  });
}

export function DeleteItemById(id) {
  db.transaction((tx) => {
    tx.executeSql("DELETE FROM Repos WHERE id = ?;", [id], (_, result) => {});
    console.log("DELETED item");
  });
}
