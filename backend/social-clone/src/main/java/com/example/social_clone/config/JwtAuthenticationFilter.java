package com.example.social_clone.config;


import com.example.social_clone.dto.AuthenticatedUser;
import com.example.social_clone.security.JwtService;
import com.example.social_clone.service.TokenBlacklistService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.PrintWriter;
import java.security.SignatureException;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilter {

    private final JwtService jwtService;
    private final TokenBlacklistService tokenBlacklistService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpReq = (HttpServletRequest) request;
        HttpServletResponse httpResp = (HttpServletResponse) response;
        String authHeader = httpReq.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            // ✅ Check if token is blacklisted
            if (tokenBlacklistService.isTokenBlacklisted(token)) {
                sendErrorResponseForBlackList(httpResp, "Token is blacklisted. Please login again.");
                return;
            }

            try {
                if (jwtService.isTokenValid(token)) {
                    String username = jwtService.extractUsername(token);
                    Long userId = jwtService.extractUserId(token);

                    AuthenticatedUser user = new AuthenticatedUser(userId, username);

                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }

            } catch (ExpiredJwtException e) {
                sendErrorResponse(httpResp, "Token expired");
                return;
            } catch (MalformedJwtException e) {
                sendErrorResponse(httpResp, "Invalid token");
                return;
            } catch (Exception e) {
                sendErrorResponse(httpResp, "Authentication error: " + e.getMessage());
                return;
            }
        }

        chain.doFilter(request, response);
    }

    private void sendErrorResponse(HttpServletResponse response, String message) throws IOException {
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        PrintWriter writer = response.getWriter();
        writer.write("{ \"status\": 401, \"message\": \"" + message + "\" }");
        writer.flush();
    }

    private void sendErrorResponseForBlackList(HttpServletResponse response, String message) throws IOException {
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        PrintWriter writer = response.getWriter();
        writer.write("{ \"status\": 200, \"message\": \"" + message + "\" }");
        writer.flush();
    }
}
