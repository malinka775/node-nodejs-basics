import fs from 'fs/promises';

export const isDestinationExisting = async (path) => {
  try {
      const stats = await fs.stat(path);
      return stats;
  } catch {
      return false;
  }
}

export const FS_ERROR_TEXT = 'FS operation failed';
