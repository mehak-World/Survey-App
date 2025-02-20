package com.backend.form_app.services;

import com.backend.form_app.dtos.AccountInfoDto;
import com.backend.form_app.dtos.CredentialDto;
import com.backend.form_app.entities.Form;
import com.backend.form_app.entities.User;
import com.backend.form_app.repositories.FormRepository;
import com.backend.form_app.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthorizationService {

    private final FormRepository formRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public boolean checkFormBelongsToUser(ObjectId formId) {
        return checkFormBelongsToUser(
                formId,
                (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()
        );
    }

    public boolean checkFormBelongsToUser(ObjectId formId, UserDetailsImpl user) {
        Optional<Form> form = formRepository.findBy_id(formId);
        if (form.isEmpty()) {
            return false;
        }

        return checkFormBelongsToUser(form.get(), user);
    }

    public boolean checkFormBelongsToUser(Form form, UserDetailsImpl user) {
        return form.getOwnerId().equals(user.getId());
    }

    public Optional<Map<String, String>> handleLogin(CredentialDto credentialDto) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                credentialDto.login(), credentialDto.password()
        );

        Authentication authentication = authenticationManager.authenticate(token);
        if (authentication.isAuthenticated()) {
            String jwToken = jwtService.createToken(credentialDto.login());
            return Optional.of(Map.of("token", jwToken));
        }

        return Optional.empty();
    }

    public void handleSignup(AccountInfoDto accountInfoDto) {
        User signupUser = new User(
                accountInfoDto.login(),
                accountInfoDto.email(),
                passwordEncoder.encode(accountInfoDto.password()),
                List.of("USER")
        );

        userRepository.insert(signupUser);
    }

}
