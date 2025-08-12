package com.example.user_auth.config;

import com.example.user_auth.dto.AuthenticatedUser;
import com.example.user_auth.security.JwtService;
import com.example.user_auth.service.TokenBlacklistService;
import com.example.user_auth.service.UserDetailsServiceImpl;
import io.jsonwebtoken.*;
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

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilter {

    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsService;
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

                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    AuthenticatedUser authenticatedUser = new AuthenticatedUser(userId, username);

                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    authenticatedUser, null, userDetails.getAuthorities());

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }

            } catch (ExpiredJwtException e) {
                sendErrorResponse(httpResp, "Token expired");
                return;
            } catch (SignatureException | MalformedJwtException e) {
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
