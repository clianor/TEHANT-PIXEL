import NextLink from "next/link";
import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/core";

interface MovieDetailViewProps {
  large_cover_image: string;
  title_long: string;
  rating: string;
  like_count: string;
  download_count: string;
  description_full: string;
}

const MovieDetailView: React.FC<MovieDetailViewProps> = ({
  large_cover_image,
  title_long,
  rating,
  like_count,
  download_count,
  description_full,
}) => {
  return (
    <Flex flexDirection="column">
      <Flex flexDirection={{ xs: "column", md: "row" }} pb="1.5rem">
        <Box minWidth="200px" margin="auto">
          <Image src={large_cover_image} alt={title_long} />
        </Box>
        <Box flex="3" pl={{ md: 5 }}>
          <Flex justifyContent="space-between" alignItems="center" mb="5">
            <Heading size="lg">{title_long}</Heading>
            <Text>{rating}</Text>
          </Flex>
          <Text>Like: {like_count}</Text>
          <Text mb="5">Download: {download_count}</Text>
          <Text>{description_full}</Text>
        </Box>
      </Flex>
      <Box textAlign="left">
        <NextLink href="/movies">
          <Link
            _hover={{ color: "blue.500" }}
            color="blue.200"
            fontWeight="700"
          >
            리스트로 돌아가기
          </Link>
        </NextLink>
      </Box>
    </Flex>
  );
};

export default MovieDetailView;
