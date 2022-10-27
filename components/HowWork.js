import { Paper, Typography, Grid } from "@mui/material";

export default function Future() {
  return (
    <Paper
      elevation={0}
      className="bg-app md:w-[872px] md:h-[472px] w-full my-4 md:pb-0"
    >
      <br></br>
      <br></br>
      <Typography
        className="text-center text-app m-0 p-0 font-b text-3xl"
        variant="h4"
      >
        خطوات بسيطة
      </Typography>
      <Typography className="text-center font-r text-white" variant="h6">
        خطوات بسيطة للبدأ في التطبيق
      </Typography>
      <Grid className="flex justify-center items-center md:flex-row flex-col mt-14">
        <Grid item xs={12} md={4}>
          <div className="bg-app-light w-52 h-40 rounded text-center flex justify-center flex-col">
            <h1 className="text-center text-2xl font-b text-app my-0">
              إنشاء/تسجيل
            </h1>
            <h2 className="text-center text-sm font-r text-white my-0">
              إنشاء او تسجيل الدخول
            </h2>
          </div>
          <span className="bg-[#dfb521] font-bold text-white w-10 h-10 rounded-full text-center flex justify-center items-center m-auto mt-[-28px]">
            1
          </span>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className="bg-app-light w-52 h-40 rounded text-center flex justify-center flex-col md:mx-2 md:my-0 my-2">
            <h1 className="text-center text-2xl font-b text-app my-0">
              إضافة/حجز
            </h1>
            <h2 className="text-center text-sm font-r text-white my-0">
              إضافة او حجز مناسبة
            </h2>
          </div>
          <span className="bg-[#dfb521] font-bold text-white w-10 h-10 rounded-full text-center flex justify-center items-center m-auto mt-[-28px]">
            2
          </span>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className="bg-app-light w-52 h-40 rounded text-center flex justify-center flex-col">
            <h1 className="text-center text-2xl font-b text-app my-0">تصفح</h1>
            <h2 className="text-center text-sm font-r text-white my-0">
              تصفح لحجز مناسبة
            </h2>
          </div>
          <span className="bg-[#dfb521] font-bold text-white w-10 h-10 rounded-full text-center flex justify-center items-center m-auto mt-[-28px]">
            3
          </span>
        </Grid>
      </Grid>
    </Paper>
  );
}
