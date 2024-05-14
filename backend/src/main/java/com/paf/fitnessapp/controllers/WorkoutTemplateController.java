package com.paf.fitnessapp.controllers;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.paf.fitnessapp.models.WorkoutTemplateModel;
import com.paf.fitnessapp.services.WorkoutTemplateService;

@CrossOrigin
@RestController
@RequestMapping("/workout-templates")
public class WorkoutTemplateController {
	
	@Autowired
    private WorkoutTemplateService workoutTemplateService;

    private static final Logger logger = LoggerFactory.getLogger(WorkoutTemplateController.class);
    
    @GetMapping
    public ResponseEntity<List<WorkoutTemplateModel>> getAllWorkoutTemplates() {
        try {
            // Retrieve all workout templates
            List<WorkoutTemplateModel> workoutTemplates = workoutTemplateService.getAllWorkoutTemplates();

            // Log success message
            logger.info("Retrieved all workout templates");

            // Return response with workout templates and HTTP status code 200 (OK)
            return new ResponseEntity<>(workoutTemplates, HttpStatus.OK);
        } catch (Exception e) {
            // Log error message
            logger.error("Error occurred while retrieving all workout templates", e);

            // Return an HTTP status code indicating an internal server error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{workoutTemplateId}")
    public ResponseEntity<WorkoutTemplateModel> getWorkoutPlanById(@PathVariable String workoutTemplateId) {
        try {
            // Retrieve workout plan by id
            Optional<WorkoutTemplateModel> workoutPlan = workoutTemplateService.getWorkoutTemplateByTemplateId(workoutTemplateId);
            
            // Check if workout plan exists
            if (workoutPlan.isPresent()) {
                // Log success message
                logger.info("Retrieved workout Template with id: {}", workoutTemplateId);
                
                // Return response with workout plan and HTTP status code 200 (OK)
                return new ResponseEntity<>(workoutPlan.get(), HttpStatus.OK);
            } else {
                // Log error message
                logger.error("Workout Template not found with id: {}", workoutTemplateId);
                
                // Return an HTTP status code indicating not found
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            // Log error message
            logger.error("Error occurred while retrieving workout Template with id: {}", workoutTemplateId, e);
            
            // Return an HTTP status code indicating an internal server error
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
