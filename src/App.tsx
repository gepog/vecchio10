import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ContentRow } from './components/ContentRow';
import { MovieModal } from './components/MovieModal';
import { SearchResults } from './components/SearchResults';
import { SettingsModal } from './components/SettingsModal';
import { HelpModal } from './components/HelpModal';
import { LogoutModal } from './components/LogoutModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { movies, contentRows, featuredMovie } from './data/movies';
import { Movie } from './types';

function App() {
  const [selectedMovie, setSelectedMovie] = React.useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showSettings, setShowSettings] = React.useState(false);
  const [showHelp, setShowHelp] = React.useState(false);
  const [showLogout, setShowLogout] = React.useState(false);
  const [watchedMovies, setWatchedMovies] = useLocalStorage<string[]>('watchedMovies', []);
  const [likedMovies, setLikedMovies] = useLocalStorage<string[]>('likedMovies', []);

  const filteredMovies = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    return movies.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleWatchMovie = (movieId: string) => {
    if (!watchedMovies.includes(movieId)) {
      setWatchedMovies([...watchedMovies, movieId]);
    }
  };

  const handleLikeMovie = (movieId: string) => {
    if (likedMovies.includes(movieId)) {
      setLikedMovies(likedMovies.filter(id => id !== movieId));
    } else {
      setLikedMovies([...likedMovies, movieId]);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header 
        onSearch={handleSearch}
        onSettingsClick={() => setShowSettings(true)}
        onHelpClick={() => setShowHelp(true)}
        onLogoutClick={() => setShowLogout(true)}
      />
      
      <main className="pb-8">
        {searchQuery ? (
          <SearchResults 
            movies={filteredMovies}
            onMovieSelect={handleMovieSelect}
            searchQuery={searchQuery}
          />
        ) : (
          <>
            <Hero 
              movie={featuredMovie}
              onPlayClick={() => handleMovieSelect(featuredMovie)}
            />
            
            <div className="space-y-8">
              {contentRows.map((row) => (
                <ContentRow
                  key={row.id}
                  title={row.title}
                  movies={row.movies}
                  onMovieSelect={handleMovieSelect}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={handleCloseModal}
          onWatch={() => handleWatchMovie(selectedMovie.id)}
          onLike={() => handleLikeMovie(selectedMovie.id)}
          isLiked={likedMovies.includes(selectedMovie.id)}
          isWatched={watchedMovies.includes(selectedMovie.id)}
        />
      )}

      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}

      {showHelp && (
        <HelpModal onClose={() => setShowHelp(false)} />
      )}

      {showLogout && (
        <LogoutModal onClose={() => setShowLogout(false)} />
      )}
    </div>
  );
}

export default App;