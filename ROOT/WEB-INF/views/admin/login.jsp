<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %><%@ include file="/WEB-INF/jspf/lib.jspf" %><%
    request.setCharacterEncoding("UTF-8");
    String ADMIN_TITLE = "로그인";
    String error = null;
    Properties cfg = null;
    String cfgError = null;
    try { cfg = adminConfig(application); } catch (IOException e) { cfgError = e.getMessage(); }

    if (session.getAttribute("myungAdmin") != null) { response.sendRedirect("/admin"); return; }

    if ("POST".equals(request.getMethod()) && cfg != null) {
        String ip = request.getRemoteAddr();
        if (!allow("login:" + ip, 5, 15 * 60 * 1000L, false)) {
            error = "로그인 실패가 반복되어 15분간 로그인이 제한됩니다.";
        } else if (checkAdmin(cfg, request.getParameter("id"), request.getParameter("pw"))) {
            session.invalidate();
            HttpSession s = request.getSession(true);
            s.setAttribute("myungAdmin", Boolean.TRUE);
            s.setAttribute("csrf", randomToken());
            s.setMaxInactiveInterval(60 * 60);
            application.log("[admin] login ok from " + ip);
            response.sendRedirect("/admin");
            return;
        } else {
            hit("login:" + ip);
            application.log("[admin] login failed from " + ip);
            error = "아이디 또는 비밀번호가 올바르지 않습니다.";
        }
    }
%><%@ include file="/WEB-INF/jspf/admin-head.jspf" %>
<div class="adm-card" style="max-width:420px;margin:40px auto">
  <h1 class="h3">관리자 로그인</h1>
<% if (cfgError != null) { %>
  <div class="form-msg is-error">저장 경로 설정 오류입니다. 서버 로그를 확인하세요.</div>
<% } else if (cfg == null) { %>
  <div class="form-msg is-error">관리자 계정이 설정되지 않았습니다.<br>서버의 데이터 디렉터리에 admin.properties 파일을 만들어 주세요. (README 참고)</div>
<% } else { %>
  <form class="form" method="post" action="/admin/login" autocomplete="off">
    <label class="field"><span class="field-label">아이디</span><input type="text" name="id" required autofocus></label>
    <label class="field"><span class="field-label">비밀번호</span><input type="password" name="pw" required></label>
<%   if (error != null) { %><div class="form-msg is-error"><%= h(error) %></div><% } %>
    <button type="submit" class="btn btn-primary btn-block">로그인</button>
  </form>
<% } %>
</div>
</div></main></body></html>
