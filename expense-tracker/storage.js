import fs from 'fs';
import path from 'path';

const DATA_PATH = path.resolve('expenses.json');

const ensureFileExists = () => {
  if (!fs.existsSync(DATA_PATH)) {
    fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
    fs.writeFileSync(DATA_PATH, '[]', 'utf-8');
  }
};

export function loadData() {
  ensureFileExists();
  const data = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(data);
}

export function saveData(data) {
  ensureFileExists();
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}
