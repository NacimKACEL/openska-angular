'use strict';

class Cinema {

  constructor() {

    /* Récupération des données sur le serveur (pourrait être en base de données) */

    let dbPathMovies     = '../data/movies.json';
    let dbPathCategories = '../data/categories.json';
    let dbPathSchedules  = '../data/schedules.json';
    let dbPathTheaters   = '../data/theaters.json';
    let dbPathSlides     = '../data/slides.json';

    /** @type {Movie[]} */
    this.movies = require(dbPathMovies);
    /** @type {Category[]} */
    this.categories = require(dbPathCategories);
    /** @type {Schedule[]} */
    this.schedules = require(dbPathSchedules);
    /** @type {Theater[]} */
    this.theaters = require(dbPathTheaters);
    /** @type {Slide[]} */
    this.slides = require(dbPathSlides);

  }

  getMovies() {

    return this.movies;

  }

  /** @param {number} id */
  getMovie(id) {

    /** @type {MovieWithSchedules} */
    let movie = Object.assign({}, this.movies[id - 1]);

    /* S'il y a des séances prévues, remplace les ids des schedules pour les données réelles */
    if (('schedulesIds' in movie) && (movie.schedulesIds != null)) {

      movie.schedules = movie.schedulesIds
        .map((id) => Object.assign({}, this.schedules[id - 1]))
        .map((schedule) => this.fillScheduleTheater(schedule));

    }

    return movie;

  }

  getCategories() {

    return this.categories;

  }

  getTheaters() {

    return this.theaters;

  }

  /** @param {number} id */
  getTheater(id) {

    /** @type {TheaterWithSchedules} */
    let theater = Object.assign({}, this.theaters[id - 1]);

    /* S'il y a des séances prévues, remplace les ids des schedules pour les données réelles */
    if (('schedulesIds' in theater) && (theater.schedulesIds != null)) {

      theater.schedules = theater.schedulesIds
        .map((id) => Object.assign({}, this.schedules[id - 1]))
        .map((schedule) => this.fillScheduleMovie(schedule));

    }

    return theater;

  }

  /**
   * @param {{ schedule: number }} body
   * @returns {Reservation | null}
   */
  book(body) {

    const { schedule } = body;

    if ((typeof schedule !== 'number') || !this.schedules[schedule - 1]) {
      return null;
    }

    /** @type {Schedule} */
    let scheduleData = this.fillScheduleTheater(this.fillScheduleMovie(Object.assign({}, this.schedules[schedule - 1])));

    if (!scheduleData.movie || !scheduleData.theater) {
      return null;
    }

    /** @type {Reservation} */
    let reservation = {
      movieTitle: scheduleData.movie.title,
      theaterTitle: scheduleData.theater.title,
      scheduleId: schedule,
      scheduleHour: scheduleData.hour
    };

    return reservation;

  }

  /** @param {Schedule} schedule */
  fillScheduleMovie(schedule) {

    schedule.movie = this.movies[schedule.movieId - 1];

    return schedule;

  }

  /** @param {Schedule} schedule */
  fillScheduleTheater(schedule) {

    schedule.theater = this.theaters[schedule.theaterId - 1];

    return schedule;

  }

  getSlides() {

    return this.slides;

  }

}

module.exports = Cinema;
