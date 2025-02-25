package com.backend.form_app.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Getter
@NoArgsConstructor
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String login;
    private String email;
    private String password;
    private List<String> roles;
    @Setter
    private long lastLogout;

    public User(String login, String email, String password, List<String> roles) {
        this.login = login;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.lastLogout = 0;
    }

    public User(String login, String email, String password, List<String> roles, long lastLogout) {
        this.login = login;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.lastLogout = lastLogout;
    }

}
