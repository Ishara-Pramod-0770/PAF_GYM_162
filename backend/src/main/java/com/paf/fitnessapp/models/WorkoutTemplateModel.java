package com.paf.fitnessapp.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "workout_templates")
public class WorkoutTemplateModel {
	 @Id
    private String templateId;
    private String title;
    private ExerciseModel[] exercises;
    
	public WorkoutTemplateModel(String templateId, String title, ExerciseModel[] exercises) {
		super();
		this.templateId = templateId;
		this.title = title;
		this.exercises = exercises;
	}
	
	public String getTemplateId() {
		return templateId;
	}
	public void setId(String templateId) {
		this.templateId = templateId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public ExerciseModel[] getExercises() {
		return exercises;
	}
	public void setExercises(ExerciseModel[] exercises) {
		this.exercises = exercises;
	}

    
}