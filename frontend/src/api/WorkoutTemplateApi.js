import axios from "axios";

const BASE_URL = "http://localhost:8443/api/workout-templates"

export const fetchAllWorkoutTemplates = () => axios.get(`${BASE_URL}`);
export const fetchWorkoutTemplateById = (templateId) => axios.get(`${BASE_URL}/${templateId}`);