import fs from 'fs/promises';
import { Transform } from 'stream';

export const isDestinationExisting = async (path) => {
  try {
      const stats = await fs.stat(path);
      return stats;
  } catch {
      return false;
  }
}

export const FS_ERROR_TEXT = 'FS operation failed';

export const addNewLineStream = new Transform({
  transform(chunk, encoding, callback) {
      this.push(chunk);
      callback();
  },
  flush(callback) {
      this.push('\n');
      callback();
  }
})
