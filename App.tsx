import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Icons } from './components/Icons';
import { DevotionalCard } from './components/DevotionalCard';
import { generateDevotionalByTopic, generateComfortingPrayer } from './services/geminiService';
import { NavSection, Devotional, ChurchEvent } from './types';

// Placeholder data for initial load
const INITIAL_DEVOTIONAL: Devotional = {
  title: "Renovando as Forças",
  verse: "Mas os que esperam no Senhor renovarão as forças, subirão com asas como águias; correrão, e não se cansarão; caminharão, e não se fatigarão.",
  verseReference: "Isaías 40:31",
  reflection: "Em tempos de correria e exaustão, é fácil esquecer onde está a nossa verdadeira fonte de energia. Não é na nossa própria capacidade de resolver problemas, mas na confiança silenciosa em Deus. Esperar no Senhor não é inércia, é uma atitude ativa de fé, crendo que Ele está trabalhando mesmo quando não vemos.",
  prayer: "Senhor, ensina-me a esperar em Ti. Quando minhas forças faltarem, que a Tua força se aperfeiçoe em minha fraqueza. Renova meu ânimo hoje. Amém."
};

const EVENTS: ChurchEvent[] = [
  {
    id: '1',
    title: 'Culto de Celebração',
    date: 'Domingo',
    time: '18:00',
    location: 'Templo Principal',
    description: 'Venha celebrar a vida e a palavra de Deus conosco. Traga sua família!',
    image: 'https://picsum.photos/seed/church1/400/250'
  },
  {
    id: '2',
    title: 'Escola Bíblica',
    date: 'Quarta-feira',
    time: '20:00',
    location: 'Sala 01 & Online',
    description: 'Estudo profundo do livro de Atos. Aprenda mais sobre as origens da fé.',
    image: 'https://picsum.photos/seed/bible/400/250'
  },
  {
    id: '3',
    title: 'Encontro de Jovens (JNSA)',
    date: 'Sábado',
    time: '19:30',
    location: 'Salão Social',
    description: 'Música, comunhão e papo sério sobre a vida cristã na juventude.',
    image: 'https://picsum.photos/seed/youth/400/250'
  }
];

function App() {
  const [activeSection, setActiveSection] = useState<NavSection>(NavSection.HOME);
  const [currentDevotional, setCurrentDevotional] = useState<Devotional>(INITIAL_DEVOTIONAL);
  const [devotionalTopic, setDevotionalTopic] = useState('');
  const [isGeneratingDevotional, setIsGeneratingDevotional] = useState(false);
  
  const [prayerRequest, setPrayerRequest] = useState('');
  const [generatedPrayer, setGeneratedPrayer] = useState('');
  const [isGeneratingPrayer, setIsGeneratingPrayer] = useState(false);

  // Handle hash change for simple routing emulation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'devocional') setActiveSection(NavSection.DEVOTIONAL);
      else if (hash === 'eventos') setActiveSection(NavSection.EVENTS);
      else if (hash === 'oracao') setActiveSection(NavSection.PRAYER);
      else setActiveSection(NavSection.HOME);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check on mount
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (section: NavSection) => {
    setActiveSection(section);
    window.location.hash = section === NavSection.HOME ? '' : section;
  };

  const handleGenerateDevotional = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!devotionalTopic.trim()) return;
    
    setIsGeneratingDevotional(true);
    const result = await generateDevotionalByTopic(devotionalTopic);
    if (result) {
      setCurrentDevotional(result);
    }
    setIsGeneratingDevotional(false);
  };

  const handleGeneratePrayer = async () => {
    if (!prayerRequest.trim()) return;
    setIsGeneratingPrayer(true);
    const result = await generateComfortingPrayer(prayerRequest);
    setGeneratedPrayer(result);
    setIsGeneratingPrayer(false);
  };

  return (
    <div className="min-h-screen bg-church-50 text-gray-800 font-sans selection:bg-church-200">
      <Navbar currentSection={activeSection} onNavigate={handleNavigate} />

      {/* HERO SECTION */}
      {activeSection === NavSection.HOME && (
        <header className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
             <img 
              src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2673&auto=format&fit=crop" 
              alt="Church Interior" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-church-900/70 via-church-900/50 to-church-900/80"></div>
          </div>

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <span className="block text-gold-500 font-medium tracking-[0.2em] uppercase mb-4 animate-fade-in-up">Bem-vindo à</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Igreja Novo <br/><span className="italic font-light">Santo Amaro</span>
            </h1>
            <p className="text-church-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Uma comunidade de fé, esperança e amor. Conectando pessoas a Deus e transformando vidas através do evangelho.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => handleNavigate(NavSection.EVENTS)}
                className="px-8 py-4 bg-gold-500 hover:bg-gold-600 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-lg flex items-center"
              >
                Nossos Cultos
                <Icons.ChevronRight className="ml-2 w-5 h-5" />
              </button>
              <button 
                onClick={() => handleNavigate(NavSection.DEVOTIONAL)}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full font-medium transition-all flex items-center"
              >
                <Icons.BookOpen className="mr-2 w-5 h-5" />
                Devocional Diário
              </button>
            </div>
          </div>

          <div className="absolute bottom-10 left-0 w-full flex justify-center animate-bounce text-white/50">
            <Icons.ChevronRight className="w-8 h-8 rotate-90" />
          </div>
        </header>
      )}

      {/* MAIN CONTENT CONTAINER */}
      <main className={`transition-all duration-500 ${activeSection === NavSection.HOME ? 'py-20' : 'pt-32 pb-20'}`}>
        
        {/* HOME - ABOUT SECTION (Visible only on Home) */}
        {activeSection === NavSection.HOME && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
             <div className="text-center mb-16">
                <h2 className="text-church-600 font-bold tracking-widest uppercase text-sm mb-3">Nossa Identidade</h2>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-church-900">Um lugar para pertencer</h3>
                <div className="w-24 h-1 bg-gold-500 mx-auto mt-6 rounded-full"></div>
             </div>
             
             <div className="grid md:grid-cols-3 gap-10">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-church-50 hover:shadow-md transition-shadow text-center group">
                   <div className="w-16 h-16 bg-church-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-church-600 transition-colors">
                      <Icons.Heart className="w-8 h-8 text-church-600 group-hover:text-white transition-colors" />
                   </div>
                   <h4 className="text-xl font-bold mb-4 text-church-800">Comunhão</h4>
                   <p className="text-gray-600 leading-relaxed">Vivemos como uma grande família, compartilhando a vida e crescendo juntos na fé.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-church-50 hover:shadow-md transition-shadow text-center group">
                   <div className="w-16 h-16 bg-church-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-church-600 transition-colors">
                      <Icons.BookOpen className="w-8 h-8 text-church-600 group-hover:text-white transition-colors" />
                   </div>
                   <h4 className="text-xl font-bold mb-4 text-church-800">Palavra</h4>
                   <p className="text-gray-600 leading-relaxed">Comprometidos com o ensino bíblico profundo e relevante para os dias atuais.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-church-50 hover:shadow-md transition-shadow text-center group">
                   <div className="w-16 h-16 bg-church-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-church-600 transition-colors">
                      <Icons.Sparkles className="w-8 h-8 text-church-600 group-hover:text-white transition-colors" />
                   </div>
                   <h4 className="text-xl font-bold mb-4 text-church-800">Adoração</h4>
                   <p className="text-gray-600 leading-relaxed">Um estilo de vida que exalta a Deus em tudo o que fazemos, dentro e fora do templo.</p>
                </div>
             </div>
          </div>
        )}

        {/* DEVOTIONAL SECTION */}
        {(activeSection === NavSection.DEVOTIONAL || activeSection === NavSection.HOME) && (
          <section id="devocional" className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${activeSection === NavSection.HOME ? 'mb-20' : ''}`}>
             <div className="flex flex-col md:flex-row justify-between items-end mb-10">
                <div className="text-left">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-church-900 mb-2">Devocional Diário</h2>
                  <p className="text-gray-600">Alimente seu espírito com a palavra de Deus.</p>
                </div>
                {activeSection === NavSection.DEVOTIONAL && (
                   <form onSubmit={handleGenerateDevotional} className="mt-6 md:mt-0 w-full md:w-auto flex bg-white rounded-full shadow-sm border border-church-100 p-1">
                      <input 
                        type="text" 
                        placeholder="Sobre o que você quer ler hoje?"
                        className="flex-1 px-4 py-2 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                        value={devotionalTopic}
                        onChange={(e) => setDevotionalTopic(e.target.value)}
                      />
                      <button 
                        type="submit"
                        disabled={isGeneratingDevotional}
                        className="bg-church-600 hover:bg-church-700 text-white px-6 py-2 rounded-full font-medium transition-colors disabled:opacity-70 flex items-center"
                      >
                         {isGeneratingDevotional ? <span className="animate-spin mr-2">⏳</span> : <Icons.Sparkles className="w-4 h-4 mr-2" />}
                         Gerar
                      </button>
                   </form>
                )}
             </div>

             <DevotionalCard devotional={currentDevotional} loading={isGeneratingDevotional} />
          </section>
        )}

        {/* EVENTS SECTION */}
        {(activeSection === NavSection.EVENTS || activeSection === NavSection.HOME) && (
           <section id="eventos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-church-900">Nossa Agenda</h2>
                <div className="w-16 h-1 bg-gold-500 mx-auto mt-4 rounded-full"></div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {EVENTS.map(event => (
                  <div key={event.id} className="bg-white rounded-xl shadow-sm border border-church-100 overflow-hidden hover:shadow-lg transition-all group">
                    <div className="h-48 overflow-hidden relative">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-md text-church-900 font-bold text-xs uppercase tracking-wider">
                         {event.date}
                      </div>
                    </div>
                    <div className="p-6">
                       <h3 className="text-xl font-bold text-church-800 mb-2">{event.title}</h3>
                       <div className="flex items-center text-gray-500 text-sm mb-4 space-x-4">
                          <span className="flex items-center"><Icons.Clock className="w-4 h-4 mr-1" /> {event.time}</span>
                          <span className="flex items-center"><Icons.MapPin className="w-4 h-4 mr-1" /> {event.location}</span>
                       </div>
                       <p className="text-gray-600 text-sm line-clamp-3 mb-4">{event.description}</p>
                       <button className="text-church-600 font-medium text-sm flex items-center hover:text-church-800">
                          Saiba mais <Icons.ChevronRight className="w-4 h-4 ml-1" />
                       </button>
                    </div>
                  </div>
                ))}
              </div>
           </section>
        )}

        {/* PRAYER SECTION */}
        {(activeSection === NavSection.PRAYER || activeSection === NavSection.HOME) && (
           <section id="oracao" className="bg-church-900 text-white py-20 relative overflow-hidden">
             {/* Abstract Background Shapes */}
             <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-church-800 rounded-full opacity-50 blur-3xl"></div>
             <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-gold-600 rounded-full opacity-20 blur-3xl"></div>

             <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <Icons.Heart className="w-12 h-12 text-gold-500 mx-auto mb-6" />
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Precisa de Oração?</h2>
                <p className="text-church-200 text-lg mb-10 max-w-2xl mx-auto">
                  Não importa o que você esteja enfrentando, Deus ouve e se importa. 
                  Compartilhe conosco ou use nossa ferramenta pastoral para receber uma oração de conforto agora mesmo.
                </p>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl max-w-2xl mx-auto">
                   <textarea
                      value={prayerRequest}
                      onChange={(e) => setPrayerRequest(e.target.value)}
                      placeholder="Descreva brevemente sua situação ou motivo de oração..."
                      className="w-full bg-church-950/50 border border-church-700 rounded-lg p-4 text-white placeholder-church-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 resize-none h-32 mb-4"
                   />
                   
                   {!generatedPrayer ? (
                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                          onClick={handleGeneratePrayer}
                          disabled={isGeneratingPrayer || !prayerRequest}
                          className="flex-1 bg-gold-500 hover:bg-gold-600 text-white py-3 px-6 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                        >
                           {isGeneratingPrayer ? <span className="animate-spin mr-2">⏳</span> : <Icons.Sparkles className="w-5 h-5 mr-2" />}
                           Receber Oração Agora
                        </button>
                        <button className="flex-1 bg-transparent border border-church-500 hover:bg-church-800 text-church-200 hover:text-white py-3 px-6 rounded-lg font-medium transition-colors">
                           Enviar para a Equipe Pastoral
                        </button>
                     </div>
                   ) : (
                     <div className="mt-6 text-left animate-fade-in">
                        <div className="bg-church-800/50 p-6 rounded-lg border-l-4 border-gold-500">
                          <h4 className="text-gold-400 font-bold mb-2 text-sm uppercase tracking-wider">Uma oração para você</h4>
                          <p className="text-white italic leading-relaxed whitespace-pre-line">{generatedPrayer}</p>
                        </div>
                        <button 
                          onClick={() => { setGeneratedPrayer(''); setPrayerRequest(''); }}
                          className="mt-4 text-sm text-church-300 hover:text-white underline"
                        >
                          Fazer outro pedido
                        </button>
                     </div>
                   )}
                </div>
             </div>
           </section>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-church-950 text-church-300 py-12 border-t border-church-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3 text-church-900 font-bold">NS</div>
                <span className="text-white font-bold text-xl">Novo Santo Amaro</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                Levando a luz de Cristo para a comunidade de Santo Amaro e além. Junte-se a nós nesta jornada de fé.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Links Rápidos</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => handleNavigate(NavSection.HOME)} className="hover:text-gold-500 transition-colors">Início</button></li>
                <li><button onClick={() => handleNavigate(NavSection.DEVOTIONAL)} className="hover:text-gold-500 transition-colors">Devocionais</button></li>
                <li><button onClick={() => handleNavigate(NavSection.EVENTS)} className="hover:text-gold-500 transition-colors">Eventos</button></li>
                <li><button onClick={() => handleNavigate(NavSection.PRAYER)} className="hover:text-gold-500 transition-colors">Pedidos de Oração</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Contato</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <Icons.MapPin className="w-5 h-5 mr-2 text-church-500 flex-shrink-0" />
                  <span>Rua da Esperança, 123<br/>Santo Amaro, SP</span>
                </li>
                <li className="flex items-center">
                  <Icons.Calendar className="w-5 h-5 mr-2 text-church-500 flex-shrink-0" />
                  <span>Domingos: 10h e 18h</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-church-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
            <p>&copy; 2024 Igreja Novo Santo Amaro. Todos os direitos reservados.</p>
            <p className="mt-2 md:mt-0 opacity-50">Desenvolvido com Gemini AI</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;