package com.backend.form_app.entities.questions;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//@AllArgsConstructor
@Getter
@Document("questions")
@NoArgsConstructor
public abstract class Question {

    @Id
    @JsonSerialize(using=ToStringSerializer.class)
    private ObjectId _id;

    private String title;
    private boolean required;
    private QuestionType type;

    public Question(String title, boolean required, QuestionType type) {
        this.title = title;
        this.required = required;
        this.type = type;
    }
    /*
    private List<String> options; // radio buttons
    private Date selectedDate; // date
    //private Bytes fileData; // file upload

    public AbstractQuestion(String text, String type, List<String> options, Date selectedDate) {
        this.text = text;
        this.type = type;
        this.options = options;
        this.selectedDate = selectedDate;
    }

     */
}
