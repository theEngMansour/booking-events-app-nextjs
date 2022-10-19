import React, { useState, useContext } from "react";
import Link from "next/link";
import Grid from "@mui/material/Unstable_Grid2";
import { Alert } from "components";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "hooks/mutations";
import { useRouter } from "next/router";
import { AuthContext } from "contexts";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Link as MuiLink,
} from "@mui/material";

export default function UserNew() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState();
  const { setToken, setUserName, setUserId } = useContext(AuthContext);
  const router = useRouter();
  
  const [register] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      document.cookie = `token = ${data.createUser.token};`;
      document.cookie = `userId = ${data.createUser.userId};`;
      document.cookie = `username = ${data.createUser.username};`;
      setToken(data.createUser.token);
      setUserName(data.createUser.username);
      setUserId(data.createUser.userId);
      router.push("/events");
    },
    onError: (error) => setAlert(error.message),
  });

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }} className="p-2">
        <Grid container spacing={2}>
          <Grid xs={12} md={12} className="md:flex md:justify-center">
            <Paper
              elevation={0}
              className="border-2 border-app p-0 md:w-[640px] m-0 py-4 flex justify-center items-center flex-col"
              square
            >
              {alert && (
                <Alert className="font-b w-64 md:w-[80%]" type="success">
                  {alert}
                </Alert>
              )}
              <Typography
                className="text-center m-0 p-0 font-m my-4 text-app w-full"
                variant="h4"
              >
                إنشاء حساب
              </Typography>
              <TextField
                label="اسم المستخدم"
                name="username"
                className="w-64 md:w-80 text-app font-b"
                onChange={({ target }) => setUsername(target.value)}
              />
              <TextField
                label="البريد الإكتروني"
                name="email"
                className="w-64 md:w-80 text-app font-b mt-2"
                onChange={({ target }) => setEmail(target.value)}
              />
              <TextField
                label="كلمة السر"
                name="password"
                className="w-64 md:w-80 text-app font-b mt-2"
                onChange={({ target }) => setPassword(target.value)}
              />
              <Button
                onClick={() =>
                  register({
                    variables: {
                      username: username.trim(),
                      email: email.trim(),
                      password: password.trim(),
                    },
                  })
                }
                className="font-b mx-2 bg-app my-2 md:mr-8"
                variant="contained"
              >
                إرسال
              </Button>
              <HaveAccount />
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <br></br>
    </React.Fragment>
  );
}

function HaveAccount() {
  return (
    <Typography className="m-0 my-2" align="center">
      <Link href="/login" passHref>
        <MuiLink variant="body2">لديك حساب بالفعل؟ تسجيل الدخول</MuiLink>
      </Link>
    </Typography>
  );
}
