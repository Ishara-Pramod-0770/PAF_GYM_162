package com.paf.fitnessapp.config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

import com.paf.fitnessapp.models.ExerciseModel;
import com.paf.fitnessapp.models.WorkoutTemplateModel;
import com.paf.fitnessapp.repositories.WorkoutTemplateRepository;

import java.util.List;

@Component
public class WorkoutTemplateDataInitializer implements ApplicationRunner {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private WorkoutTemplateRepository workoutTemplateRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // Check if the collection exists
        if (!mongoTemplate.collectionExists("workout_templates")) {
            // Collection does not exist, insert data
            List<WorkoutTemplateModel> defaultTemplates = createDefaultWorkoutTemplates();
            try {
                workoutTemplateRepository.saveAll(defaultTemplates);
                System.out.println("Default workout templates saved successfully.");
            } catch (Exception e) {
                System.err.println("Failed to save default workout templates: " + e.getMessage());
                e.printStackTrace();
            }
        }
    }

    private List<WorkoutTemplateModel> createDefaultWorkoutTemplates() {
        // Create a list of default workout templates
        List<WorkoutTemplateModel> defaultTemplates = List.of(
            new WorkoutTemplateModel("WT001", "Beginner Full Body Workout", new ExerciseModel[] {
                new ExerciseModel("E001", "Bench Press", "Chest", "8", "3"),
                new ExerciseModel("E004", "Leg Press", "Legs", "10", "3"),
            }),
            new WorkoutTemplateModel("WT002", "Intermediate Upper Body Workout", new ExerciseModel[] {
                    new ExerciseModel("E008", "Pull-up", "Back", "6", "4"),
                    new ExerciseModel("E017", "Chest Fly", "Chest", "10", "3"),
                    new ExerciseModel("E021", "Crunches", "Core", "15", "3"),
            }),
            new WorkoutTemplateModel("WT003", "Advanced Leg Day", new ExerciseModel[] {
                new ExerciseModel("E006", "Squat", "Legs", "5", "5"),
                new ExerciseModel("E007", "Deadlift", "Legs", "5", "5"),
                new ExerciseModel("E033", "Hack Squat", "Legs", "8", "4"),
            }),
            new WorkoutTemplateModel("WT004", "Push-Pull Routine", new ExerciseModel[] {
                new ExerciseModel("E001", "Bench Press", "Chest", "6", "4"),
                new ExerciseModel("E008", "Pull-up", "Back", "6", "4"),
                new ExerciseModel("E005", "Shoulder Press", "Shoulders", "8", "3"),
            }),
            new WorkoutTemplateModel("WT005", "Cardio Blast", new ExerciseModel[] {
                new ExerciseModel("E029", "Bent Over Row", "Back", "10", "3"),
                new ExerciseModel("E046", "Leg Adduction", "Legs", "12", "3"),
                new ExerciseModel("E049", "Plank Jacks", "Core", "15", "3"),
            })
        );
        return defaultTemplates;
    }
}