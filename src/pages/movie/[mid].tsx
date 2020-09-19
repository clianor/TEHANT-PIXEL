import axios, { AxiosRequestConfig } from "axios";
import MovieDetailView from "src/components/movie/MovieDetail";

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
  return (
    <MovieDetailView
      large_cover_image={large_cover_image}
      title_long={title_long}
      rating={rating}
      like_count={like_count}
      download_count={download_count}
      description_full={description_full}
    />
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
