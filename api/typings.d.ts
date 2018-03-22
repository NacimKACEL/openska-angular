/* Account */

interface User {
  email: string;
  hash: string;
}

interface UserInput {
  email: string;
  password: string;
}

interface AccountResponse {
  success: boolean;
  errors: string[];
  token?: string;
}

/* Cinema */

interface Movie {
  id: number;
  title: string;
  category: string;
  categoryId: number;
  summary: string;
  releasedDate: string;
  imgSrc: string;
  videoSrc: string;
  schedulesIds?: number[];
}

interface Theater {
  id: number;
  title: string;
  address: string;
  logoSrc: string;
  schedulesIds?: number[];
}

interface Category {
  id: number;
  title: string;
}

interface Schedule {
  id: number;
  hour: string;
  movieId: number;
  theaterId: number;
  movie?: Movie;
  theater?: Theater;
}

interface Reservation {
  movieTitle: string;
  theaterTitle: string;
  scheduleId: number;
  scheduleHour: string;
}

interface Slide {
  id: number;
  movieId: number;
  imgSrc: string;
  imgSrcFull: string;
  imgAlt: string;
}

interface MovieWithSchedules extends Movie {
  schedules?: Schedules[];
}

interface TheaterWithSchedules extends Theater {
  schedules?: Schedules[];
}
