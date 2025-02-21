package com.backend.form_app;

import com.backend.form_app.dtos.QuestionDto;
import com.backend.form_app.entities.questions.Question;
import com.backend.form_app.entities.questions.QuestionType;
import com.backend.form_app.services.FormService;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@Slf4j
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = FormAppApplication.class)
public class FormAppApplicationTests {

    @Autowired
    private FormService formService;

    @Value("${cloudinaryKey}")
    private String secretKey;

    /*
    @Test
    public void questionCreationWorks() throws InvocationTargetException, NoSuchMethodException,
            InstantiationException, IllegalAccessException {
        QuestionDto questionDto = new QuestionDto(
                "Test Question",
                QuestionType.MULTIPLE_CHOICE,
                List.of("Option 1", "Option 2", "Option 3"),
                List.of()
        );

        Question question = formService.createQuestionFromDto(questionDto);

        log.info("Question class: " + question.getClass() + ", Question text: " + question.getTitle());
    }

     */

    @Test
    public void cloudinaryConnection() throws NoSuchAlgorithmException, IOException {




    }
}
