import React, { useState } from 'react';
import { X, Play, Plus, Heart, ThumbsUp } from 'lucide-react';
import { Movie } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
  onPlay: (movie: Movie) => void;
  onAddToList: (movie: Movie) => void;
  onLike: (movie: Movie) => void;
  currentLikes: number;
  isLiked: boolean;
  myList: string[];
}

export const MovieModal: React.FC<MovieModalProps> = ({
  movie,
  onClose,
  onPlay,
  onAddToList,
  onLike,
  currentLikes,
  isLiked,
  myList,
}) => {
  const isInMyList = myList.includes(movie.id);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="relative h-64 md:h-96 bg-black rounded-t-lg overflow-hidden">
            {isTrailerPlaying ? (
              <video
                autoPlay
                controls
                className="w-full h-full object-cover"
                src={movie.trailerUrl}
              />
            ) : (
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${movie.backdrop})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                <button
                  onClick={() => setIsTrailerPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors backdrop-blur-sm">
                    <Play size={28} className="text-white ml-1" fill="currentColor" />
                  </div>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full"
          >
            <X size={24} />
          </button>

          <div className={`absolute left-4 right-4 transition-all duration-300 ${
            isTrailerPlaying ? 'bottom-16 opacity-100' : 'bottom-4 opacity-100'
          }`}>
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
              {movie.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onPlay(movie)}
                className="flex items-center justify-center space-x-3 bg-white text-black px-6 py-3 rounded-md hover:bg-white/90 transition-colors font-semibold"
              >
                <Play size={20} fill="currentColor" />
                <span>Play</span>
              </button>

              <button
                onClick={() => onAddToList(movie)}
                className={`flex items-center justify-center space-x-3 bg-gray-600/80 text-white px-6 py-3 rounded-md font-semibold backdrop-blur-sm transition-all duration-200 group/button ${
                  isInMyList 
                    ? 'hover:bg-red-500/90' 
                    : 'hover:bg-green-500/90'
                }`}
              >
                {isInMyList ? (
                  <>
                    <Plus size={20} className="group-hover/button:hidden" />
                    <X size={20} className="hidden group-hover/button:block" />
                  </>
                ) : (
                  <Plus size={20} />
                )}
                <span>My List</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 text-white/90 mb-4">
                <span className="px-2 py-1 bg-red-600 text-xs font-semibold rounded">
                  {movie.rating}
                </span>
                <span>{movie.year}</span>
                <span>{movie.duration}</span>
                <div className="flex items-center space-x-2">
                  <Heart size={16} className="text-red-500" fill="currentColor" />
                  <span className="text-sm font-medium">{currentLikes.toLocaleString()}</span>
                </div>
              </div>

              <p className="text-white/90 text-lg leading-relaxed mb-6">
                {movie.description}
              </p>

              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => onLike(movie)}
                  className={`flex items-center space-x-2 transition-colors ${
                    isLiked 
                      ? 'text-green-500' 
                      : 'text-white hover:text-green-500'
                  }`}
                >
                  <ThumbsUp size={20} />
                  <span className="text-sm">{isLiked ? 'Unlike' : 'Like'}</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genre.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-gray-700 text-white/80 text-sm rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">More Like This</h3>
                <div className="text-white/60 text-sm">
                  Discover similar content based on your preferences
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};