package com.backend.form_app.controllers;

import com.backend.form_app.repositories.FormRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@Slf4j
@RequestMapping("/user")
@RequiredArgsConstructor
//@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    private final FormRepository formRepository;

    @GetMapping("/home")
    public String hello() {
        return "HEY";
    }

    @GetMapping("/greet")
    public String greet() {
        Object credentials = SecurityContextHolder.getContext().getAuthentication().getCredentials();
        log.info("Greeting user...");
        return ("Hello " + credentials);
    }

    @GetMapping("/form/{id}")
    public String getFormById(int id) {
        return null;
    }

    @GetMapping("/get_by_title")
    public String getByTitle() {
        return Arrays.toString(formRepository.findAllByTitle("Very cool form").toArray());
    }

}
