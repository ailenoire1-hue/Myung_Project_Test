<%@ page contentType="text/csv; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" %><%@ include file="/WEB-INF/jspf/lib.jspf" %><%!
    static String csv(String s) {
        if (s == null) s = "";
        // 엑셀 수식 실행 방지
        if (s.length() > 0 && "=+-@".indexOf(s.charAt(0)) >= 0) s = "'" + s;
        return "\"" + s.replace("\"", "\"\"") + "\"";
    }
%><%
    if (session.getAttribute("myungAdmin") == null) { response.sendRedirect("/admin/login"); return; }
    request.setCharacterEncoding("UTF-8");
    String fType = nz(request.getParameter("type"));
    String fStatus = nz(request.getParameter("status"));
    String ql = nz(request.getParameter("q")).toLowerCase();

    String fname = "inquiries-" + new java.text.SimpleDateFormat("yyyyMMdd-HHmm").format(new java.util.Date()) + ".csv";
    response.setHeader("Content-Disposition", "attachment; filename=\"" + fname + "\"");
    response.setHeader("Cache-Control", "no-store");

    StringBuilder b = new StringBuilder("﻿");
    b.append("접수번호,접수일시,유형,상태,성명,연락처,이메일,저장장치,증상,지점,경로,문의내용,관리메모,IP\r\n");
    for (Properties p : listInquiries(application)) {
        String st = p.getProperty("status", "new");
        if (fType.length() > 0 && !fType.equals(p.getProperty("type"))) continue;
        if (fStatus.length() > 0 && !fStatus.equals(st)) continue;
        if (ql.length() > 0) {
            String hay = (p.getProperty("name", "") + " " + p.getProperty("phone", "") + " " + p.getProperty("email", "") + " " + p.getProperty("content", "") + " " + p.getProperty("branch", "")).toLowerCase();
            if (hay.indexOf(ql) < 0) continue;
        }
        b.append(csv(p.getProperty("id"))).append(',')
         .append(csv(p.getProperty("createdAt"))).append(',')
         .append(csv(typeLabel(p.getProperty("type")))).append(',')
         .append(csv(statusLabel(st))).append(',')
         .append(csv(p.getProperty("name"))).append(',')
         .append(csv(p.getProperty("phone"))).append(',')
         .append(csv(p.getProperty("email"))).append(',')
         .append(csv(p.getProperty("device"))).append(',')
         .append(csv(p.getProperty("symptom"))).append(',')
         .append(csv(p.getProperty("branch"))).append(',')
         .append(csv(p.getProperty("route"))).append(',')
         .append(csv(p.getProperty("content"))).append(',')
         .append(csv(p.getProperty("memo"))).append(',')
         .append(csv(p.getProperty("ip"))).append("\r\n");
    }
    application.log("[admin] csv export by " + request.getRemoteAddr());
    out.print(b.toString());
%>
