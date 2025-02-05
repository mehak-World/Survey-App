package com.backend.form_app.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@AllArgsConstructor
@Getter
@Document("forms")
public class Form {

    @Id
    private String id;

    private String title;
    private String ownerId;
    private String[] question_ids;
    private Date create_time;
    private Date update_time;

    @Override
    public String toString() {
        return "Title: " + title;
    }
}
