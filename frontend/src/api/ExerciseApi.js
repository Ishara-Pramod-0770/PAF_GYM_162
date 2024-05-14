import axios from "axios";

const BASE_URL = "http://localhost:8443/api/exercises"

export const fetchChestExercises = (type) => axios.get(`${BASE_URL}/${type}`);
export const fetchArmExercises = (type) => axios.get(`${BASE_URL}/${type}`);
export const fetchLegExercises = (type) => axios.get(`${BASE_URL}/${type}`);
export const fetchCoreExercises = (type) => axios.get(`${BASE_URL}/${type}`);
export const fetchShoulderExercises = (type) => axios.get(`${BASE_URL}/${type}`);
export const fetchBackExercises = (type) => axios.get(`${BASE_URL}/${type}`);