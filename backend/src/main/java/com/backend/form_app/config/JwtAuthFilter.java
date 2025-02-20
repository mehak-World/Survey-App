package com.backend.form_app.config;

import com.backend.form_app.services.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    /*
    public JwtAuthFilter (JwtService jwtService) {
        this.jwtService = jwtService;
    }

     */

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        log.info("Auth: " + authHeader);
        //log.info("Headers: " + Collections.list(request.getHeaderNames()));
        //log.info("Request: " +    request.getReader().lines().collect(Collectors.joining(System.lineSeparator())));

        if (authHeader != null) {
            String[] authComponents = authHeader.split(" ");

            if (authComponents.length == 2 && Objects.equals(authComponents[0], "Bearer")) {
                try {
                    Authentication auth = jwtService.validateAndGetAuth(authComponents[1]);
                    log.info("Found user auth: " + auth);
                    SecurityContextHolder.getContext().setAuthentication(auth);
                } catch (RuntimeException e) {
                    //log.info("Error: " + e);
                    log.error("Filter runtime exception: " + e);
                    SecurityContextHolder.clearContext();
                    //throw e;

                }
            }
        }

        filterChain.doFilter(request, response);
    }
}
