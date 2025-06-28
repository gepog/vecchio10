import React from 'react';
import { User, Settings, HelpCircle, LogOut } from 'lucide-react';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
  onSettings: () => void;
  onHelp: () => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  isOpen,
  onClose,
  onSignOut,
  onSettings,
  onHelp,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      <div className="absolute top-16 right-4 md:right-8 bg-black/90 backdrop-blur-md border border-gray-700 rounded-md shadow-xl min-w-48">
        <div className="p-2">
          <div className="flex items-center space-x-3 p-3 border-b border-gray-700">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">John Doe</p>
              <p className="text-white/60 text-xs">john.doe@email.com</p>
            </div>
          </div>

          <div className="py-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onSettings();
                onClose();
              }}
              className="flex items-center space-x-3 w-full text-left p-2 text-white hover:bg-gray-700/50 rounded transition-colors"
            >
              <Settings size={16} />
              <span className="text-sm">Impostazioni</span>
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onHelp();
                onClose();
              }}
              className="flex items-center space-x-3 w-full text-left p-2 text-white hover:bg-gray-700/50 rounded transition-colors"
            >
              <HelpCircle size={16} />
              <span className="text-sm">Centro Assistenza</span>
            </button>
          </div>

          <div className="border-t border-gray-700 pt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSignOut();
                onClose();
              }}
              className="flex items-center space-x-3 w-full text-left p-2 text-white hover:bg-gray-700/50 rounded transition-colors"
            >
              <LogOut size={16} />
              <span className="text-sm">Esci</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};