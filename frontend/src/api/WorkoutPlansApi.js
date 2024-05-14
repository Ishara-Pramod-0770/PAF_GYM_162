import axios from "axios";

const BASE_URL = "http://localhost:8443/api/workout-plans"

export const createWorkoutPlan = (payload) => axios.post(`${BASE_URL}`, payload);
export const fetchUserWorkoutPlans = (userId) => axios.get(`${BASE_URL}/users/${userId}`);
export const fetchWorkouPlanByStatus = (status) => axios.get(`${BASE_URL}/status/${status}`)
export const fetchWorkoutPlanById = (workoutPlanId) => axios.get(`${BASE_URL}/${workoutPlanId}`)
export const editWorkoutPlan = (workoutPlanId, payload) => axios.put(`${BASE_URL}/${workoutPlanId}`, payload)
export const deleteWorkoutPlan = (workoutPlanId) => axios.delete(`${BASE_URL}/${workoutPlanId}`)