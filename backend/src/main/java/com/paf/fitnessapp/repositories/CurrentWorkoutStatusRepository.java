package com.paf.fitnessapp.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.paf.fitnessapp.models.CurrentWorkoutStatusModel;




@Repository
public interface CurrentWorkoutStatusRepository extends MongoRepository<CurrentWorkoutStatusModel, String> {
    List<CurrentWorkoutStatusModel> findByUserId(String userId);
}


