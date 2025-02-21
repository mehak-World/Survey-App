package com.backend.form_app.repositories;

import com.backend.form_app.entities.Submission;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Optional;

public interface SubmissionRepository extends MongoRepository<Submission, ObjectId> {

    @NonNull
    Optional<Submission> findById(@NonNull ObjectId id);

    @NonNull
    List<Submission> findAllByFormId(@NonNull ObjectId id);


}
