import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { MovieView } from "../components/movie/MovieView";
import { movie } from "../types/movie";
import { MovieList } from "../components/movie/MovieList";

interface MoviesProps {
  moviesProps: movie[];
  pageProps: number;
}

const Movies: React.FC<MoviesProps> = ({ moviesProps, pageProps }) => {
  const [page, setPage] = useState(pageProps);
  const [movies, setMovies] = useState<movie[]>(moviesProps);
  const [scroll, setScroll] = useState(0);

  const getMovies = async () => {
    const newMovies: movie[] = await getMoviesAPI(page);
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
  }, [scroll]);

  return (
    <MovieList>
      {movies.map((item: movie) => (
        <MovieView key={item.id} movie={item} />
      ))}
    </MovieList>
  );
};

export async function getServerSideProps() {
  const page = 1;

  const movies = await getMoviesAPI(page);

  return {
    props: {
      moviesProps: movies,
      pageProps: page + 1,
    },
  };
}

const getMoviesAPI = async (page: number) => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `https://yts.mx/api/v2/list_movies.json?limit=4&page=${page}`,
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
