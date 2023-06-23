import { Box, BoxProps } from "@mui/material";

interface Props extends BoxProps {
  children: React.ReactNode;
}

const boxStyle = {
  p: 2,
  borderRadius: "5px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  boxShadow: "0 4px 12px 0 rgba(31, 38, 135, 0.37)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
};

export default function ({ children, ...rest }: Props) {
  return (
    <Box sx={boxStyle} {...rest}>
      {children}
    </Box>
  );
}
