const fs = require('fs');

const FILE_IN = './diff-status-files.txt';

const changedFilesRaw = fs.readFileSync(FILE_IN, 'utf-8');

console.log(changedFilesRaw);

const listFilesWithStatusRaw = changedFilesRaw.split(/\r\n|\r|\n|\t/);

console.log(listFilesWithStatusRaw);

let isControllerUpserted = false;
let isSwaggerUpserted = false;

for (const fileWithStatusRaw of listFilesWithStatusRaw) {
  if (fileWithStatusRaw.includes('src/Controller')) {
    isControllerUpserted = true;
  }

  if (fileWithStatusRaw.includes('swagger.yaml')) {
    isSwaggerUpserted = true;
  }
}

if (isControllerUpserted && !isSwaggerUpserted) {
  console.error('Please update the swagger with new API data');
  process.exit(1);
}
