package com.backend.form_app.dtos.submission;

import com.backend.form_app.entities.Answer;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

public record SubmissionDto(
        ObjectId formId,
        List<Answer> answers,

        // Multiple choice: 0,1,2,...
        // Rating: 0, ... ,5
        // Text: String
        // Date: Date
        Date respondedAt
) {

}
