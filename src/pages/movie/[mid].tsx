import NextLink from "next/link";
import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/core";
import axios, { AxiosRequestConfig } from "axios";

interface MovieDetailProps {
  large_cover_image: string;
  title_long: string;
  rating: string;
  like_count: string;
  download_count: string;
  description_full: string;
}

const MovieDetail: React.FC<MovieDetailProps> = ({
  large_cover_image,
  title_long,
  rating,
  like_count,
  download_count,
  description_full,
}) => {
  console.log(
    large_cover_image,
    title_long,
    rating,
    like_count,
    download_count,
    description_full
  );

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
      <Box>
        <NextLink href="/movies">
          <Link
            _hover={{ color: "blue.500" }}
            color="blue.200"
            fontWeight="700"
            display="block"
            textAlign="left"
          >
            리스트로 돌아가기
          </Link>
        </NextLink>
      </Box>
    </Flex>
  );
};

export async function getServerSideProps(context: any) {
  const { mid } = context.params;

  const options: AxiosRequestConfig = {
    method: "GET",
    url: `https://yts.mx/api/v2/movie_details.json?movie_id=${mid}`,
  };

  const {
    large_cover_image,
    title_long,
    rating,
    like_count,
    download_count,
    description_full,
  } = await axios(options).then((res) => res.data.data.movie);

  return {
    props: {
      large_cover_image,
      title_long,
      rating,
      like_count,
      download_count,
      description_full,
    },
  };
}

export default MovieDetail;
