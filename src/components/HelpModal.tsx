import React, { useState } from 'react';
import { X, Search, MessageCircle, Phone, Mail, Book, Video, Headphones } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('general');

  if (!isOpen) return null;

  const categories = [
    { id: 'general', label: 'Domande Generali', icon: Book },
    { id: 'account', label: 'Account e Fatturazione', icon: MessageCircle },
    { id: 'technical', label: 'Problemi Tecnici', icon: Video },
    { id: 'content', label: 'Contenuti', icon: Headphones },
  ];

  const faqs = {
    general: [
      {
        question: 'Come posso cambiare il mio piano di abbonamento?',
        answer: 'Puoi cambiare il tuo piano andando su Impostazioni > Account > Gestisci Abbonamento. Da lì potrai scegliere tra i piani disponibili.'
      },
      {
        question: 'Posso guardare i contenuti offline?',
        answer: 'Sì, puoi scaricare contenuti selezionati per la visione offline. Cerca l\'icona di download accanto al titolo.'
      },
      {
        question: 'Su quanti dispositivi posso guardare contemporaneamente?',
        answer: 'Il numero di dispositivi dipende dal tuo piano: Base (1), Standard (2), Premium (4).'
      }
    ],
    account: [
      {
        question: 'Come posso reimpostare la mia password?',
        answer: 'Clicca su "Password dimenticata?" nella pagina di login e segui le istruzioni inviate alla tua email.'
      },
      {
        question: 'Come posso cancellare il mio account?',
        answer: 'Vai su Impostazioni > Account > Cancella Account. Nota che questa azione è irreversibile.'
      },
      {
        question: 'Quando viene addebitato il pagamento?',
        answer: 'Il pagamento viene addebitato il giorno stesso del mese in cui ti sei iscritto, ogni mese.'
      }
    ],
    technical: [
      {
        question: 'Il video non si carica, cosa posso fare?',
        answer: 'Prova a ricaricare la pagina, controlla la tua connessione internet o prova a cambiare la qualità video.'
      },
      {
        question: 'L\'audio non è sincronizzato con il video',
        answer: 'Questo può essere dovuto a problemi di connessione. Prova a mettere in pausa e riavviare il video.'
      },
      {
        question: 'L\'app si blocca frequentemente',
        answer: 'Assicurati di avere l\'ultima versione dell\'app installata e riavvia il dispositivo.'
      }
    ],
    content: [
      {
        question: 'Perché alcuni contenuti non sono disponibili nella mia regione?',
        answer: 'I diritti di distribuzione variano per regione. Stiamo lavorando per espandere la disponibilità dei contenuti.'
      },
      {
        question: 'Come posso richiedere un nuovo contenuto?',
        answer: 'Puoi inviarci suggerimenti tramite il modulo di contatto. Valutiamo tutte le richieste per future acquisizioni.'
      },
      {
        question: 'Quando vengono aggiunti nuovi episodi?',
        answer: 'I nuovi episodi vengono solitamente aggiunti settimanalmente. Puoi attivare le notifiche per essere avvisato.'
      }
    ]
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-white text-2xl font-bold">Centro Assistenza</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors p-2"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
            <input
              type="text"
              placeholder="Cerca nella guida..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <MessageCircle className="mx-auto mb-2 text-red-500" size={32} />
              <h3 className="text-white font-semibold mb-1">Chat Live</h3>
              <p className="text-white/60 text-sm mb-3">Disponibile 24/7</p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                Avvia Chat
              </button>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <Phone className="mx-auto mb-2 text-red-500" size={32} />
              <h3 className="text-white font-semibold mb-1">Telefono</h3>
              <p className="text-white/60 text-sm mb-3">Lun-Ven 9:00-18:00</p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                Chiama Ora
              </button>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <Mail className="mx-auto mb-2 text-red-500" size={32} />
              <h3 className="text-white font-semibold mb-1">Email</h3>
              <p className="text-white/60 text-sm mb-3">Risposta in 24h</p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                Invia Email
              </button>
            </div>
          </div>

          <div className="flex h-96">
            {/* Categories Sidebar */}
            <div className="w-64 bg-gray-800 rounded-l-lg p-4">
              <h3 className="text-white font-semibold mb-4">Categorie</h3>
              <nav className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left ${
                        activeCategory === category.id
                          ? 'bg-red-600 text-white'
                          : 'text-white/80 hover:bg-gray-700'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="text-sm">{category.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* FAQ Content */}
            <div className="flex-1 bg-gray-800 rounded-r-lg p-6 overflow-y-auto">
              <h3 className="text-white text-lg font-semibold mb-4">
                Domande Frequenti - {categories.find(c => c.id === activeCategory)?.label}
              </h3>
              <div className="space-y-4">
                {faqs[activeCategory as keyof typeof faqs].map((faq, index) => (
                  <div key={index} className="border-b border-gray-700 pb-4">
                    <h4 className="text-white font-medium mb-2">{faq.question}</h4>
                    <p className="text-white/70 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};