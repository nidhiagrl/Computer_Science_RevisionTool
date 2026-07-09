/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LeetCodeProblem {
  title: string;
  url: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface TopicRecommendation {
  tip: string;
  problems: LeetCodeProblem[];
}

// Fallback suggestions based on category ID
export const categoryFallbacks: Record<string, TopicRecommendation> = {
  linear: {
    tip: "Focus on indexing bounds, pointer manipulation, and spatial/memory overhead trade-offs between static arrays and dynamic nodes.",
    problems: [
      { title: "Two Sum", url: "https://leetcode.com/problems/two-sum/", difficulty: "Easy" },
      { title: "Reverse Linked List", url: "https://leetcode.com/problems/reverse-linked-list/", difficulty: "Easy" },
      { title: "Valid Parentheses", url: "https://leetcode.com/problems/valid-parentheses/", difficulty: "Easy" }
    ]
  },
  nonlinear: {
    tip: "Study tree recursive structures, height balance checks, heap sorting properties, and graph adjacency list representations.",
    problems: [
      { title: "Validate Binary Search Tree", url: "https://leetcode.com/problems/validate-binary-search-tree/", difficulty: "Medium" },
      { title: "Number of Islands", url: "https://leetcode.com/problems/number-of-islands/", difficulty: "Medium" },
      { title: "Implement Trie (Prefix Tree)", url: "https://leetcode.com/problems/implement-trie-prefix-tree/", difficulty: "Medium" }
    ]
  },
  algorithms: {
    tip: "Practice writing recursive algorithms, managing state memoization, identifying overlapping subproblems, and choosing optimal traversal queues.",
    problems: [
      { title: "Binary Search", url: "https://leetcode.com/problems/binary-search/", difficulty: "Easy" },
      { title: "Coin Change", url: "https://leetcode.com/problems/coin-change/", difficulty: "Medium" },
      { title: "Network Delay Time", url: "https://leetcode.com/problems/network-delay-time/", difficulty: "Medium" }
    ]
  },
  api_codes: {
    tip: "Study web protocol communication layers, RESTful API endpoint designs, state validation architectures, and client timeout retry mechanisms.",
    problems: [
      { title: "Design a Rate Limiter (System Design)", url: "https://leetcode.com/problems/design-hit-counter/", difficulty: "Medium" },
      { title: "Design Web Crawler", url: "https://leetcode.com/problems/web-crawler/", difficulty: "Medium" },
      { title: "Encode and Decode TinyURL", url: "https://leetcode.com/problems/encode-and-decode-tinyurl/", difficulty: "Medium" }
    ]
  },
  problem_approaches: {
    tip: "Analyze incoming input sizes to select matching optimal approaches (e.g. O(N log N) sort vs O(N) single-pass hashing).",
    problems: [
      { title: "Sliding Window Maximum", url: "https://leetcode.com/problems/sliding-window-maximum/", difficulty: "Hard" },
      { title: "Merge Intervals", url: "https://leetcode.com/problems/merge-intervals/", difficulty: "Medium" },
      { title: "Longest Substring Without Repeating Characters", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", difficulty: "Medium" }
    ]
  },
  system_design: {
    tip: "Focus on scalability trade-offs, transactional reliability, state distribution models, and partition boundaries under the CAP constraint.",
    problems: [
      { title: "LRU Cache Design", url: "https://leetcode.com/problems/lru-cache/", difficulty: "Hard" },
      { title: "Design Twitter", url: "https://leetcode.com/problems/design-twitter/", difficulty: "Medium" },
      { title: "Design File System", url: "https://leetcode.com/problems/design-file-system/", difficulty: "Medium" }
    ]
  },
  security_concepts: {
    tip: "Review modern authorization standards, cryptographically robust token generation, secure browser storage guidelines, and defense-in-depth engineering principles.",
    problems: [
      { title: "Encode and Decode Strings", url: "https://leetcode.com/problems/encode-and-decode-strings/", difficulty: "Medium" },
      { title: "Design a Password Locker", url: "https://leetcode.com/problems/design-under-ground-system/", difficulty: "Medium" },
      { title: "Decrypt String from Alphabet to Integer Mapping", url: "https://leetcode.com/problems/decrypt-string-from-alphabet-to-integer-mapping/", difficulty: "Easy" }
    ]
  }
};

// Precise mapping per topic ID
export const topicRecommendations: Record<string, TopicRecommendation> = {
  // Linear
  array: {
    tip: "Revise array index formulas, contiguous memory allocation limits, and operations costing O(n) such as arbitrary index element deletions.",
    problems: [
      { title: "Two Sum", url: "https://leetcode.com/problems/two-sum/", difficulty: "Easy" },
      { title: "Merge Sorted Array", url: "https://leetcode.com/problems/merge-sorted-array/", difficulty: "Easy" }
    ]
  },
  linked_list: {
    tip: "Familiarize yourself with dummy head pointers, next-pointer swap patterns, and keeping track of the tail node during appends.",
    problems: [
      { title: "Reverse Linked List", url: "https://leetcode.com/problems/reverse-linked-list/", difficulty: "Easy" },
      { title: "Merge Two Sorted Lists", url: "https://leetcode.com/problems/merge-two-sorted-lists/", difficulty: "Easy" },
      { title: "Remove Nth Node From End of List", url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", difficulty: "Medium" }
    ]
  },
  stack: {
    tip: "Understand nested evaluation architectures (parsing JSON, balancing tags) and how stacks record recursive paths.",
    problems: [
      { title: "Valid Parentheses", url: "https://leetcode.com/problems/valid-parentheses/", difficulty: "Easy" },
      { title: "Min Stack", url: "https://leetcode.com/problems/min-stack/", difficulty: "Medium" },
      { title: "Evaluate Reverse Polish Notation", url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/", difficulty: "Medium" }
    ]
  },
  queue: {
    tip: "Review buffer synchronization, task routing flows, and queuing logic inside level-by-level tree traversals.",
    problems: [
      { title: "Implement Queue using Stacks", url: "https://leetcode.com/problems/implement-queue-using-stacks/", difficulty: "Easy" },
      { title: "Number of Recent Calls", url: "https://leetcode.com/problems/number-of-recent-calls/", difficulty: "Easy" }
    ]
  },
  hash_table: {
    tip: "Study hash hashing collision resolutions (chaining vs open addressing), load factors, and dynamic table resizing constraints.",
    problems: [
      { title: "Group Anagrams", url: "https://leetcode.com/problems/group-anagrams/", difficulty: "Medium" },
      { title: "Subarray Sum Equals K", url: "https://leetcode.com/problems/subarray-sum-equals-k/", difficulty: "Medium" }
    ]
  },
  circular_queue: {
    tip: "Master modular arithmetic formulas for index updates: index = (index + 1) % capacity.",
    problems: [
      { title: "Design Circular Queue", url: "https://leetcode.com/problems/design-circular-queue/", difficulty: "Medium" },
      { title: "Design Circular Deque", url: "https://leetcode.com/problems/design-circular-deque/", difficulty: "Medium" }
    ]
  },
  doubly_linked_list: {
    tip: "Always verify update sequence: set target pointers first before disconnecting previous nodes.",
    problems: [
      { title: "Design Linked List", url: "https://leetcode.com/problems/design-linked-list/", difficulty: "Medium" },
      { title: "Flatten a Multilevel Doubly Linked List", url: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/", difficulty: "Medium" }
    ]
  },
  dequeue: {
    tip: "Practice maintaining monotonic order inside double-ended queues for maximum tracking over sliding windows.",
    problems: [
      { title: "Sliding Window Maximum", url: "https://leetcode.com/problems/sliding-window-maximum/", difficulty: "Hard" }
    ]
  },
  skip_list: {
    tip: "Study probabilistic node balances and why height hierarchies achieve fast search indexes without heavy tree-rotation code.",
    problems: [
      { title: "Design Skiplist", url: "https://leetcode.com/problems/design-skiplist/", difficulty: "Hard" }
    ]
  },
  priority_queue: {
    tip: "Understand how Min/Max binary heaps maintain complete tree status inside sequential array pointers.",
    problems: [
      { title: "Kth Largest Element in a Stream", url: "https://leetcode.com/problems/kth-largest-element-in-a-stream/", difficulty: "Easy" },
      { title: "Top K Frequent Elements", url: "https://leetcode.com/problems/top-k-frequent-elements/", difficulty: "Medium" }
    ]
  },

  // Nonlinear
  bst: {
    tip: "Practice validation rules: left subtree keys must be strictly less than node, right must be greater than node.",
    problems: [
      { title: "Validate Binary Search Tree", url: "https://leetcode.com/problems/validate-binary-search-tree/", difficulty: "Medium" },
      { title: "Lowest Common Ancestor of a Binary Search Tree", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", difficulty: "Medium" }
    ]
  },
  heap: {
    tip: "Master bubble-up and bubble-down math equations to restructure arrays back to heap configurations.",
    problems: [
      { title: "Find Median from Data Stream", url: "https://leetcode.com/problems/find-median-from-data-stream/", difficulty: "Hard" },
      { title: "Merge k Sorted Lists", url: "https://leetcode.com/problems/merge-k-sorted-lists/", difficulty: "Hard" }
    ]
  },
  trie: {
    tip: "Write a clear TrieNode structure with child dictionary maps and a boolean flag marking complete words.",
    problems: [
      { title: "Implement Trie (Prefix Tree)", url: "https://leetcode.com/problems/implement-trie-prefix-tree/", difficulty: "Medium" },
      { title: "Replace Words", url: "https://leetcode.com/problems/replace-words/", difficulty: "Medium" }
    ]
  },
  graph: {
    tip: "Familiarize yourself with cycle detection in both directed graphs (using recursion stack status) and undirected graphs (using Union-Find).",
    problems: [
      { title: "Number of Islands", url: "https://leetcode.com/problems/number-of-islands/", difficulty: "Medium" },
      { title: "Clone Graph", url: "https://leetcode.com/problems/clone-graph/", difficulty: "Medium" }
    ]
  },
  avl_tree: {
    tip: "Understand single and double tree rotation directions to correct balance factor height violations.",
    problems: [
      { title: "Balanced Binary Tree", url: "https://leetcode.com/problems/balanced-binary-tree/", difficulty: "Easy" }
    ]
  },
  red_black_tree: {
    tip: "Review the self-balancing guarantees of 2-3 trees and red-black nodes that keep leaf depths perfectly controlled.",
    problems: [
      { title: "Convert Sorted Array to Binary Search Tree", url: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/", difficulty: "Easy" }
    ]
  },
  segment_tree: {
    tip: "Learn how recursively dividing arrays into parent-segment index nodes facilitates sub-linear range updates.",
    problems: [
      { title: "Range Sum Query - Mutable", url: "https://leetcode.com/problems/range-sum-query-mutable/", difficulty: "Medium" }
    ]
  },
  disjoint_set: {
    tip: "Incorporate Union by Rank and Path Compression to optimize the amortized lookup speed to inverse Ackermann speeds.",
    problems: [
      { title: "Number of Provinces", url: "https://leetcode.com/problems/number-of-provinces/", difficulty: "Medium" },
      { title: "Redundant Connection", url: "https://leetcode.com/problems/redundant-connection/", difficulty: "Medium" }
    ]
  },

  // Algorithms
  binary_search: {
    tip: "Master binary boundaries: low = mid + 1 versus high = mid - 1. Make sure to avoid integer overflow when evaluating mid.",
    problems: [
      { title: "Binary Search", url: "https://leetcode.com/problems/binary-search/", difficulty: "Easy" },
      { title: "Find First and Last Position of Element in Sorted Array", url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/", difficulty: "Medium" }
    ]
  },
  dfs: {
    tip: "Control recursion call depths with base stops or manage iterations explicitly with your own stacks.",
    problems: [
      { title: "Max Area of Island", url: "https://leetcode.com/problems/max-area-of-island/", difficulty: "Medium" },
      { title: "Flood Fill", url: "https://leetcode.com/problems/flood-fill/", difficulty: "Easy" }
    ]
  },
  bfs: {
    tip: "Implement queues to explore graphs layer-by-layer; this is highly recommended for shortest path problems.",
    problems: [
      { title: "Binary Tree Level Order Traversal", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/", difficulty: "Medium" },
      { title: "Rotting Oranges", url: "https://leetcode.com/problems/rotting-oranges/", difficulty: "Medium" }
    ]
  },
  dijkstra: {
    tip: "Understand why Dijkstra fails with negative weights, and practice extracting elements from priority queues.",
    problems: [
      { title: "Network Delay Time", url: "https://leetcode.com/problems/network-delay-time/", difficulty: "Medium" },
      { title: "Path with Maximum Probability", url: "https://leetcode.com/problems/path-with-maximum-probability/", difficulty: "Medium" }
    ]
  },
  dp: {
    tip: "Start by writing top-down recursion with memoization, then convert to a space-efficient bottom-up grid array.",
    problems: [
      { title: "Coin Change", url: "https://leetcode.com/problems/coin-change/", difficulty: "Medium" },
      { title: "Longest Common Subsequence", url: "https://leetcode.com/problems/longest-common-subsequence/", difficulty: "Medium" }
    ]
  },
  sliding_window: {
    tip: "Expand right-side pointers in loops, and increment left-side pointers when inner conditions break invariants.",
    problems: [
      { title: "Longest Substring Without Repeating Characters", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", difficulty: "Medium" },
      { title: "Minimum Size Subarray Sum", url: "https://leetcode.com/problems/minimum-size-subarray-sum/", difficulty: "Medium" }
    ]
  },
  two_pointers: {
    tip: "Maintain left and right coordinate markers at endpoints, moving them closer depending on sorted calculations.",
    problems: [
      { title: "Two Sum II - Input Array Is Sorted", url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", difficulty: "Medium" },
      { title: "Container With Most Water", url: "https://leetcode.com/problems/container-with-most-water/", difficulty: "Medium" }
    ]
  },
  topological_sort: {
    tip: "Practice Kahn's algorithm keeping track of active node indegrees inside queue arrays.",
    problems: [
      { title: "Course Schedule", url: "https://leetcode.com/problems/course-schedule/", difficulty: "Medium" },
      { title: "Course Schedule II", url: "https://leetcode.com/problems/course-schedule-ii/", difficulty: "Medium" }
    ]
  },

  // Problem approaches
  ap_kth_smallest: {
    tip: "Understand why a Max-Heap of size K maintains the smallest elements seen so far in linear streams.",
    problems: [
      { title: "Kth Largest Element in an Array", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/", difficulty: "Medium" }
    ]
  },
  ap_list_cycle: {
    tip: "Review Floyd's cycle checking logic: slow moves one node, fast moves two nodes; collision confirms the loop.",
    problems: [
      { title: "Linked List Cycle", url: "https://leetcode.com/problems/linked-list-cycle/", difficulty: "Easy" },
      { title: "Linked List Cycle II", url: "https://leetcode.com/problems/linked-list-cycle-ii/", difficulty: "Medium" }
    ]
  },
  ap_unweighted_shortest: {
    tip: "Practice unweighted graph representations, maintaining visited set structures to block redundant grid checks.",
    problems: [
      { title: "Shortest Path in Binary Matrix", url: "https://leetcode.com/problems/shortest-path-in-binary-matrix/", difficulty: "Medium" }
    ]
  },
  ap_overlapping_intervals: {
    tip: "Sort intervals by start times before executing linear comparisons against active overlaps.",
    problems: [
      { title: "Merge Intervals", url: "https://leetcode.com/problems/merge-intervals/", difficulty: "Medium" },
      { title: "Insert Interval", url: "https://leetcode.com/problems/insert-interval/", difficulty: "Medium" }
    ]
  },
  ap_unique_substring: {
    tip: "Use sliding window bounds with index hashing to jump the left pointer forward directly past duplicate records.",
    problems: [
      { title: "Longest Substring Without Repeating Characters", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", difficulty: "Medium" }
    ]
  },
  ap_two_sum: {
    tip: "Map incoming keys into a single-pass hash list to check (target - current) in constant time.",
    problems: [
      { title: "Two Sum", url: "https://leetcode.com/problems/two-sum/", difficulty: "Easy" }
    ]
  },
  ap_lru_cache: {
    tip: "Understand why pairing Hash Map and Doubly Linked List achieves O(1) performance for both lookups and relocations.",
    problems: [
      { title: "LRU Cache Design", url: "https://leetcode.com/problems/lru-cache/", difficulty: "Hard" }
    ]
  },

  // System Design
  sd_cqrs: {
    tip: "Understand eventual consistency synchronization, write optimizations, and scaling query speeds using search systems.",
    problems: [
      { title: "Design Twitter", url: "https://leetcode.com/problems/design-twitter/", difficulty: "Medium" }
    ]
  },
  sd_cap: {
    tip: "Study how network partitions force database designs to trade off instant consistency for 100% network availability.",
    problems: [
      { title: "CAP Theorem concepts and trade-offs", url: "https://leetcode.com/tag/system-design/", difficulty: "Hard" }
    ]
  },
  sd_consistent_hashing: {
    tip: "Learn how hashing server keys and data keys to a 360-degree virtual circle makes scaling caching networks seamless.",
    problems: [
      { title: "Design a Consistent Hashing algorithm", url: "https://leetcode.com/tag/system-design/", difficulty: "Hard" }
    ]
  },
  sd_rate_limiting: {
    tip: "Study the Token Bucket and Leaky Bucket models, and how Redis helps synchronize rates in distributed clusters.",
    problems: [
      { title: "Design Hit Counter", url: "https://leetcode.com/problems/design-hit-counter/", difficulty: "Medium" }
    ]
  },

  // Security
  sec_oauth: {
    tip: "Review delegation tokens, redirection callbacks, state verification keys, and access scope limitations.",
    problems: [
      { title: "Design an OAuth service (System Design)", url: "https://leetcode.com/tag/system-design/", difficulty: "Hard" }
    ]
  },
  sec_jwt: {
    tip: "Analyze the cryptographic structure of JWTs (Header, Payload, Signature) and why stateless auth must handle token revocation manually.",
    problems: [
      { title: "Stateless Authentication patterns", url: "https://leetcode.com/tag/cryptography/", difficulty: "Medium" }
    ]
  },
  sec_sqli: {
    tip: "Understand how parameterized queries isolate compiled query syntax trees from incoming user content strings.",
    problems: [
      { title: "SQL Injection vulnerabilities and mitigations", url: "https://leetcode.com/tag/database/", difficulty: "Medium" }
    ]
  }
};
