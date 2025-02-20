package com.backend.form_app.services;

import com.backend.form_app.dtos.FormDto;
import com.backend.form_app.dtos.QuestionDto;
import com.backend.form_app.dtos.submission.AnswerResultDto;
import com.backend.form_app.dtos.submission.SubmissionDto;
import com.backend.form_app.dtos.submission.SubmissionResultDto;
import com.backend.form_app.entities.Form;
import com.backend.form_app.entities.Submission;
import com.backend.form_app.entities.questions.Question;
import com.backend.form_app.entities.questions.QuestionType;
import com.backend.form_app.repositories.FormRepository;
import com.backend.form_app.repositories.QuestionRepository;
import com.backend.form_app.repositories.SubmissionRepository;
import com.backend.form_app.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.lang.reflect.InvocationTargetException;
import java.time.Instant;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class FormService {

    private final FormRepository formRepository;
    private final QuestionRepository questionRepository;
    private final SubmissionRepository submissionRepository;

    public ObjectId createForm(FormDto formDto) throws InvocationTargetException,
            InstantiationException, IllegalAccessException, NoSuchMethodException {
        //String userLogin = SecurityContextHolder.getContext().getAuthentication().getName();
        //String userId = userRepository.findByLogin(userLogin).getId();
        String userId = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();

        ArrayList<Question> questions = new ArrayList<>();
        for (QuestionDto questionDto : formDto.questions()) {
            Question question = createQuestion(questionDto);
            questions.add(question);
        }

        Date timeNow = Date.from(Instant.now());
        Form createdForm = new Form(formDto.title(), formDto.description(), userId, questions, timeNow, timeNow);

        formRepository.insert(createdForm);

        return createdForm.get_id();
    }

    public void updateForm(ObjectId formId, FormDto formDto) {
        String userId = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();

        List<Question> questions = formDto.questions().stream().map(
                questionDto -> {
                    try {
                        return createQuestion(questionDto);
                    } catch (InvocationTargetException | InstantiationException | IllegalAccessException |
                             NoSuchMethodException e) {
                        throw new RuntimeException(e);
                    }
                }
                ).toList();

        Date timeNow = Date.from(Instant.now());
        Date createdTime = formRepository.findBy_id(formId).get().getCreatedAt();

        Form updatedForm = new Form(formId, formDto.title(), formDto.description(), userId, questions, createdTime, timeNow);
        formRepository.save(updatedForm);
    }

    public Question createQuestion(QuestionDto questionDto) throws IllegalArgumentException,
            InvocationTargetException, InstantiationException, IllegalAccessException, NoSuchMethodException {

        if (questionDto.type() == QuestionType.MULTIPLE_CHOICE) {
            log.info("Question options: " + questionDto.data().get("options"));
        }
        //QuestionType questionType = QuestionType.valueOf(questionDto.type());
        Question createdQuestion = (Question) questionDto.type().value.getConstructor(String.class, boolean.class, QuestionType.class, Map.class) //.getConstructors()[1]
            .newInstance(
                    questionDto.title(),
                    questionDto.required(),
                    questionDto.type(),
                    questionDto.data()
            );

        questionRepository.insert(createdQuestion);

        return createdQuestion; //createdQuestion.get_id();
    }

    public void processSubmission(SubmissionDto submissionDto) {
        submissionRepository.insert(new Submission(submissionDto.formId(), submissionDto.answers(), submissionDto.respondedAt()));
    }

    public List<SubmissionResultDto> getSubmissionResults(ObjectId formId) {
        List<Submission> submissions = submissionRepository.findAllByFormId(formId);
        log.info("Submissions: " + Arrays.toString(submissions.toArray()));

        List<SubmissionResultDto> submissionResults = submissions.stream().map(
                submission -> convertSubmissionToSubmissionResult(submission)
        ).toList();
        log.info("Submission results: " + Arrays.toString(submissionResults.toArray()));

        return submissionResults;
    }

    public SubmissionResultDto convertSubmissionToSubmissionResult(Submission submission) {

        List<AnswerResultDto> answerResults = submission.getAnswers().stream().map(
                answer -> new AnswerResultDto(
                        questionRepository.findById(answer.getQuestionId()).orElse(null),
                        answer.getResponse()
                )
        ).toList();

        return new SubmissionResultDto(answerResults, submission.getRespondedAt());
    }

    public List<Form> getUserForms() {
        UserDetailsImpl user = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return getUserForms(user);
    }

    public List<Form> getUserForms(UserDetailsImpl user) {
        return formRepository.findAllByOwnerId(user.getId());
    }

    public void deleteForm(ObjectId formId) {
        formRepository.deleteBy_id(formId);
    }
}
