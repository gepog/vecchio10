import React from 'react';
import { Clock, Star, Play } from 'lucide-react';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Notification {
  id: string;
  type: 'new_release' | 'recommendation' | 'reminder';
  title: string;
  description: string;
  time: string;
  thumbnail?: string;
  isRead: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'new_release',
    title: 'New Content Added',
    description: 'Expo Agents - Revolutionary AI automation tools are now available',
    time: '1 hour ago',
    thumbnail: '/src/assets/11.jpg',
    isRead: false,
  },
  {
    id: '2',
    type: 'recommendation',
    title: 'Trending Now',
    description: 'RevenueCat Virtual Currency is gaining popularity - check it out!',
    time: '3 hours ago',
    thumbnail: '/src/assets/a_high-resolution_image_of_a_modern_smartphone_held_in_a_users_hand_displaying_an_in-app_dashboard__gm9cby3s5d29uti3ozxh_1.png',
    isRead: false,
  },
  {
    id: '3',
    type: 'new_release',
    title: 'Fresh Upload',
    description: 'Tavus Real Estate - Personalized video solutions just dropped',
    time: '6 hours ago',
    thumbnail: '/src/assets/1.jpg',
    isRead: true,
  },
  {
    id: '4',
    type: 'recommendation',
    title: 'Most Liked Content',
    description: 'Expo Workflow Marketplace is breaking records with 2.8K likes',
    time: '1 day ago',
    thumbnail: '/src/assets/13.jpg',
    isRead: true,
  },
  {
    id: '5',
    type: 'reminder',
    title: 'Weekly Digest',
    description: 'Your personalized content recommendations are ready',
    time: '2 days ago',
    thumbnail: '/src/assets/futuristic_automation_dashboard_in_dark_mode_with_glowing_orange_and_amber_node_connections_grouped_xt3w9jrdh4xby65yuki2_41.png',
    isRead: true,
  },
  {
    id: '6',
    type: 'new_release',
    title: 'Platform Update',
    description: 'New features added: Enhanced search and improved recommendations',
    time: '3 days ago',
    thumbnail: '/src/assets/a_sleek_futuristic_email_inbox_interface_glowing_with_blue_neon_highlights_with_ai_automation_lines_xdspk5ut06lpmu44wane_9.png',
    isRead: true,
  },
];

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'new_release':
        return <Star size={16} className="text-yellow-500" />;
      case 'recommendation':
        return <Play size={16} className="text-blue-500" />;
      case 'reminder':
        return <Clock size={16} className="text-green-500" />;
      default:
        return <Star size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      <div className="absolute top-16 right-4 md:right-20 bg-[#081932]/95 backdrop-blur-md border border-gray-700 rounded-md shadow-xl w-80 max-h-96 overflow-y-auto">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-white font-semibold text-lg">Notifications</h3>
        </div>
        
        <div className="divide-y divide-gray-700">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-[#0f2f5f]/50 transition-colors cursor-pointer ${
                !notification.isRead ? 'bg-[#0f2f5f]/30' : ''
              }`}
            >
              <div className="flex space-x-3">
                {notification.thumbnail && (
                  <img
                    src={notification.thumbnail}
                    alt=""
                    className="w-12 h-12 rounded object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    {getNotificationIcon(notification.type)}
                    <h4 className={`text-sm font-medium ${
                      notification.isRead ? 'text-white/80' : 'text-white'
                    }`}>
                      {notification.title}
                    </h4>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-[#ddb870] rounded-full flex-shrink-0"></div>
                    )}
                  </div>
                  <p className={`text-xs ${
                    notification.isRead ? 'text-white/60' : 'text-white/80'
                  } line-clamp-2`}>
                    {notification.description}
                  </p>
                  <p className="text-xs text-white/50 mt-1">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-700">
          <button className="text-[#ddb870] hover:text-[#ebdcb5] text-sm font-medium transition-colors">
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
};