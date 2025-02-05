package com.backend.form_app.controllers;

import com.backend.form_app.dtos.AccountInfoDto;
import com.backend.form_app.entities.User;
import com.backend.form_app.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.backend.form_app.services.JwtService;
import com.backend.form_app.dtos.CredentialDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /*
    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }
     */

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

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody AccountInfoDto accountInfoDto) {
        log.info(accountInfoDto.toString());

        if (userRepository.existsByLogin(accountInfoDto.login())) {
            return ResponseEntity
                    .badRequest()
                    .body("Username is already taken.");
        }

        if (userRepository.existsByEmail(accountInfoDto.email())) {
            return ResponseEntity
                    .badRequest()
                    .body("Account with email already exists.");
        }

        User signupUser = new User(
                accountInfoDto.login(),
                accountInfoDto.email(),
                passwordEncoder.encode(accountInfoDto.password()),
                List.of("USER")
        );

        log.info("Signup user: " + signupUser);

        userRepository.insert(signupUser);

        log.info("User inserted");

        return ResponseEntity.ok().body("Account created.");
    }
}
