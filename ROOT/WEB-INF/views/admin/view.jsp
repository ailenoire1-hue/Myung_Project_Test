<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %><%@ include file="/WEB-INF/jspf/lib.jspf" %><%
    if (session.getAttribute("myungAdmin") == null) { response.sendRedirect("/admin/login"); return; }
    request.setCharacterEncoding("UTF-8");
    String ADMIN_TITLE = "문의 상세";
    String id = nz(request.getParameter("id"));
    if (!validId(id)) { response.sendError(404); return; }
    String csrf = (String) session.getAttribute("csrf");
    String msg = null;

    if ("POST".equals(request.getMethod())) {
        String token = request.getParameter("csrf");
        if (csrf == null || token == null || !java.security.MessageDigest.isEqual(csrf.getBytes(), token.getBytes())) {
            response.sendError(403);
            return;
        }
        String action = nz(request.getParameter("action"));
        if ("delete".equals(action)) {
            synchronized (STORE_LOCK) {
                java.io.File f = inquiryFile(application, id);
                if (f.isFile() && f.delete()) {
                    application.log("[admin] inquiry deleted: " + id);
                    response.sendRedirect("/admin");
                    return;
                }
            }
            msg = "삭제하지 못했습니다.";
        } else {
            String st = nz(request.getParameter("status"));
            if (!"new".equals(st) && !"progress".equals(st) && !"done".equals(st)) st = null;
            String memo = clean(request.getParameter("memo"), 4000, true);
            try {
                updateInquiry(application, id, st, memo);
                response.sendRedirect("/admin/view?id=" + id + "&saved=1");
                return;
            } catch (java.io.FileNotFoundException e) {
                response.sendError(404);
                return;
            }
        }
    }

    Properties p = loadInquiry(application, id);
    if (p == null) { response.sendError(404); return; }
    if (request.getParameter("saved") != null) msg = "저장되었습니다.";
    String st = p.getProperty("status", "new");
    String[][] FIELDS = {
        {"접수번호", "id"}, {"접수일시", "createdAt"}, {"최종 수정", "updatedAt"}, {"성명", "name"}, {"연락처", "phone"}, {"이메일", "email"},
        {"저장장치", "device"}, {"증상 유형", "symptom"}, {"접수 지점", "branch"}, {"알게 된 경로", "route"}, {"문의 내용", "content"},
        {"접수 페이지", "page"}, {"IP", "ip"}, {"브라우저", "userAgent"}
    };
%><%@ include file="/WEB-INF/jspf/admin-head.jspf" %>
<p><a href="/admin" class="text-primary">← 목록으로</a></p>
<h1 class="h3"><%= typeLabel(p.getProperty("type")) %> · <%= h(p.getProperty("name")) %>
  <span class="badge badge-<%= "done".equals(st) ? "done" : ("progress".equals(st) ? "progress" : "new") %>" style="vertical-align:middle"><%= statusLabel(st) %></span></h1>
<% if (msg != null) { %><div class="form-msg <%= msg.startsWith("저장") ? "is-success" : "is-error" %> mb-3"><%= h(msg) %></div><% } %>
<div class="grid" style="grid-template-columns:minmax(0,1fr) 320px;gap:24px;align-items:start" id="admView">
  <div class="adm-card">
    <dl class="adm-dl">
<% for (String[] f : FIELDS) {
       String v = p.getProperty(f[1], "");
       if (v.length() == 0 && !"content".equals(f[1])) continue; %>
      <dt><%= f[0] %></dt>
      <dd><% if ("phone".equals(f[1])) { %><a class="text-primary" href="tel:<%= h(v) %>"><strong><%= h(v) %></strong></a><% } else if ("email".equals(f[1])) { %><a class="text-primary" href="mailto:<%= h(v) %>"><%= h(v) %></a><% } else { %><%= h(v) %><% } %></dd>
<% } %>
    </dl>
  </div>
  <div class="adm-card">
    <form class="form" method="post" action="/admin/view?id=<%= h(id) %>">
      <input type="hidden" name="csrf" value="<%= h(csrf) %>">
      <label class="field"><span class="field-label">처리 상태</span>
        <select name="status">
          <option value="new"<%= "new".equals(st) ? " selected" : "" %>>신규</option>
          <option value="progress"<%= "progress".equals(st) ? " selected" : "" %>>처리중</option>
          <option value="done"<%= "done".equals(st) ? " selected" : "" %>>완료</option>
        </select></label>
      <label class="field"><span class="field-label">관리 메모</span>
        <textarea name="memo" rows="6" placeholder="상담 내용, 담당자 등"><%= h(p.getProperty("memo", "")) %></textarea></label>
      <button type="submit" class="btn btn-primary btn-block">저장</button>
    </form>
    <form method="post" action="/admin/view?id=<%= h(id) %>" style="margin-top:16px" onsubmit="return confirm('이 문의를 영구 삭제할까요? 되돌릴 수 없습니다.');">
      <input type="hidden" name="csrf" value="<%= h(csrf) %>">
      <input type="hidden" name="action" value="delete">
      <button type="submit" class="btn btn-outline btn-block" style="color:var(--danger)">문의 삭제 (개인정보 파기)</button>
    </form>
  </div>
</div>
<style>@media (max-width:900px){#admView{grid-template-columns:1fr!important}}</style>
</div></main></body></html>
