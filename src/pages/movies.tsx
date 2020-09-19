import Head from "next/head";
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { Box, Select, Text } from "@chakra-ui/core";
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

  const getMovies = async () => {
    const newMovies: movie[] = await getMoviesAPI(page, sortBy, orderBy);
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
    const [sortby, orderby] = event.target.value.split(" ");
    setSortBy(sortby);
    setOrderBy(orderby);
    setPage(1);
    const movies = await getMoviesAPI(1, sortby, orderby);
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
  }, [scroll, movies, sortBy, orderBy]);

  return (
    <MovieList>
      <Head>
        <title>Movies</title>
      </Head>
      <Box>
        <Text pb="2" pl="1">
          Sorting
        </Text>
        <Select onChange={handleSortChange}>
          <option value="title asc">title asc</option>
          <option value="title desc">title desc</option>
          <option value="year asc">year asc</option>
          <option value="year desc">year desc</option>
          <option value="rating asc">rating asc</option>
          <option value="rating desc">rating desc</option>
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
  const movies = await getMoviesAPI(page, "title", "asc");

  return {
    props: {
      moviesProps: movies,
      pageProps: page + 1,
    },
  };
}

const getMoviesAPI = async (page: number, sortBy: string, orderBy: string) => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `https://yts.mx/api/v2/list_movies.json?limit=4&page=${page}&sort_by=${sortBy}&order_by=${orderBy}`,
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
