package com.backend.form_app.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.backend.form_app.entities.Form;

import java.util.Date;
import java.util.List;

public interface FormRepository extends MongoRepository<Form, String> {

    List<Form> findAllByTitle(String title);
    List<Form> findAllByOwnerId(String owner);
}
