package com.paf.fitnessapp.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.paf.fitnessapp.models.WorkoutTemplateModel;

@Repository
public interface WorkoutTemplateRepository extends MongoRepository<WorkoutTemplateModel, String> {

    Optional<WorkoutTemplateModel> findByTemplateId(String workoutTemplateId);

}
