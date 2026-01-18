import { expect, test } from 'vitest'
import { createGroceryClassifier, tokenize } from './index.js'
import { groceryMemory } from './memory.js'

function mockTraining(classifier: ReturnType<typeof createGroceryClassifier>) {
    classifier.train('Organic dairy milk', 'Dairy and Eggs')
    classifier.train('Organic Red Apples', 'Produce')
    classifier.train('greEn apples', 'Produce')
    classifier.train('deoderant', 'Personal Care')
    classifier.train('butter', 'Dairy and Eggs')
    classifier.train('Cornstarch', 'Baking')
    classifier.train('Flour', 'Baking')
    return classifier;
}


test('tokenizer', () => {
    expect(tokenize('hello World')).toEqual(['hello', 'world'])
    expect(tokenize('Dairy Milk Choibaini  ')).toEqual(['dairy', 'milk', 'choibaini'])
})

test('vocabulary', () => {
    const classifier = createGroceryClassifier();
    const trainedClassifier = mockTraining(classifier)

    expect(trainedClassifier.vocabulary).toMatchInlineSnapshot(`
      Set {
        "organic",
        "dairy",
        "milk",
        "red",
        "apples",
        "green",
        "deoderant",
        "butter",
        "cornstarch",
        "flour",
      }
    `)
})

test('word count', () => {
    const classifier = createGroceryClassifier();
    const trainedClassifier = mockTraining(classifier)
    expect(trainedClassifier.wordCounts).toMatchInlineSnapshot(`
      {
        "Baking": {
          "cornstarch": 1,
          "flour": 1,
        },
        "Dairy and Eggs": {
          "butter": 1,
          "dairy": 1,
          "milk": 1,
          "organic": 1,
        },
        "Personal Care": {
          "deoderant": 1,
        },
        "Produce": {
          "apples": 2,
          "green": 1,
          "organic": 1,
          "red": 1,
        },
      }
    `)
})

test('category word totals', () => {
    const classifier = createGroceryClassifier();
    const trainedClassifier = mockTraining(classifier)
    expect(trainedClassifier.categoryTotals).toMatchInlineSnapshot(`
      {
        "Baking": 2,
        "Dairy and Eggs": 4,
        "Personal Care": 1,
        "Produce": 5,
      }
    `)
})

test('classification of "cosmic apples" should be Produce', () => {
    const classifier = createGroceryClassifier();
    const trainedClassifier = mockTraining(classifier);
    expect(trainedClassifier.classify('cosmic apples')).toEqual('Produce')
})

test('classification of "soy milk" should be Dairy and Eggs', () => {
    const classifier = createGroceryClassifier();
    const trainedClassifier = mockTraining(classifier);
    expect(trainedClassifier.classify('soy milk')).toEqual('Dairy and Eggs')
})

test('clasification of "giant purple people eater" should be Other', () => {
    const classifier = createGroceryClassifier();
    const trainedClassifier = mockTraining(classifier);
    expect(trainedClassifier.classify('giant purple people eater')).toEqual('Other')
})

test('memory', () => {
    const classifier = createGroceryClassifier();
    const trainedClassifier = mockTraining(classifier);

    const memory = {
        wordCounts: trainedClassifier.wordCounts,
        categoryTotals: trainedClassifier.categoryTotals,
        vocabulary: trainedClassifier.vocabulary,
        totalItemsTrained: trainedClassifier.totalItemsTrained
    };

    const newClassifier = createGroceryClassifier(memory);
    expect(newClassifier.classify('cosmic apples')).toEqual('Produce');
})

test('improved memory efficacy', () => {
    const classifier = createGroceryClassifier(groceryMemory);

    // Test various items that should be correctly classified with pre-trained memory
    expect(classifier.classify('milk')).toEqual('Dairy and Eggs');
})
