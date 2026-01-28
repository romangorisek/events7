import * as fs from 'fs';
import * as path from 'path';

export default () => {
  const dataDir = path.join(__dirname, '..', 'data');
  const dataTmpDir = path.join(__dirname, '..', 'data_tmp');

  if (!fs.existsSync(dataTmpDir)) {
    fs.mkdirSync(dataTmpDir);
  }

  if (fs.existsSync(dataDir)) {
    fs.readdirSync(dataDir).forEach((file) => {
      if (file.startsWith('db.')) {
        fs.renameSync(path.join(dataDir, file), path.join(dataTmpDir, file));
      }
    });
  }
};
