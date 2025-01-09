package com.backend.form_app.controllers;

import lombok.extern.slf4j.Slf4j;
import com.backend.form_app.services.JwtService;
import com.backend.form_app.dtos.CredentialDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@Slf4j
public class AuthController {

    AuthenticationManager authenticationManager;
    JwtService jwtService;

    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody CredentialDto credentialDto) {

        log.info(credentialDto.toString());
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                credentialDto.login(), credentialDto.password()
        );

        Authentication authentication = authenticationManager.authenticate(token);
        if (authentication.isAuthenticated()) {
            String jwToken = jwtService.createToken(credentialDto.login()); // createToken(credentialDto);
            return ResponseEntity.ok(Map.of("token", jwToken));
        }

        throw new RuntimeException("Invalid password");
        //SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    /*
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody AccountInfoDto accountInfoDto) {
        log.info(accountInfoDto.toString());

    }

     */
}
