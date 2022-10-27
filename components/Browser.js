import Image from "next/future/image";
import Link from "next/link";
import { Paper, Typography, Button } from "@mui/material";

export default function Future() {
  return (
    <Paper
      elevation={0}
      className="bg-[#dfb521] md:w-[872px] h-20 w-full my-4 md:pb-0 flex justify-center"
    >
      <Link
        href={"/events"}
        passHref
      >
        <Button className="mt-4 mb-2 bg-app font-b m" variant="contained">
          تصفح المناسبات
        </Button>
      </Link>
    </Paper>
  );
}
