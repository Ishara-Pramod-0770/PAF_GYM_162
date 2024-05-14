import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import banner from "./banner.jpg";
import verification from "./verification.png";
// import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
// import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import TweetCard from "../HomeSection/TweetCard";
import MyWorkoutStatus from "../WorkoutStatus/MyWorkoutStatus";
import WorkoutStatusFeed from "../WorkoutStatus/WorkoutStatusFeed";
import ProfileModel from "./ProfileModel";

const Profile = () => {
  const [tabValue, setTabValue] = useState("");
  const navigate = useNavigate();
  const [openProfileModel, setOpenProfileModel] = useState(false);
  const handleOpenProfileModel = () => setOpenProfileModel(true);
  const handleClose = () => setOpenProfileModel(false);
  const handleBack = () => navigate(-1);
  // const handleOpenProfileModel = () => {
  //   console.log("Open Profile Model");
  // };
  const handleFollowUser = () => {
    console.log("Follow User");
  };
  const handleTabChange = (event, newValue) => {
    console.log("Tab Value");
    setTabValue(newValue);
    if (newValue === 4) {
      console.log("Like twits");
    } else if (newValue === 1) {
      console.log("users twits");
    }
  };
  return (
    <div>
      <section
        className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}
      >
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">
          Code With Ishara
        </h1>
      </section>
      <section>
        <img className="w-[100%] h-[15rem] object-cover" src={banner} alt="" />
      </section>
      <section className="pl-6">
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            alt="code with ishara"
            src="http://localhost:3000/static/media/avatar.f48dd380aa7de7ba31ba.png"
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          />

          {true ? (
            <Button
              onClick={handleOpenProfileModel}
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={handleFollowUser}
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              {true ? "Follow" : "Unfollow"}
            </Button>
          )}
        </div>
        <div className="">
          <div className="flex items-center">
            <h1 className="font-bold text-lg">Code With Ishara</h1>
            {true && <img className="ml-2 w-5 h-5" src={verification} alt="" />}
          </div>
          <h1 className="text-gray-500">@isharapramod</h1>
        </div>

        <div className="mt-2 space-y-3">
          <p>Zero 2 Hero</p>
          <div className="py-1 flex space-x-5">
            <div className="flex item-center text-gray-500">
              <BusinessCenterIcon className="" />
              <p className="ml-2">Education</p>
            </div>

            <div className="flex item-center text-gray-500">
              <LocationOnIcon className="" />
              <p className="ml-2">Sri Lanka</p>
            </div>

            <div className="flex item-center text-gray-500">
              <CalendarMonthIcon className="" />
              <p className="ml-2">Joined Jan 2024</p>
            </div>
          </div>
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-1 font-semibold">
              <span>190</span>
              <span className="text-gray-500">Follwing</span>
            </div>
          </div>
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-1 font-semibold">
              <span>590</span>
              <span className="text-gray-500">Follwers</span>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
              >
                <Tab label="workout status" value="1" />
                <Tab label="workout" value="2" />
                <Tab label="Media" value="3" />
                <Tab label="Likes" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <WorkoutStatusFeed />
            </TabPanel>
            <TabPanel value="2">
              
            </TabPanel>
            <TabPanel value="3">
              <MyWorkoutStatus />
            </TabPanel>
            <TabPanel value="4">likes</TabPanel>
          </TabContext>
        </Box>
      </section>
      <section>
        <ProfileModel handleClose={handleClose} open={openProfileModel} />
      </section>
    </div>
  );
};

export default Profile;
