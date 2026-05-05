import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Fab, Stack, TextField } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { T } from "../../../lib/types/common";
import { Message } from "@mui/icons-material";
import { Messages } from "../../../lib/config";
import MemberService from "../../services/MemberService";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from '../../hooks/useGlobals';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },
}));

const ModalImg = styled.img`
  width: 62%;
  height: 100%;
  border-radius: 10px;
  background: #000;
  margin-top: 9px;
  margin-left: 10px;
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const classes = useStyles();
  const [memberNick, setMemberNick] = useState <string>("");
  const [memberPhone, setMemberPhone] = useState <string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();

  /** HANDLERS **/
  const handlerUserName = (e: T) => {
    console.log(e.target.value);
    setMemberNick(e.target.value)
  }

    const handlerPhone = (e: T) => {
    console.log(e.target.value);
    setMemberPhone(e.target.value)
  }

  const handlerPassword = (e: T) => {
    console.log(e.target.value);
    setMemberPassword(e.target.value)
  }

  const handlerPasswordKeydown = (e: T) => {
    if(e.key === "Enter" && signupOpen) {
      handlerSignupRequest().then();
    } else if(e.key === "Enter" && loginOpen) {
      handlerLoginRequest().then();
    }
  };

  const handlerSignupRequest = async () => {
    try{ 
      console.log("input:", memberNick, memberPhone, memberPassword);
      const isFullfill = memberNick !== "" && memberPhone !== "" && memberPassword !== "";


      if(!isFullfill) throw new Error(Messages.error3);
      const signupInput: MemberInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
        memberPhone: memberPhone,
      }
      const member = new MemberService;
      const result = await member.signup(signupInput);
      // Saving Authenticated user
      setAuthMember(result);
      handleSignupClose();

    }catch(err){
      console.log(err)
      handleSignupClose();
      sweetErrorHandling(err).then();
    }
  }

    const handlerLoginRequest = async () => {
    try{ 
      const isFullfill = memberNick !== "" && memberPassword !== "";

      if(!isFullfill) throw new Error(Messages.error3);
      const loginInput: LoginInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
      }
      const member = new MemberService;
      const result = await member.login(loginInput);
      setAuthMember(result);
      // localStorage.setItem("authMember", JSON.stringify(result));
      handleLoginClose();

    }catch(err){
      console.log(err)
      handleSignupClose();
      sweetErrorHandling(err).then();
    }
  }



  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={signupOpen}>
          <Stack
            className={classes.paper}
            direction={"row"}
            sx={{ width: "800px" }}
          >
            <ModalImg src={"/img/auth.webp"} alt="camera" />
            <Stack sx={{ marginLeft: "69px", alignItems: "center" }}>
              <h2>Signup Form</h2>
              <TextField
                sx={{ marginTop: "7px" }}
                id="outlined-basic"
                label="username"
                variant="outlined"
                onChange={handlerUserName}
              />
              <TextField
                sx={{ my: "17px" }}
                id="outlined-basic"
                label="phone number"
                variant="outlined"
                onChange={handlerPhone}
              />
              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
                onChange={handlerPassword}
                onKeyDown={handlerPasswordKeydown}

              />
              <Fab
                sx={{ marginTop: "30px", width: "120px" }}
                variant="extended"
                color="primary"
                onClick={handlerSignupRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Signup
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loginOpen}>
          <Stack
            className={classes.paper}
            direction={"row"}
            sx={{ width: "700px" }}
          >
            <ModalImg src={"/img/auth.webp"} alt="camera" />
            <Stack
              sx={{
                marginLeft: "65px",
                marginTop: "25px",
                alignItems: "center",
              }}
            >
              <h2>Login Form</h2>
              <TextField
                id="outlined-basic"
                label="username"
                variant="outlined"
                sx={{ my: "10px" }}
                onChange={handlerUserName}
              />
              <TextField
                id={"outlined-basic"}
                label={"password"}
                variant={"outlined"}
                type={"password"}
                onChange={handlerPassword}
                onKeyDown={handlerPasswordKeydown}
              />
              <Fab
                sx={{ marginTop: "27px", width: "120px" }}
                variant={"extended"}
                color={"primary"}
                onClick={handlerLoginRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Login
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}
