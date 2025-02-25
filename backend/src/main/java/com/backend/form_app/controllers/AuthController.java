package com.backend.form_app.controllers;

import com.backend.form_app.dtos.AccountInfoDto;
import com.backend.form_app.dtos.CredentialDto;
import com.backend.form_app.repositories.UserRepository;
import com.backend.form_app.services.AuthorizationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthorizationService authorizationService;
    private final UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody CredentialDto credentialDto) {

        Optional<Map<String,String>> tokenMap = authorizationService.handleLogin(credentialDto);
        if (tokenMap.isPresent()) {
            return ResponseEntity.ok().body(tokenMap);
        }

        return ResponseEntity.status(403).body("Bad credentials");
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody AccountInfoDto accountInfoDto) {
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

        authorizationService.handleSignup(accountInfoDto);

        return ResponseEntity.ok().body("Account created.");
    }

    @GetMapping("/userlogout")
    public ResponseEntity<?> logout() {

        authorizationService.handleLogout();

        return ResponseEntity.ok().body("Logged out");
    }
}
