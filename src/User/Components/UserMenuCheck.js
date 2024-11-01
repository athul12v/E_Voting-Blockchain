import React from "react";
import VoterArea from "../Screens/Voter-Area";
import VoterRegistration from "../Screens/Voter-Registration";
import Result from "../Screens/Result";
import About from "../Screens/About";
import DetailsScreen from "../Screens/DetailsScreen";
export default function UserMenuCheck(props) {
  if (props.name === "Voter-Area") return <VoterArea />;
  if (props.name === "Voter-Registration") return <VoterRegistration />;
  if (props.name === "Result") return <Result />;
  if (props.name === "About") return <About />;
  if (props.name === "My-Details") return <DetailsScreen />;
}
