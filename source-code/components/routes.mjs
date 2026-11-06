// Single source for site navigation. Order is the header order; the footer omits the home entry.
export const routes = [
  ['index.html', '홈'],
  ['company.html', '회사 소개'],
  ['products.html', '제품'],
  ['repair.html', '수리'],
  ['recovery.html', '데이터 복구'],
  ['forensics.html', '포렌식'],
  ['security.html', '기업 보안'],
  ['support.html', '고객지원'],
];
export const footerRoutes = routes.slice(1);
