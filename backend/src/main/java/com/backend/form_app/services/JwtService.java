package com.backend.form_app.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;

@Component
@Slf4j
public class JwtService {

    private final SecretKey secretKey;
    private final UserDetailsService userDetailsService;

    public JwtService(UserDetailsService userDetailsService,
                      @Value("${jwtKey}") String keyString) {
        //this.secretKey = Jwts.SIG.HS256.key().build();
        this.secretKey = Keys.hmacShaKeyFor(keyString.getBytes());
        this.userDetailsService = userDetailsService;
    }

    public String createToken(String username) {
        return Jwts.builder()
                .subject(username)
                //.expiration()
                .signWith(secretKey)
                //.claim("role", )
                .compact();
    }

    public String validateAndGetUsername(String token) {
        Jws<Claims> claims = Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token);

        return claims.getPayload().getSubject();
    }

    public Authentication validateAndGetAuth(String token) {
        String username = validateAndGetUsername(token);
        log.info("Found username: " + username);

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        log.info("Found user details: " + userDetails);

        return new UsernamePasswordAuthenticationToken(userDetails,//username,
                        null,
                        userDetails.getAuthorities()
        );
    }

}
