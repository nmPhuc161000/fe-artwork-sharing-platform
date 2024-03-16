import React from "react";
import "./Mylog.css";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import CheckOrder from "./checkorder/CheckOrder";
import { useParams } from "react-router-dom";
import TableStatus from "./tablestatusart/TableStatus";

export default function Mylog() {
    let { id } = useParams();
    console.log(id);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <div className="mylog">
      <Grid container spacing={2} sx={{width: "90%"}}>
        <Grid xs={6} md={5}>
          <Item style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}><CheckOrder id={id}/></Item>
        </Grid>
        <Grid xs={6} md={7}>
          <Item><TableStatus/></Item>
        </Grid>
      </Grid>
    </div>
  );
}