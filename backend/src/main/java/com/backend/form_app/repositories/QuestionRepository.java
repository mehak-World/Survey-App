package com.backend.form_app.repositories;

import com.backend.form_app.entities.questions.Question;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface QuestionRepository extends MongoRepository<Question, ObjectId> {

    Optional<Question> findById(ObjectId id);
}
