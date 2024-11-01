import { Avatar } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../Api/Firebase";

export default function DetailsScreen() {
  const [aadhar, setAadhar] = useState("");
  const [details, setDetails] = useState({});
  const eVote = useSelector((state) => state.eVote.eVote);
  const email = localStorage.getItem("email");
  useEffect(() => {
    async function fetchAadhar() {
      const res = await eVote.methods.usersList(email).call();

      if (res.aadhar) {
        setAadhar(res.aadhar);

        const resDetails = await getDoc(doc(db, "aadhar", res.aadhar));

        if (resDetails.exists()) {
          setDetails(resDetails.data());
        }
      }
    }

    fetchAadhar();
  }, [email]);

  if (aadhar === "") return <div> </div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Avatar
        alt="Remy Sharp"
        src={details.profilePic}
        sx={{ width: 100, height: 100 }}
      />
      <div style={{ padding: 10 }}>
        <h3>
          <span style={{ fontWeight: "bold", marginRight: 10, color: "red" }}>
            {" "}
            Aadhar Number :
          </span>
          {aadhar}
        </h3>
        <h3>
          {" "}
          <span style={{ fontWeight: "bold", marginRight: 10, color: "red" }}>
            Name :
          </span>{" "}
          {details.name}
        </h3>
        <h3>
          {" "}
          <span style={{ fontWeight: "bold", marginRight: 10, color: "red" }}>
            Mobile Number :
          </span>{" "}
          {details.number}
        </h3>
        <h3>
          <span style={{ fontWeight: "bold", marginRight: 10, color: "red" }}>
            Father Name :
          </span>{" "}
          {details.fatherName}
        </h3>
        <h3>
          <span style={{ fontWeight: "bold", marginRight: 10, color: "red" }}>
            DOB :
          </span>{" "}
          {details.DOB}
        </h3>
        <h3>
          <span style={{ fontWeight: "bold", marginRight: 10, color: "red" }}>
            Gender :
          </span>{" "}
          {details.gender}
        </h3>
        <h3>
          <span style={{ fontWeight: "bold", marginRight: 10, color: "red" }}>
            VoterId :
          </span>{" "}
          {details.voterId}
        </h3>
        <h3>
          <span style={{ fontWeight: "bold", marginRight: 10, color: "red" }}>
           Assembly constituency :
          </span>{" "}
          {details.ac}
        </h3>
        <h3>
          <span style={{ fontWeight: "bold", marginRight: 10, color: "red" }}>
            Address :
          </span>{" "}
          {details.address}
        </h3>
      </div>
    </div>
  );
}
