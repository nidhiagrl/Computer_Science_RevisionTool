/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DSAPair {
  id: string;
  topic: string;
  definition: string;
  example: string;
  complexity: string; // e.g., "O(1) Access", "O(log n) Search"
}

export interface DSACard {
  id: string; // Unique ID for each card instance on the board
  pairId: string; // Shared ID linking a topic card with its definition card
  type: 'topic' | 'definition';
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface DSACategory {
  id: string;
  name: string;
  description: string;
  iconName: string; // Key of LucideIcon
  pairs: DSAPair[];
}

export interface GameStats {
  moves: number;
  matchedCount: number;
  totalPairs: number;
  seconds: number;
  accuracy: number;
  score: number;
}

export interface LeaderboardEntry {
  id: string;
  categoryName: string;
  userName: string;
  seconds: number;
  moves: number;
  date: string;
}
