import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCandidates } from "../../Helpers/getData";
import { partySymbols } from "../../Helpers/partySymbols";
import Snackbars from "../../Helpers/SnackBar";
import CandidateCard from "../Components/CandidatesCard";
import CandidatesEmptyPage from "../Components/EmptyPages";

export default function VoterArea() {
  const dispatch = useDispatch();
  const [aadhar, setAadhar] = useState("");
  const [alert, setAlert] = useState("");
  const [state, setState] = useState("");
  const [alertName, setAlertName] = useState("");
  const [isVoted, setIsVoted] = useState(false);
  const email = localStorage.getItem("email");

  const [hours, setHours] = useState(8);

  const [minutes, setMinutes] = useState(0);

  const [seconds, setSeconds] = useState(60);

  const date = new Date();

  const getAadhar = async () => {
    try {
      const res = await eVote.methods.usersList(email).call();
      setAadhar(res.aadhar);
      setIsVoted(res.isVoted);
    } catch (error) {}
  };
  const eVote = useSelector((state) => state.eVote.eVote);
  useEffect(() => {
    getCandidates(dispatch, eVote);
  }, [dispatch, eVote]);
  const candidatesList = useSelector(
    (state) => state.candidates.candidatesList
  );
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    if (aadhar === "") {
      setAlertName("You are not registered your aadhar");
      setAlert("warning");
    } else {
      setAlertName("You have already voted");
      setAlert("error");
    }
    setOpen(true);
  };
  useEffect(() => {
    getAadhar();
  });

  const getState = async () => {
    try {
      const st = await eVote.methods.changeState().call();
      // dispatch(changeStateAction(st));
      setState(st);
    } catch (error) {
      //alert(error.message)
    }
  };
  useEffect(() => {
    getState(state);
  });

  useEffect(() => {
    let timer = setInterval(() => {
      setSeconds(seconds - 1);

      if (seconds === 0) {
        setSeconds(59);
        setMinutes(minutes - 1);
      }

      if (minutes === 0) {
        setMinutes(59);
        setHours(hours - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  });

  if (candidatesList.length === 0 || state === "Registration") {
    return (
      <CandidatesEmptyPage
        image={
          "https://img.freepik.com/free-vector/voters-inserting-forms-into-ballot-boxes_74855-4585.jpg?size=626&ext=jpg&ga=GA1.1.1522381886.1646910666"
        }
        header={"Hold on! admin is adding candidates"}
      />
    );
  }
  if (state === "Result") {
    return (
      <CandidatesEmptyPage
        image={
          "https://img.freepik.com/free-vector/voters-inserting-forms-into-ballot-boxes_74855-4585.jpg?size=626&ext=jpg&ga=GA1.1.1522381886.1646910666"
        }
        header={"Voting is done , Results are announced"}
      />
    );
  }
 

  return (
    <div>
      <div style={{ display: "flex", flex: 1, flexWrap: "wrap" }}>
        {candidatesList.map((data, index) => (
          <CandidateCard
            aadhar={aadhar}
            handleClick={handleClick}
            key={index}
            id={index + 1}
            partyName={data.party}
            isVoted={isVoted}
            email={email}
            partySymbol={partySymbols[data.party]}
          />
        ))}
      </div>
      {/* <h3 style={{ position: "absolute", top: 70, right: 100, color: "red" }}>
        {" "}
        Date: {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
        <br />
        Voting ends in : {hours}:{minutes}:{seconds}
      </h3> */}

      <Snackbars
        alertName={alertName}
        alert={alert}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
