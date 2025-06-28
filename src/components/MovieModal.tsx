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

  return (
    <div 
      className="fixed inset-0 bg-[#081932]/80 z-30 flex items-center justify-center p-4 pt-20"
      onClick={onClose}
    >
      <div 
        className="bg-[#0f2f5f] rounded-lg max-w-4xl w-full max-h-[calc(100vh-6rem)] overflow-y-auto mt-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="relative h-64 md:h-96 bg-[#081932] rounded-t-lg overflow-hidden">
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${movie.backdrop})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f2f5f] via-transparent to-transparent" />
            </div>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2 bg-[#081932]/50 rounded-full"
          >
            <X size={24} />
          </button>

          <div className="absolute left-4 right-4 bottom-4">
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
              {movie.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onAddToList(movie)}
                className={`flex items-center justify-center space-x-3 px-6 py-3 rounded-md font-semibold backdrop-blur-sm transition-all duration-200 group/button ${
                  isInMyList 
                    ? 'bg-[#ddb870] text-[#081932] hover:bg-[#ddb870]/80' 
                    : 'bg-[#0f2f5f]/80 text-white hover:bg-[#ddb870] hover:text-[#081932]'
                }`}
              >
                {isInMyList ? (
                  <X size={20} />
                ) : (
                  <Plus size={20} />
                )}
                <span>My List</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-4 text-white/90 mb-4">
              <div className="flex items-center space-x-2">
                <Heart size={16} className="text-[#ddb870]" fill="currentColor" />
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
                    ? 'text-[#ddb870] hover:text-[#ddb870]' 
                    : 'text-white hover:text-[#ebdcb5]'
                }`}
              >
                <ThumbsUp size={20} />
                <span className="text-sm">{isLiked ? 'Unlike' : 'Like'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};