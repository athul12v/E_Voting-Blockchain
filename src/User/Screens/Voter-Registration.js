import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { Button, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import Snackbars from "../../Helpers/SnackBar";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth, db } from "../../Api/Firebase";
import { doc, getDoc } from "firebase/firestore";

export default function VoterRegistration() {
  const [aadhar, setAadhar] = useState("");
  const [otp, setOtp] = useState("");
  const [alert, setAlert] = useState("");
  const [alertName, setAlertName] = useState("");
  const [open, setOpen] = useState(false);
  const eVote = useSelector((state) => state.eVote.eVote);
  const account = useSelector((state) => state.account.account);
  const email = localStorage.getItem("email");

  const addAadhar = async () => {
    try {
      const res = await eVote.methods.usersList(email).call();
      const aadharRes = await eVote.methods.aadharList(aadhar).call();

      if (res.aadhar) {
        setAlert("warning");
        setAlertName("You already registered with Aadhar");
        setOpen(true);
        return;
      }
      if (aadharRes.accountAddress !== "") {
        setAlert("warning");
        setAlertName("Aadhar already used");
        setOpen(true);
        return;
      }

      let confirmationResult = window.confirmationResult;
      const result = await confirmationResult.confirm(otp);

      console.log(result);

      await eVote.methods
        .createAdharEmail(aadhar, account, email)
        .send({ from: account });

      // window.location.reload();
    } catch (error) {
      // console.log(error.message);

      setAlert("warning");
      setAlertName("OTP EXPIRED RESENT OTP");
      setOpen(true);
    }
  };

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
      },
      auth
    );
  };

  const sendOTP = async (e) => {
    e.preventDefault();

    if (aadhar.length !== 12) {
      setAlert("warning");
      setAlertName("Aadhar number should be 12 digits");
      setOpen(true);
      return;
    }

    const res = await getDoc(doc(db, "aadhar", aadhar));

    if (res.exists()) {
      console.log(res.data().number);

      let number = res.data().number;

      generateRecaptcha();

      let appVerifier = window.recaptchaVerifier;

      await signInWithPhoneNumber(auth, number, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          // ...
        })
        .catch((error) => {
          // Error; SMS not sent
          // ...
        });
    }
  };

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <Paper style={paper} elevation={3}>
        <h3 style={text}>Aadhar Details</h3>
        <div style={scanDiv}>
          <img
            alt="background"
            style={image}
            src="https://media4.giphy.com/media/Q7xOBMP7DcOdxSRAsi/200w.webp?cid=ecf05e47ixhwnkuiqwfq5nu707slp9gph0zts09dyoiimwlt&rid=200w.webp&ct=g"
          />
        </div>
        <br />
        <Divider style={{ width: "100%" }} />
        <br />
        <div style={numberDiv}>
          <h3 style={{ margin: 2 }}>Aadhar Number *</h3>

          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <input
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
              style={input}
              placeholder="Aadhar Number"
            />

            <Button
              style={{ fontSize: 12, margin: 2 }}
              variant="contained"
              onClick={sendOTP}
              color="secondary"
            >
              Send OTP
            </Button>
          </div>
          <br />

          <h3 style={{ margin: 2 }}>Enter OTP *</h3>
          <input
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={input2}
            placeholder="Enter OTP"
          />
          <div id="recaptcha-container"></div>
          <br />
          <Button onClick={addAadhar} variant="contained">
            Verify
          </Button>
        </div>
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
  backgroundColor: "white",
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  padding: 10,
  alignItems: "center",
};

const text = {
  color: "#336EB2",
  fontSize: 25,
  margin: 3,
};
const image = {
  height: 200,
  width: 200,
};
const scanDiv = {
  display: "flex",
  flexDirection: "row",
};
const input = {
  height: 40,
  fontSize: 16,
  borderRadius: 4,
  outline: "none",
  padding: 10,
  width: "80%",
  border: "1.5px solid #336EB2",
};

const input2 = {
  height: 40,
  fontSize: 16,
  borderRadius: 4,
  outline: "none",
  padding: 10,
  width: "100%",
  border: "1.5px solid #336EB2",
};
const numberDiv = {
  display: "flex",
  flexDirection: "column",
  width: "80%",
};
