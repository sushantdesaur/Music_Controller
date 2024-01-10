import React, { useState, Component } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

export default function CreateRoomPage(props) {
  const navigate = useNavigate();
  
  const[defaultVotes,setDefaultVotes] = useState(2);
  const[guestCanPause,setGuestCanPause] = useState(true);
  const[votesToSkip,setVotesToSkip] = useState(defaultVotes);

  const handleVotesChange = () => {
    setVotesToSkip(event.target.value);
  };

  const handleGuestCanPauseChange = () => {
    setGuestCanPause(event.target.value === "true" ? true : false);
  };

  const handleRoomButtonPressed = () => {
    console.log('TEST');
    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };
    console.log('TEST2');
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => navigate('/room/'+ data.code));
  };


    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create a room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest Control of Playback State</div>
            </FormHelperText>
            <RadioGroup row defaultValue="true" onChange={handleVotesChange}>
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="number"
              onChange={handleGuestCanPauseChange}
              defaultValue={defaultVotes}
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
              }}
            />
            <FormHelperText>
              <div align="center">Votes required to skip song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" onClick={handleRoomButtonPressed}>
            Create a room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
);
}


// export default class CreateRoomPage extends Component {
//   defaultVotes = 2;
//   constructor(props) {
//     super(props);
//     this.state = {
//       guestCanPause: true,
//       votesToSkip: this.defaultVotes,
//     };
//     this.handleCreateRoomButton = this.handleCreateRoomButton.bind(this);
//     this.handleGuestCanPauseChange= this.handleGuestCanPauseChange.bind(this);
//     this.handleVotesChange = this.handleVotesChange.bind(this);
//   }
//   handleVotesChange (e) {
//     this.setState({
//       votesToSkip: e.target.value,
//     })
//   }
//   handleGuestCanPauseChange (e) {
//     this.setState({
//       guestCanPause: e.target.value === "true" ? true : false,
//     }); 
//   }
//   handleCreateRoomButton () {
//     // console.log(this.state);
//     const requestOptions = {
//       method: "POST",
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         votes_to_skip: this.state.votesToSkip,
//         guest_can_pause: this.state.guestCanPause,
//       }),
//     };
//     fetch("/api/create-room", requestOptions)
//       .then((response) => response.json())
//       .then((data) => console.log(data))

//   }
//   render() {
//     return (
//       <Grid container spacing={1}>
//         <Grid item xs={12} align="center">
//           <Typography component="h4" variant="h4">
//             Create a room
//           </Typography>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <FormControl component="fieldset">
//             <FormHelperText>
//               <div align="center">Guest Control of Playback State</div>
//             </FormHelperText>
//             <RadioGroup row defaultValue="true" onChange={this.handleGuestCanPauseChange}>
//               <FormControlLabel
//                 value="true"
//                 control={<Radio color="primary" />}
//                 label="Play/Pause"
//                 labelPlacement="bottom"
//               />
//               <FormControlLabel
//                 value="false"
//                 control={<Radio color="secondary" />}
//                 label="No Control"
//                 labelPlacement="bottom"
//               />
//             </RadioGroup>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <FormControl>
//             <TextField
//               required={true}
//               type="number"
//               onChange={this.handleVotesChange}
//               defaultValue={this.defaultVotes}
//               inputProps={{
//                 min: 1,
//                 style: { textAlign: "center" },
//               }}
//             />
//             <FormHelperText>
//               <div align="center">Votes required to skip song</div>
//             </FormHelperText>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <Button color="primary" variant="contained" onClick={this.handleCreateRoomButton}>
//             Create a room
//           </Button>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <Button color="secondary" variant="contained" to="/" component={Link}>
//             Back
//           </Button>
//         </Grid>
//       </Grid>
//     );
      
//   }
// }
