import Alert from "@mui/material/Alert";

export default function ColorAlerts({ children, type, ...props }) {
  return (
    <Alert {...props} severity={type}>
      {children}
    </Alert>
  );
}
