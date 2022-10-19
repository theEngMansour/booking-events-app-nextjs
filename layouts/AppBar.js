import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "contexts";
import { Typography, Toolbar, Box, AppBar } from "@mui/material";
import { useRouter } from "next/router";

export default function Bar() {
  const { token } = useContext(AuthContext);
  const router = useRouter();

  async function logout() {
    document.cookie = `token =; expires=Thu, 01 jan 1970 00:00:01 GMT`;
    document.cookie = `userId =; expires=Thu, 01 jan 1970 00:00:01 GMT`;
    document.cookie = `username =; expires=Thu, 01 jan 1970 00:00:01 GMT`;
    return router.reload("/");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="bg-app">
        <Toolbar>
          <Link href={"/events"} passHref>
            <Typography
              className="font-b ml-5 md:ml-10 cursor-pointer"
              variant="h6"
              component="div"
            >
              مناسبات
            </Typography>
          </Link>
          {token && (
            <>
              <Link href={"/events/bookings"} passHref>
                <Typography className="font-b ml-5 cursor-pointer">
                  حجوزاتي
                </Typography>
              </Link>
              <Typography
                onClick={() => logout()}
                className="font-b m-0 p-0 ml-5 cursor-pointer"
              >
                تسجيل خروج
              </Typography>
            </>
          )}
          {!token && (
            <>
              <Link href={"/register"} passHref>
                <Typography className="font-b m-0 p-0 ml-5 cursor-pointer">
                  إنشاء حساب
                </Typography>
              </Link>
              <Link href={"/login"} passHref>
                <Typography className="font-b m-0 p-0 cursor-pointer">
                  تسجيل الدخول
                </Typography>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
