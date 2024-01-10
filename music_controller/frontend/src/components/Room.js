import React, { Component, useState, useEffect } from "react";
import {  useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";

export default function Room(props) {
  const initialState = {
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
  };
  const [roomData, setRoomData] = useState(initialState);
  const { roomCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => {
        if (!response.ok) {
          props.clearRoomCodeCallback(); // clears roomCode state in HomePage
          navigate("/");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setRoomData({
          ...roomData,
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });
  }, [roomCode, setRoomData]); //It renders when the object changes .If we use roomData and/or roomCode then it rerenders infinite times

//   React.useEffect(() => {
//     fetch(`/api/get-room?code=${roomCode}`)
//       .then((response) => {
//         if (!response.ok) {
//           props.clearRoomCodeCallback(); // clears roomCode state in HomePage
//           navigate("/");
//         } else {
//           return response.json();
//         }
//       })
//       .then((data) => {
//         setState({
//           votesToSkip: data.votes_to_skip,
//           guestCanPause: data.guest_can_pause,
//           isHost: data.is_host,
//         });
//       });
//   }, []);

  const leaveButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((_response) => {
      props.clearRoomCodeCallback(); // clears roomCode state in HomePage
      navigate("/");
    });
  };
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Votes: {roomData.votesToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Guest: {roomData.guestCanPause.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Host: {roomData.isHost.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={leaveButtonPressed}
        >
          Leave Room
        </Button>
      </Grid>
    </Grid>
    // <div>
    //   <h3>{roomCode}</h3>
    //   <p>Votes: {roomData.votesToSkip}</p>
    //   <p>Guest: {roomData.guestCanPause.toString()}</p>
    //   <p>Host: {roomData.isHost.toString()}</p>
    // </div>
  );
}
