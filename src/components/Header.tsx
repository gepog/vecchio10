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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setIsSearchOpen(false);
    setShowSuggestions(false);
  };

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (movie: Movie) => {
    setSearchQuery('');
    setIsSearchOpen(false);
    setShowSuggestions(false);
    onMovieSelect?.(movie);
  };

  const handleMyListClick = () => {
    const myListElement = document.getElementById('mylist-section');
    if (myListElement) {
      myListElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const navItems = ['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List'];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <div className="flex items-center space-x-8">
          <button
            onClick={onLogoClick}
            className="text-red-600 text-2xl font-bold hover:text-red-500 transition-colors"
          >
            PROJECT
          </button>
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <button
                key={item}
                onClick={item === 'My List' ? handleMyListClick : undefined}
                className={`text-white hover:text-gray-300 transition-colors text-sm ${
                  index === 0 ? 'font-semibold' : ''
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            {isSearchOpen ? (
              <div className="relative">
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onBlur={() => {
                      setTimeout(() => {
                        if (!searchQuery) setIsSearchOpen(false);
                        setShowSuggestions(false);
                      }, 200);
                    }}
                    onFocus={() => searchQuery && setShowSuggestions(true)}
                    placeholder="Search titles..."
                    className="bg-black/80 border border-gray-600 rounded px-3 py-1 text-white text-sm w-64 focus:outline-none focus:border-white"
                  />
                </form>
                
                {showSuggestions && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-black/95 backdrop-blur-md border border-gray-700 rounded-md shadow-xl max-h-80 overflow-y-auto z-50">
                    {searchSuggestions.slice(0, 6).map((movie) => (
                      <div
                        key={movie.id}
                        onClick={() => handleSuggestionClick(movie)}
                        className="flex items-center space-x-3 p-3 hover:bg-gray-800/50 cursor-pointer transition-colors"
                      >
                        <img
                          src={movie.thumbnail}
                          alt={movie.title}
                          className="w-12 h-8 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white text-sm font-medium truncate">
                            {movie.title}
                          </h4>
                          <p className="text-white/60 text-xs">
                            {movie.year} • {movie.genre.slice(0, 2).join(', ')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-white hover:text-gray-300 transition-colors p-2"
              >
                <Search size={20} />
              </button>
            )}
          </div>

          <button 
            onClick={onNotificationClick}
            className="text-white hover:text-gray-300 transition-colors p-2 relative"
          >
            <Bell size={20} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></div>
          </button>

          <button
            onClick={onProfileClick}
            className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
          >
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <User size={16} />
            </div>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};