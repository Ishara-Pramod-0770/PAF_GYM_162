import { Grid } from "@mui/material";
import React from "react";
import HomeSection from "../HomeSection/HomeSection";
import RightPart from "../RightPart/RightPart";
import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import TwitDetails from "../TwitDetails/TwitDetails";
import WorkoutPlans from "../WorkoutPlans/WorkoutPlans";
import WorkoutStatus from "../WorkoutStatus/WorkoutStatus";
import MealPlans from "../MealPlans/MealPlans";
import CustomDrawer from "../Drawer/CustomDrawer";
import CreateWorkoutPlan from "../WorkoutPlans/CreateWorkoutPlan";
import WorkoutStatusFeed from "../WorkoutStatus/WorkoutStatusFeed";
import ViewWorkoutPlan from "../WorkoutPlans/ViewWorkoutPlan";
import EditWorkoutPlan from "../WorkoutPlans/EditWorkoutPlan";
import CreatePlanFromTemplate from "../WorkoutPlans/CreatePlanFromTemplate";
import Login from "../Login/Login";
import Register from "../Register/Register";
import LandingPage from "../Landing/LandingPage";

export default function HomePage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            <Grid container spacing={2} sx={{ marginLeft: 2 }}>
              <CustomDrawer />
              <Grid item xs={8}>
                <Routes>
                  <Route path="/home" element={<HomeSection />} />
                  <Route path="/profile/:id" element={<Profile />} />
                  <Route path="/twit/:id" element={<TwitDetails />} />
                  <Route path="/workout-plans" element={<WorkoutPlans />} />
                  <Route
                    path="/workout-status"
                    element={<WorkoutStatus />}
                  />
                  <Route path="/meal-plans" element={<MealPlans />} />
                  <Route
                    path="/create-workout-plan"
                    element={<CreateWorkoutPlan />}
                  />
                  <Route
                    path="/workout-status-feed"
                    element={<WorkoutStatusFeed />}
                  />
                  <Route path="/workout-plan" element={<ViewWorkoutPlan />} />
                  <Route
                    path="/edit-workout-plan"
                    element={<EditWorkoutPlan />}
                  />
                  <Route
                    path="/create-plan-from-template"
                    element={<CreatePlanFromTemplate />}
                  />
                </Routes>
              </Grid>
              <Grid item xs={2}>
                <RightPart />
              </Grid>
            </Grid>
          }
        />
      </Routes>
    </div>
  );
}
