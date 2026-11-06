import {mkdir, copyFile} from 'node:fs/promises';
import {rootUrl} from './utils.mjs';

export const fontFiles = [
  'S-CoreDream-4Regular.woff',
  'S-CoreDream-5Medium.woff',
  'S-CoreDream-6Bold.woff',
  'S-CoreDream-7ExtraBold.woff',
  'S-CoreDream-9Black.woff',
  'LICENSE.txt',
];

export async function copySiteFonts() {
  const source = rootUrl('../assets/fonts/s-core-dream/');
  const target = rootUrl('dist/assets/fonts/s-core-dream/');
  await mkdir(target, {recursive: true});
  for (const file of fontFiles) await copyFile(new URL(file, source), new URL(file, target));
}
