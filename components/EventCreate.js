import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Alert from "./Alert";
import { isEmpty } from "helper/isEmpty";
import { useRouter } from "next/router";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  InputAdornment,
} from "@mui/material";

export default function EventCreate({ formikProps, AlertSuccess }) {
  const router = useRouter();
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }} className="p-2">
        <Button
          onClick={() => router.push("/events")}
          className="font-b mx-2 bg-app my-2 md:mr-8"
          variant="contained"
        >
          الرجوع
        </Button>
        <Grid container spacing={2}>
          <Grid xs={12} md={12} className="md:flex md:justify-center">
            <Paper
              elevation={0}
              className="border-2 border-app p-0 md:w-[640px] m-0 py-4 flex justify-center items-center flex-col"
              square
            >
              {!isEmpty(formikProps.touched) && (
                <AlertMessage formikProps={formikProps} />
              )}
              {AlertSuccess}
              <Typography
                className="text-center m-0 p-0 font-m my-4 text-app w-full"
                variant="h4"
              >
                إضافة مناسبة
              </Typography>
              <TextField
                label="العنوان"
                name="title"
                className="w-64 md:w-80 text-app font-b"
                onChange={formikProps.handleChange}
              />
              <TextField
                label="السعر"
                name="price"
                type="number"
                className="w-64 md:w-80 text-app font-b m-4 bo"
                onChange={formikProps.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
              <TextField
                label="التاريخ"
                name="date"
                type="date"
                className="w-64 md:w-80 text-app font-b"
                onChange={formikProps.handleChange}
              />
              <TextField
                id="outlined-multiline-static"
                label="التفاصيل"
                name="description"
                multiline
                rows={4}
                className="w-64 md:w-80 text-app font-b m-4"
                onChange={formikProps.handleChange}
              />
              <Button
                onClick={formikProps.handleSubmit}
                className="font-b mx-2 bg-app my-2 md:mr-8"
                variant="contained"
              >
                تأكيد
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <br></br>
    </React.Fragment>
  );
}

function AlertMessage({ formikProps }) {
  return (
    <Alert className="w-64 md:w-[80%] font-b mb-4" type={"error"}>
      {formikProps.touched.title && formikProps.errors.title ? (
        <li>{formikProps.errors.title}</li>
      ) : null}
      {formikProps.touched.description && formikProps.errors.description ? (
        <li>{formikProps.errors.description}</li>
      ) : null}
      {formikProps.touched.price && formikProps.errors.price ? (
        <li>{formikProps.errors.price}</li>
      ) : null}
      {formikProps.touched.date && formikProps.errors.date ? (
        <li>{formikProps.errors.date}</li>
      ) : null}
    </Alert>
  );
}
