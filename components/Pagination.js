import { Button } from "@mui/material";

export default function Pagination({ page, onChange }) {
  return (
    <div className="flex items-center justify-center mb-4">
      <Button
        disabled={page == 1 ? true : false}
        onClick={() => onChange(page - 1)}
        className="mt-4 bg-app font-b"
        variant="contained"
      >
        الخلف
      </Button>
      <Button className="mt-4 bg-app font-b mx-2" variant="contained">
        {page}
      </Button>
      <Button
        onClick={() => onChange(page + 1)}
        className="mt-4 bg-app font-b"
        variant="contained"
      >
        التالي
      </Button>
    </div>
  );
}
