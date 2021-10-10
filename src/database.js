import Dexie from 'dexie';

const db = new Dexie('sessionTools');

db.version(1).stores({
  session_notes: '++id,date,title',
  characters: '++id,name,type',
});

const characterSchema = {
  id: 'int',
  name: 'string',
  type: 'ENUM',
  bio: 'text',
  voice: 'json',
  gender: 'enum',
  race: 'string',
  goals: 'string',
  friendly: 'string',
  unfriendly: '',
};

const notesSchema = {
  id: 'int',
  date: 'date',
  title: 'string',
  notes: 'text',
}

db.on('populate', async () => {
  await db.characters.bulkAdd([
    {
      name: 'Atlantis Moreset',
      type: 'PC',
      bio: '',
      gender: 'Female',
      race: 'Dwarf',
    },
    {
      name: 'Cirduil Elethod',
      type: 'PC',
      bio: '',
      gender: 'Male',
      race: 'Half-elf',
    },
    {
      name: 'Elnia Deepdelver',
      type: 'PC',
      bio: '',
      gender: 'Female',
      race: 'Dwarf',
    },
  ])
});

export default db;
