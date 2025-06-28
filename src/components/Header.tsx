import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, User } from 'lucide-react';
import { Movie } from '../types';

interface HeaderProps {
  onSearch: (query: string) => void;
  onProfileClick: () => void;
  onNotificationClick: () => void;
  onLogoClick: () => void;
  isScrolled: boolean;
  searchSuggestions?: Movie[];
  onMovieSelect?: (movie: Movie) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onSearch, 
  onProfileClick, 
  onNotificationClick,
  onLogoClick,
  isScrolled,
  searchSuggestions = [],
  onMovieSelect
}) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="px-4 md:px-8 py-4">
        {/* Header is now empty */}
      </div>
    </header>
  );
};