// Entry point: assembles pages from ./pages and renders them with ./components.
import {writeFile, mkdir, copyFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {pages as commerce} from './integrated-commerce.mjs';
import {pages as expertise} from './integrated-expertise.mjs';
import {homePage} from './pages/home.mjs';
import {createSupportPage} from './pages/support.mjs';
import {renderDocument} from './components/document.mjs';
import {loadCompany, rootUrl} from './components/utils.mjs';

const company = await loadCompany();
export const pages = [homePage, ...expertise, ...commerce, createSupportPage(company)];

export async function writeIntegratedSite() {
  const out = rootUrl('dist/integrated/');
  await mkdir(out, {recursive: true});
  for (const ext of ['css', 'js']) await copyFile(rootUrl(`integrated-site.${ext}`), new URL(`integrated-site.${ext}`, out));
  for (const page of pages) await writeFile(new URL(page.file, out), renderDocument(page, company));
  console.log(`Integrated: ${pages.length} pages → dist/integrated/`);
}
if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) await writeIntegratedSite();
