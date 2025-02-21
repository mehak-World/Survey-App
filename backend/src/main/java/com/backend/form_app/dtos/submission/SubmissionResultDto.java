package com.backend.form_app.dtos.submission;

import com.backend.form_app.entities.Answer;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.util.Date;
import java.util.List;

public record SubmissionResultDto (
        List<AnswerResultDto> answers,
        Date respondedAt
) {
}
