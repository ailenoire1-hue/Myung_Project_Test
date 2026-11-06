"""Generate offline SVG QR codes for the brochure's existing official channels."""
from pathlib import Path
from html import escape
import json
import qrcode
import cv2

root = Path(__file__).resolve().parent
profile = json.loads((root / 'company-profile-data.json').read_text(encoding='utf-8'))
out = root / 'dist/assets/contact'
work = root / '.sites-runtime/brochure-template/contact-qr'
out.mkdir(parents=True, exist_ok=True)
work.mkdir(parents=True, exist_ok=True)
channels = [
    ('homepage', '회사 홈페이지', 'https://www.myung.co.kr/'),
    ('blog', '네이버 블로그', profile['insights']['channels'][0]['url']),
    ('youtube', '유튜브 · 명TV', profile['insights']['channels'][1]['url']),
]
result = []
for key, title, url in channels:
    qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=10, border=4)
    qr.add_data(url)
    qr.make(fit=True)
    matrix = qr.get_matrix()
    size = len(matrix)
    path = ''.join(f'M{x} {y}h1v1h-1z' for y, row in enumerate(matrix) for x, dark in enumerate(row) if dark)
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{size*8}" height="{size*8}" viewBox="0 0 {size} {size}" shape-rendering="crispEdges"><title>{escape(title)}</title><rect width="{size}" height="{size}" fill="#fff"/><path fill="#111827" d="{path}"/></svg>'
    target = out / f'qr-{key}.svg'
    target.write_text(svg, encoding='utf-8')
    check = work / f'qr-{key}.png'
    qr.make_image(fill_color='#111827', back_color='white').save(check)
    decoded, _, _ = cv2.QRCodeDetector().detectAndDecode(cv2.imread(str(check)))
    if decoded != url:
        raise RuntimeError(f'QR verification failed: {key}')
    result.append({'key': key, 'title': title, 'url': url, 'asset': f'contact-qr-{key}', 'file': str(target.relative_to(root)).replace('\\', '/'), 'modulesWithQuietZone': size, 'quietZone': 4, 'errorCorrection': 'M', 'decoded': decoded})
manifest = {'date': '2026-10-15', 'channels': result, 'contacts': {'recovery': '1577-1377', 'forensic': '1577-4872', 'headquarters': '043-218-8400', 'email': 'cs@myung.co.kr', 'address': '충북 청주시 청원구 오창읍 과학산업3로 168'}, 'sources': ['https://www.myung.co.kr/', 'https://www.myung.co.kr/about/contact', 'company-profile-data.json / insights.channels', 'content.json / company'], 'background': 'dist/assets/cover/myung-hq-aerial.jpg'}
(out / 'sources.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'verifiedQRs': len(result), 'modules': [r['modulesWithQuietZone'] for r in result]}))
