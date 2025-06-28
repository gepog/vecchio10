import React from 'react';
import { Play, Plus, Info, X } from 'lucide-react';
import { Movie } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface HeroProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  onAddToList: (movie: Movie) => void;
  onMoreInfo: (movie: Movie) => void;
  myList: string[];
}

export const Hero: React.FC<HeroProps> = ({ movie, onPlay, onAddToList, onMoreInfo, myList }) => {
  const isInMyList = myList.includes(movie.id);

  return (
    <div className="relative h-screen flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${movie.backdrop})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#081932]/80 via-[#081932]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081932]/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 px-4 md:px-8 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          {movie.title}
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed drop-shadow-md">
          {movie.overview}
        </p>
        
        <div className="flex items-center space-x-4 text-white/90 mb-6">
          <span className="px-2 py-1 bg-[#ddb870] text-[#081932] text-xs font-semibold rounded">
            {movie.rating}
          </span>
          <span>{movie.year}</span>
          <span>{movie.duration}</span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => onPlay(movie)}
            className="flex items-center justify-center space-x-3 bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-white/90 transition-colors group/play"
          >
            <Play size={20} className="group-hover/play:scale-110 transition-transform" />
            <span>Play</span>
          </button>

          <button
            onClick={() => onAddToList(movie)}
            className={`flex items-center justify-center space-x-3 bg-[#0f2f5f]/70 text-white px-8 py-3 rounded-md font-semibold backdrop-blur-sm transition-all duration-200 group/button ${
              isInMyList 
                ? 'hover:bg-[#ddb870]/90 hover:text-[#081932]' 
                : 'hover:bg-[#ebdcb5]/90 hover:text-[#081932]'
            }`}
          >
            {isInMyList ? (
              <>
                <X size={20} className="group-hover/button:rotate-90 transition-transform" />
                <span>Remove</span>
              </>
            ) : (
              <>
                <Plus size={20} className="group-hover/button:scale-110 transition-transform" />
                <span>My List</span>
              </>
            )}
          </button>

          <button
            onClick={() => onMoreInfo(movie)}
            className="flex items-center justify-center space-x-3 bg-[#0f2f5f]/20 text-white px-6 py-3 rounded-md hover:bg-[#0f2f5f]/40 transition-colors backdrop-blur-sm border border-white/20"
          >
            <Info size={20} />
            <span>More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};