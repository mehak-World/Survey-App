package com.backend.form_app.entities;

import com.backend.form_app.entities.questions.Question;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.Date;
import java.util.List;


@Getter
@ToString
@NoArgsConstructor
@Document("forms")
public class Form {

    @Id
    @JsonSerialize(using= ToStringSerializer.class)
    private ObjectId _id;

    private String title;
    private String description;
    private String ownerId;

    //@DocumentReference
    //private User owner;

    @DocumentReference
    private List<Question> questions;
    
    private Date createdAt;
    private Date updatedAt;

    public Form(String title, String description, String ownerId, List<Question> questions, Date createdAt, Date updatedAt) {
        this.title = title;
        this.description = description;
        this.ownerId = ownerId;
        this.questions = questions;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Form(ObjectId formId, String title, String description, String ownerId, List<Question> questions,
                Date createdAt, Date updatedAt) {
        this._id = formId;
        this.title = title;
        this.description = description;
        this.ownerId = ownerId;
        this.questions = questions;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }


    /*
    public static Form from(FormUpdateDto formUpdateDto) {

        return new Form(
                formUpdateDto.title(),
                formUpdateDto.ownerId(),
                formUpdateDto.questions(),
                formUpdateDto.createdAt(),
                formUpdateDto.updatedAt()
        );
    }

     */

    /*@Override
    public String toString() {
        return "Title: " + title;
    }

     */
}
