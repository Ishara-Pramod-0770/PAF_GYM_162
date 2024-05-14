package com.paf.fitnessapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paf.fitnessapp.models.WorkoutTemplateModel;
import com.paf.fitnessapp.repositories.WorkoutTemplateRepository;

@Service
public class WorkoutTemplateService {
	
	@Autowired
	private  WorkoutTemplateRepository workoutTemplateRepository;

    public List<WorkoutTemplateModel> getAllWorkoutTemplates() {
        return workoutTemplateRepository.findAll();
    }

    // Method to retrieve a specific workout plan by its own id
    public Optional<WorkoutTemplateModel> getWorkoutTemplateByTemplateId(String workoutTemplateId) {
        return workoutTemplateRepository.findByTemplateId(workoutTemplateId);
    }       
    
}
