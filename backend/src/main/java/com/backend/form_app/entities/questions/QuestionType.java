package com.backend.form_app.entities.questions;

public enum QuestionType {

    TEXT(GenericQuestion.class),
    MULTIPLE_CHOICE(MultipleChoiceQuestion.class),
    RATING(GenericQuestion.class),
    DATE(GenericQuestion.class);

    public final Class<? extends Question> value;
    private QuestionType(Class<? extends Question> value) {
        this.value = value;
    }
}
