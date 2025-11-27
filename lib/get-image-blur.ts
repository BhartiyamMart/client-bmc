import path from 'node:path';
import fs from 'node:fs/promises';

import { getPlaiceholder } from 'plaiceholder';

export async function getImageWithBlur(src: string) {
  try {
    const buffer = await fs.readFile(path.join(process.cwd(), 'public', src));
    const { base64 } = await getPlaiceholder(buffer, { size: 10 });
    return {
      src,
      blurDataURL: base64,
    };
  } catch (error) {
    return {
      src,
      blurDataURL: undefined,
    };
  }
}
