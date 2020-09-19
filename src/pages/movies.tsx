import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { MovieView } from "../components/movie/MovieView";
import { movie } from "../types/movie";
import { MovieList } from "../components/movie/MovieList";

export default function Movies() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<[movie?]>([]);

  useEffect(() => {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `https://yts.mx/api/v2/list_movies.json?limit=4&page=${page}`,
    };

    axios(options).then((res) => {
      console.log(res.data.data.movies);
      const new_movies: [movie?] = res.data.data.movies.map((item: any) => ({
        id: item.id,
        title: item.title,
        summary: item.summary,
        background_image: item.medium_cover_image,
        rating: item.rating,
      }));

      setMovies([...movies, ...new_movies]);
      setPage(page + 1);
    });
  }, []);

  useEffect(() => {
    console.log(page, movies);

    console.log(
      movies.map((item: movie) => <MovieView key={item.id} movie={item} />)
    );

    console.log([<div key="1">test</div>, <div key="2">test2</div>]);
  }, [movies]);

  return (
    <MovieList>
      {movies.map((item: movie) => (
        <MovieView key={item.id} movie={item} />
      ))}
    </MovieList>
  );
}
