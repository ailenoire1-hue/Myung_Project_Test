import {esc} from './utils.mjs';

const topics = ['제품·솔루션', '장비 수리', '데이터 복구', '디지털포렌식', '침해사고·기업 보안'];

// Local, non-transmitting inquiry demo. IDs are used by initInquiryDemo() in integrated-site.js.
export const inquiryForm = () => `<div class="card"><span class="tag">LOCAL DEMO</span><h2>문의 흐름 체험</h2><p id="demo-notice">전송되지 않는 시연입니다. 실제 개인정보나 사건 자료를 입력하지 마세요. 입력 내용은 저장하지 않으며 새로고침하면 사라집니다.</p><form id="inquiry" aria-describedby="demo-notice" autocomplete="off"><label for="topic">문의 분야</label><select id="topic">${topics.map((t) => `<option>${esc(t)}</option>`).join('')}</select><label for="message">상황 요약 (가상 내용만)</label><textarea id="message" rows="4" required maxlength="500" placeholder="예: 시연용 PC가 부팅되지 않습니다."></textarea><label class="consent"><input id="demo-consent" type="checkbox" required> 실제 접수가 아닌 시연임을 확인했습니다.</label><button type="button" class="button" id="inquiry-demo">문의 시연 확인</button><button type="reset" class="button-secondary">내용 지우기</button><p id="inquiry-status" role="status"></p></form><noscript>문의 시연은 JavaScript를 켜면 이용할 수 있습니다.</noscript></div>`;
