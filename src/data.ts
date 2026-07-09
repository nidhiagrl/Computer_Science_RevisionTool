/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DSACategory } from './types';

export const dsaCategories: DSACategory[] = [
  {
    id: 'linear',
    name: 'Linear Structures',
    description: 'Sequentially arranged elements where each node is connected to its previous and next adjacent elements.',
    iconName: 'Layers',
    pairs: [
      {
        id: 'array',
        topic: 'Array',
        definition: 'A contiguous memory block storing elements accessible in O(1) constant time via index keys.',
        example: 'Implementing a score list for a arcade game with direct access to any score.',
        complexity: 'Access: O(1) | Search: O(n)'
      },
      {
        id: 'linked_list',
        topic: 'Linked List',
        definition: 'A sequential chain of nodes where each node contains a value and a pointer reference to the next node.',
        example: 'Implementing a web browser history stack supporting forward and backward traversals.',
        complexity: 'Access: O(n) | Insert/Delete: O(1)'
      },
      {
        id: 'stack',
        topic: 'Stack',
        definition: 'A LIFO (Last-In, First-Out) linear structure restricting addition and removal to a single endpoint.',
        example: 'The "Undo" (Ctrl+Z) buffer in text editors, pushing states and popping on revert.',
        complexity: 'Push/Pop: O(1) | Search: O(n)'
      },
      {
        id: 'queue',
        topic: 'Queue',
        definition: 'A FIFO (First-In, First-Out) structure where elements insert at the rear (enqueue) and exit at the front (dequeue).',
        example: 'A printer task scheduler holding documents in queue until the printer is free.',
        complexity: 'Enqueue/Dequeue: O(1) | Search: O(n)'
      },
      {
        id: 'hash_table',
        topic: 'Hash Table',
        definition: 'A structure mapping key-value associations utilizing a hash function to compute array indices.',
        example: 'Storing user authentication sessions mapped by unique cryptographically-hashed tokens.',
        complexity: 'Lookup: O(1) avg, O(n) worst'
      },
      {
        id: 'circular_queue',
        topic: 'Circular Queue',
        definition: 'A queue implementation where the last position connects back to the first position to reuse empty slot memory.',
        example: 'Implementing a ring buffer for real-time audio streaming or hardware signal queueing.',
        complexity: 'Enqueue/Dequeue: O(1) | Full/Empty check: O(1)'
      },
      {
        id: 'doubly_linked_list',
        topic: 'Doubly Linked List',
        definition: 'A list structure where each element nodes contain references to both the previous and next adjacent nodes.',
        example: 'LRU (Least Recently Used) cache layouts tracking recent items using sequential node relocation.',
        complexity: 'Insert/Delete: O(1) | Search: O(n)'
      },
      {
        id: 'dequeue',
        topic: 'Deque',
        definition: 'A double-ended queue supporting fast element insertions and deletions at both the head and tail endpoints.',
        example: 'A sliding window maximum tracking array values over moving windows.',
        complexity: 'Insert/Delete Front & End: O(1)'
      },
      {
        id: 'skip_list',
        topic: 'Skip List',
        definition: 'A probabilistic hierarchy of sorted linked lists supporting fast O(log N) searches, insertions, and deletions.',
        example: 'Backing sorted search indexes in memory-mapped data structures or levelDB storage engines.',
        complexity: 'Search/Insert: O(log n) average, O(n) worst'
      },
      {
        id: 'suffix_array',
        topic: 'Suffix Array',
        definition: 'A sorted array of all suffixes of a string, facilitating fast substring searches and pattern matching.',
        example: 'Implementing rapid text-search tools, genetic sequencing matchers, or data compression algorithms.',
        complexity: 'Space: O(n) | Search: O(m log n)'
      },
      {
        id: 'sparse_matrix',
        topic: 'Sparse Matrix',
        definition: 'A multi-dimensional array structure where most values are zero, optimized to store only non-zero coordinates.',
        example: 'Representing user item-ratings or click maps in giant e-commerce recommendation systems.',
        complexity: 'Space: O(non-zero elements) instead of O(N * M)'
      },
      {
        id: 'associative_array',
        topic: 'Associative Array',
        definition: 'A collection of unique keys paired with values, allowing fast retrieval, update, and deletions of properties.',
        example: 'Storing active application config parameters where specific key properties are checked frequently.',
        complexity: 'Access: O(1) average on hashed versions'
      },
      {
        id: 'xor_linked_list',
        topic: 'XOR Linked List',
        definition: 'A memory-efficient doubly linked list where each node stores the bitwise XOR of the previous and next node pointers in a single address field.',
        example: 'Optimizing memory footprint of large sequential lists on embedded systems with extremely limited RAM.',
        complexity: 'Access: O(n) | Insert/Delete: O(1) | Space: O(1) pointers per node'
      },
      {
        id: 'unrolled_linked_list',
        topic: 'Unrolled Linked List',
        definition: 'A variation of a linked list where each node stores an array of multiple elements to significantly improve CPU cache locality.',
        example: 'Implementing a high-performance text buffer that minimizes cache misses during linear traversals.',
        complexity: 'Access: O(n) | Insert/Delete: O(1) average | Cache: High Locality'
      },
      {
        id: 'priority_queue',
        topic: 'Priority Queue',
        definition: 'An abstract data type where each element has an associated priority; elements with higher priority are served before lower ones.',
        example: 'Operating system process schedulers prioritizing real-time audio threads over background log upload tasks.',
        complexity: 'Insert: O(log n) | Extract-Max/Min: O(log n) with Heap'
      },
      {
        id: 'rope',
        topic: 'Rope',
        definition: 'A tree-based data structure composed of smaller strings, designed to efficiently store and manipulate extremely long text strings.',
        example: 'Backing the main text buffer of a professional IDE or word processor supporting rapid insertions and deletions of characters.',
        complexity: 'Insert/Delete: O(log n) | Concatenate: O(1)'
      }
    ]
  },
  {
    id: 'nonlinear',
    name: 'Non-Linear Structures',
    description: 'Hierarchical or network data models where elements can attach to multiple neighboring nodes.',
    iconName: 'Network',
    pairs: [
      {
        id: 'bst',
        topic: 'Binary Search Tree',
        definition: 'A tree where left descendants have smaller values, and right descendants have larger values than parent.',
        example: 'Implementing sorted database indexes to quickly filter records within numeric ranges.',
        complexity: 'Search/Insert: O(log n) avg, O(n) worst'
      },
      {
        id: 'heap',
        topic: 'Binary Heap',
        definition: 'A complete binary tree enforcing min/max properties, maintaining the root node as top priority.',
        example: 'The engine backing Priority Queues or heapsort implementations.',
        complexity: 'Peek: O(1) | Push/Pop: O(log n)'
      },
      {
        id: 'trie',
        topic: 'Trie',
        definition: 'An ordered prefix tree used for string storage, matching prefixes through character path branches.',
        example: 'Auto-complete input boxes predicting dictionary words as you type.',
        complexity: 'Search key of length L: O(L) time'
      },
      {
        id: 'graph',
        topic: 'Graph',
        definition: 'A collection of nodes (vertices) joined by edge links, capable of representing cyclic networks.',
        example: 'Social networks mapping friends as nodes and friendships as interconnected edge links.',
        complexity: 'Space: O(V + E) | Vertex lookup: O(1)'
      },
      {
        id: 'avl_tree',
        topic: 'AVL Tree',
        definition: 'A self-balancing search tree where heights of left and right child subtrees differ by at most one.',
        example: 'Mission-critical lookup maps needing stable guaranteed logarithmic search heights.',
        complexity: 'Search/Insert/Delete: O(log n) guaranteed'
      },
      {
        id: 'red_black_tree',
        topic: 'Red-Black Tree',
        definition: 'A self-balancing binary search tree using node color tags to guarantee a balanced maximum height.',
        example: 'Backing structure for the standard Map and Set containers in modern C++ and Java environments.',
        complexity: 'Search/Insert/Delete: O(log n) guaranteed'
      },
      {
        id: 'segment_tree',
        topic: 'Segment Tree',
        definition: 'A tree data structure for storing intervals or segments, allowing fast range queries and updates.',
        example: 'Finding the minimum or sum value in an array segment dynamically over frequent updates.',
        complexity: 'Query/Update: O(log n)'
      },
      {
        id: 'disjoint_set',
        topic: 'Disjoint Set (Union-Find)',
        definition: 'A system grouping elements into non-overlapping sets, optimizing set union and query search membership.',
        example: 'Kruskal’s algorithm looking for cycles or checking network component connectivity.',
        complexity: 'Union/Find: O(α(n)) near-constant'
      },
      {
        id: 'b_tree',
        topic: 'B-Tree',
        definition: 'A self-balancing, multi-way search tree optimized for systems that read and write large blocks of external disk memory.',
        example: 'Backing standard physical table indexes in PostgreSQL, MySQL, and modern file systems.',
        complexity: 'Search/Insert: O(log n) disk I/O operations'
      },
      {
        id: 'fenwick_tree',
        topic: 'Fenwick Tree (BIT)',
        definition: 'A compact tree structure that efficiently updates elements and calculates cumulative prefix sums in logarithmic bounds.',
        example: 'Tracking running frequency counters in dynamic data sets over heavy multi-index query sweeps.',
        complexity: 'Update/Query: O(log n) | Space: O(n)'
      },
      {
        id: 'kdtree',
        topic: 'KD-Tree',
        definition: 'A space-partitioning tree used to organize points in a multi-dimensional K-dimensional space.',
        example: 'Finding the nearest physical coffee shops on a map using spatial search algorithms.',
        complexity: 'Search Nearest: O(log n) average on balanced sets'
      },
      {
        id: 'min_max_heap',
        topic: 'Min-Max Heap',
        definition: 'A complete binary tree supporting simultaneous constant-time access to both the minimum and maximum elements.',
        example: 'Implementing double-ended priority queues tracking both the highest and lowest urgent service threads.',
        complexity: 'Find Min/Max: O(1) | Push/Pop: O(log n)'
      },
      {
        id: 'b_plus_tree',
        topic: 'B+ Tree',
        definition: 'An N-ary self-balancing search tree where all values are stored in leaf nodes which are linked sequentially for rapid range queries.',
        example: 'Backing block storage and relational database indexes to maximize consecutive sequential disk reads.',
        complexity: 'Search/Insert/Delete: O(log n) | Range Query: O(k + log n)'
      },
      {
        id: 'quadtree',
        topic: 'Quadtree',
        definition: 'A spatial tree structure where each internal node has exactly four children, commonly used to recursively partition a 2D space.',
        example: 'Optimizing spatial database queries or rendering level-of-detail in 2D video game maps.',
        complexity: 'Query: O(log n) average | Space: O(n)'
      },
      {
        id: 'octree',
        topic: 'Octree',
        definition: 'A spatial tree structure where each internal node has exactly eight children, commonly used to recursively partition a 3D space.',
        example: 'Efficient collision detection in 3D gaming engines or point cloud representation in computer graphics.',
        complexity: 'Query: O(log n) average | Space: O(n)'
      },
      {
        id: 'treap',
        topic: 'Treap',
        definition: 'A randomized binary search tree combining binary search tree properties with heap-ordered priorities to maintain probabilistic balance.',
        example: 'Implementing high-performance set containers with fast, randomized interval splitting and merging operations.',
        complexity: 'Search/Insert/Delete: O(log n) average'
      },
      {
        id: 'splay_tree',
        topic: 'Splay Tree',
        definition: 'A self-balancing binary search tree that automatically promotes recently accessed nodes to the root via splay rotations.',
        example: 'Optimizing frequently accessed system configuration parameters or caching lookup patterns.',
        complexity: 'Search/Insert/Delete: O(log n) amortized'
      }
    ]
  },
  {
    id: 'algorithms',
    name: 'Algorithms & Traversals',
    description: 'Step-by-step procedures to traverse structures, sort arrays, or solve structural networking problems.',
    iconName: 'GitMerge',
    pairs: [
      {
        id: 'binary_search',
        topic: 'Binary Search',
        definition: 'An interval halving search that finds item coordinates within sorted structures in logarithmic bounds.',
        example: 'Locating a word definition inside an alphabetically ordered glossary list of 1,000,000 terms.',
        complexity: 'Time: O(log n) | Space: O(1)'
      },
      {
        id: 'dfs',
        topic: 'Depth First Search',
        definition: 'A traversal depth-venturing along each branch pathway before recursive backtracking.',
        example: 'Solving a maze by walking a path until hitting a wall, then reversing to try alternative forks.',
        complexity: 'Time: O(V + E) | Space: O(V) stack'
      },
      {
        id: 'bfs',
        topic: 'Breadth First Search',
        definition: 'A structural traversal expanding level-by-level, visiting all neighbor cells before descending.',
        example: 'GPS routing finding the absolute shortest hop count distance in unweighted subway maps.',
        complexity: 'Time: O(V + E) | Space: O(V) queue'
      },
      {
        id: 'quicksort',
        topic: 'Quick Sort',
        definition: 'An in-place divide-and-conquer sorter partitioning arrays dynamically around pivot points.',
        example: 'Fast system array sorting where average execution speed overrides strict stable order needs.',
        complexity: 'Time: O(n log n) avg, O(n²) worst'
      },
      {
        id: 'mergesort',
        topic: 'Merge Sort',
        definition: 'A stable divide-and-conquer sorter repeatedly dividing arrays and merging sorted sub-arrays.',
        example: 'Sorting giant linked structures where sequential streaming is preferred over random index access.',
        complexity: 'Time: O(n log n) stable | Space: O(n)'
      },
      {
        id: 'dijkstra',
        topic: 'Dijkstra’s Algorithm',
        definition: 'A single-source shortest path pathfinder traversing weighted non-negative network edges.',
        example: 'Google Maps calculating the fastest routing distance between cities considering road weights.',
        complexity: 'Time: O((V + E) log V) with Heap'
      },
      {
        id: 'bubble_sort',
        topic: 'Bubble Sort',
        definition: 'A simple comparison sorting algorithm that repeatedly swaps adjacent elements if out of order.',
        example: 'Teaching basic computer science sorting principles or sorting tiny, nearly-sorted arrays.',
        complexity: 'Time: O(n²) | Space: O(1)'
      },
      {
        id: 'kruskal',
        topic: 'Kruskal’s Algorithm',
        definition: 'A greedy algorithm finding a minimum spanning tree for a connected weighted graph by picking cheapest edges.',
        example: 'Laying telecommunication cables to connect regional offices with minimum total wire length.',
        complexity: 'Time: O(E log E) | Space: O(V + E)'
      },
      {
        id: 'a_star',
        topic: 'A* Search Algorithm',
        definition: 'An extension of Dijkstra’s algorithm utilizing heuristics to guide node searches toward the shortest target path.',
        example: 'Calculating optimal pathfinding routes for artificial intelligence agents moving in RTS games.',
        complexity: 'Time: O(bᵈ) worst-case depending on heuristic'
      },
      {
        id: 'bellman_ford',
        topic: 'Bellman-Ford Algorithm',
        definition: 'Computes single-source shortest paths on a weighted graph, even with negative edge weights, and checks for negative cycles.',
        example: 'Routing internet packets in distance-vector networks where link weights can occasionally be negative.',
        complexity: 'Time: O(V * E) | Space: O(V)'
      },
      {
        id: 'floyd_warshall',
        topic: 'Floyd-Warshall Algorithm',
        definition: 'An all-pairs shortest path dynamic programming algorithm that finds paths between all pairs of vertices in a graph.',
        example: 'Pre-calculating complete transit time maps between all subway stations in a major metro transit system.',
        complexity: 'Time: O(V³) cubic grid | Space: O(V²)'
      },
      {
        id: 'quickselect',
        topic: 'Quickselect',
        definition: 'A selection algorithm to find the Kth smallest element in an unordered list, based on partitioning like Quicksort.',
        example: 'Finding the median salary of a large database list of employee records in average linear time.',
        complexity: 'Time: O(n) average, O(n²) worst'
      },
      {
        id: 'heapsort',
        topic: 'Heap Sort',
        definition: 'An in-place comparison sorting algorithm that builds a binary heap of elements and repeatedly extracts the maximum.',
        example: 'Sorting elements in memory-constrained system environments where reliable worst-case O(N log N) speed is vital.',
        complexity: 'Time: O(n log n) guaranteed | Space: O(1) in-place'
      },
      {
        id: 'radix_sort',
        topic: 'Radix Sort',
        definition: 'A non-comparison integer sorting algorithm that processes data digit by digit, from least to most significant.',
        example: 'Sorting massive transaction records with fixed-length numeric keys like transaction IDs or postal zip codes.',
        complexity: 'Time: O(n * k) where k is key length | Space: O(n + k)'
      },
      {
        id: 'prim',
        topic: 'Prim’s Algorithm',
        definition: 'A greedy algorithm that builds a minimum spanning tree for a weighted undirected graph from an arbitrary starting vertex.',
        example: 'Optimizing local circuit layout paths or laying regional pipelines starting from a central distribution plant.',
        complexity: 'Time: O(E log V) with Priority Queue'
      },
      {
        id: 'kmp',
        topic: 'KMP Algorithm',
        definition: 'A string searching pattern that avoids redundant character matches by checking a precomputed partial match prefix table.',
        example: 'Searching for specific nucleotide sequences in massive genetic databases without rolling back the text cursor.',
        complexity: 'Time: O(N + M) where N is text length'
      },
      {
        id: 'boyer_moore',
        topic: 'Boyer-Moore Algorithm',
        definition: 'A highly efficient string-searching algorithm that matches characters from right to left, skipping large blocks of text.',
        example: 'Implementing the "Find and Replace" feature in text editors or word processing software for fast substring scans.',
        complexity: 'Time: O(N/M) average case sublinear'
      }
    ]
  },
  {
    id: 'paradigms',
    name: 'Advanced Paradigms',
    description: 'Higher-level problem-solving models and techniques for optimizing complex computational problems.',
    iconName: 'Cpu',
    pairs: [
      {
        id: 'dp',
        topic: 'Dynamic Programming',
        definition: 'An optimization paradigm breaking complex problems into overlapping subproblems, storing results.',
        example: 'Computing shortest path counts in grid grids, or finding optimal string edits (Levenshtein distance).',
        complexity: 'Optimizes exponential time to linear/polynomial'
      },
      {
        id: 'greedy',
        topic: 'Greedy Algorithm',
        definition: 'A problem solver adopting immediate local optimums at each branch stage to build global solutions.',
        example: 'Making change for a customer with the minimum count of coins by picking the largest value coin first.',
        complexity: 'Fast O(n log n) or O(n) heuristics'
      },
      {
        id: 'backtracking',
        topic: 'Backtracking',
        definition: 'A depth exploration building search paths incrementally, dropping and reverting routes immediately when invalid.',
        example: 'Solving Sudoku grids, generating N-Queens placements, or traveling valid path permutations.',
        complexity: 'Typically O(2ⁿ) or O(n!) worst-case'
      },
      {
        id: 'memoization',
        topic: 'Memoization',
        definition: 'A top-down optimization caching recursive function outputs against matching call inputs.',
        example: 'Optimizing recursive Fibonacci generation from O(2ⁿ) to O(n) by caching results in a map.',
        complexity: 'Reduces recurring execution depth trees'
      },
      {
        id: 'divide_and_conquer',
        topic: 'Divide & Conquer',
        definition: 'Splitting problems recursively into self-similar sub-parts, solving them, and compiling their answers.',
        example: 'Binary search, Fast Fourier Transform (FFT), or quick exponentiation computation structures.',
        complexity: 'Transforms linear sweeps into logarithmic divisions'
      },
      {
        id: 'sliding_window',
        topic: 'Sliding Window',
        definition: 'An algorithmic technique tracking contiguous subarray ranges by adjusting bounds dynamically in linear loops.',
        example: 'Finding the longest substring with unique characters or max sum of K consecutive elements.',
        complexity: 'Reduces nested O(n²) loops to O(n) linear'
      },
      {
        id: 'two_pointers',
        topic: 'Two Pointers',
        definition: 'An optimization using two coordinate trackers traversing collections simultaneously from different directions or speeds.',
        example: 'Detecting loops in lists (Floyd’s Cycle Find) or locating a pair of numbers adding up to target in sorted array.',
        complexity: 'Minimizes spatial scan complexities to O(1) space'
      },
      {
        id: 'recursion',
        topic: 'Recursion',
        definition: 'A programming concept where a function solves a task by calling itself with reduced subproblems until reaching a base condition.',
        example: 'File system directory traversals searching through folders and subfolders dynamically.',
        complexity: 'Relies on call stack memory space equal to depth'
      },
      {
        id: 'bit_manipulation',
        topic: 'Bit Manipulation',
        definition: 'Directly altering binary digit flags in place using bitwise operators to achieve highly optimized memory and speeds.',
        example: 'Compressing multiple true/false boolean setting variables into a single 8-bit integer mask.',
        complexity: 'Time: O(1) processor cycles | Space: O(1)'
      },
      {
        id: 'branch_and_bound',
        topic: 'Branch and Bound',
        definition: 'An algorithmic technique that dynamically prunes unproductive branches in tree search spaces using state bounding values.',
        example: 'Solving the global traveling salesperson problem or integer linear programming optimization bounds.',
        complexity: 'Time: O(2ⁿ) but heavily optimized by pruning'
      },
      {
        id: 'monotonic_stack',
        topic: 'Monotonic Stack',
        definition: 'A specialized stack that maintains elements in a strictly increasing or decreasing order to solve next-greater problems.',
        example: 'Finding the next warmer temperature day for a list of daily weather logs in linear time.',
        complexity: 'Time: O(n) linear sweeps | Space: O(n)'
      },
      {
        id: 'topological_sort',
        topic: 'Topological Sort',
        definition: 'Ordering vertices of a directed acyclic graph (DAG) such that for every directed edge U -> V, U comes before V.',
        example: 'Ordering system module dependencies so compiler libraries build in the correct sequential order.',
        complexity: 'Time: O(V + E) linear DAG sort'
      },
      {
        id: 'greedy_huffman',
        topic: 'Huffman Coding',
        definition: 'A greedy entropy encoding algorithm that assigns variable-length binary codes to characters based on frequency of occurrence.',
        example: 'Compressing static web assets or text files to transmit fewer bytes over network channels.',
        complexity: 'Time: O(n log n) with priority queue | Space: O(n)'
      },
      {
        id: 'meet_in_the_middle',
        topic: 'Meet in the Middle',
        definition: 'A search optimization that splits a problem in half, solves both halves independently, and merges the results.',
        example: 'Solving the subset-sum or 4-Sum problem in O(2^(N/2)) instead of the naive O(2^N) search space.',
        complexity: 'Time: O(2^(n/2)) | Space: O(2^(n/2))'
      },
      {
        id: 'amortized_analysis',
        topic: 'Amortized Analysis',
        definition: 'Evaluating the average runtime cost of an operation over a worst-case sequence, proving rare expensive steps are averaged out.',
        example: 'Analyzing dynamic array resizing (like ArrayList/Vector) which takes O(n) rarely but O(1) on average.',
        complexity: 'Method: Aggregate, Accounting, or Potential Method'
      },
      {
        id: 'reservoir_sampling',
        topic: 'Reservoir Sampling',
        definition: 'A randomized algorithm for choosing a simple random sample of size K from a stream of unknown or infinite size.',
        example: 'Selecting exactly 100 random user feedback records from a continuous stream of millions of events.',
        complexity: 'Time: O(n) single pass | Space: O(k)'
      },
      {
        id: 'floyds_cycle_detection',
        topic: 'Floyd’s Cycle Detection',
        definition: 'An elegant pointer optimization algorithm tracking moving fast and slow speed markers to confirm looping list structures.',
        example: 'Scanning concurrent garbage collector memory structures for cyclic dependency lockouts.',
        complexity: 'Time: O(n) | Space: O(1)'
      }
    ]
  },
  {
    id: 'api_codes',
    name: 'API Response Codes',
    description: 'Standard HTTP status codes issued by web servers to describe client/server communication results.',
    iconName: 'Globe',
    pairs: [
      {
        id: 'http_200',
        topic: '200 OK',
        definition: 'Successful HTTP request; the server processed the request and returned the requested payload body.',
        example: 'GET /api/user returning profile JSON data successfully to the client app.',
        complexity: 'Category: 2xx Success | Status: OK'
      },
      {
        id: 'http_201',
        topic: '201 Created',
        definition: 'The request has succeeded and has led to the creation of a new server resource.',
        example: 'POST /api/posts creating a new forum thread and returning the generated record.',
        complexity: 'Category: 2xx Success | Status: Created'
      },
      {
        id: 'http_301',
        topic: '301 Moved Permanently',
        definition: 'The requested resource has been assigned a new permanent URI; future references should use this URI.',
        example: 'Redirecting legacy HTTP routes to newer modern HTTPS endpoints securely.',
        complexity: 'Category: 3xx Redirection | Status: Permanent Redirect'
      },
      {
        id: 'http_400',
        topic: '400 Bad Request',
        definition: 'The server cannot process the request due to client-side issues like malformed payload syntax.',
        example: 'Sending user signup details with missing email fields or invalid JSON format.',
        complexity: 'Category: 4xx Client Error | Status: Bad Request'
      },
      {
        id: 'http_401',
        topic: '401 Unauthorized',
        definition: 'The client must authenticate itself to obtain the requested response permissions.',
        example: 'Accessing secure personal developer settings without providing a valid API key header.',
        complexity: 'Category: 4xx Client Error | Status: Unauthorized'
      },
      {
        id: 'http_403',
        topic: '403 Forbidden',
        definition: 'The client does not have access rights to the content, even after successful authentication.',
        example: 'A logged-in standard user attempting to fetch admin database configuration records.',
        complexity: 'Category: 4xx Client Error | Status: Forbidden'
      },
      {
        id: 'http_404',
        topic: '404 Not Found',
        definition: 'The server cannot find the requested resource path, URL, or API endpoint structure.',
        example: 'Typing an incorrect web address like /dashboard-old-legacy that does not map to any file.',
        complexity: 'Category: 4xx Client Error | Status: Not Found'
      },
      {
        id: 'http_500',
        topic: '500 Internal Error',
        definition: 'The server encountered an unexpected condition that prevented it from fulfilling the request.',
        example: 'A database server crashing mid-query due to system memory starvation during API calls.',
        complexity: 'Category: 5xx Server Error | Status: Internal Server Error'
      },
      {
        id: 'http_204',
        topic: '204 No Content',
        definition: 'The server successfully processed the request, but is not returning any content in the response body.',
        example: 'Deleting a user\'s status post or setting standard analytics tracking pings where no response payload is needed.',
        complexity: 'Category: 2xx Success | Status: No Content'
      },
      {
        id: 'http_429',
        topic: '429 Too Many Requests',
        definition: 'The client has exceeded their permitted rate limit allowance within a given timeframe.',
        example: 'An automation script hammering a search engine endpoint repeatedly without backoff throttling.',
        complexity: 'Category: 4xx Client Error | Status: Too Many Requests'
      },
      {
        id: 'http_502',
        topic: '502 Bad Gateway',
        definition: 'The server, while acting as a gateway or proxy, received an invalid response from the upstream server.',
        example: 'An Nginx proxy gateway unable to contact an Express backend container that crashed or is restarting.',
        complexity: 'Category: 5xx Server Error | Status: Bad Gateway'
      },
      {
        id: 'http_503',
        topic: '503 Service Unavailable',
        definition: 'The server is temporarily down, offline, or overloaded and cannot currently handle incoming requests.',
        example: 'A cloud API system undergoing database migrations and pausing incoming traffic for 5 minutes.',
        complexity: 'Category: 5xx Server Error | Status: Service Unavailable'
      },
      {
        id: 'http_100',
        topic: '100 Continue',
        definition: 'An interim response indicating the server has received the request headers and the client should continue sending the body.',
        example: 'Sending large multi-megabyte post requests with an Expect: 100-continue header to confirm server acceptance first.',
        complexity: 'Category: 1xx Informational | Status: Continue'
      },
      {
        id: 'http_101',
        topic: '101 Switching Protocols',
        definition: 'The server agrees to switch protocols as requested by the client using the Upgrade header field.',
        example: 'Upgrading an active HTTP polling session to a persistent, low-latency WebSocket connection.',
        complexity: 'Category: 1xx Informational | Status: Switching Protocols'
      },
      {
        id: 'http_202',
        topic: '202 Accepted',
        definition: 'The request has been accepted for processing, but processing is still incomplete, typical for asynchronous operations.',
        example: 'Triggering a massive daily report generation task that runs in the background while immediate control returns to user.',
        complexity: 'Category: 2xx Success | Status: Accepted'
      },
      {
        id: 'http_206',
        topic: '206 Partial Content',
        definition: 'The server is delivering only part of the resource due to a Range header sent by the client, optimized for streaming.',
        example: 'A browser requesting and playing specific byte-ranges of a large MP4 video file or audio track on-demand.',
        complexity: 'Category: 2xx Success | Status: Partial Content'
      },
      {
        id: 'http_302',
        topic: '302 Found',
        definition: 'The requested resource resides temporarily under a different URI; clients should check back later.',
        example: 'Redirecting an unauthenticated user to a login portal temporarily, with plans to return them to the original page.',
        complexity: 'Category: 3xx Redirection | Status: Found / Temp Redirect'
      },
      {
        id: 'http_304',
        topic: '304 Not Modified',
        definition: 'Tells the client that the cached resource has not changed, allowing them to skip re-downloading the asset.',
        example: 'Serving static javascript or logo files using If-None-Match header matching the local ETag.',
        complexity: 'Category: 3xx Redirection | Status: Not Modified'
      },
      {
        id: 'http_307',
        topic: '307 Temporary Redirect',
        definition: 'Redirects the client temporarily to another URI, explicitly forbidding the client from changing the HTTP request method.',
        example: 'Redirecting a POST upload request to a secondary data center node while strictly maintaining the POST verb.',
        complexity: 'Category: 3xx Redirection | Status: Temporary Redirect'
      },
      {
        id: 'http_308',
        topic: '308 Permanent Redirect',
        definition: 'Redirects the client permanently to another URI, explicitly forbidding the client from changing the HTTP request method.',
        example: 'Migrating a public POST action route to a brand new domain path while guaranteeing the verb remains POST.',
        complexity: 'Category: 3xx Redirection | Status: Permanent Redirect'
      },
      {
        id: 'http_405',
        topic: '405 Method Not Allowed',
        definition: 'The requested resource support exists, but the server forbids the specific HTTP verb utilized.',
        example: 'Sending a POST or DELETE request to a strictly read-only database query endpoint.',
        complexity: 'Category: 4xx Client Error | Status: Method Not Allowed'
      },
      {
        id: 'http_409',
        topic: '409 Conflict',
        definition: 'The request cannot be completed because of a direct conflict with the current state of the target resource.',
        example: 'Registering an email address that is already active in the DB, or uploading an outdated resource revision.',
        complexity: 'Category: 4xx Client Error | Status: Conflict'
      },
      {
        id: 'http_410',
        topic: '410 Gone',
        definition: 'Indicates the resource was deleted permanently from the origin server and will not be coming back.',
        example: 'Requesting a user profile page that was deactivated and deleted by the user weeks ago.',
        complexity: 'Category: 4xx Client Error | Status: Gone'
      },
      {
        id: 'http_413',
        topic: '413 Payload Too Large',
        definition: 'The request payload exceeds the size limit configured on the server, causing immediate rejection.',
        example: 'A user attempting to upload a 500MB raw video file to an API gateway restricted to 10MB maximum.',
        complexity: 'Category: 4xx Client Error | Status: Payload Too Large'
      },
      {
        id: 'http_415',
        topic: '415 Unsupported Media Type',
        definition: 'The server refuses to process the request payload because the media format is not supported.',
        example: 'Sending raw plain text to an API endpoint that expects and parses strictly application/json.',
        complexity: 'Category: 4xx Client Error | Status: Unsupported Media Type'
      },
      {
        id: 'http_422',
        topic: '422 Unprocessable Content',
        definition: 'The syntax of the request is correct, but semantic errors prevent the server from running the instructions.',
        example: 'A bank transaction request containing valid syntax but attempting to transfer more funds than the account balance.',
        complexity: 'Category: 4xx Client Error | Status: Unprocessable Content'
      },
      {
        id: 'http_451',
        topic: '451 Unavailable For Legal Reasons',
        definition: 'The server is refusing access to the requested resource as a direct consequence of a legal demand or censorship.',
        example: 'An ISP blocking a specific streaming site to comply with a DMCA court-ordered copyright mandate.',
        complexity: 'Category: 4xx Client Error | Status: Unavailable Legal Reasons'
      },
      {
        id: 'http_504',
        topic: '504 Gateway Timeout',
        definition: 'The gateway server timed out waiting for a response from the upstream backend application server.',
        example: 'An AWS load balancer terminating a connection after 60 seconds because the Rails or Express app froze.',
        complexity: 'Category: 5xx Server Error | Status: Gateway Timeout'
      },
      {
        id: 'http_303',
        topic: '303 See Other',
        definition: 'Directs the client to get the requested resource at another URI with a GET request, often used after a successful POST submission.',
        example: 'Redirecting a customer to their shopping cart view page using GET after they submit a buy-item POST request.',
        complexity: 'Category: 3xx Redirection | Status: See Other'
      },
      {
        id: 'http_408',
        topic: '408 Request Timeout',
        definition: 'Issued when the server’s idle connection timeout expires before the client has finished transmitting the request.',
        example: 'A client starting a upload stream but stopping midway, leaving the connection hanging until the server disconnects.',
        complexity: 'Category: 4xx Client Error | Status: Request Timeout'
      },
      {
        id: 'http_411',
        topic: '411 Length Required',
        definition: 'The server refuses to accept the request without a defined Content-Length header field in the incoming request headers.',
        example: 'A custom API client trying to upload raw binary data but forgetting to include the total payload length header.',
        complexity: 'Category: 4xx Client Error | Status: Length Required'
      },
      {
        id: 'http_414',
        topic: '414 URI Too Long',
        definition: 'The URL requested by the client is longer than the server is willing or configured to interpret or parse.',
        example: 'A broken search query generator appending infinite query parameters to a URL string until it hits 16KB.',
        complexity: 'Category: 4xx Client Error | Status: URI Too Long'
      },
      {
        id: 'http_418',
        topic: '418 I\'m a teapot',
        definition: 'An April Fools’ joke status code indicating that the server refuses to brew coffee because it is, in fact, a teapot.',
        example: 'Returning a humorous error response from an Internet of Things teapot when requested to start brewing coffee.',
        complexity: 'Category: 4xx Client Error | Status: I’m a teapot'
      },
      {
        id: 'http_501',
        topic: '501 Not Implemented',
        definition: 'The server does not support or recognize the requested protocol action or method required to fulfill the request.',
        example: 'A client attempting to send a custom, non-standard HTTP action verb like "LINK" or "PUBLISH" to a basic Web server.',
        complexity: 'Category: 5xx Server Error | Status: Not Implemented'
      },
      {
        id: 'http_505',
        topic: '505 HTTP Version Not Supported',
        definition: 'The server does not support, or refuses to support, the major HTTP protocol version used in the request.',
        example: 'An older web server receiving a request written in HTTP/3 and rejecting it because it only supports HTTP/1.1.',
        complexity: 'Category: 5xx Server Error | Status: HTTP Version Not Supported'
      }
    ]
  },
  {
    id: 'problem_approaches',
    name: 'DSA Problem Approaches',
    description: 'Match popular coding interview problem statements with their corresponding ideal data structure or algorithmic approach.',
    iconName: 'Target',
    pairs: [
      {
        id: 'ap_kth_smallest',
        topic: 'Find Kth Smallest Element',
        definition: 'Apply Max Heap of size K. Push elements to heap, and pop root whenever size exceeds K. Root will be the target.',
        example: 'Quickly retrieving the 3rd lowest stock price from a highly volatile real-time streaming market feed.',
        complexity: 'Time: O(N log K) | Space: O(K)'
      },
      {
        id: 'ap_list_cycle',
        topic: 'Detect Cycle in Linked List',
        definition: 'Apply Fast & Slow Pointers (Floyd’s Tortoise and Hare algorithm). If they collide, a loop cycle exists.',
        example: 'Verifying if system resource allocation pointers form a deadlocking cyclic dependency chain.',
        complexity: 'Time: O(N) | Space: O(1) constant'
      },
      {
        id: 'ap_unweighted_shortest',
        topic: 'Shortest Path in Unweighted Graph',
        definition: 'Apply Breadth-First Search (BFS) with a queue. BFS explores level-by-layer, guaranteeing shortest paths.',
        example: 'Finding the minimum social connections or degrees of separation between two users on LinkedIn.',
        complexity: 'Time: O(V + E) | Space: O(V)'
      },
      {
        id: 'ap_overlapping_intervals',
        topic: 'Merge Overlapping Intervals',
        definition: 'Sort by start time, then scan linearly and merge adjacent overlapping slots into the active interval.',
        example: 'Booking a calendar scheduler without overlapping timeslots for multi-user conference rooms.',
        complexity: 'Time: O(N log N) sort | Space: O(N) output'
      },
      {
        id: 'ap_unique_substring',
        topic: 'Longest Substring Without Repeats',
        definition: 'Apply Sliding Window with a Hash Map storing character indices. Expand right pointer, shrink left on repeats.',
        example: 'Analyzing long dna sequencing patterns for unique consecutive non-repeating gene sequences.',
        complexity: 'Time: O(N) linear scan | Space: O(min(M, N))'
      },
      {
        id: 'ap_two_sum',
        topic: 'Find Pairs with Target Sum',
        definition: 'Apply Hash Map lookup. For each item, verify if (target - current) is already recorded in the map.',
        example: 'Finding two discount items on an e-commerce platform that sum up exactly to a user promotional gift card balance.',
        complexity: 'Time: O(N) single-pass | Space: O(N)'
      },
      {
        id: 'ap_peak_mountain',
        topic: 'Find Peak Element in Mountain Array',
        definition: 'Apply Binary Search. Check if mid is less than mid+1. If so, go right; else, go left to narrow the peak search.',
        example: 'Identifying localized elevation maxima or thermal pressure peaks from digital sensory grid arrays.',
        complexity: 'Time: O(log N) splits | Space: O(1)'
      },
      {
        id: 'ap_coin_change',
        topic: 'Minimum Coins to Make Sum',
        definition: 'Apply Dynamic Programming (Bottom-Up tabulation). Iterate subproblems from 1 to target, caching optimal solutions.',
        example: 'Calculating optimal cash drawer coin change combinations using minimal standard coin currency counts.',
        complexity: 'Time: O(N * Target) | Space: O(Target)'
      },
      {
        id: 'ap_stock_buy_sell',
        topic: 'Best Time to Buy and Sell Stock',
        definition: 'Apply Single Pass tracking. Keep track of the minimum price seen so far and calculate maximum profit at each step.',
        example: 'Calculating the peak potential historical profit margin from a single stock price chart.',
        complexity: 'Time: O(N) | Space: O(1)'
      },
      {
        id: 'ap_subsets_backtrack',
        topic: 'Generate All Subsets or Permutations',
        definition: 'Apply Backtracking recursion. Construct paths by adding elements, recurse, and then backtrack (remove) to explore other choices.',
        example: 'Generating all potential security combinations or password permutation arrays for a testing suite.',
        complexity: 'Time: O(2ⁿ) or O(N!) | Space: O(N) stack'
      },
      {
        id: 'ap_k_way_merge',
        topic: 'Merge K Sorted Lists',
        definition: 'Apply Min Heap of size K. Push the first element of all lists into the heap, then repeatedly pop the min and push its successor.',
        example: 'Merging multiple chronologically ordered analytics log files from different servers into a single master stream.',
        complexity: 'Time: O(N log K) | Space: O(K)'
      },
      {
        id: 'ap_trie_search',
        topic: 'Design Add and Search Words',
        definition: 'Apply Trie (Prefix Tree). Store characters in nested node maps, supporting rapid word inserts and prefix-based lookup searches.',
        example: 'Building a spelling checker dictionary that instantly verifies the existence of keyed terms.',
        complexity: 'Time: O(M) where M is word length | Space: O(N * M)'
      },
      {
        id: 'ap_sliding_window_max',
        topic: 'Find Sliding Window Maximum',
        definition: 'Apply Double-Ended Queue (Deque) storing indices in decreasing order of corresponding element values. Front is always the current window max.',
        example: 'Calculating the rolling maximum value over a sliding window frame in continuous temperature sensor streams.',
        complexity: 'Time: O(N) amortized linear | Space: O(K) deque'
      },
      {
        id: 'ap_lru_cache',
        topic: 'Design LRU Cache',
        definition: 'Apply Doubly Linked List paired with a Hash Map. Hash Map provides O(1) lookups; Doubly Linked List provides O(1) node relocation and eviction.',
        example: 'Building a memory-based image asset cache that ejects the oldest unused pictures when cache size exceeds limits.',
        complexity: 'Lookup: O(1) | Evict/Insert: O(1) | Space: O(Capacity)'
      },
      {
        id: 'ap_binary_tree_lca',
        topic: 'Lowest Common Ancestor',
        definition: 'Apply Depth-First Search (DFS) recursion. If a node has target elements in both left and right subtrees, it is the lowest common ancestor node.',
        example: 'Determining the closest shared organization manager between two corporate employees in a hierarchical company tree.',
        complexity: 'Time: O(N) tree sweep | Space: O(H) call stack height'
      },
      {
        id: 'ap_matrix_bfs',
        topic: 'Shortest Path in Binary Matrix',
        definition: 'Apply Breadth-First Search (BFS) starting from coordinates [0,0] using a queue. Queue level-by-level exploration guarantees the shortest path.',
        example: 'Finding the shortest unweighted navigation path for an autonomous robot moving through a grid map with obstacles.',
        complexity: 'Time: O(R * C) cells | Space: O(R * C) queue size'
      },
      {
        id: 'ap_topological_course_schedule',
        topic: 'Course Schedule Dependency',
        definition: 'Apply Topological Sort (Kahn’s Algorithm using indegrees or DFS cycle check). If a cycle exists, the courses cannot be completed.',
        example: 'Resolving multi-module package build orders and throwing an error if circular imports or dependencies are found.',
        complexity: 'Time: O(V + E) | Space: O(V + E)'
      },
      {
        id: 'ap_disjoint_set_redundant_connection',
        topic: 'Find Redundant Edge in Graph',
        definition: 'Apply Disjoint Set (Union-Find). Iterate over edges; if union returns false (endpoints already belong to same set), the edge is redundant.',
        example: 'Identifying redundant power cabling or looped paths in a computer network to prevent packet loops.',
        complexity: 'Time: O(E * α(V)) | Space: O(V)'
      }
    ]
  },
  {
    id: 'system_design',
    name: 'System Design & Scaling',
    description: 'High-level architectural patterns, distributed consensus strategies, and scaling principles essential for senior software engineers.',
    iconName: 'Server',
    pairs: [
      {
        id: 'sd_cqrs',
        topic: 'CQRS Pattern',
        definition: 'Separates read and write operations into distinct models to optimize performance, scaling, and security.',
        example: 'Using a write-optimized PostgreSQL DB and a separate read-optimized Elasticsearch cluster for queries.',
        complexity: 'Trade-off: High Complexity / Eventual Consistency'
      },
      {
        id: 'sd_cap',
        topic: 'CAP Theorem',
        definition: 'A distributed system can guarantee at most two out of three characteristics: Consistency, Availability, and Partition Tolerance.',
        example: 'Choosing Apache Cassandra for Availability (AP) versus Cloud Spanner for strong Consistency (CP).',
        complexity: 'Trade-off: Fundamental Distributed Constraint'
      },
      {
        id: 'sd_consistent_hashing',
        topic: 'Consistent Hashing',
        definition: 'Maps keys to a virtual ring hash space to minimize key reallocation when caching or database nodes scale up/down.',
        example: 'Dynamically scaling out Memcached cluster servers or configuring partition routing in DynamoDB.',
        complexity: 'Trade-off: Reduces data migration from O(N) to O(1/N)'
      },
      {
        id: 'sd_outbox',
        topic: 'Transactional Outbox',
        definition: 'Saves database state updates and integration event messages in a single atomic database transaction to avoid distributed failures.',
        example: 'Adding events to an Outbox table in MySQL inside a transaction, then publishing to Apache Kafka via Debezium.',
        complexity: 'Trade-off: Guarantees At-Least-Once Delivery'
      },
      {
        id: 'sd_rate_limiting',
        topic: 'Rate Limiting (Token Bucket)',
        definition: 'Regulates incoming traffic by checking and decrementing token reserves, allowing bursts up to a capacity threshold.',
        example: 'Defending an API gateway against excessive client polling requests by resetting tokens at a set fill rate.',
        complexity: 'Trade-off: Protects server resources at the expense of client blocks'
      },
      {
        id: 'sd_sharding',
        topic: 'Database Sharding',
        definition: 'Horizontally partitions a database table across multiple independent physical instances based on a specific routing key.',
        example: 'Splitting a global user profiles table across multiple database instances using user_country_id as the hash key.',
        complexity: 'Trade-off: High write scalability but complicates cross-shard joins'
      },
      {
        id: 'sd_saga',
        topic: 'Saga Pattern',
        definition: 'Manages distributed transactions across microservices through a sequence of local transactions and compensating rollbacks.',
        example: 'An e-commerce purchase flow where payment, inventory, and delivery services run local database transactions sequentially.',
        complexity: 'Trade-off: Eventual consistency over 2-Phase Commit complexity'
      },
      {
        id: 'sd_wal',
        topic: 'Write-Ahead Logging (WAL)',
        definition: 'Appends all database modifications to a highly durable sequential log file before writing changes to active database memory.',
        example: 'Ensuring database ACID durability in PostgreSQL so data can be fully restored in the event of an abrupt power shutdown.',
        complexity: 'Trade-off: System I/O bottleneck / Extreme Data Integrity'
      },
      {
        id: 'sd_cdn',
        topic: 'Content Delivery Network (CDN)',
        definition: 'A geographically distributed network of proxy servers caching static media content close to end users.',
        example: 'Serving heavy image, video, and stylesheet assets from localized edge servers to reduce page load latency.',
        complexity: 'Trade-off: Fast response / Cache invalidation latency'
      },
      {
        id: 'sd_backpressure',
        topic: 'Backpressure Pattern',
        definition: 'A flow control strategy where downstream services signal upstream publishers to slow down message transfer rates.',
        example: 'An indexing service telling a rabbitMQ queue broker to pause delivery until system memory queues are processed.',
        complexity: 'Trade-off: System stability over real-time processing'
      },
      {
        id: 'sd_read_replica',
        topic: 'Database Read Replicas',
        definition: 'Setting up read-only database copies that replicate the primary writer instance asynchronously to handle high read volumes.',
        example: 'Directing heavy dashboard queries to replica databases while preserving the main master database for writes.',
        complexity: 'Trade-off: Massive read scalability / Eventual consistency lag'
      },
      {
        id: 'sd_circuit_breaker',
        topic: 'Circuit Breaker Pattern',
        definition: 'An architectural pattern that detects failures and encapsulates the logic of preventing a failure from cascading downstream.',
        example: 'Disabling outgoing connection calls to a failing third-party payment API, returning a graceful backup error instead.',
        complexity: 'Trade-off: Prevents thread pool exhaustion / Temporary failure states'
      },
      {
        id: 'sd_gossip_protocol',
        topic: 'Gossip Protocol',
        definition: 'A decentralized, peer-to-peer communication method where nodes periodically share system membership and state updates with randomly selected neighbors.',
        example: 'Propagating node status updates across highly distributed databases like Cassandra or Consul ring networks.',
        complexity: 'Trade-off: Highly scalable and resilient / Eventual consistency lag'
      },
      {
        id: 'sd_cache_aside',
        topic: 'Cache-Aside Pattern',
        definition: 'An application pattern that loads data into cache only on-demand (after a cache miss is encountered), maintaining separation of cache and database.',
        example: 'Checking Redis first for a user profile; on a miss, fetching from PostgreSQL, writing to Redis, and returning it.',
        complexity: 'Trade-off: Simple implementation / Potential cache stampede under high load'
      },
      {
        id: 'sd_bloom_filter',
        topic: 'Bloom Filter',
        definition: 'A space-efficient probabilistic data structure that tests set membership, returning either "possibly in set" or "definitely not in set".',
        example: 'Filtering out non-existent usernames from checking active databases during registration to avoid heavy queries.',
        complexity: 'Space: Exceptionally low | False Positives: Possible | False Negatives: Impossible'
      },
      {
        id: 'sd_api_gateway',
        topic: 'API Gateway',
        definition: 'A single traffic entry point that sits in front of backend microservices, handling routing, rate limiting, and request aggregation.',
        example: 'Consolidating authentication, logging, SSL termination, and client routing for dozens of underlying server nodes.',
        complexity: 'Trade-off: Simplifies client integration / Introduces a single point of failure'
      },
      {
        id: 'sd_load_balancer',
        topic: 'Load Balancer',
        definition: 'A networking device or service that evenly distributes incoming application traffic across a pool of healthy backend server targets.',
        example: 'Routing incoming HTTPS traffic through an Nginx server pool using Round-Robin algorithms to balance CPU loads.',
        complexity: 'Trade-off: Ensures high availability / Increases infrastructure management cost'
      },
      {
        id: 'sd_heartbeat',
        topic: 'Heartbeat Mechanism',
        definition: 'A periodic ping message sent between cluster nodes to announce liveness and trigger failover if communication stops.',
        example: 'An Apache Kafka broker alerting the controller node of its active state every few seconds to maintain cluster sync.',
        complexity: 'Trade-off: Reliable node tracking / Generates minor continuous network traffic'
      }
    ]
  },
  {
    id: 'security_concepts',
    name: 'Security & Authentication',
    description: 'Vital cryptographic guidelines, standard authentication mechanics, and security strategies for modern web architectures.',
    iconName: 'Shield',
    pairs: [
      {
        id: 'sec_oauth',
        topic: 'OAuth 2.0 Authorization',
        definition: 'An open-standard authorization framework that uses access tokens to grant applications secure, limited access on behalf of users.',
        example: 'Letting a third-party calendar widget read schedules from Google Calendar without sharing your raw password credentials.',
        complexity: 'Approach: Delegated Access Control'
      },
      {
        id: 'sec_jwt',
        topic: 'JSON Web Token (JWT)',
        definition: 'A self-contained, digitally signed JSON string used to transmit trusted claims and roles securely between client and server.',
        example: 'Storing user identity details in a browser cookie, letting microservices authorize actions without database session lookups.',
        complexity: 'Approach: Stateless Authorization'
      },
      {
        id: 'sec_sqli',
        topic: 'SQL Injection Defense',
        definition: 'Compiles SQL logic separately from user inputs by utilizing parameterized queries (prepared statements).',
        example: 'Utilizing Knex or Prisma ORM instead of directly assembling raw SQL query strings using template literals.',
        complexity: 'Approach: Strict separation of code logic and user data'
      },
      {
        id: 'sec_csrf',
        topic: 'CSRF Protection',
        definition: 'An attack mitigation that verifies incoming request authenticity by checking an unpredictable, user-session-linked crypto token.',
        example: 'Injecting anti-CSRF tokens inside POST form submissions to verify the request originated from the authentic UI.',
        complexity: 'Approach: Session Request Validation'
      },
      {
        id: 'sec_tls',
        topic: 'TLS Handshake',
        definition: 'A cryptographic protocol negotiation that authenticates identity and establishes symmetric encryption keys for transport security.',
        example: 'Initiating an HTTPS connection from Chrome browser to an online banking portal to safeguard payment traffic.',
        complexity: 'Approach: Secure Key Exchange & Authentication'
      },
      {
        id: 'sec_pkce',
        topic: 'PKCE Extension',
        definition: 'Enhances public client OAuth flows by verifying a dynamically generated code challenge, preventing authorization code interception.',
        example: 'Safeguarding authentication flows in single-page React applications or native iOS/Android mobile apps.',
        complexity: 'Approach: Cryptographic Code Verification'
      },
      {
        id: 'sec_salting',
        topic: 'Password Salting & Hashing',
        definition: 'Prepends unique random strings to passwords before running high-cost stretch hashes (e.g., Argon2, bcrypt).',
        example: 'Ensuring matching user passwords generate completely distinct database hashes to withstand precomputed rainbow tables.',
        complexity: 'Approach: Irreversible Slow Cryptographic Hashing'
      },
      {
        id: 'sec_cors',
        topic: 'CORS Configuration',
        definition: 'An HTTP-header-based browser mechanism that lets servers indicate which external domains can read their resources.',
        example: 'Enabling your backend api.domain.com to accept AJAX requests sent by pages hosted on app.domain.com.',
        complexity: 'Approach: Browser-Enforced Access Policy'
      },
      {
        id: 'sec_hashing_hmac',
        topic: 'HMAC Authentication',
        definition: 'A message authentication code computed using a cryptographic hash function in combination with a secret key.',
        example: 'Verifying that incoming webhooks from Stripe have not been altered or forged in transit.',
        complexity: 'Approach: Symmetric Key Message Authentication'
      },
      {
        id: 'sec_mfa',
        topic: 'Multi-Factor Authentication (MFA)',
        definition: 'An access control system requiring multiple separate validation factors to verify user login identity.',
        example: 'Requiring a password (something you know) plus a dynamic mobile app authenticator code (something you have).',
        complexity: 'Approach: Defense in Depth / Strong Authenticity'
      },
      {
        id: 'sec_rate_limit_ddos',
        topic: 'DDoS Mitigation',
        definition: 'Routing incoming traffic through high-capacity edge filters to scrubbing layers that identify and absorb malicious volume.',
        example: 'Deploying Cloudflare rules to block a massive botnet flood before it reaches physical server hosts.',
        complexity: 'Approach: Network Edge Traffic Filtering'
      },
      {
        id: 'sec_zero_trust',
        topic: 'Zero Trust Architecture',
        definition: 'A security framework requiring strict identity verification for every person and device attempting to access resources, regardless of network.',
        example: 'Enforcing security policy checks on an employee\'s laptop even when they are physically inside the main office headquarters.',
        complexity: 'Approach: Never Trust, Always Verify'
      },
      {
        id: 'sec_xss',
        topic: 'XSS Defense',
        definition: 'Mitigates Cross-Site Scripting by fully sanitizing, escaping, or encoding dynamic text inputs before rendering them within browser DOM contexts.',
        example: 'Using DomPurify or native React JSX rendering to guarantee that raw html scripts from user bios are never evaluated by browsers.',
        complexity: 'Approach: Input Sanitization and Output Encoding'
      },
      {
        id: 'sec_ssrf',
        topic: 'SSRF Defense',
        definition: 'Protects against Server-Side Request Forgery by block-listing internal IP ranges (e.g., 169.254.169.254, 127.0.0.1) and validating destination domains.',
        example: 'Rejecting server-side image fetching requests if the URL points to internal AWS/GCP metadata endpoints.',
        complexity: 'Approach: Outgoing URL Validation & IP Blocklisting'
      },
      {
        id: 'sec_secure_cookies',
        topic: 'Secure & HttpOnly Cookies',
        definition: 'Web cookie directives where HttpOnly blocks client-side Javascript scripts from accessing the cookies, and Secure restricts cookie transmission to encrypted HTTPS.',
        example: 'Storing active JWT session tokens in cookies with HttpOnly, Secure, and SameSite=Strict flags set.',
        complexity: 'Approach: Browser-Enforced Cookie Protection'
      },
      {
        id: 'sec_rbac',
        topic: 'RBAC Access Control',
        definition: 'Role-Based Access Control assigns specific permissions to high-level organizational roles rather than mapping permissions directly to individual users.',
        example: 'Granting permission to delete billing accounts exclusively to the "Billing Admin" role instead of individual engineers.',
        complexity: 'Approach: Abstracted Role-Based Authorizations'
      },
      {
        id: 'sec_oauth_scopes',
        topic: 'OAuth Scopes',
        definition: 'A mechanism in OAuth 2.0 to limit an application’s access to a user’s account, defining specific read/write permissions for specific resource categories.',
        example: 'A fitness app requesting "read:activities" scope rather than requesting unlimited access to a user\'s entire account profile.',
        complexity: 'Approach: Principle of Least Privilege in API access'
      },
      {
        id: 'sec_saml',
        topic: 'SAML SSO',
        definition: 'An XML-based standard for exchanging authentication and authorization data between an Identity Provider (IdP) and a Service Provider (SP).',
        example: 'Logging into corporate Slack or Jira instantly using your enterprise Okta or Active Directory single sign-on system.',
        complexity: 'Approach: Federated Single Sign-On'
      }
    ]
  }
];
