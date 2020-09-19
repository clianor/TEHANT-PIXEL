import React from "react";
import NextLink from "next/link";
import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/core";
import { movie } from "../../types/movie";

interface MovieViewProps {
  movie: movie;
}

export const MovieView: React.FC<MovieViewProps> = ({ movie }) => {
  return (
    <Flex flexDirection={{ xs: "column", md: "row" }} pb="1.5rem">
      <Box minWidth="200px" margin="auto">
        <Image src={movie.background_image} alt={movie.title} />
      </Box>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        flex="3"
        pl={{ md: 5 }}
      >
        <Box>
          <Flex justifyContent="space-between" alignItems="center" mb="2">
            <Heading size="lg">{movie.title}</Heading>
            <Text>{movie.rating}</Text>
          </Flex>
          <Text>{movie.summary}</Text>
        </Box>
        <Box textAlign="right">
          <NextLink href={`/movie/${movie.id}`}>
            <Link
              _hover={{ color: "blue.500" }}
              color="blue.200"
              display="inline-block"
            >
              자세히 보기
            </Link>
          </NextLink>
        </Box>
      </Flex>
    </Flex>
  );
};
