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
let people = JSON.parse(peopleData);
let nextID =
  Math.max.apply(
    Math,
    people.map(p => p.id)
  ) + 1;
console.log('nextID', nextID);

function saveDB() {
  fs.writeFileSync(dbPath, JSON.stringify(people));
}

function getAll() {
  return people;
}

function getById(id) {
  console.log('id', id, typeof id);
  const index = people.findIndex(p => p.id === id);
  console.log('index', index);

  if (index > -1) {
    return people[index];
  } else {
    return null;
  }
}

function create(data) {
  const cleanedData = _.pick(data, safeAttributes);
  cleanedData.id = nextID++;
  people.push(cleanedData);
  saveDB();
}

function remove(id) {
  const target = getById(id);
  if (target != null) {
    // target ist weder null noch undefined
    people = people.filter(p => p !== target);
    saveDB();
    return true;
  } else {
    return false;
  }
}

module.exports = { getAll, getById, create, remove };
