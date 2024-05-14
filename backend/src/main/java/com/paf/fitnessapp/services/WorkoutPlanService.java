package com.paf.fitnessapp.services;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paf.fitnessapp.models.WorkoutPlanModel;
import com.paf.fitnessapp.repositories.WorkoutPlanRepository;

@Service
public class WorkoutPlanService {
    
    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;
    
    public WorkoutPlanModel createWorkoutPlan(WorkoutPlanModel workoutPlanModel) {
        return workoutPlanRepository.save(workoutPlanModel);
    }

    // Method to retrieve workout plans by userId
    public List<WorkoutPlanModel> getWorkoutPlansByUserId(String userId) {
        return workoutPlanRepository.findByUserId(userId);
    }

    // Method to retrieve workout plans by userId
    public List<WorkoutPlanModel> getAllPublicWorkoutPlans(String status) {
        return workoutPlanRepository.findByStatus(status);
    }

    // Method to retrieve a specific workout plan by its own id
    public Optional<WorkoutPlanModel> getWorkoutPlanById(String workoutPlanId) {
        // Convert String ID to ObjectId
        ObjectId id = new ObjectId(workoutPlanId);
        return workoutPlanRepository.findById(id);
    }

     // Method to update an existing workout plan
     public WorkoutPlanModel updateWorkoutPlan(WorkoutPlanModel existingWorkoutPlan, WorkoutPlanModel updatedWorkoutPlan) {
        if (updatedWorkoutPlan.getTitle() != null) {
            existingWorkoutPlan.setTitle(updatedWorkoutPlan.getTitle());
        }
        if (updatedWorkoutPlan.getDateCreated() != null) {
            existingWorkoutPlan.setDateCreated(updatedWorkoutPlan.getDateCreated());
        }
        if (updatedWorkoutPlan.getAge() != null) {
            existingWorkoutPlan.setAge(updatedWorkoutPlan.getAge());
        }
        if (updatedWorkoutPlan.getUserName() != null) {
            existingWorkoutPlan.setUserName(updatedWorkoutPlan.getUserName());
        }
        if (updatedWorkoutPlan.getExercises() != null) {
            existingWorkoutPlan.setExercises(updatedWorkoutPlan.getExercises());
        }
        if (updatedWorkoutPlan.getStatus() != null) {
            existingWorkoutPlan.setStatus(updatedWorkoutPlan.getStatus());
        }
        // Save the updated workout plan to the database
        return workoutPlanRepository.save(existingWorkoutPlan);
    }

    // Method to delete a workout plan by its id
    public boolean deleteWorkoutPlanById(String workoutPlanId) {
        // Convert String ID to ObjectId
        ObjectId id = new ObjectId(workoutPlanId);
        
        // Check if the workout plan exists
        if (workoutPlanRepository.existsById(id)) {
            // Delete the workout plan from the database
            workoutPlanRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}