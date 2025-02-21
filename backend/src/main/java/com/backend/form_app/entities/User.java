package com.backend.form_app.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private final String login;
    private final String email;
    private final String password;
    private final List<String> roles;

    public User(String login, String email, String password, List<String> roles) {
        this.login = login;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }

}
