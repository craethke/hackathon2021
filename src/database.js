import { JSONFileSync, LowSync } from 'lowdb';

const databaseFile = 'locationDatabase.json';
const db = new LowSync(new JSONFileSync(databaseFile));

db.read();
db.data = db.data || { locations: [] };

export const getLocations = () => {
  return db.data.locations;
};

export const saveLocation = (location) => {
  db.data.locations.push(location);
  db.write();
};
