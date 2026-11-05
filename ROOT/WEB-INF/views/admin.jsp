<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %><%@ include file="/WEB-INF/jspf/lib.jspf" %><%
    if (session.getAttribute("myungAdmin") == null) { response.sendRedirect("/admin/login"); return; }
    request.setCharacterEncoding("UTF-8");
    String ADMIN_TITLE = "문의 목록";

    String fType = nz(request.getParameter("type"));
    String fStatus = nz(request.getParameter("status"));
    String q = nz(request.getParameter("q"));
    int pg = 1;
    try { pg = Math.max(1, Integer.parseInt(nz(request.getParameter("page")))); } catch (NumberFormatException ignore) { }
    final int PER = 30;

    List<Properties> all = new ArrayList<Properties>();
    String loadError = null;
    try { all = listInquiries(application); } catch (IOException e) { loadError = e.getMessage(); application.log("[admin] list failed", e); }

    int cntNew = 0, cntProg = 0, cntDone = 0;
    List<Properties> rows = new ArrayList<Properties>();
    String ql = q.toLowerCase();
    for (Properties p : all) {
        String st = p.getProperty("status", "new");
        if ("progress".equals(st)) cntProg++; else if ("done".equals(st)) cntDone++; else cntNew++;
        if (fType.length() > 0 && !fType.equals(p.getProperty("type"))) continue;
        if (fStatus.length() > 0 && !fStatus.equals(st)) continue;
        if (ql.length() > 0) {
            String hay = (p.getProperty("name", "") + " " + p.getProperty("phone", "") + " " + p.getProperty("email", "") + " " + p.getProperty("content", "") + " " + p.getProperty("branch", "")).toLowerCase();
            if (hay.indexOf(ql) < 0) continue;
        }
        rows.add(p);
    }
    int pages = Math.max(1, (rows.size() + PER - 1) / PER);
    if (pg > pages) pg = pages;
    String qsBase = "type=" + java.net.URLEncoder.encode(fType, "UTF-8") + "&status=" + java.net.URLEncoder.encode(fStatus, "UTF-8") + "&q=" + java.net.URLEncoder.encode(q, "UTF-8");
%><%@ include file="/WEB-INF/jspf/admin-head.jspf" %>
<h1 class="h3">고객 문의 관리</h1>
<% if (loadError != null) { %><div class="form-msg is-error mb-3">문의 목록을 불러오지 못했습니다: <%= h(loadError) %></div><% } %>
<div class="adm-summary">
  <div>전체<b><%= all.size() %></b></div>
  <div>신규<b style="color:var(--danger)"><%= cntNew %></b></div>
  <div>처리중<b style="color:#b26a00"><%= cntProg %></b></div>
  <div>완료<b style="color:var(--success)"><%= cntDone %></b></div>
</div>
<div class="adm-card">
  <form class="adm-filter" method="get" action="/admin">
    <select name="type" aria-label="문의 유형">
      <option value="">전체 유형</option>
      <option value="request"<%= "request".equals(fType) ? " selected" : "" %>>복구 문의</option>
      <option value="business"<%= "business".equals(fType) ? " selected" : "" %>>출장 복구</option>
      <option value="call"<%= "call".equals(fType) ? " selected" : "" %>>상담 요청</option>
    </select>
    <select name="status" aria-label="처리 상태">
      <option value="">전체 상태</option>
      <option value="new"<%= "new".equals(fStatus) ? " selected" : "" %>>신규</option>
      <option value="progress"<%= "progress".equals(fStatus) ? " selected" : "" %>>처리중</option>
      <option value="done"<%= "done".equals(fStatus) ? " selected" : "" %>>완료</option>
    </select>
    <input type="search" name="q" value="<%= h(q) %>" placeholder="이름·연락처·이메일·내용 검색">
    <button type="submit" class="btn btn-primary btn-sm">검색</button>
    <a class="btn btn-outline btn-sm" href="/admin">초기화</a>
    <a class="btn btn-outline btn-sm" style="margin-left:auto" href="/admin/export?<%= h(qsBase) %>">CSV 다운로드</a>
  </form>
  <p class="text-muted" style="font-size:14px">검색 결과 <b><%= rows.size() %></b>건</p>
  <div class="table-wrap" style="border:0">
    <table class="adm-table">
      <thead><tr><th>접수일시</th><th>유형</th><th>상태</th><th>성명</th><th>연락처</th><th>지점</th><th>내용</th></tr></thead>
      <tbody>
<% if (rows.isEmpty()) { %>
        <tr><td colspan="7" class="text-center text-muted" style="padding:48px">접수된 문의가 없습니다.</td></tr>
<% }
   for (int i = (pg - 1) * PER; i < Math.min(rows.size(), pg * PER); i++) {
       Properties p = rows.get(i);
       String st = p.getProperty("status", "new");
       String link = "/admin/view?id=" + p.getProperty("id"); %>
        <tr>
          <td style="white-space:nowrap"><a href="<%= h(link) %>"><%= h(p.getProperty("createdAt")) %></a></td>
          <td style="white-space:nowrap"><%= typeLabel(p.getProperty("type")) %></td>
          <td><span class="badge badge-<%= "done".equals(st) ? "done" : ("progress".equals(st) ? "progress" : "new") %>"><%= statusLabel(st) %></span></td>
          <td style="white-space:nowrap"><a href="<%= h(link) %>"><strong><%= h(p.getProperty("name")) %></strong></a></td>
          <td style="white-space:nowrap"><a href="tel:<%= h(p.getProperty("phone")) %>"><%= h(p.getProperty("phone")) %></a></td>
          <td style="white-space:nowrap"><%= h(p.getProperty("branch", "")) %></td>
          <td><div class="ellipsis"><%= h(p.getProperty("content", "")) %></div></td>
        </tr>
<% } %>
      </tbody>
    </table>
  </div>
<% if (pages > 1) { %>
  <nav class="pagination" aria-label="페이지">
<%   for (int i = 1; i <= pages; i++) { %>
    <a class="btn btn-sm <%= i == pg ? "btn-primary" : "btn-outline" %>" href="/admin?<%= h(qsBase) %>&amp;page=<%= i %>"><%= i %></a>
<%   } %>
  </nav>
<% } %>
</div>
</div></main></body></html>
