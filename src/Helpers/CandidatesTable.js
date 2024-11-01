import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { partySymbols } from "./partySymbols";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));



export default function CandidateTable(props) {
  console.log(props.candidatesList)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Age</StyledTableCell>
            <StyledTableCell align="right">Party</StyledTableCell>
            <StyledTableCell align="right">Party Symbol</StyledTableCell>
            <StyledTableCell align="right">Qualification</StyledTableCell>
            <StyledTableCell align="right">Votes</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.candidatesList.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.age}</StyledTableCell>
              <StyledTableCell align="right">{row.party}</StyledTableCell>
              <StyledTableCell align="right">
                <img
                  src={partySymbols[row.party]}
                  style={{ height: 40, width: 40, objectFit: "contain" }}
                  alt=""
                />
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.qualification}
              </StyledTableCell>
              <StyledTableCell align="right">{row.voteCount}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
