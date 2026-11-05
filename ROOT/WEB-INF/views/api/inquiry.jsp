<%@ page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8" session="false" trimDirectiveWhitespaces="true" %><%@ include file="/WEB-INF/jspf/lib.jspf" %><%!
    static String json(boolean ok, String msg, String id) {
        StringBuilder b = new StringBuilder("{\"ok\":").append(ok);
        if (msg != null) b.append(",\"message\":\"").append(jsEsc(msg)).append('"');
        if (id != null) b.append(",\"id\":\"").append(jsEsc(id)).append('"');
        return b.append('}').toString();
    }
    static String jsEsc(String s) {
        StringBuilder b = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '"' || c == '\\') b.append('\\').append(c);
            else if (c < 0x20) b.append(String.format("\\u%04x", (int) c));
            else b.append(c);
        }
        return b.toString();
    }
%><%
    response.setHeader("Cache-Control", "no-store");
    if (!"POST".equals(request.getMethod())) {
        response.setStatus(405);
        response.setHeader("Allow", "POST");
        out.print(json(false, "허용되지 않는 요청입니다.", null));
        return;
    }
    request.setCharacterEncoding("UTF-8");

    // 다른 사이트에서의 자동 전송 차단 (Origin 헤더가 있으면 Host 와 일치해야 함)
    String origin = request.getHeader("Origin");
    if (origin != null && origin.length() > 0 && !"null".equals(origin)) {
        String o = origin.replaceFirst("^https?://", "").replaceFirst(":\\d+$", "");
        String host = nz(request.getHeader("Host")).replaceFirst(":\\d+$", "");
        if (!o.equalsIgnoreCase(host) && !o.equalsIgnoreCase(request.getServerName())) {
            response.setStatus(403);
            out.print(json(false, "허용되지 않는 요청입니다.", null));
            return;
        }
    }

    String ip = request.getRemoteAddr();

    // 스팸 방지: 숨김 필드가 채워져 있으면 저장하지 않고 성공처럼 응답
    if (nz(request.getParameter("website")).length() > 0) {
        out.print(json(true, "접수되었습니다.", null));
        return;
    }

    String type = nz(request.getParameter("type"));
    if (!"request".equals(type) && !"business".equals(type) && !"call".equals(type)) type = "call";

    String name = clean(request.getParameter("name"), 30, false);
    String phone = clean(request.getParameter("phone"), 20, false);
    String email = clean(request.getParameter("email"), 100, false);
    String content = clean(request.getParameter("content"), 4000, true);
    String agree = nz(request.getParameter("agree"));

    String err = null;
    if (!"Y".equals(agree)) err = "개인정보 수집 및 이용에 동의해 주세요.";
    else if (name.length() < 2) err = "성명을 정확히 입력해 주세요.";
    else if (!phone.matches("[0-9+\\-() ]{8,20}") || phone.replaceAll("[^0-9]", "").length() < 8) err = "연락처를 정확히 입력해 주세요.";
    else if (email.length() > 0 && !email.matches("[^@\\s]+@[^@\\s]+\\.[^@\\s]+")) err = "이메일 형식이 올바르지 않습니다.";
    else if ("call".equals(type) && content.length() == 0) err = "문의 내용을 입력해 주세요.";
    if (err != null) {
        response.setStatus(400);
        out.print(json(false, err, null));
        return;
    }

    // 같은 IP 에서 10분에 5건까지
    if (!allow("inq:" + ip, 5, 10 * 60 * 1000L, true)) {
        response.setStatus(429);
        out.print(json(false, "짧은 시간에 너무 많은 문의가 접수되었습니다. 잠시 후 다시 시도하시거나 " + CS_TEL + " 로 전화 주세요.", null));
        return;
    }

    Map<String, String> data = new LinkedHashMap<String, String>();
    data.put("type", type);
    data.put("name", name);
    data.put("phone", phone);
    data.put("email", email);
    data.put("content", content);
    data.put("branch", clean(request.getParameter("branch"), 30, false));
    data.put("symptom", clean(request.getParameter("symptom"), 50, false));
    data.put("device", clean(request.getParameter("device"), 50, false));
    String[] routes = request.getParameterValues("route");
    if (routes != null) {
        StringBuilder rb = new StringBuilder();
        for (int i = 0; i < routes.length && i < 10; i++) {
            String r = clean(routes[i], 20, false);
            if (r.length() == 0) continue;
            if (rb.length() > 0) rb.append(", ");
            rb.append(r);
        }
        data.put("route", rb.toString());
    }
    data.put("page", clean(request.getParameter("page"), 200, false));
    data.put("ip", ip);
    data.put("userAgent", clean(request.getHeader("User-Agent"), 300, false));

    try {
        String id = saveInquiry(application, data);
        out.print(json(true, "문의가 정상적으로 접수되었습니다. 확인 후 담당자가 빠르게 연락드리겠습니다.", id));
    } catch (Exception e) {
        application.log("[inquiry] 저장 실패: " + e.getMessage(), e);
        response.setStatus(500);
        out.print(json(false, "일시적인 오류로 접수하지 못했습니다. " + CS_TEL + " 로 전화 주시면 바로 도와드리겠습니다.", null));
    }
%>
