import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { Button, MenuItem, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";
import Snackbars from "../../Helpers/SnackBar";

export default function AddCandidate() {
  const account = useSelector((state) => state.account.account);
  const eVote = useSelector((state) => state.eVote.eVote);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [party, setParty] = useState("");
  const [qualification, setQualification] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("");
  const [alertName, setAlertName] = useState("");
  const [alert, setAlert] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setAlertName("Please fill all details");
    setAlert("warning");
    setOpen(true);
  };
  const addCandidates = async () => {
    setLoading(true);
    console.log(age, party, qualification);
    try {
      await eVote.methods
        .createCandidate(name, age.toString(), party, qualification)
        .send({ from: account });
      setAlertName("Transaction Successfull");
      setAlert("success");
      setOpen(true);
    } catch (error) {
      setAlertName("Something went wrong 😥, please try again");
      setAlert("error");
    }

    setLoading(false);
    setName("");
    setAge("");
    setParty("");
    setQualification("");
  };
  const getState = async () => {
    try {
      const st = await eVote.methods.changeState().call();
      setState(st);
    } catch (error) {}
  };
  useEffect(() => {
    getState();
  }, []);

  const partyName = [
    {
      value: "BJP",
      label: "BJP",
    },
    {
      value: "TRS",
      label: "TRS",
    },
    {
      value: "TDP",
      label: "TDP",
    },
    {
      value: "YSRCP",
      label: "YSRCP",
    },
    {
      value: "CONGRESS",
      label: "CONGRESS",
    },
  ];

  const Age = [];

  for (let i = 25; i <= 70; i++) {
    Age.push({
      value: i,
      label: i,
    });
  }

  const qual = [
    {
      value: "BE",
      label: "BE",
    },
    {
      value: "MBA",
      label: "MBA",
    },
    {
      value: "PHD",
      label: "PHD",
    },
    {
      value: "OTHER",
      label: "OTHER",
    },
  ];
 

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper style={paper} elevation={3}>
        <h3 style={labels}>
          Name <span style={{ color: "red" }}>*</span>
        </h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputs}
          placeholder="Name"
        />
        <h3 style={labels}>
          Age <span style={{ color: "red" }}>*</span>
        </h3>
        {/* <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={inputs}
          placeholder="Age"
        /> */}
        <TextField
          id="outlined-select-currency"
          select
          style={{ backgroundColor: "white", borderRadius: 4 }}
          value={age}
          onChange={(e) => setAge(e.target.value)}
        >
          {Age.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <h3 style={labels}>
          Party <span style={{ color: "red" }}>*</span>
        </h3>
        {/* <input
          value={party}
          onChange={(e) => setParty(e.target.value)}
          style={inputs}
          placeholder="Party"
        /> */}
        <TextField
          id="outlined-select-currency"
          select
          style={{ backgroundColor: "white", borderRadius: 4 }}
          value={party}
          onChange={(e) => setParty(e.target.value)}
        >
          {partyName.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <h3 style={labels}>
          Qualification <span style={{ color: "red" }}>*</span>
        </h3>
        {/* <input
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
          style={inputs}
          placeholder="Qualification"
        /> */}
        <TextField
          id="outlined-select-currency"
          select
          style={{ backgroundColor: "white", borderRadius: 4 }}
          value={qualification}
          onChange={(e) => {
            setQualification(e.target.value);
          }}
        >
          {qual.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br />
        <Button
          onClick={() => {
            
            if (!name || !age || !party || !qualification) {
              handleClick();
            } else if (state === "Registration" && !loading) {
              addCandidates();
            } else if (loading) {
              setAlertName("Please wait until transaction complete");
              setAlert("warning");
              setOpen(true);
            } else {
              setAlertName("Please change state to registration");
              setAlert("warning");
              setOpen(true);
            }
          }}
          style={button}
          variant="contained"
        >
          {loading ? (
            <ReactLoading
              height={25}
              width={25}
              type={"spinningBubbles"}
              color="white"
            />
          ) : (
            "Add Candidate"
          )}
        </Button>
      </Paper>
      <Snackbars
        alertName={alertName}
        alert={alert}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
const paper = {
  backgroundColor: "black",
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  padding: 10,
};
const inputs = {
  height: 40,
  margin: 7,
  fontSize: 16,
  borderRadius: 4,
  outline: "none",
  border: "none",
  padding: 10,
};
const labels = {
  color: "white",
  margin: 3,
  fontSize: 16,
};
const button = {
  borderRadius: 4,
  padding: 10,

  margin: 7,
};
