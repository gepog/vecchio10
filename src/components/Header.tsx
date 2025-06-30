import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Movie } from '../types';

interface HeaderProps {
  onSearch: (query: string) => void;
  onLogoClick: () => void;
  isScrolled: boolean;
  searchSuggestions?: Movie[];
  onMovieSelect?: (movie: Movie) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onSearch, 
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
    // Clear search when navigating
    setSearchQuery('');
    onSearch('');
    setIsSearchOpen(false);
    setShowSuggestions(false);
    
    const myListElement = document.getElementById('mylist-section');
    if (myListElement) {
      // Get the title element within the section
      const titleElement = myListElement.querySelector('h2');
      if (titleElement) {
        // Calculate offset to show the title properly
        const elementTop = titleElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementTop - 100; // 100px offset from top
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        // Fallback to section scroll
        myListElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const handlePopularClick = () => {
    // Clear search when navigating
    setSearchQuery('');
    onSearch('');
    setIsSearchOpen(false);
    setShowSuggestions(false);
    
    const popularElement = document.getElementById('most-liked-section');
    if (popularElement) {
      // Get the title element within the section
      const titleElement = popularElement.querySelector('h2');
      if (titleElement) {
        // Calculate offset to show the title properly
        const elementTop = titleElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementTop - 100; // 100px offset from top
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        // Fallback to section scroll
        popularElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const handleHomeClick = () => {
    // Clear search when navigating to home
    setSearchQuery('');
    onSearch('');
    setIsSearchOpen(false);
    setShowSuggestions(false);
    
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = ['Home', 'Popular', 'My List'];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#081932]/90 backdrop-blur-md' : 'bg-gradient-to-b from-[#081932]/80 to-transparent'
    }`}>
      <div className="flex items-center justify-between px-4 md:px-8 py-2">
        <div className="flex items-center space-x-8">
          <button
            onClick={() => window.location.reload()}
            className="hover:opacity-80 transition-opacity flex items-center justify-center"
          >
            <img 
              src="/src/assets/ChatGPT Image 26 giu 2025, 11_48_17.png" 
              alt="Skà Logo" 
              className="h-14 w-auto max-w-none scale-150"
            />
          </button>
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <button
                key={item}
                onClick={
                  item === 'Home' ? handleHomeClick :
                  item === 'My List' ? handleMyListClick : 
                  item === 'Popular' ? handlePopularClick : 
                  undefined
                }
                className="text-white hover:text-gray-300 transition-colors text-xl px-6 py-3"
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
                    className="bg-[#081932]/80 border border-gray-600 rounded px-3 py-1 text-white text-sm w-64 focus:outline-none focus:border-[#ddb870]"
                  />
                </form>
                
                {showSuggestions && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#081932]/95 backdrop-blur-md border border-gray-700 rounded-md shadow-xl max-h-80 overflow-y-auto z-50">
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
        </div>
      </div>
    </header>
  );
};