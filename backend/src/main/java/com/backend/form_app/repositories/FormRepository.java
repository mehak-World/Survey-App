package com.backend.form_app.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.backend.form_app.entities.Form;

import java.util.List;
import java.util.Optional;

public interface FormRepository extends MongoRepository<Form, String> {

    Optional<Form> findBy_id(ObjectId id);
    List<Form> findAllByOwnerId(String ownerId);
    void deleteBy_id(ObjectId id);
}
