import * as fs from 'fs';
import * as path from 'path';

export default () => {
  const dataDir = path.join(__dirname, '..', 'data');
  const dataTmpDir = path.join(__dirname, '..', 'data_tmp');

  if (fs.existsSync(dataDir)) {
    fs.readdirSync(dataDir).forEach((file) => {
      if (file.startsWith('db.')) {
        fs.unlinkSync(path.join(dataDir, file));
      }
    });
  }

  if (fs.existsSync(dataTmpDir)) {
    fs.readdirSync(dataTmpDir).forEach((file) => {
      if (file.startsWith('db.')) {
        fs.renameSync(path.join(dataTmpDir, file), path.join(dataDir, file));
      }
    });
    fs.rmSync(dataTmpDir, { recursive: true, force: true });
  }
};
