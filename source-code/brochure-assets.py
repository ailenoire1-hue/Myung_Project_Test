"""Embed supplied photos and official partner imagery in an offline HTML brochure."""
from pathlib import Path
from io import BytesIO
import base64
import json
from urllib.request import urlretrieve
from PIL import Image, ImageOps

root = Path(__file__).resolve().parent
files = {
    "security-awareness-training": "dist/assets/company/security-awareness-training.png",
    "contact-qr-homepage": "dist/assets/contact/qr-homepage.svg",
    "contact-qr-blog": "dist/assets/contact/qr-blog.svg",
    "contact-qr-youtube": "dist/assets/contact/qr-youtube.svg",
    "hq-aerial": "dist/assets/cover/myung-hq-aerial.jpg",
    "insight-blog-raw": "dist/assets/insights/blog-2.png",
    "insight-blog-security": "dist/assets/insights/blog-1.png",
    "insight-video-conference": "dist/assets/insights/youtube-DpVNx8eIbKM.jpg",
    "insight-video-forensics": "dist/assets/insights/youtube-jDyYMMCdByM.jpg",
    "home-opening": "dist/assets/company/home-opening-frame.png",
    "ppt-display": ".sites-runtime/brochure-template/new-content-assets/ppt-display-panels.png",
    "display-cleanroom": ".sites-runtime/brochure-template/new-content-assets/ppt-display-cleanroom.png",
    "display-repair": ".sites-runtime/brochure-template/new-content-assets/ppt-display-repair.png",
    "display-equipment": ".sites-runtime/brochure-template/new-content-assets/ppt-display-equipment.png",
    "bar-emblem": "dist/assets/company/bar-associations/bar-emblem-ppt.png",
    "bar-jeju": "dist/assets/company/bar-associations/jeju-logo.png",
    "bar-jeonbuk": "dist/assets/company/bar-associations/jeonbuk-logo.png",
    "law-logos": "dist/assets/company/law-firms/logos.png",
    "law-ilsun": "dist/assets/company/law-firms/ilsun.png",
    "pc-workstation": "dist/assets/service-materials/pc-storage-workstation.webp",
    "ppt-cleanroom": "dist/assets/company/ppt2026/image20.png",
    "ppt-center": "dist/assets/company/ppt2026/image21.png",
    "ppt-workroom": "dist/assets/company/ppt2026/image22.png",
    "ppt-engineer": "dist/assets/company/ppt2026/image23.png",
    "ppt-mit3000": "dist/assets/company/ppt2026/image52.png",
    "ppt-ipc": "dist/assets/company/ppt2026/image53.png",
    "ppt-dvr-explorer": "dist/assets/company/ppt2026/image54.png",
    "ppt-disk-checker": "dist/assets/company/ppt2026/image59.png",
    "ppt-mit5000": "dist/assets/company/ppt2026/image68.png",
    "ppt-ssd": "dist/assets/company/ppt2026/image61.png",
    "logo": ".sites-runtime/brochure/official/myung-logo.png",
    "domestic": ".sites-runtime/brochure/official/domestic-partners.png",
    "global": ".sites-runtime/brochure/official/global-partners.png",
    "hq": "dist/assets/company/hq-building.png",
    "lab": "dist/assets/company/video2019-cleanroom.png",
    "precision": "dist/assets/company/video2019-precision.png",
    "equipment": "dist/assets/company/recovery-equipment-work.png",
    "mobile": "dist/assets/service-materials/mobile-acquisition-work.png",
    "board": "dist/assets/service-materials/mobile-board.png",
    "cheonan": "dist/assets/national-cheonan-recovery.png",
    "kbs": "dist/assets/national-320-kbs.png",
    "sewol": "dist/assets/national-sewol-cctv.jpeg",
    "bus": "dist/assets/company/history_img_2014.jpg",
    "training": "dist/assets/company/training-chungbuk-2023.png",
    "practice": "dist/assets/company/training-forensics-practice.png",
    "chungbuk": "dist/assets/company/chungbuk-bar-mou-2023.png",
    "jeju": "dist/assets/company/jeju-bar-mou-wide-2024.png",
    "csm": "dist/assets/company/history_img_2019.png",
    "labpair": "../reference-review-law/resource-46.png",
    "office": "../reference-review-law/resource-25.png",
    "map": "../reference-review-law/resource-23.png",
    "recovery-service": "../reference-review-law/resource-32.png",
    "delete-service": "../reference-review-law/resource-33.png",
    "backup-service": "../reference-review-law/resource-28.png",
    "cctv-service": "../reference-review-law/resource-30.png",
    "cert-research": "../reference-new-partnerships/image17.png",
    "cert-hr": "../reference-new-partnerships/image20.jpeg",
    "cert-family": "../reference-new-partnerships/image21.jpeg",
    "cert-export": "../reference-new-partnerships/image22.png",
    "skilled-technician": "dist/assets/company/ceo-skilled-technician-2011.jpeg",
    "history-start": "dist/assets/company/history_img_1990.png",
    "logo-acelab": "dist/assets/company/acelab-logo.png",
    "logo-stellar": "dist/assets/company/stellar-logo.png",
    "logo-ontrack": "dist/assets/company/ontrack-logo.png",
    "branch-gangnam": "dist/assets/company/branches/gangnam-narakium-building.jpg",
    "branch-yongsan": "dist/assets/company/branches/yongsan-etland-building.jpg",
    "branch-suwon": "dist/assets/company/branches/suwon-innoplex-building.jpg",
}
data = {}
official = {
    "logo": "https://myung.co.kr/resources/images/logo/logo.png",
    "domestic": "https://myung.co.kr/resources/images/about/pt_k.png",
    "global": "https://myung.co.kr/resources/images/about/pt_g.png",
}
for key, filename in files.items():
    if Path(filename).suffix.lower() == ".svg":
        data[key] = "data:image/svg+xml;base64," + base64.b64encode((root / filename).read_bytes()).decode("ascii")
        continue
    if key == "hq-aerial":
        data[key] = "data:image/jpeg;base64," + base64.b64encode((root / filename).read_bytes()).decode("ascii")
        continue
    if not (root / filename).exists() and key in official:
        (root / filename).parent.mkdir(parents=True, exist_ok=True)
        urlretrieve(official[key], root / filename)
    image = ImageOps.exif_transpose(Image.open(root / filename))
    image.thumbnail((1600, 1500), Image.Resampling.LANCZOS)
    buf = BytesIO()
    image.save(buf, format="WEBP", quality=90, method=6)
    data[key] = "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode("ascii")
out = root / ".sites-runtime/brochure/assets.json"
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps(data), encoding="utf-8")
print(f"Prepared {len(data)} embedded images ({out.stat().st_size:,} bytes)")
