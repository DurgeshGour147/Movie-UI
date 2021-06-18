
    export interface fetchMovieListRequest {
        accessToken: string;
        title?: string;
        language?: string;
        location?: string;
        sortBy?: number;
    }

    export interface Movie {
        language: string;
        location: string;
        title: string;
        imdbRating: string;
        plot: string;
        poster: string;
        soundEffects: string[];
        stills: string[];
        imdbID: string;
        listingType: string;
    }

    export interface fetchMovieListResponse {
        isSuccess: boolean;
        errorMessage: string;
        httpStatusCode: number;
        movies: Movie[];
    }

    export interface fetchMovieDetailResponse {
        isSuccess: boolean;
        errorMessage: string;
        httpStatusCode: number;
        movieDetail: Movie;
    }

    export interface fetchMovieDetailRequest {
        accessToken: string;
        title: string;
    }