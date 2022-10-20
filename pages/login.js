import React, { useState, useContext } from "react";
import Link from "next/link";
import Grid from "@mui/material/Unstable_Grid2";
import { useMutation } from "@apollo/client";
import { LOGIN } from "hooks/mutations";
import { useRouter } from "next/router";
import { AuthContext } from "contexts";
import { Alert } from "components";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Link as MuiLink,
} from "@mui/material";

export default function UserNew() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState();
  const { setToken, setUserName, setUserId } = useContext(AuthContext);
  const router = useRouter();

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      document.cookie = `token = ${data.login.token};`;
      document.cookie = `userId = ${data.login.userId};`;
      document.cookie = `username = ${data.login.username};`;
      setToken(data.login.token);
      setUserName(data.login.username);
      setUserId(data.login.userId);
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
                label="البريد الإكتروني"
                type="email"
                name="email"
                className="w-64 md:w-80 text-app font-b mt-2"
                onChange={({ target }) => setEmail(target.value)}
              />
              <TextField
                label="كلمة السر"
                type="password"
                name="password"
                className="w-64 md:w-80 text-app font-b mt-2"
                onChange={({ target }) => setPassword(target.value)}
              />
              <Button
                onClick={() =>
                  login({
                    variables: {
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
              <NoAccount />
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <br></br>
    </React.Fragment>
  );
}

function NoAccount() {
  return (
    <Typography className="m-0 my-2" align="center">
      <Link href="/register" passHref>
        <MuiLink variant="body2">ليس لديك حساب؟ سجل الآن</MuiLink>
      </Link>
    </Typography>
  );
}
