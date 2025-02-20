package com.backend.form_app.dtos.submission;

import com.backend.form_app.entities.questions.Question;
import org.bson.types.ObjectId;

public record AnswerResultDto (
        Question question,
        Object response
) {
}
