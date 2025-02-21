package com.backend.form_app.dtos;

import com.backend.form_app.entities.questions.QuestionType;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public record QuestionDto(

        String title,
        QuestionType type,
        boolean required,
        Map<String, Object> data,
        List<MultipartFile> images
        //List<String> options, // radio buttons
        //Date selectedDate
) { }
