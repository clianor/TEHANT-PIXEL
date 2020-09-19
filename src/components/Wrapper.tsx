import React from "react";
import { Box } from "@chakra-ui/core";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Box mt={8} mx="auto" width={{ base: "100%", md: 2 / 3, lg: 3 / 4 }}>
      {children}
    </Box>
  );
};
