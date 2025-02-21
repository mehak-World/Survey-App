package com.backend.form_app.entities.questions;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
@Slf4j
public class MultipleChoiceQuestion extends Question {

    private List<String> options;
    private boolean multipleSelect;

    @SuppressWarnings("unchecked")
    public MultipleChoiceQuestion(String title, boolean required, QuestionType type,
                                  Map<String, Object> data) throws IllegalArgumentException {
        super(title, required, type);

        try {
            this.options = (List<String>) data.get("options");
            this.multipleSelect = (boolean) data.get("multipleSelect");
        } catch (ClassCastException e) {
            throw new IllegalArgumentException("Data field does not contain required arguments: " +
                    Arrays.toString(e.getStackTrace()));
        }

    }

}
