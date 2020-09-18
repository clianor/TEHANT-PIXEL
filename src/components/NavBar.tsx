import React from "react";
import NextLink from "next/link";
import { Box, Flex, Link } from "@chakra-ui/core";

export const NavBar = () => {
  return (
    <Flex>
      <Box bg="#ccc" w="100%" p={4}>
        <NextLink href="/">
          <Link pr={4}>Home</Link>
        </NextLink>
        <NextLink href="/movies">
          <Link>Movies</Link>
        </NextLink>
      </Box>
    </Flex>
  );
};
