/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { 
  Layers, 
  Network, 
  GitMerge, 
  Cpu, 
  RotateCcw, 
  Clock, 
  Volume2, 
  VolumeX, 
  Lightbulb, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Award, 
  Zap, 
  ChevronRight, 
  Search,
  HelpCircle,
  TrendingUp,
  X,
  Plus,
  Globe,
  Target,
  Server,
  Shield,
  LayoutGrid,
  ExternalLink,
  Sun,
  Moon
} from 'lucide-react';
import { dsaCategories } from './data';
import { DSACard, DSAPair, DSACategory, GameStats, LeaderboardEntry } from './types';
import { sfx } from './sound';
import { topicRecommendations, categoryFallbacks } from './recommendations';

// Helper to shuffle arrays
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const getCategoryMetadata = (id: string) => {
  switch (id) {
    case 'linear':
      return {
        level: 'Easy',
        levelColor: 'text-emerald-400 bg-emerald-950/30 border-emerald-500/15',
        themeColor: 'from-indigo-950/40 via-indigo-900/10 to-slate-950 border-indigo-500/30 text-indigo-300 hover:border-indigo-400/50',
        iconBg: 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20',
        topics: 'Array, Linked List, Stack, Queue, Hash Table, Deque...',
        badge: 'Foundation DSA'
      };
    case 'nonlinear':
      return {
        level: 'Medium',
        levelColor: 'text-amber-400 bg-amber-950/30 border-amber-500/15',
        themeColor: 'from-purple-950/40 via-purple-900/10 to-slate-950 border-purple-500/30 text-purple-300 hover:border-purple-400/50',
        iconBg: 'bg-purple-500/15 text-purple-400 border border-purple-500/20',
        topics: 'BSTs, Heaps, Tries, Graphs, Balanced Trees, Disjoint Set...',
        badge: 'Complex Networks'
      };
    case 'algorithms':
      return {
        level: 'Medium',
        levelColor: 'text-amber-400 bg-amber-950/30 border-amber-500/15',
        themeColor: 'from-amber-950/40 via-amber-900/10 to-slate-950 border-amber-500/30 text-amber-300 hover:border-amber-400/50',
        iconBg: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
        topics: 'Binary Search, DFS, BFS, Dijkstra, Dynamic Programming...',
        badge: 'Logic & Traversal'
      };
    case 'api_codes':
      return {
        level: 'Easy',
        levelColor: 'text-emerald-400 bg-emerald-950/30 border-emerald-500/15',
        themeColor: 'from-emerald-950/40 via-emerald-900/10 to-slate-950 border-emerald-500/30 text-emerald-300 hover:border-emerald-400/50',
        iconBg: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
        topics: 'HTTP Methods, Status Codes, REST APIs, GraphQL, CORS...',
        badge: 'Web Architecture'
      };
    case 'problem_approaches':
      return {
        level: 'Hard',
        levelColor: 'text-rose-400 bg-rose-950/30 border-rose-500/15',
        themeColor: 'from-pink-950/40 via-pink-900/10 to-slate-950 border-pink-500/30 text-pink-300 hover:border-pink-400/50',
        iconBg: 'bg-pink-500/15 text-pink-400 border border-pink-500/20',
        topics: 'Sliding Window, Two Pointers, Monotonic Deque, Course Sched...',
        badge: 'LeetCode Patterns'
      };
    case 'system_design':
      return {
        level: 'Hard',
        levelColor: 'text-rose-400 bg-rose-950/30 border-rose-500/15',
        themeColor: 'from-rose-950/40 via-rose-900/10 to-slate-950 border-rose-500/30 text-rose-300 hover:border-rose-400/50',
        iconBg: 'bg-rose-500/15 text-rose-400 border border-rose-500/20',
        topics: 'CQRS, CAP Theorem, Bloom Filters, Consistent Hashing, Gateways...',
        badge: 'System Architecture'
      };
    case 'security_concepts':
      return {
        level: 'Hard',
        levelColor: 'text-rose-400 bg-rose-950/30 border-rose-500/15',
        themeColor: 'from-cyan-950/40 via-cyan-900/10 to-slate-950 border-cyan-500/30 text-cyan-300 hover:border-cyan-400/50',
        iconBg: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/20',
        topics: 'XSS, CSRF, SSRF, JWT Secure Cookies, OAuth Scopes, SAML SSO...',
        badge: 'System Defense'
      };
    default:
      return {
        level: 'Medium',
        levelColor: 'text-slate-400 bg-slate-900/30 border-slate-700/15',
        themeColor: 'from-slate-950/40 via-slate-900/10 to-slate-950 border-slate-500/30 text-slate-300 hover:border-slate-400/50',
        iconBg: 'bg-slate-500/15 text-slate-400 border border-slate-500/20',
        topics: 'General tech concepts...',
        badge: 'General Study'
      };
  }
};

export default function App() {
  // Game Setup States
  const [selectedCategory, setSelectedCategory] = useState<DSACategory>(dsaCategories[0]);
  const [sessionSize, setSessionSize] = useState<number | 'all'>('all');
  const [activePairs, setActivePairs] = useState<DSAPair[]>([]);
  const [muted, setMuted] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'study' | 'practice'>('study');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('dsa_theme') as 'light' | 'dark') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('dsa_theme', theme);
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-mode');
    } else {
      root.classList.remove('light-mode');
    }
  }, [theme]);
  
  // Game Play States
  const [topicCards, setTopicCards] = useState<DSACard[]>([]);
  const [definitionCards, setDefinitionCards] = useState<DSACard[]>([]);
  
  // Active Selection States
  const [selectedTopic, setSelectedTopic] = useState<DSACard | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<DSACard | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  // Error flash state
  const [mismatchIds, setMismatchIds] = useState<string[]>([]);
  const [successIds, setSuccessIds] = useState<string[]>([]);
  const [mismatchedPairIds, setMismatchedPairIds] = useState<string[]>([]);

  // Statistics
  const [moves, setMoves] = useState<number>(0);
  const [matchesCount, setMatchesCount] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  
  // Spotlighting
  const [activeSpotlight, setActiveSpotlight] = useState<DSAPair | null>(null);
  
  // Custom username & leaderboard
  const [username, setUsername] = useState<string>('Developer');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [showDeckDirectory, setShowDeckDirectory] = useState<boolean>(false);
  
  // Dictionary / Study Guide search
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Timer Interval Reference
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load Leaderboard on init
  useEffect(() => {
    const saved = localStorage.getItem('dsa_leaderboard');
    if (saved) {
      try {
        setLeaderboard(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading leaderboard', e);
      }
    }
  }, []);

  // Set default sound mute state
  useEffect(() => {
    sfx.setMute(muted);
  }, [muted]);

  // Reset / Initialise Game when category or session size changes
  useEffect(() => {
    resetGame();
  }, [selectedCategory, sessionSize]);

  // Timer logic
  useEffect(() => {
    if (timerActive && !gameCompleted) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive, gameCompleted]);

  // End Game Check
  useEffect(() => {
    const totalPairs = activePairs.length;
    if (matchesCount > 0 && totalPairs > 0 && matchesCount === totalPairs) {
      handleGameCompletion();
    }
  }, [matchesCount, activePairs]);

  const resetGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSeconds(0);
    setMoves(0);
    setMatchesCount(0);
    setStreak(0);
    setTimerActive(false);
    setGameCompleted(false);
    setSelectedTopic(null);
    setSelectedDefinition(null);
    setMismatchIds([]);
    setSuccessIds([]);
    setMismatchedPairIds([]);
    setIsProcessing(false);
    
    // Choose random pairs from the pool of the selected category based on session size
    const selectRandomPairs = (allPairs: DSAPair[]) => {
      const shuffled = [...allPairs].sort(() => 0.5 - Math.random());
      if (sessionSize === 'all') return shuffled;
      return shuffled.slice(0, sessionSize);
    };

    const pairs = selectRandomPairs(selectedCategory.pairs);
    setActivePairs(pairs);
    
    // Choose initial Spotlight concept as the first item of the active board subset
    if (pairs.length > 0) {
      setActiveSpotlight(pairs[0]);
    } else {
      setActiveSpotlight(null);
    }

    // Create separate cards for topics & definitions using the active pairs
    const topics: DSACard[] = pairs.map((p) => ({
      id: `topic-${p.id}`,
      pairId: p.id,
      type: 'topic',
      content: p.topic,
      isFlipped: true,
      isMatched: false,
    }));

    const definitions: DSACard[] = pairs.map((p) => ({
      id: `def-${p.id}`,
      pairId: p.id,
      type: 'definition',
      content: p.definition,
      isFlipped: true,
      isMatched: false,
    }));

    setTopicCards(shuffleArray(topics));
    setDefinitionCards(shuffleArray(definitions));
  };

  // Sound toggler
  const toggleSound = () => {
    const state = sfx.toggleMute();
    setMuted(state);
  };

  // Retrieve matching category icon
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Network': return <Network className="w-5 h-5" />;
      case 'GitMerge': return <GitMerge className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'Target': return <Target className="w-5 h-5" />;
      case 'Server': return <Server className="w-5 h-5" />;
      case 'Shield': return <Shield className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  // Two Column Matching Mode interaction
  const handleColumnCardClick = (card: DSACard) => {
    if (isProcessing || card.isMatched) return;
    
    // Start timer on first interaction
    if (!timerActive) {
      setTimerActive(true);
    }

    sfx.playSelect();

    // Spotlights the details of clicked item instantly
    const linkedPair = activePairs.find(p => p.id === card.pairId);
    if (linkedPair) {
      setActiveSpotlight(linkedPair);
    }

    if (card.type === 'topic') {
      // If same topic is clicked again, deselect it
      if (selectedTopic?.id === card.id) {
        setSelectedTopic(null);
        return;
      }
      setSelectedTopic(card);
      
      // If a definition is already selected, check match
      if (selectedDefinition) {
        checkTwoColumnMatch(card, selectedDefinition);
      }
    } else {
      // If same definition is clicked again, deselect it
      if (selectedDefinition?.id === card.id) {
        setSelectedDefinition(null);
        return;
      }
      setSelectedDefinition(card);

      // If a topic is already selected, check match
      if (selectedTopic) {
        checkTwoColumnMatch(selectedTopic, card);
      }
    }
  };

  const checkTwoColumnMatch = (topicCard: DSACard, defCard: DSACard) => {
    setIsProcessing(true);
    setMoves((m) => m + 1);

    const isMatch = topicCard.pairId === defCard.pairId;

    if (isMatch) {
      // Correct Match
      setTimeout(() => {
        sfx.playMatch();
        setSuccessIds([topicCard.id, defCard.id]);
        
        // Mark both cards as matched
        setTopicCards((prev) =>
          prev.map((c) => (c.id === topicCard.id ? { ...c, isMatched: true } : c))
        );
        setDefinitionCards((prev) =>
          prev.map((c) => (c.id === defCard.id ? { ...c, isMatched: true } : c))
        );

        setMatchesCount((c) => c + 1);
        setStreak((s) => {
          const next = s + 1;
          if (next > maxStreak) setMaxStreak(next);
          return next;
        });

        // Spotlight matched item
        const matchingPair = activePairs.find((p) => p.id === topicCard.pairId);
        if (matchingPair) {
          setActiveSpotlight(matchingPair);
        }

        // Clear active selection states
        setSelectedTopic(null);
        setSelectedDefinition(null);
        setIsProcessing(false);
        
        // Clean success flashes soon
        setTimeout(() => setSuccessIds([]), 600);
      }, 100);
    } else {
      // Incorrect Match
      sfx.playMismatch();
      setMismatchIds([topicCard.id, defCard.id]);
      setStreak(0); // Break streak on mismatch
      
      setMismatchedPairIds((prev) => {
        const next = [...prev];
        if (!next.includes(topicCard.pairId)) next.push(topicCard.pairId);
        if (!next.includes(defCard.pairId)) next.push(defCard.pairId);
        return next;
      });
      
      setTimeout(() => {
        setMismatchIds([]);
        setSelectedTopic(null);
        setSelectedDefinition(null);
        setIsProcessing(false);
      }, 1000);
    }
  };

  // Scoring engine & completion state
  const calculateFinalScore = () => {
    const totalCount = activePairs.length;
    const accuracy = moves > 0 ? Math.round((totalCount / moves) * 100) : 0;
    const timePenalty = Math.max(0, seconds - 20) * 2; // minor time deduction after 20s
    const streakBonus = maxStreak * 25;
    const baseScore = totalCount * 150;
    
    return Math.max(100, baseScore - (moves * 10) - timePenalty + streakBonus);
  };

  const handleGameCompletion = () => {
    setTimerActive(false);
    setGameCompleted(true);
    sfx.playVictory();

    // Push new entry to leaderboards
    const finalScore = calculateFinalScore();
    const entry: LeaderboardEntry = {
      id: Math.random().toString(36).substring(2, 9),
      categoryName: selectedCategory.name,
      userName: username.trim() || 'Anonymous User',
      seconds: seconds,
      moves: moves,
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    const nextLeaderboard = [entry, ...leaderboard]
      .sort((a, b) => a.seconds - b.seconds || a.moves - b.moves)
      .slice(0, 10); // keep top 10 fast speeds

    setLeaderboard(nextLeaderboard);
    localStorage.setItem('dsa_leaderboard', JSON.stringify(nextLeaderboard));
  };

  // Format digital timers
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get performance ranking grade
  const getPerformanceGrade = () => {
    const accuracy = moves > 0 ? (activePairs.length / moves) * 100 : 0;
    if (accuracy >= 85 && seconds <= 40) return { rank: 'S-Rank', text: 'Algorithm Mastermind', color: 'text-indigo-400 bg-indigo-950/40 border-indigo-500/30' };
    if (accuracy >= 70 && seconds <= 75) return { rank: 'A-Rank', text: 'Data Struct Specialist', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30' };
    if (accuracy >= 50 && seconds <= 120) return { rank: 'B-Rank', text: 'Logical Constructor', color: 'text-amber-400 bg-amber-950/40 border-amber-500/30' };
    return { rank: 'C-Rank', text: 'Persistent Explorer', color: 'text-slate-400 bg-slate-900/60 border-slate-700/40' };
  };

  // Get topics to improve and LeetCode problems to attempt based on correctness
  const getRevisionRecommendations = () => {
    const recommendationsList: {
      topic: string;
      tip: string;
      problems: { title: string; url: string; difficulty: 'Easy' | 'Medium' | 'Hard' }[];
    }[] = [];

    if (mismatchedPairIds.length > 0) {
      mismatchedPairIds.forEach(id => {
        const pair = selectedCategory.pairs.find(p => p.id === id);
        if (pair) {
          const rec = topicRecommendations[id];
          recommendationsList.push({
            topic: pair.topic,
            tip: rec?.tip || `Review the core definition, complexities, and standard implementations for ${pair.topic}.`,
            problems: rec?.problems || categoryFallbacks[selectedCategory.id]?.problems || []
          });
        }
      });
    } else {
      // Perfect run! Offer 2 default/advanced recommendations from the current deck
      const defaultPairs = selectedCategory.pairs.slice(0, 2);
      defaultPairs.forEach(pair => {
        const rec = topicRecommendations[pair.id];
        recommendationsList.push({
          topic: pair.topic,
          tip: rec?.tip || `Keep practicing advanced optimization scenarios for ${pair.topic}.`,
          problems: rec?.problems || categoryFallbacks[selectedCategory.id]?.problems || []
        });
      });
    }

    return recommendationsList;
  };

  // Quick Study guide filtered lists
  const filteredGlossary = selectedCategory.pairs.filter(pair => 
    pair.topic.toLowerCase().includes(searchQuery.toLowerCase()) || 
    pair.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950 text-slate-100 dark-mode' : 'bg-slate-50 text-slate-900 light-mode'} font-sans selection:bg-indigo-500 selection:text-white flex flex-col antialiased`}>
      
      {/* 1. TOP HEADER & SETTINGS BAR */}
      <header className="border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-indigo-400 rounded-xl shadow-lg shadow-indigo-950/40 border border-indigo-400/20">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h1 className={`text-xl sm:text-2xl font-bold tracking-tight font-display bg-gradient-to-r ${
                theme === 'dark' 
                  ? 'from-slate-100 via-indigo-200 to-indigo-300' 
                  : 'from-slate-900 via-indigo-800 to-indigo-600'
              } bg-clip-text text-transparent`}>
                Revision Quest
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Interactive Developer Study & Revision Tool
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* View Mode Switcher */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0 mr-1">
              <button
                id="view-mode-study-btn"
                onClick={() => {
                  sfx.playSelect();
                  setViewMode('study');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'study'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Study Guide</span>
              </button>
              <button
                id="view-mode-practice-btn"
                onClick={() => {
                  sfx.playSelect();
                  setViewMode('practice');
                  resetGame();
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'practice'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Memory Quiz</span>
              </button>
            </div>

            {/* Player Name Input */}
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800 text-xs">
              <span className="text-slate-500">Player:</span>
              <input 
                id="player-username-input"
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value.slice(0, 15))}
                placeholder="Name" 
                className="bg-transparent border-none outline-none text-slate-200 font-medium max-w-[90px] focus:ring-0 placeholder:text-slate-600"
              />
            </div>

            {/* Session Size Selector */}
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800 text-xs">
              <span className="text-slate-500">Size:</span>
              <select
                id="session-size-select"
                value={sessionSize === 'all' ? 'all' : sessionSize.toString()}
                onChange={(e) => {
                  const val = e.target.value;
                  setSessionSize(val === 'all' ? 'all' : parseInt(val, 10));
                }}
                className="bg-transparent border-none outline-none text-slate-200 font-medium cursor-pointer focus:ring-0 text-xs py-0.5"
              >
                <option value="8" className="bg-slate-950 text-slate-200">8 Items</option>
                <option value="12" className="bg-slate-950 text-slate-200">12 Items</option>
                <option value="16" className="bg-slate-950 text-slate-200">16 Items</option>
                <option value="20" className="bg-slate-950 text-slate-200">20 Items</option>
                <option value="all" className="bg-slate-950 text-slate-200">All ({selectedCategory.pairs.length})</option>
              </select>
            </div>

            {/* Help and Volume controllers */}
            <button
              id="help-toggle-btn"
              onClick={() => setShowHelp(!showHelp)}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
              title="Show Guide / Manual"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            <button
              id="sound-toggle-btn"
              onClick={toggleSound}
              className={`p-2 rounded-lg border transition-all ${
                muted 
                  ? 'bg-slate-950/40 border-slate-850 text-slate-500 hover:text-slate-400' 
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-slate-100'
              }`}
              title={muted ? 'Unmute game sounds' : 'Mute game sounds'}
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              id="theme-toggle-btn"
              onClick={() => {
                sfx.playSelect();
                setTheme(theme === 'dark' ? 'light' : 'dark');
              }}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-slate-100 transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            </button>

            <button
              id="reset-btn"
              onClick={resetGame}
              className="px-3 py-1.5 bg-slate-900 hover:bg-indigo-950/25 text-slate-300 hover:text-indigo-400 rounded-lg border border-slate-800 hover:border-indigo-500/30 transition-all flex items-center gap-1.5 text-xs font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restart
            </button>
          </div>
        </div>
      </header>

      {/* 2. STATS & CATEGORIES BAR */}
      <section className="bg-slate-900/60 border-b border-slate-800/40 py-3 sticky top-[69px] z-30 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Categories Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <button
              id="toggle-deck-directory-btn"
              onClick={() => {
                sfx.playSelect();
                setShowDeckDirectory(!showDeckDirectory);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all border shrink-0 cursor-pointer ${
                showDeckDirectory
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-950/30'
                  : 'bg-slate-950 hover:bg-slate-800 border-slate-850 text-indigo-400 hover:text-indigo-300'
              }`}
              title="Open full interactive Deck selection dashboard"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Deck Directory</span>
            </button>
            
            <div className="h-6 w-px bg-slate-800/80 shrink-0 mx-1"></div>

            {dsaCategories.map((cat) => {
              const isActive = selectedCategory.id === cat.id && !showDeckDirectory;
              return (
                <button
                  id={`cat-tab-${cat.id}`}
                  key={cat.id}
                  onClick={() => {
                    sfx.playSelect();
                    setSelectedCategory(cat);
                    setShowDeckDirectory(false);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 border ${
                    isActive
                      ? 'bg-indigo-600/10 border-indigo-500/50 text-indigo-300 shadow-sm shadow-indigo-950/20 font-bold scale-[1.02]'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {getCategoryIcon(cat.iconName)}
                  {cat.name}
                  <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-slate-950/60 text-slate-500 font-mono">
                    {cat.pairs.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Real-time stats indicators */}
          {viewMode === 'practice' ? (
            <div className="grid grid-cols-4 sm:flex sm:items-center gap-2 text-center text-xs lg:justify-end">
              <div className="bg-slate-950/60 px-3 py-2 rounded-lg border border-slate-900 flex flex-col justify-center min-w-[70px] sm:min-w-[80px]">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-medium">Moves</span>
                <span className="font-mono text-base font-bold text-slate-200 mt-0.5">{moves}</span>
              </div>

              <div className="bg-slate-950/60 px-3 py-2 rounded-lg border border-slate-900 flex flex-col justify-center min-w-[70px] sm:min-w-[80px]">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-medium">Matches</span>
                <span className="font-mono text-base font-bold text-indigo-400 mt-0.5">
                  {matchesCount} <span className="text-slate-600 text-xs font-normal">/ {activePairs.length}</span>
                </span>
              </div>

              <div className="bg-slate-950/60 px-3 py-2 rounded-lg border border-slate-900 flex flex-col justify-center min-w-[70px] sm:min-w-[80px]">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-medium">Streak</span>
                <div className="flex items-center justify-center gap-1 mt-0.5">
                  {streak > 1 && <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce fill-amber-400" />}
                  <span className={`font-mono text-base font-bold ${streak > 1 ? 'text-amber-400' : 'text-slate-300'}`}>
                    {streak}
                  </span>
                </div>
              </div>

              <div className="bg-slate-950/60 px-3 py-2 rounded-lg border border-slate-900 flex flex-col justify-center min-w-[70px] sm:min-w-[80px]">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-medium">Timer</span>
                <div className="flex items-center justify-center gap-1 mt-0.5 text-slate-200">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span className="font-mono text-base font-bold tracking-tight">{formatTime(seconds)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:flex sm:items-center gap-2 text-center text-xs lg:justify-end">
              <div className="bg-slate-950/60 px-3 py-2 rounded-lg border border-slate-900 flex flex-col justify-center min-w-[70px] sm:min-w-[80px]">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-medium">Decks</span>
                <span className="font-mono text-sm sm:text-base font-bold text-slate-200 mt-0.5">7 Decks</span>
              </div>

              <div className="bg-slate-950/60 px-3 py-2 rounded-lg border border-slate-900 flex flex-col justify-center min-w-[70px] sm:min-w-[80px]">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-medium">Topics</span>
                <span className="font-mono text-sm sm:text-base font-bold text-indigo-400 mt-0.5">
                  {dsaCategories.reduce((acc, cat) => acc + cat.pairs.length, 0)} Total
                </span>
              </div>

              <div className="bg-slate-950/60 px-3 py-2 rounded-lg border border-slate-900 flex flex-col justify-center min-w-[70px] sm:min-w-[80px]">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-medium">Exercises</span>
                <span className="font-mono text-sm sm:text-base font-bold text-emerald-400 mt-0.5">45+</span>
              </div>

              <div className="bg-slate-950/60 px-3 py-2 rounded-lg border border-slate-900 flex flex-col justify-center min-w-[70px] sm:min-w-[80px]">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-medium">Concepts</span>
                <span className="font-mono text-sm sm:text-base font-bold text-amber-400 mt-0.5">{selectedCategory.pairs.length} Cards</span>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* HELPFUL QUICK-TUTORIAL MODAL (Collapsible) */}
      {showHelp && (
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border-b border-indigo-500/20 px-4 py-4 text-xs">
          <div className="max-w-7xl mx-auto flex items-start justify-between gap-4">
            <div className="space-y-2 max-w-4xl">
              <h3 className="font-bold text-sm text-indigo-300 flex items-center gap-1.5 font-display">
                <Lightbulb className="w-4 h-4 text-amber-400 fill-amber-400/10" />
                Study Manual: How to Play
              </h3>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                <li>
                  <strong className="text-slate-200">Revision Quest:</strong> Select a <span className="text-indigo-400 font-semibold">Topic</span> card in the left column, then select its matching <span className="text-indigo-400 font-semibold">Definition</span> card in the right column (or vice versa).
                </li>
                <li>
                  <strong className="text-slate-200">Active Learning Insights:</strong> Each matching set reveals detailed explanation, real-world examples, and categorization or complexities in the bottom spotlight. Keep an eye on it to bolster your developer skills!
                </li>
              </ul>
            </div>
            <button 
              id="close-help-btn"
              onClick={() => setShowHelp(false)} 
              className="text-slate-500 hover:text-slate-300 p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. MAIN GAMEPLAY INTERFACE */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT/CENTER AREA: BOARD VIEW (col-span 8) OR DECK DIRECTORY */}
        <div className="lg:col-span-8 space-y-6">
          
          {showDeckDirectory ? (
            /* DECK DIRECTORY HUB */
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-indigo-400 tracking-widest uppercase font-mono flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-400" /> REVISION DECK DIRECTORY
                  </span>
                  <h2 className="text-2xl font-black font-display text-white tracking-tight">
                    Explore Revision Decks
                  </h2>
                  <p className="text-xs text-slate-400">
                    Browse topic focuses, check complexity indexes, and launch revision cards instantly.
                  </p>
                </div>
                <button
                  id="close-deck-dir-btn"
                  onClick={() => setShowDeckDirectory(false)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white cursor-pointer transition-all text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <span>Back to Play</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grid of categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dsaCategories.map((cat) => {
                  const meta = getCategoryMetadata(cat.id);
                  const isCurrent = selectedCategory.id === cat.id;
                  
                  return (
                    <div
                      id={`deck-card-${cat.id}`}
                      key={cat.id}
                      onClick={() => {
                        sfx.playSelect();
                        setSelectedCategory(cat);
                        setShowDeckDirectory(false);
                      }}
                      className={`group rounded-2xl border p-5 bg-gradient-to-br ${meta.themeColor} cursor-pointer transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between space-y-4 relative overflow-hidden ${
                        isCurrent 
                          ? 'ring-2 ring-indigo-500/80 border-indigo-400/40 shadow-lg shadow-indigo-950/40' 
                          : 'border-slate-800/80 hover:bg-slate-900/60'
                      }`}
                    >
                      {/* Ambient light for active card */}
                      {isCurrent && (
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -z-10"></div>
                      )}

                      <div className="space-y-3">
                        {/* Header row */}
                        <div className="flex items-start justify-between gap-2">
                          <div className={`p-2.5 rounded-xl ${meta.iconBg} shadow-sm group-hover:scale-110 transition-transform`}>
                            {getCategoryIcon(cat.iconName)}
                          </div>
                          
                          <div className="flex flex-col items-end gap-1">
                            <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${meta.levelColor} font-mono uppercase tracking-wider`}>
                              {meta.level}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono font-medium">
                              {cat.pairs.length} Cards
                            </span>
                          </div>
                        </div>

                        {/* Title and Badge */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base sm:text-lg font-bold font-display text-white tracking-wide group-hover:text-indigo-300 transition-colors">
                              {cat.name}
                            </h3>
                            {isCurrent && (
                              <span className="text-[8px] px-1.5 py-0.5 rounded bg-indigo-500 text-white font-mono font-bold uppercase tracking-wider animate-pulse">
                                Selected
                              </span>
                            )}
                          </div>
                          <span className="inline-block text-[9px] px-1.5 py-0.5 bg-slate-950/40 rounded border border-slate-850 text-slate-400 font-mono tracking-wide uppercase">
                            {meta.badge}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                          {cat.description}
                        </p>
                      </div>

                      {/* Footer info: previews and action */}
                      <div className="pt-3 border-t border-slate-800/40 flex flex-col gap-2">
                        <div className="space-y-0.5">
                          <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono font-bold block">Topics preview:</span>
                          <p className="text-[10px] text-slate-400 font-medium truncate">
                            {meta.topics}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between pt-1.5">
                          <span className="text-[10px] text-slate-500 font-medium font-mono">
                            {isCurrent ? 'Active revision deck' : 'Click to load deck'}
                          </span>
                          
                          <span className="text-xs font-bold text-indigo-400 group-hover:text-indigo-300 flex items-center gap-1 group-hover:translate-x-1 transition-all">
                            {isCurrent ? 'Practice Deck' : 'Load Deck'}
                            <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : viewMode === 'study' ? (
            /* BRAND NEW STUDY REFERENCE MANUAL WEBSITE LAYOUT */
            <div className="space-y-6 animate-fade-in">
              {/* Handbook Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                <div className="space-y-1">
                  <span className="text-[9px] font-extrabold text-indigo-400 tracking-widest uppercase font-mono px-2 py-0.5 rounded bg-indigo-950 border border-indigo-900/30 inline-block">
                    Study Handbook & Concept Catalog
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl sm:text-2xl font-black font-display text-white tracking-tight">
                      {selectedCategory.name} Reference
                    </h2>
                    <span className="text-[10px] px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-full font-mono">
                      {selectedCategory.pairs.length} Topics
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                    {selectedCategory.description} Select any concept to pin it to the Concept Spotlight.
                  </p>
                </div>
                
                <button
                  id="switch-to-quiz-inline-btn"
                  onClick={() => {
                    sfx.playSelect();
                    setViewMode('practice');
                    resetGame();
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-950/40 hover:shadow-indigo-500/10 cursor-pointer transition-all flex items-center gap-2 shrink-0 group self-start sm:self-auto"
                >
                  <Zap className="w-3.5 h-3.5 fill-indigo-200 text-indigo-200 group-hover:scale-110 transition-transform" />
                  <span>Interactive Memory Quiz</span>
                </button>
              </div>

              {/* Grid of concept cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedCategory.pairs
                  .filter(pair => {
                    if (!searchQuery) return true;
                    const q = searchQuery.toLowerCase();
                    return (
                      pair.topic.toLowerCase().includes(q) ||
                      pair.definition.toLowerCase().includes(q) ||
                      pair.example.toLowerCase().includes(q) ||
                      pair.complexity.toLowerCase().includes(q)
                    );
                  })
                  .map((pair) => {
                    const recommendation = topicRecommendations[pair.id] || categoryFallbacks[selectedCategory.id];
                    const isSpotlighted = activeSpotlight?.id === pair.id;
                    
                    return (
                      <div
                        id={`study-card-${pair.id}`}
                        key={pair.id}
                        onClick={() => {
                          sfx.playSelect();
                          setActiveSpotlight(pair);
                        }}
                        className={`group p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer relative overflow-hidden ${
                          isSpotlighted
                            ? 'bg-slate-900 border-indigo-500 shadow-md shadow-indigo-950/40 ring-1 ring-indigo-500/20'
                            : 'bg-slate-900/45 hover:bg-slate-900/90 border-slate-800/80 hover:border-slate-700/80 hover:scale-[1.01]'
                        }`}
                      >
                        <div className="space-y-3">
                          {/* Header Row */}
                          <div className="flex items-start justify-between gap-2">
                            <div className="space-y-1">
                              <h3 className="text-base font-bold font-display text-white group-hover:text-indigo-300 transition-colors">
                                {pair.topic}
                              </h3>
                              <span className="text-[10px] text-slate-500 font-mono font-medium block">
                                Complexity: <span className="text-indigo-400 font-semibold">{pair.complexity}</span>
                              </span>
                            </div>
                            <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded border text-indigo-300 bg-indigo-950/40 border-indigo-500/15 font-mono uppercase tracking-wider">
                              Concept
                            </span>
                          </div>

                          {/* Operational Definition */}
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {pair.definition}
                          </p>

                          {/* Real World Scenario */}
                          <div className="text-[11px] text-slate-400 leading-relaxed bg-slate-950/50 p-2.5 rounded-lg border border-slate-900/60">
                            <span className="font-semibold text-slate-200">Real-World Case:</span> {pair.example}
                          </div>
                        </div>

                        {/* LeetCode / Related Problems section */}
                        {recommendation && recommendation.problems && (
                          <div className="pt-3 border-t border-slate-800/40 space-y-1.5">
                            <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono font-bold block">
                              Recommended Practice Exercises:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {recommendation.problems.map((prob, pIdx) => {
                                const diffColor = 
                                  prob.difficulty === 'Easy' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-950/20' :
                                  prob.difficulty === 'Medium' ? 'text-amber-400 border-amber-500/20 bg-amber-950/20' :
                                  'text-rose-400 border-rose-500/20 bg-rose-950/20';
                                
                                return (
                                  <a
                                    id={`problem-link-${pair.id}-${pIdx}`}
                                    key={pIdx}
                                    href={prob.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => {
                                      e.stopPropagation(); // Avoid triggering card selection click
                                      sfx.playSelect();
                                    }}
                                    className={`inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded border font-semibold transition-all hover:bg-slate-800 ${diffColor}`}
                                  >
                                    <span>{prob.title}</span>
                                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            /* STANDARD REVISION GAME BOARD */
            <>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-indigo-400 tracking-widest uppercase font-mono">
                    Active Deck
                  </span>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold font-display text-slate-100">
                      {selectedCategory.name}
                    </h2>
                    <button
                      id="view-deck-hub-inline-btn"
                      onClick={() => {
                        sfx.playSelect();
                        setShowDeckDirectory(true);
                      }}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 font-mono transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <LayoutGrid className="w-2.5 h-2.5" />
                      Browse Decks
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 max-w-xl">
                    {selectedCategory.description}
                  </p>
                </div>

                <button
                  id="reset-board-action"
                  onClick={resetGame}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset Cards
                </button>
              </div>

              {/* REVISION TOOL VIEW (Requested Layout) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* TOPICS COLUMN */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                        Topics (What)
                      </span>
                      <span className="text-[10px] text-slate-500">Click to Select</span>
                    </div>
                    
                    <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                      {topicCards.map((card) => {
                        const isSelected = selectedTopic?.id === card.id;
                        const isMatched = card.isMatched;
                        const isMismatch = mismatchIds.includes(card.id);
                        const isSuccess = successIds.includes(card.id);

                        return (
                          <button
                            id={`card-topic-${card.pairId}`}
                            key={card.id}
                            disabled={isMatched}
                            onClick={() => handleColumnCardClick(card)}
                            className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 relative group flex items-center justify-between ${
                              isMatched
                                ? 'bg-slate-900/40 border-emerald-950/40 text-slate-600 opacity-60'
                                : isMismatch
                                ? 'bg-red-950/20 border-red-500 text-red-200 animate-shake shadow-lg shadow-red-950/30'
                                : isSuccess
                                ? 'bg-emerald-950/30 border-emerald-400 text-emerald-200 shadow-md shadow-emerald-900/20'
                                : isSelected
                                ? 'bg-indigo-900/35 border-indigo-400 text-indigo-100 shadow-lg shadow-indigo-950/40 scale-[1.01] ring-1 ring-indigo-500/30'
                                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-200 cursor-pointer hover:scale-[1.01]'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold font-mono transition-colors ${
                                isMatched 
                                  ? 'bg-slate-950 text-slate-700' 
                                  : isSelected 
                                  ? 'bg-indigo-500 text-white' 
                                  : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                              }`}>
                                T
                              </span>
                              <span className="font-semibold text-sm font-display tracking-wide">{card.content}</span>
                            </div>

                            <div>
                              {isMatched ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-950" />
                              ) : isSelected ? (
                                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
                              ) : (
                                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* DEFINITIONS COLUMN */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                        Operational Definitions (How/Why)
                      </span>
                      <span className="text-[10px] text-slate-500">Click to Select</span>
                    </div>

                    <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                      {definitionCards.map((card) => {
                        const isSelected = selectedDefinition?.id === card.id;
                        const isMatched = card.isMatched;
                        const isMismatch = mismatchIds.includes(card.id);
                        const isSuccess = successIds.includes(card.id);

                        return (
                          <button
                            id={`card-def-${card.pairId}`}
                            key={card.id}
                            disabled={isMatched}
                            onClick={() => handleColumnCardClick(card)}
                            className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 relative group flex items-start gap-3 ${
                              isMatched
                                ? 'bg-slate-900/40 border-emerald-950/40 text-slate-600 opacity-60'
                                : isMismatch
                                ? 'bg-red-950/20 border-red-500 text-red-200 animate-shake shadow-lg shadow-red-950/30'
                                : isSuccess
                                ? 'bg-emerald-950/30 border-emerald-400 text-emerald-200 shadow-md shadow-emerald-900/20'
                                : isSelected
                                ? 'bg-indigo-900/35 border-indigo-400 text-indigo-100 shadow-lg shadow-indigo-950/40 scale-[1.01] ring-1 ring-indigo-500/30'
                                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-300 cursor-pointer hover:scale-[1.01]'
                            }`}
                          >
                            <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold font-mono shrink-0 mt-0.5 transition-colors ${
                              isMatched 
                                ? 'bg-slate-950 text-slate-700' 
                                : isSelected 
                                ? 'bg-indigo-500 text-white' 
                                : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                            }`}>
                              D
                            </span>

                            <div className="flex-1 space-y-1">
                              <p className="text-xs sm:text-sm font-medium leading-relaxed">{card.content}</p>
                            </div>

                            <div className="shrink-0 pt-0.5">
                              {isMatched ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-950" />
                              ) : isSelected ? (
                                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping block"></span>
                              ) : null}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

              </div>
            </>
          )}

          {/* INSTRUCTIONAL TIP */}
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-900 text-xs text-slate-400 flex items-center gap-2.5">
            <span className="p-1 bg-indigo-950 rounded text-indigo-400 font-bold font-mono">PRO</span>
            <span>
              Matches completed in sequences with high speed unlock extra bonus multipliers. Study the sidebar glossary below to ace your highscore!
            </span>
          </div>

        </div>

        {/* RIGHT AREA: SPOTLIGHT PANEL & STUDY DESK GUIDE (col-span 4) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          
          {/* CONCEPT SPOTLIGHT CARD */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-900/90 border border-slate-800/80 rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-slate-850 p-4 border-b border-slate-800/60 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 tracking-wider uppercase font-mono flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-indigo-400 fill-indigo-950/60" />
                Concept Spotlight
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 border border-indigo-900 text-indigo-300 font-mono">
                Active View
              </span>
            </div>

            {activeSpotlight ? (
              <div className="p-5 space-y-4">
                {/* Topic and Badge */}
                <div className="space-y-1">
                  <h3 className="text-lg font-bold font-display text-white tracking-wide">
                    {activeSpotlight.topic}
                  </h3>
                  <div className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 bg-slate-950/80 rounded-full border border-slate-800 text-slate-400 font-mono font-medium">
                    <TrendingUp className="w-3 h-3 text-indigo-400" />
                    Complexity: <span className="text-indigo-300 font-semibold">{activeSpotlight.complexity}</span>
                  </div>
                </div>

                {/* Definition block */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">
                    Operational Definition:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-900/80">
                    {activeSpotlight.definition}
                  </p>
                </div>

                {/* Real-world Example block */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">
                    Real-World Implementation Case:
                  </span>
                  <div className="text-xs text-slate-300 leading-relaxed bg-indigo-950/15 p-3 rounded-lg border border-indigo-500/10">
                    <span className="font-semibold text-indigo-300">Scenario:</span> {activeSpotlight.example}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 space-y-2">
                <BookOpen className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs">Click any topic card on the grid or list to project metadata in the spotlight viewport.</p>
              </div>
            )}
          </div>

          {/* QUICK STUDY GUIDE / DICTIONARY */}
          <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-4 space-y-3.5 shadow-sm">
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-slate-300 tracking-wider uppercase font-mono flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                Companion Study Guide
              </h3>
              <p className="text-[11px] text-slate-500 leading-tight">
                Search, inspect, and preview definitions of terms from the current category deck.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                id="glossary-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search definitions..."
                className="w-full bg-slate-950/80 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-600 rounded-lg pl-8 pr-3.5 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50"
              />
              <Search className="w-3.5 h-3.5 text-slate-600 absolute left-2.5 top-2.5" />
              {searchQuery && (
                <button
                  id="clear-search"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-slate-500 hover:text-slate-300 p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Compact List */}
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {filteredGlossary.length > 0 ? (
                filteredGlossary.map((pair) => (
                  <button
                    id={`guide-item-${pair.id}`}
                    key={pair.id}
                    onClick={() => setActiveSpotlight(pair)}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800/40 border border-transparent hover:border-slate-800 text-xs flex items-center justify-between transition-all group"
                  >
                    <div className="space-y-0.5">
                      <span className="font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                        {pair.topic}
                      </span>
                      <p className="text-[10px] text-slate-500 line-clamp-1">{pair.definition}</p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-700 group-hover:text-slate-400 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))
              ) : (
                <p className="text-center text-[11px] text-slate-600 py-4">No matching terms in deck.</p>
              )}
            </div>
          </div>

          {/* LEADERBOARDS & RANKINGS */}
          <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-4 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-300 tracking-wider uppercase font-mono flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                Global Hall of Fame
              </h3>
              <button
                id="toggle-leaderboard"
                onClick={() => setShowLeaderboard(!showLeaderboard)}
                className="text-[10px] text-indigo-400 hover:text-indigo-300 hover:underline font-semibold"
              >
                {showLeaderboard ? 'Collapse' : 'Expand'}
              </button>
            </div>

            {showLeaderboard || leaderboard.length > 0 ? (
              <div className="space-y-2">
                <div className="text-[10px] text-slate-500 grid grid-cols-12 pb-1 border-b border-slate-850 font-mono font-bold">
                  <span className="col-span-2">Rank</span>
                  <span className="col-span-5">Player</span>
                  <span className="col-span-3 text-right">Time</span>
                  <span className="col-span-2 text-right">Moves</span>
                </div>
                
                <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                  {leaderboard.length > 0 ? (
                    leaderboard.slice(0, 5).map((entry, idx) => (
                      <div 
                        key={entry.id} 
                        className="text-xs grid grid-cols-12 py-1 items-center bg-slate-950/25 px-1.5 rounded"
                      >
                        <span className="col-span-2 font-bold font-mono text-indigo-400">
                          #{idx + 1}
                        </span>
                        <div className="col-span-5 truncate text-slate-300">
                          <span className="font-semibold block leading-tight">{entry.userName}</span>
                          <span className="text-[9px] text-slate-500 block leading-tight">{entry.categoryName}</span>
                        </div>
                        <span className="col-span-3 text-right font-mono text-slate-400 font-medium">
                          {formatTime(entry.seconds)}
                        </span>
                        <span className="col-span-2 text-right font-mono text-slate-400">
                          {entry.moves}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-[11px] text-slate-600 py-3">No speedruns logged yet. Make a match to place!</div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-slate-500 leading-tight">
                No local speedrun scores logged. Solve the current category deck under 45 seconds to score an S-Rank entry!
              </p>
            )}
          </div>

        </div>

      </main>

      {/* 4. FOOTER CREDITS */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-4 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-500">
          <p>
            Revision Quest Applet. Optimized for interactive computer science and developer study workflows.
          </p>
          <div className="flex items-center gap-3">
            <span>Powered by React 19 & Tailwind</span>
          </div>
        </div>
      </footer>

      {/* 5. GAME COMPLETED CELEBRATION MODAL OVERLAY */}
      {gameCompleted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl max-w-xl w-full p-6 sm:p-7 space-y-5 shadow-2xl relative overflow-y-auto max-h-[90vh] flex flex-col scrollbar-thin scrollbar-thumb-slate-800">
            
            {/* Background glowing gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl -z-10"></div>

            {/* Icon & Celebration */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-gradient-to-tr from-indigo-600 to-indigo-400 rounded-2xl shadow-xl mx-auto flex items-center justify-center border border-indigo-400/20 mb-2 animate-bounce">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-white">
                Quest Completed!
              </h2>
              <p className="text-xs text-slate-400">
                You have matched all revision pairs inside the <span className="text-indigo-400 font-bold">{selectedCategory.name}</span> deck perfectly!
              </p>
            </div>

            {/* Performance Grade Card */}
            <div className={`p-3.5 rounded-xl border text-center space-y-0.5 ${getPerformanceGrade().color}`}>
              <span className="text-[9px] font-bold tracking-widest uppercase text-slate-400 font-mono">
                Evaluation Rank
              </span>
              <div className="text-2xl font-black font-display tracking-tight leading-none">
                {getPerformanceGrade().rank}
              </div>
              <p className="text-xs font-semibold">{getPerformanceGrade().text}</p>
            </div>

            {/* Stats list */}
            <div className="grid grid-cols-3 gap-3 text-center bg-slate-950/60 p-3.5 rounded-xl border border-slate-850">
              <div className="space-y-0.5">
                <span className="text-[9px] text-slate-500 uppercase tracking-wider font-mono">Time Taken</span>
                <p className="text-sm sm:text-base font-bold font-mono text-slate-100">{formatTime(seconds)}</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] text-slate-500 uppercase tracking-wider font-mono">Total Moves</span>
                <p className="text-sm sm:text-base font-bold font-mono text-slate-100">{moves}</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] text-slate-500 uppercase tracking-wider font-mono">Accuracy</span>
                <p className="text-sm sm:text-base font-bold font-mono text-emerald-400">
                  {moves > 0 ? Math.round((activePairs.length / moves) * 100) : 0}%
                </p>
              </div>
            </div>

            {/* Recommendations & LeetCode suggestions */}
            <div className="space-y-3 pt-1 border-t border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-300 font-mono text-xs font-semibold uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Custom Learning Paths</span>
              </div>
              
              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1 text-left">
                {mismatchedPairIds.length === 0 ? (
                  <div className="bg-emerald-950/10 border border-emerald-500/20 p-3.5 rounded-xl space-y-1.5">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Perfect Match! Flawless Run
                    </span>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      You matched every concept on the first try! To keep sharpening your skills, tackle these recommended LeetCode problems for this deck:
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {getRevisionRecommendations().flatMap(r => r.problems).slice(0, 3).map((prob, pIdx) => (
                        <a
                          id={`lc-perfect-prob-${pIdx}`}
                          key={pIdx}
                          href={prob.url}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] font-semibold bg-slate-950/80 border border-slate-800 hover:border-slate-700 hover:text-indigo-400 px-2.5 py-1 rounded-md transition-all text-slate-300"
                        >
                          {prob.title}
                          <span className={`text-[8px] font-bold px-1 rounded ${
                            prob.difficulty === 'Easy' ? 'text-emerald-400 bg-emerald-950/30 border border-emerald-500/10' :
                            prob.difficulty === 'Medium' ? 'text-amber-400 bg-amber-950/30 border border-amber-500/10' :
                            'text-rose-400 bg-rose-950/30 border border-rose-500/10'
                          }`}>
                            {prob.difficulty}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Based on your mismatches, we recommend focusing on the following topics and trying their related coding challenges:
                    </p>
                    
                    {getRevisionRecommendations().map((rec, rIdx) => (
                      <div key={rIdx} className="bg-slate-950/55 border border-slate-850 p-3 rounded-xl space-y-2 hover:border-indigo-500/20 transition-all">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-indigo-300">
                            {rec.topic}
                          </span>
                          <span className="text-[9px] text-slate-500 font-mono">Suggested Study</span>
                        </div>
                        
                        <p className="text-[10px] text-slate-400 leading-relaxed">
                          {rec.tip}
                        </p>
                        
                        {rec.problems.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {rec.problems.map((prob, pIdx) => (
                              <a
                                id={`lc-prob-${rIdx}-${pIdx}`}
                                key={pIdx}
                                href={prob.url}
                                target="_blank"
                                referrerPolicy="no-referrer"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[9px] font-semibold bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-indigo-400 px-2 py-0.5 rounded-md transition-all text-slate-300"
                              >
                                {prob.title}
                                <span className={`text-[8px] font-bold px-1 rounded ${
                                  prob.difficulty === 'Easy' ? 'text-emerald-400 bg-emerald-950/30 border border-emerald-500/10' :
                                  prob.difficulty === 'Medium' ? 'text-amber-400 bg-amber-950/30 border border-amber-500/10' :
                                  'text-rose-400 bg-rose-950/30 border border-rose-500/10'
                                }`}>
                                  {prob.difficulty}
                                </span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Interactive choices */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <button
                id="complete-retry-btn"
                onClick={resetGame}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Play Category Again
              </button>
              
              <button
                id="complete-next-btn"
                onClick={() => {
                  sfx.playSelect();
                  setShowDeckDirectory(true);
                  // Hide completion state or reset cards to clear active match celebration overlays
                  resetGame();
                }}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 font-bold rounded-xl text-xs sm:text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                Try Another Deck
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
