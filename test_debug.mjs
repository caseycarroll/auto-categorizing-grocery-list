import { createGroceryClassifier } from './src/libs/index.ts';
import { createGroceryMemory } from './src/libs/memory.ts';

const memory = createGroceryMemory();
const classifier = createGroceryClassifier(memory);

console.log('Testing chocolate chips...');
console.log('Result:', classifier.classify('chocolate chips'));
console.log('Expected: Baking');
console.log('');
console.log('Memory has these Baking items:', Object.keys(memory.wordCounts.Baking || {}).join(', '));
