import { openDB } from 'idb';

const initdb = async () =>
  openDB('nate_db', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('nate_store')) {
        console.log('This datbase alreayd exists');
        return;
      }
      db.createObjectStore('nate_store', { keyPath: 'id', autoIncrement: true });
      console.log('Created the database');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB('nate_db', 1);
  const tx = db.transaction('nate_store', 'readwrite');
  const store = tx.objectStore('nate_store');
  const result = await store.put({ id: 1, value: content });
  await tx.complete;
  console.log("putDb result: ", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('nate_db', 1);
  const tx = db.transaction('nate_store', 'readonly');
  const store = tx.objectStore('nate_store');
  const text = await store.get(1);
  console.log("getDb result: ", text);
  await tx.done;
  console.log("getDb result: ", text.value);
  return text.value;
};

initdb();