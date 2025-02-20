package com.backend.form_app.entities.questions;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
public class GenericQuestion extends Question {

    public GenericQuestion(String title, boolean required, QuestionType type,
                           Map<String, Object> data) throws IllegalArgumentException {
        super(title, required, type);
    }

}

