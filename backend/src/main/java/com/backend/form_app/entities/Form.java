package com.backend.form_app.entities;

import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@Document("forms")
public class Form {

    @Id
    private String id;

    private String title;

    @Override
    public String toString() {
        return "Title: " + title;
    }
}
