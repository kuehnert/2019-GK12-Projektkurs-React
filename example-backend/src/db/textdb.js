const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const samplePath = path.join(__dirname, 'sampleDB.json');
const dbPath = path.join('.', 'dbdata', 'peopleDB.json');

const safeAttributes = [
  'name',
  'height',
  'mass',
  'hair_color',
  'skin_color',
  'eye_color',
  'birth_year',
  'gender',
  'homeworld',
];

if (!fs.existsSync(dbPath)) {
  // fs.copyFileSync(samplePath, dbPath);
  const peopleData = JSON.parse(fs.readFileSync(samplePath));

  const cleanedData = peopleData.map((p, i) => {
    p = _.pick(p, safeAttributes);
    p['id'] = i;
    return p;
  });

  fs.writeFileSync(dbPath, JSON.stringify(cleanedData));
}

const peopleData = fs.readFileSync(dbPath);
const people = JSON.parse(peopleData);
let nextID = Math.max.apply(Math, people.map(p => p.id)) + 1;
console.log('nextID', nextID);

function saveDB() {
  fs.writeFileSync(dbPath, JSON.stringify(people));
}

function getAll() {
  return people;
}

function getById(id) {
  const index = people.find(p => p.id === id);
  return people[id];
}

function create(data) {
  const cleanedData = _.pick(data, safeAttributes);
  cleanedData.id = nextID++;
  people.push(cleanedData);
  saveDB();
}

module.exports = { getAll, getById, create };
