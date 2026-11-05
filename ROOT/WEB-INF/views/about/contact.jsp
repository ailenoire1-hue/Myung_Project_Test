<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %><%!
    /* { no, 이름, 위도, 경도, 주소, 전화, 팩스, 버스(태그:내용;...), 지하철(태그:내용;...) } */
    static final String[][] BRANCHES = {
        {"1", "청주본사", "36.705061", "127.426696", "충북 청주시 청원구 오창읍 과학산업3로 168", "043-218-8400", "043-218-8408", "일반:713, 713-1, 713-2, 717", ""},
        {"2", "강남지점", "37.509749", "127.057112", "서울특별시 강남구 테헤란로 83길 32 나라키움삼성동빌딩 4층 401호", "02-561-1664", "02-569-1646",
            "지선:2415, 3011, 3411;간선:146, 333, 341, 360, 740, N13, N61;직행:1100, 1700, 2000, 2000-1, 7007, 9414, 8001;마을:강남07, 강남08",
            "2호선:삼성역 5번 출구 (도보 약 10분);9호선:삼성중앙역 5번 출구 (도보 약 7분)"},
        {"3", "구로지점", "37.483916", "126.894081", "서울특별시 구로구 디지털로 273 에이스트윈타워2차 909호", "02-2109-5830", "02-2109-5839",
            "지선:5536;마을:구로09", "7호선:남구로역 2번 출구 (도보 약 15분)"},
        {"4", "용산지점", "37.532870", "126.959609", "서울 용산구 청파로 74 전자랜드 신관 광장층 A-3호", "02-703-8500", "02-718-5066",
            "간선:505, 503, 162;지선:5012", "1호선:용산역 3번 출구 (전자상가 방향 도보 10분);4호선:신용산역 5번 출구 (전자상가 방향 도보 10분)"},
        {"5", "수원지점", "37.262409", "127.061706", "경기 수원시 영통구 신원로 306 이노플렉스1동 710호", "031-216-8320", "031-8002-2521", "일반:9, 9-1, 98, 15-1", ""},
        {"6", "대전지점", "36.366915", "127.382569", "대전 서구 둔산대로 117번길 44 엑스포오피스텔 201호", "042-484-5111", "042-487-9347", "일반:104, 301, 604, 705, 911, 918", ""},
        {"7", "대구지점", "35.905688", "128.608283", "대구광역시 북구 유통단지로 50, 409호 (전자관 맞은편 우리은행 4층)", "053-604-5878", "053-604-5879",
            "순환:순환2, 순환2-1;간선:304, 306, 323, 323-1, 413, 503, 653, 937", ""},
        {"8", "부산지점", "35.1476834", "129.0586831", "부산광역시 부산진구 중앙대로 615 평광빌딩 10층(서관)", "051-895-7722", "051-892-5511",
            "마을:동구 1;일반:5-1, 10, 17, 29, 38, 43, 52, 66, 67, 80, 81, 82, 83, 83-1, 86, 88(A), 99, 103, 108, 111, 138, 167, 168, 583;급행:1000, 1004",
            "1호선:범내골역 5번 출구 (바로 앞)"},
        {"9", "광주지점", "35.157124", "126.880006", "광주광역시 서구 내방로 360, 2층", "062-372-2213", "062-372-2208",
            "지선:상무64, 송암47;간선:금호36, 풍암26, 송암31", "광주1호선:농성역 5번 출구 (도보 약 10분), 화정역 4번 출구 (도보 약 10분)"},
        {"10", "중국 소주 명정전자", "31.31981562090279", "120.77059367158616", "No.5 Chuangtou Industrial Workshop, Yangchenghu Road, Suzhou Industrial Park, China 215112", "+86-512-6292-2", "", "", ""},
        {"11", "베트남 호치민", "10.910705344086308", "106.97717985355861", "Street 3, Giang Dien Industrial Zone, Vietnam", "+84-25-189-66-2", "", "", ""}
    };

    static String routeHtml(String s) {
        if (s == null || s.length() == 0) return "";
        StringBuilder b = new StringBuilder();
        for (String part : s.split(";")) {
            int i = part.indexOf(':');
            String tag = i > 0 ? part.substring(0, i) : "";
            String txt = i > 0 ? part.substring(i + 1) : part;
            b.append("<span class=\"route-line\">");
            if (tag.length() > 0) b.append("<span class=\"em-tag\">").append(h(tag)).append("</span>");
            b.append(h(txt)).append("</span>");
        }
        return b.toString();
    }
%><%
    String PAGE_TITLE = "오시는 길";
    String PAGE_DESC = "(주)명정보기술 청주본사 및 강남·구로·용산·수원·대전·대구·부산·광주 지점 주소, 연락처, 교통편 안내.";
    String SECTION = "about";
    String HERO_IMG = "/resources/images/about/main_about.png", HERO_EYEBROW = "Contact";
    String HERO_SUB = "전국 9개 지점 어디서나 상담과 복구 접수가 가능합니다.";

    String sel = nz(request.getParameter("branch"));
    if (sel.length() == 0) sel = nz(request.getParameter("contact"));
    int selIdx = 0;
    for (int i = 0; i < BRANCHES.length; i++) if (BRANCHES[i][0].equals(sel)) selIdx = i;
%><%@ include file="/WEB-INF/jspf/header.jspf" %>

<section class="section">
  <div class="container">
    <div class="branch-layout">
      <ul class="branch-list" role="tablist" aria-label="지점 선택">
<% for (int i = 0; i < BRANCHES.length; i++) { %>
        <li><button type="button" role="tab" data-branch="<%= i %>" class="<%= i == selIdx ? "is-active" : "" %>" aria-selected="<%= i == selIdx %>"><%= h(BRANCHES[i][1]) %></button></li>
<% } %>
      </ul>
      <div>
<% for (int i = 0; i < BRANCHES.length; i++) { String[] b = BRANCHES[i]; %>
        <div class="branch-panel" data-branch-panel="<%= i %>"<%= i == selIdx ? "" : " hidden" %>>
          <div class="branch-map" data-map="<%= b[2] %>,<%= b[3] %>">
<%   if (i == selIdx) { %>
            <iframe title="<%= h(b[1]) %> 지도" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=<%= b[2] %>,<%= b[3] %>&amp;z=16&amp;hl=ko&amp;output=embed"></iframe>
<%   } %>
          </div>
          <div class="branch-info">
            <h2><%= h(b[1]) %></h2>
            <dl>
              <dt>주소</dt><dd><%= h(b[4]) %></dd>
              <dt>전화</dt><dd><a href="tel:<%= h(b[5]) %>" class="text-primary"><strong><%= h(b[5]) %></strong></a></dd>
<%   if (b[6].length() > 0) { %><dt>팩스</dt><dd><%= h(b[6]) %></dd><% } %>
<%   if (b[7].length() > 0) { %><dt>버스</dt><dd><%= routeHtml(b[7]) %></dd><% } %>
<%   if (b[8].length() > 0) { %><dt>지하철</dt><dd><%= routeHtml(b[8]) %></dd><% } %>
            </dl>
            <div class="map-links">
              <a class="btn btn-outline btn-sm" href="https://map.naver.com/p/search/<%= java.net.URLEncoder.encode(b[4], "UTF-8") %>" target="_blank" rel="noopener">네이버 지도</a>
              <a class="btn btn-outline btn-sm" href="https://map.kakao.com/link/map/<%= java.net.URLEncoder.encode("명정보기술 " + b[1], "UTF-8").replace("+", "%20") %>,<%= b[2] %>,<%= b[3] %>" target="_blank" rel="noopener">카카오맵</a>
              <a class="btn btn-outline btn-sm" href="https://map.kakao.com/link/to/<%= java.net.URLEncoder.encode("명정보기술 " + b[1], "UTF-8").replace("+", "%20") %>,<%= b[2] %>,<%= b[3] %>" target="_blank" rel="noopener">길찾기</a>
            </div>
          </div>
        </div>
<% } %>
      </div>
    </div>
  </div>
</section>

<script>
(function () {
  var btns = document.querySelectorAll('[data-branch]');
  function show(i) {
    Array.prototype.forEach.call(btns, function (b) {
      var on = b.getAttribute('data-branch') === String(i);
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-branch-panel]'), function (p) {
      var on = p.getAttribute('data-branch-panel') === String(i);
      p.hidden = !on;
      if (on) {
        var m = p.querySelector('[data-map]');
        if (m && !m.querySelector('iframe')) {
          var f = document.createElement('iframe');
          f.title = p.querySelector('h2').textContent + ' 지도';
          f.loading = 'lazy';
          f.src = 'https://maps.google.com/maps?q=' + m.getAttribute('data-map') + '&z=16&hl=ko&output=embed';
          m.appendChild(f);
        }
      }
    });
  }
  Array.prototype.forEach.call(btns, function (b) {
    b.addEventListener('click', function () {
      show(b.getAttribute('data-branch'));
      history.replaceState(null, '', '?branch=' + (parseInt(b.getAttribute('data-branch'), 10) + 1));
    });
  });
})();
</script>

<%@ include file="/WEB-INF/jspf/footer.jspf" %>
