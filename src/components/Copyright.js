import Typography from "@mui/material/Typography";

/**
 * A component for displaying the copyright notice.
 * @component
 * @returns {JSX.Element} Copyright notice.
 */
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © ParkWhere "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
