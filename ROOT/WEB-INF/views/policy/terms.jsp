<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %><%
    String PAGE_TITLE = "이용약관";
    String PAGE_DESC = "(주)명정보기술 홈페이지 이용약관";
    String SECTION = "";
    String HERO_IMG = "/resources/images/about/main_about.png", HERO_EYEBROW = "Policy";
    String HERO_SUB = null;
%><%@ include file="/WEB-INF/jspf/header.jspf" %>

<section class="section">
  <div class="container container-narrow policy">
<h2>수집하는 개인정보의 항목</h2>
<p>가. 회사는 원활한 고객상담, 각종 서비스의 제공을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
<p>&lt;고객상담 시&gt;</p>
<ul>
<li>필수항목 : 성명, 이메일, 연락처</li>
<li>선택사항 : 주소</li>
</ul>
<p>나. 서비스 이용과정에서 아래와 같은 정보들이 자동으로 생성되어 수집될 수 있습니다.</p>
<ul>
<li>IP Address, 쿠키, 방문 일시, 서비스 이용 기록, 불량 이용 기록</li>
</ul>
<p>다. 부가 서비스 및 맞춤식 서비스 이용 과정에서 해당 서비스의 이용자에 한해서만 아래와 같은 정보들이 수집될 수 있습니다.</p>
<ul>
<li>주소, 사용 이동통신사 등</li>
</ul>
<p>라. 유료 서비스 이용 과정에서 아래와 같은 결제 정보들이 수집될 수 있습니다.</p>
<ul>
<li>신용카드 결제시 : 카드사명, 카드번호 등</li>
<li>휴대전화 결제시 : 이동전화번호, 통신사, 결제승인번호 등</li>
<li>계좌이체시 : 은행명, 계좌번호 등</li>
</ul>
<h2>개인정보의 수집 및 이용 목적</h2>
<p>가. 고객상담</p>
<p>고객상담 및 제한적 본인 확인제에 따른 본인확인, 개인식별, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항 전달</p>
<p>나. 신규 서비스 개발 및 마케팅·광고에의 활용</p>
<p>신규 서비스 개발 및 맞춤 서비스 제공, 통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 이벤트 및 광고성 정보 제공 및 참여기회 제공, 접속빈도 파악, 회원의 서비스 이용에 대한 통계</p>
<h2>개인정보의 보유 및 이용</h2>
<p>기간이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.</p>
<p>가. 회사 내부 방침에 의한 정보보유 사유</p>
<ul>
<li>부정이용기록</li>
</ul>
<p>보존 이유 : 부정 이용 방지</p>
<p>보존 기간 : 1년</p>
<p>나. 관련법령에 의한 정보보유 사유</p>
<p>상법, 전자상거래 등에서의 소비자보호에 관한 법률 등 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다. 이 경우 회사는 보관하는 정보를 그 보관의 목적으로만 이용하며 보존기간은 아래와 같습니다.</p>
<ul>
<li>방문에 관한 기록</li>
</ul>
<p>보존 이유 : 통신비밀보호법</p>
<p>보존 기간 : 3개월</p>
<ul>
<li>본인확인에 관한 기록</li>
</ul>
<p>보존 이유 : 정보통신망 이용촉진 및 정보보호 등에 관한 법률</p>
<p>보존 기간 : 6개월</p>
<ul>
<li>소비자의 불만 또는 분쟁처리에 관한 기록</li>
</ul>
<p>보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률</p>
<p>보존 기간 : 3년</p>
<ul>
<li>계약 또는 청약철회 등에 관한 기록</li>
</ul>
<p>보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률</p>
<p>보존 기간 : 5년</p>
<ul>
<li>대금결제 및 재화 등의 공급에 관한 기록</li>
</ul>
<p>보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률</p>
<p>보존 기간 : 5년</p>
  </div>
</section>
<style>.policy h2{font-size:20px;margin:40px 0 12px}.policy ul{padding-left:4px;list-style:none;display:grid;gap:4px;margin:0 0 1em}.policy li{position:relative;padding-left:14px}.policy ul li::before{content:'-';position:absolute;left:0;color:var(--muted)}.policy .toc{list-style:none;padding:20px 24px;background:var(--bg-soft);border-radius:12px;display:grid;gap:4px;margin:0 0 1em}.policy .toc li{padding:0}.policy a{color:var(--primary);text-decoration:underline}</style>

<%@ include file="/WEB-INF/jspf/footer.jspf" %>
