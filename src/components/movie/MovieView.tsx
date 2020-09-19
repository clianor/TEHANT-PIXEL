import React from "react";
import NextLink from "next/link";
import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/core";
import { movie } from "../../types/movie";

interface MovieViewProps {
  movie: movie;
}

export const MovieView: React.FC<MovieViewProps> = ({ movie }) => {
  return (
    <Flex flexDirection={{ base: "column", sm: "row", md: "row" }}>
      <Box minWidth="200px" margin="auto">
        <Image src={movie.background_image} alt={movie.title} />
      </Box>
      <Box flex="3">
        <Flex justifyContent="space-between" alignItems="center" mb="2">
          <Heading size="lg">{movie.title}</Heading>
          <Text>{movie.rating}</Text>
        </Flex>
        <Text>{movie.summary}</Text>
        <NextLink href={`/movie/${movie.id}`}>
          <Link
            _hover={{ color: "teal.200" }}
            display="block"
            textAlign="right"
          >
            자세히 보기
          </Link>
        </NextLink>
      </Box>
    </Flex>
  );
};
