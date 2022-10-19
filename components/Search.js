import React from "react";
import Link from "next/link";
import Grid from "@mui/material/Unstable_Grid2";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { Box, Paper, InputBase, Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  margin: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    margin: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  color: "white",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      "&:focus": {
        width: "50ch",
      },
    },
  },
}));

export default function SearchApp() {
  const [contains, setContains] = useState();
  return (
    <React.Fragment>
      <Box className="m-0 p-0 mb-4">
        <Grid container>
          <Grid xs={12} md={12} className="md:flex md:justify-center">
            <Paper
              elevation={0}
              className="bg-app md:w-full m-0 h-35 flex justify-center items-center p-4"
              square
            >
              <Search className="sm:w-[199px] md:w-[599px] ml-4 ">
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  className="font-r text-white md:w-[40ch]"
                  placeholder="ابحث عن الإحداث او المستخدمين"
                  inputProps={{ "aria-label": "search" }}
                  onChange={({ target }) => setContains(target.value)}
                />
              </Search>
              <Link
                href={{
                  pathname: "/events/search",
                  query: { q: contains },
                }}
                passHref
              >
                <Button className="bg-app font-b" variant="contained">
                  ابحث
                </Button>
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
