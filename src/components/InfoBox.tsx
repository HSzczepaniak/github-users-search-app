import { Alert, Box } from "@mui/material";

import { InfoBoxProps } from "../types";

export const InfoBox = ({ type, message }: InfoBoxProps) => {
  return (
    <Box my={2} width="max-content" maxWidth="100%">
      <Alert severity={type}>{message}</Alert>
    </Box>
  );
};
