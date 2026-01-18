import type { CategoryUnion } from "../constants/category-options";

type WordCount = number;
type CategoryKey = PropertyKey;
type WordCounts = Record<CategoryKey, Record<PropertyKey, WordCount>>

export const tokenize = (phrase: string) =>
    phrase.split(' ') // split on spaces
        .filter(Boolean) // remove empty strings
        .filter(word => word.length > 2) // remove articles
        .map((word: string) => word.toLocaleLowerCase()) // normalize casing

export type ClassifierMemory = {
    wordCounts: WordCounts;
    categoryTotals: Record<CategoryKey, number>;
    vocabulary: Set<string>;
    totalItemsTrained: number;
};

export function createGroceryClassifier(memory?: ClassifierMemory) {
    let wordCounts: WordCounts = memory?.wordCounts || {};
    let categoryTotals: Record<CategoryKey, number> = memory?.categoryTotals || {};
    let vocabulary = memory?.vocabulary || new Set();
    let totalItemsTrained = memory?.totalItemsTrained || 0;

    return {
        train: (phrase: string, category: CategoryUnion) => {
            const tokens = tokenize(phrase);
            vocabulary = vocabulary.union(new Set(tokens));

            tokens.forEach(token => {
                wordCounts[category] = wordCounts[category] || {}
                wordCounts[category][token] = (wordCounts[category][token] || 0) + 1
                categoryTotals[category] = (categoryTotals[category] || 0) + 1;
            })
            totalItemsTrained++;
        },
        classify: (phrase: string): CategoryUnion => {
            const tokens = tokenize(phrase);

            const results = Object.entries(categoryTotals)
                .filter(([_, value]) => value > 0)
                .map(([categoryKey, value]) => {
                    let itemsInCategory = value ?? 0;
                    itemsInCategory = itemsInCategory + 1;
                    const baseScore = Math.log(itemsInCategory) - Math.log(totalItemsTrained);

                    const tokenScore = tokens.reduce((total, token) => {
                        const tokenCount = wordCounts?.[categoryKey]?.[token] ?? 0;
                        return total + Math.log(tokenCount + 1) - Math.log(itemsInCategory + vocabulary.size);
                    }, 0);

                    return {
                        categoryKey,
                        score: tokenScore + baseScore
                    }
                })
                .sort((a, b) => b.score - a.score)
            
            if(results.length === 0) return "Other";
            
            const [first, second] = results;
            const isLowConfidence = (first && second) && (first.score - second.score < 0.1);
            return isLowConfidence || !first ? "Other": first.categoryKey as CategoryUnion;
        },
        // for testing
        get vocabulary() { return vocabulary; },
        get categoryTotals() { return categoryTotals },
        get wordCounts() { return wordCounts },
        get totalItemsTrained() { return totalItemsTrained }
    }
}