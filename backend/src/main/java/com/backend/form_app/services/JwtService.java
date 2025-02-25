package com.backend.form_app.services;

import com.backend.form_app.entities.User;
import com.backend.form_app.repositories.UserRepository;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;
import java.util.Date;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

@Component
@Slf4j
public class JwtService {

    private final SecretKey secretKey;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;

    public JwtService(UserDetailsService userDetailsService,
                      @Value("${jwtKey}") String keyString, UserRepository userRepository) {
        this.secretKey = Keys.hmacShaKeyFor(keyString.getBytes());
        this.userDetailsService = userDetailsService;
        this.userRepository = userRepository;
    }

    public String createToken(String username) {
        User user = userRepository.findByLogin(username);
        long lastLogout = user.getLastLogout();

        return Jwts.builder()
                .subject(username)
                .expiration(Date.from(Instant.now().plus(14, ChronoUnit.DAYS)))
                .claim("last_logout", lastLogout)
                .signWith(secretKey)
                .compact();
    }

    public String validateAndGetUsername(String token) {
        Jws<Claims> claims = Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token);

        String username = claims.getPayload().getSubject();

        long lastLogout = (long) (int) claims.getPayload().get("last_logout");

        User user = userRepository.findByLogin(username);
        long userLastLogout = user.getLastLogout();

        if (userLastLogout != lastLogout && userLastLogout != 0) {
            throw new RuntimeException("JWT token expired");
        }

        return username;
    }

    public Authentication validateAndGetAuth(String token) {
        String username = validateAndGetUsername(token);
        log.info("Found username: " + username);

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        log.info("Found user details: " + userDetails);

        return new UsernamePasswordAuthenticationToken(userDetails,
                        null,
                        userDetails.getAuthorities()
        );
    }

}
