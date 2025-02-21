package com.backend.form_app.entities;

import com.backend.form_app.entities.questions.Question;
import lombok.Getter;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

public class Answer {

    @Getter
    private ObjectId questionId;
    @Getter
    private Object response;
}
