package com.paf.fitnessapp.controllers;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.paf.fitnessapp.models.WorkoutPlanModel;
import com.paf.fitnessapp.services.WorkoutPlanService;

@CrossOrigin
@RestController
@RequestMapping("/workout-plans")
public class WorkoutPlanController {
    
    @Autowired
    private WorkoutPlanService workoutPlanService;
    
    private static final Logger logger = LoggerFactory.getLogger(WorkoutPlanController.class);
    
    @PostMapping
    public ResponseEntity<WorkoutPlanModel> createWorkoutPlan(@RequestBody WorkoutPlanModel workoutPlanModel) {
        try {
            // Create the workout plan
            WorkoutPlanModel createdWorkoutPlan = workoutPlanService.createWorkoutPlan(workoutPlanModel);
            
            // Log success message
            logger.info("Workout plan created successfully: {}", createdWorkoutPlan.getId());
            
            // Return response with created workout plan and HTTP status code 201 (CREATED)
            return new ResponseEntity<>(createdWorkoutPlan, HttpStatus.CREATED);
        } catch (Exception e) {
            // Log error message
            logger.error("Error occurred while creating workout plan", e);
            
            // Return an HTTP status code indicating an internal server error
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/users/{userId}")
    public ResponseEntity<List<WorkoutPlanModel>> getWorkoutPlansByUserId(@PathVariable String userId) {
        try {
            // Retrieve workout plans by userId
            List<WorkoutPlanModel> workoutPlans = workoutPlanService.getWorkoutPlansByUserId(userId);
            
            // Log success message
            logger.info("Retrieved {} workout plans for userId: {}", workoutPlans.size(), userId);
            
            // Return response with workout plans and HTTP status code 200 (OK)
            return new ResponseEntity<>(workoutPlans, HttpStatus.OK);
        } catch (Exception e) {
            // Log error message
            logger.error("Error occurred while retrieving workout plans for userId: {}", userId, e);
            
            // Return an HTTP status code indicating an internal server error
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<WorkoutPlanModel>> getWorkoutPlansByStatus(@PathVariable String status) {
        try {
            // Retrieve workout plans by userId
            List<WorkoutPlanModel> workoutPlans = workoutPlanService.getAllPublicWorkoutPlans(status);
            
            // Log success message
            logger.info("Retrieved {} workout plans that are SHARED", workoutPlans.size());
            
            // Return response with workout plans and HTTP status code 200 (OK)
            return new ResponseEntity<>(workoutPlans, HttpStatus.OK);
        } catch (Exception e) {
            // Log error message
            logger.error("Error occurred while retrieving Shared workout plans", e);
            
            // Return an HTTP status code indicating an internal server error
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/{workoutPlanId}")
    public ResponseEntity<WorkoutPlanModel> getWorkoutPlanById(@PathVariable String workoutPlanId) {
        try {
            // Retrieve workout plan by id
            Optional<WorkoutPlanModel> workoutPlan = workoutPlanService.getWorkoutPlanById(workoutPlanId);
            
            // Check if workout plan exists
            if (workoutPlan.isPresent()) {
                // Log success message
                logger.info("Retrieved workout plan with id: {}", workoutPlanId);
                
                // Return response with workout plan and HTTP status code 200 (OK)
                return new ResponseEntity<>(workoutPlan.get(), HttpStatus.OK);
            } else {
                // Log error message
                logger.error("Workout plan not found with id: {}", workoutPlanId);
                
                // Return an HTTP status code indicating not found
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            // Log error message
            logger.error("Error occurred while retrieving workout plan with id: {}", workoutPlanId, e);
            
            // Return an HTTP status code indicating an internal server error
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{workoutPlanId}")
    public ResponseEntity<WorkoutPlanModel> updateWorkoutPlan(@PathVariable String workoutPlanId,
                                                              @RequestBody WorkoutPlanModel updatedWorkoutPlan) {
        try {
            // Retrieve the existing workout plan
            Optional<WorkoutPlanModel> existingWorkoutPlan = workoutPlanService.getWorkoutPlanById(workoutPlanId);
            
            // Check if the workout plan exists
            if (existingWorkoutPlan.isPresent()) {
                // Update the workout plan with the new data
                WorkoutPlanModel savedWorkoutPlan = workoutPlanService.updateWorkoutPlan(existingWorkoutPlan.get(), updatedWorkoutPlan);
                
                // Log success message
                logger.info("Workout plan updated successfully with id: {}", workoutPlanId);
                
                // Return response with updated workout plan and HTTP status code 200 (OK)
                return new ResponseEntity<>(savedWorkoutPlan, HttpStatus.OK);
            } else {
                // Log error message
                logger.error("Workout plan not found with id: {}", workoutPlanId);
                
                // Return an HTTP status code indicating not found
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            // Log error message
            logger.error("Error occurred while updating workout plan with id: {}", workoutPlanId, e);
            
            // Return an HTTP status code indicating an internal server error
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @DeleteMapping("/{workoutPlanId}")
    public ResponseEntity<String> deleteWorkoutPlan(@PathVariable String workoutPlanId) {
        try {
            // Delete the workout plan by id
            boolean deleted = workoutPlanService.deleteWorkoutPlanById(workoutPlanId);
            
            // Check if the workout plan was successfully deleted
            if (deleted) {
                // Log success message
                logger.info("Workout plan deleted successfully with id: {}", workoutPlanId);
                
                // Return response with HTTP status code 204 (NO_CONTENT)
                return new ResponseEntity<>("Workout Plan with ID " + workoutPlanId + "has been Deleted Successfully", HttpStatus.NO_CONTENT);
            } else {
                // Log error message
                logger.error("Workout plan not found with id: {}", workoutPlanId);
                
                // Return an HTTP status code indicating not found
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            // Log error message
            logger.error("Error occurred while deleting workout plan with id: {}", workoutPlanId, e);
            
            // Return an HTTP status code indicating an internal server error
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}
