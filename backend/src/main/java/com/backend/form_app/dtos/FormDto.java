package com.backend.form_app.dtos;

import org.bson.types.ObjectId;

import java.util.List;

public record FormDto(
        String title,
        String description,
        List<QuestionDto> questions
) {
}
