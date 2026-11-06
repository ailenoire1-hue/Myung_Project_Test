// Shared helpers for the integrated-site components.
// ESCAPING BOUNDARY: every plain-text value passed to a component is escaped with esc().
// Props whose name ends in "Html" (and page `body` strings) are trusted, developer-authored markup and are NOT escaped.
import {readFile, access} from 'node:fs/promises';

const ESC = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
export const esc = (value) => String(value).replace(/[&<>"']/g, (ch) => ESC[ch]);

// Locate the project root (the directory holding package.json and content.json) by walking up
// from this file, so moving the sources does not break content.json or output paths.
async function findProjectRoot(start) {
  let dir = new URL('./', start);
  for (;;) {
    try {
      await access(new URL('package.json', dir));
      await access(new URL('content.json', dir));
      return dir;
    } catch {
      const parent = new URL('../', dir);
      if (parent.href === dir.href) throw new Error('Project root (package.json + content.json) not found');
      dir = parent;
    }
  }
}

export const projectRoot = await findProjectRoot(import.meta.url);
export const rootUrl = (path) => new URL(path, projectRoot);

export async function loadCompany() {
  const {company} = JSON.parse(await readFile(rootUrl('content.json'), 'utf8'));
  return company;
}
