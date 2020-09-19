import Head from "next/head";
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { Box, Heading, Select, Text } from "@chakra-ui/core";
import { movie } from "../types/movie";
import { MovieView } from "../components/movie/MovieView";
import { MovieList } from "../components/movie/MovieList";

interface MoviesProps {
  moviesProps: movie[];
  pageProps: number;
}

const Movies: React.FC<MoviesProps> = ({ moviesProps, pageProps }) => {
  const [page, setPage] = useState(pageProps);
  const [movies, setMovies] = useState<movie[]>(moviesProps);
  const [scroll, setScroll] = useState(0);
  const [sortBy, setSortBy] = useState("title");
  const [orderBy, setOrderBy] = useState("asc");
  const [quality, setQuality] = useState("all");
  const [minimumRating, setMinimumRating] = useState(0);

  const getMovies = async () => {
    const newMovies: movie[] = await getMoviesAPI(
      page,
      sortBy,
      orderBy,
      quality,
      minimumRating
    );
    setPage(page + 1);
    setMovies([...movies, ...newMovies]);
  };

  const handleScroll = () => {
    const scrollLocation = Math.round(
      ((document.body.scrollTop || document.documentElement.scrollTop) /
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight)) *
        100
    );
    setScroll(scrollLocation);
  };

  const handleSortChange = async (event: any) => {
    event.persist();
    const [sortby, orderby] = event.target.value.split(" ");
    const movies = await getMoviesAPI(
      1,
      sortby,
      orderby,
      quality,
      minimumRating
    );
    setSortBy(sortby);
    setOrderBy(orderby);
    setPage(1);
    setMovies(movies);
  };

  const handleQualityChange = async (event: any) => {
    event.persist();
    const movies = await getMoviesAPI(
      1,
      sortBy,
      orderBy,
      event.target.value,
      minimumRating
    );
    setQuality(event.target.value);
    setPage(1);
    setMovies(movies);
  };

  const handleMinRatingChange = async (event: any) => {
    event.persist();
    const movies = await getMoviesAPI(
      1,
      sortBy,
      orderBy,
      quality,
      event.target.value
    );
    setMinimumRating(event.target.value);
    setPage(1);
    setMovies(movies);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (scroll === 100) getMovies();
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [scroll, movies]);

  return (
    <MovieList>
      <Head>
        <title>Movies</title>
      </Head>
      <Box>
        <Heading size="lg" pb="2" pl="1">
          Sorting
        </Heading>
        <Select onChange={handleSortChange}>
          <option value="title asc">title asc</option>
          <option value="title desc">title desc</option>
          <option value="year asc">year asc</option>
          <option value="year desc">year desc</option>
          <option value="rating asc">rating asc</option>
          <option value="rating desc">rating desc</option>
        </Select>
      </Box>
      <Box>
        <Heading size="lg" pb="2" pl="1">
          Filtering
        </Heading>
        <Text pb="2" pl="1">
          quality
        </Text>
        <Select onChange={handleQualityChange}>
          <option value="all">ALL</option>
          <option value="720p">720p</option>
          <option value="1080p">1080p</option>
          <option value="2160p">2160p</option>
          <option value="3D">3D</option>
        </Select>
        <Text pb="2" py="2">
          minimumRating
        </Text>
        <Select onChange={handleMinRatingChange}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </Select>
      </Box>

      {movies.map((item: movie) => (
        <MovieView key={item.id} movie={item} />
      ))}
    </MovieList>
  );
};

export async function getServerSideProps() {
  const page = 1;
  const movies = await getMoviesAPI(page, "title", "asc", "all", 0);

  return {
    props: {
      moviesProps: movies,
      pageProps: page + 1,
    },
  };
}

const getMoviesAPI = async (
  page: number,
  sortBy: string,
  orderBy: string,
  quality: string,
  minimum_rating: number
) => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `https://yts.mx/api/v2/list_movies.json?limit=4&page=${page}&sort_by=${sortBy}&order_by=${orderBy}${
      quality !== "all" ? `&quality=${quality}` : ""
    }&minimum_rating=${minimum_rating}`,
  };

  const movies = await axios(options).then((res) =>
    res.data.data.movies.map((item: any) => ({
      id: item.id,
      title: item.title,
      summary: item.summary,
      background_image: item.medium_cover_image,
      rating: item.rating,
    }))
  );

  return movies;
};

export default Movies;
