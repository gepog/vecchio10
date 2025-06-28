import React, { useState } from 'react';
import { X, User, Bell, Shield, Globe, Palette, Monitor } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('account');

  if (!isOpen) return null;

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifiche', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'language', label: 'Lingua', icon: Globe },
    { id: 'appearance', label: 'Aspetto', icon: Palette },
    { id: 'playback', label: 'Riproduzione', icon: Monitor },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-white text-2xl font-bold">Impostazioni</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors p-2"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex h-[600px]">
          {/* Sidebar */}
          <div className="w-64 bg-gray-800 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left ${
                      activeTab === tab.id
                        ? 'bg-red-600 text-white'
                        : 'text-white/80 hover:bg-gray-700'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'account' && (
              <div className="space-y-6">
                <h3 className="text-white text-xl font-semibold">Informazioni Account</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="john.doe@email.com"
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Password
                    </label>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Cambia Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-white text-xl font-semibold">Preferenze Notifiche</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Nuovi episodi', desc: 'Ricevi notifiche per nuovi episodi delle tue serie' },
                    { label: 'Raccomandazioni', desc: 'Suggerimenti personalizzati basati sui tuoi gusti' },
                    { label: 'Promemoria', desc: 'Ricorda dove hai interrotto la visione' },
                    { label: 'Email marketing', desc: 'Offerte speciali e aggiornamenti via email' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="text-white font-medium">{item.label}</h4>
                        <p className="text-white/60 text-sm">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h3 className="text-white text-xl font-semibold">Privacy e Sicurezza</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Cronologia di visione</h4>
                    <p className="text-white/60 text-sm mb-3">
                      Gestisci la tua cronologia di visione e i dati di utilizzo
                    </p>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                      Cancella Cronologia
                    </button>
                  </div>
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Download dei tuoi dati</h4>
                    <p className="text-white/60 text-sm mb-3">
                      Scarica una copia dei tuoi dati personali
                    </p>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                      Richiedi Download
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'language' && (
              <div className="space-y-6">
                <h3 className="text-white text-xl font-semibold">Lingua e Regione</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Lingua dell'interfaccia
                    </label>
                    <select className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500">
                      <option>Italiano</option>
                      <option>English</option>
                      <option>Español</option>
                      <option>Français</option>
                      <option>Deutsch</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Regione
                    </label>
                    <select className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500">
                      <option>Italia</option>
                      <option>Stati Uniti</option>
                      <option>Regno Unito</option>
                      <option>Germania</option>
                      <option>Francia</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h3 className="text-white text-xl font-semibold">Aspetto</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Tema
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Scuro', 'Chiaro', 'Auto'].map((theme) => (
                        <button
                          key={theme}
                          className={`p-3 rounded-lg border-2 transition-colors ${
                            theme === 'Scuro'
                              ? 'border-red-600 bg-gray-800'
                              : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                          }`}
                        >
                          <div className="text-white text-sm font-medium">{theme}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'playback' && (
              <div className="space-y-6">
                <h3 className="text-white text-xl font-semibold">Impostazioni Riproduzione</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Qualità video
                    </label>
                    <select className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500">
                      <option>Auto</option>
                      <option>4K Ultra HD</option>
                      <option>HD 1080p</option>
                      <option>HD 720p</option>
                      <option>SD 480p</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Riproduzione automatica</h4>
                      <p className="text-white/60 text-sm">Avvia automaticamente il prossimo episodio</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-gray-700 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Annulla
          </button>
          <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
            Salva Modifiche
          </button>
        </div>
      </div>
    </div>
  );
};