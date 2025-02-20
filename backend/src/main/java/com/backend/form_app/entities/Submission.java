package com.backend.form_app.entities;

import com.backend.form_app.entities.questions.Question;
import lombok.Getter;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Document("submissions")
@ToString
public class Submission {

    @Id
    private ObjectId _id;

    private final ObjectId formId;
    @Getter
    private final List<Answer> answers;
    @Getter
    private final Date respondedAt;

    public Submission(ObjectId formId, List<Answer> answers, Date respondedAt) {
        this.formId = formId;
        this.answers = answers;
        this.respondedAt = respondedAt;
    }
}
