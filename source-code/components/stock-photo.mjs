// Unsplash stock photos: data mapping, <figure> rendering and the explicit build copy step.
// Source of truth for author / links / alt / size is <repo>/assets/images/unsplash/sources.json; this module adds
// the site-specific key, an honest caption note and the page usage. A missing file fails the build.
import {readFile, copyFile, mkdir, access} from 'node:fs/promises';
import {esc, repoAssetUrl} from './utils.mjs';

const SOURCE_DIR = 'images/unsplash/';
const PUBLIC_DIR = 'unsplash/'; // dist/assets/unsplash/, referenced as ../assets/unsplash/ from dist/integrated/

// key -> file, caption note (never claims a real Myung facility, product or result), pages that use it.
const PHOTOS = {
  circuit: {file: 'hardware-circuit-board.jpg', note: '서비스 설명용 스톡 사진 · 실제 장비나 작업 사진이 아닙니다.', pages: ['index.html', 'repair.html']},
  office: {file: 'modern-office-interior.jpg', note: '업무 환경 설명용 스톡 사진 · 명정보기술의 사무실이 아닙니다.', pages: ['index.html', 'support.html']},
  facade: {file: 'corporate-glass-facade.jpg', note: '기업 환경 설명용 스톡 사진 · 명정보기술의 건물이 아닙니다.', pages: ['company.html']},
  server: {file: 'data-center-server-rack.jpg', note: '서버 인프라 설명용 스톡 사진(촬영자 imgix) · 명정보기술의 시설·제품·실적이 아니며 사진 속 타사 로고와 무관합니다.', pages: ['index.html', 'security.html']},
};

const sources = JSON.parse(await readFile(repoAssetUrl(SOURCE_DIR + 'sources.json'), 'utf8'));
export const stockPhotos = Object.fromEntries(Object.entries(PHOTOS).map(([key, p]) => {
  const meta = sources.images.find((i) => i.file === p.file);
  if (!meta) throw new Error(`sources.json has no entry for ${p.file}`);
  return [key, {...p, ...meta}];
}));

// Explicit build step: copy the four photos and their metadata into <out>/assets/unsplash/. copyFile throws if one is missing.
export async function copyStockPhotos(assetsOut) {
  const dir = new URL(PUBLIC_DIR, assetsOut);
  await mkdir(dir, {recursive: true});
  for (const name of [...Object.values(PHOTOS).map((p) => p.file), 'sources.json']) {
    const from = repoAssetUrl(SOURCE_DIR + name);
    await access(from);
    await copyFile(from, new URL(name, dir));
  }
}

// className: extra modifier, e.g. 'stock-photo--tall'. Intrinsic width/height reserve space; images below the fold load lazily.
export function stockPhoto(key, {className = '', loading = 'lazy'} = {}) {
  const p = stockPhotos[key];
  if (!p) throw new Error(`Unknown stock photo: ${key}`);
  const ext = 'target="_blank" rel="noopener noreferrer"';
  return `<figure class="stock-photo stock-photo--${esc(key)}${className ? ' ' + esc(className) : ''}"><img src="../assets/${PUBLIC_DIR}${esc(p.file)}" alt="${esc(p.alt)}" width="${Number(p.width)}" height="${Number(p.height)}" loading="${esc(loading)}" decoding="async"><figcaption><span class="stock-note">${esc(p.note)}</span> <span class="stock-credit">사진: <a href="${esc(p.profile)}" ${ext}>${esc(p.author)}</a> · <a href="${esc(p.source)}" ${ext}>Unsplash 원본</a></span></figcaption></figure>`;
}
