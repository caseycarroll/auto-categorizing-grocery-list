import { createGroceryClassifier } from './index.js';

/**
 * Pre-trained grocery classifier memory with common items across all categories.
 * This memory improves classification accuracy by providing a diverse training dataset.
 * 
 * Usage:
 * ```typescript
 * import { groceryMemory } from './memory.js';
 * const classifier = createGroceryClassifier(groceryMemory);
 * ```
 */
function buildGroceryMemory() {
    const classifier = createGroceryClassifier();

    // Produce - Fruits & Vegetables
    classifier.train('bananas', 'Produce');
    classifier.train('apples red delicious', 'Produce');
    classifier.train('apples green granny smith', 'Produce');
    classifier.train('oranges navel', 'Produce');
    classifier.train('tomatoes vine ripe', 'Produce');
    classifier.train('lettuce romaine', 'Produce');
    classifier.train('spinach fresh', 'Produce');
    classifier.train('carrots organic', 'Produce');
    classifier.train('broccoli crowns', 'Produce');
    classifier.train('avocados hass', 'Produce');
    classifier.train('strawberries fresh', 'Produce');
    classifier.train('blueberries fresh', 'Produce');
    classifier.train('grapes seedless', 'Produce');
    classifier.train('potatoes russet', 'Produce');
    classifier.train('onions yellow', 'Produce');
    classifier.train('garlic fresh', 'Produce');
    classifier.train('bell peppers', 'Produce');
    classifier.train('cucumbers', 'Produce');
    classifier.train('celery stalks', 'Produce');
    classifier.train('mushrooms white', 'Produce');
    classifier.train('lemon fresh', 'Produce');
    classifier.train('lime fresh', 'Produce');
    classifier.train('watermelon seedless', 'Produce');
    classifier.train('pineapple fresh', 'Produce');
    classifier.train('kale organic', 'Produce');

    // Dairy and Eggs
    classifier.train('milk whole', 'Dairy and Eggs');
    classifier.train('milk 2% reduced fat', 'Dairy and Eggs');
    classifier.train('milk skim', 'Dairy and Eggs');
    classifier.train('milk almond', 'Dairy and Eggs');
    classifier.train('milk oat', 'Dairy and Eggs');
    classifier.train('milk soy', 'Dairy and Eggs');
    classifier.train('eggs large grade', 'Dairy and Eggs');
    classifier.train('eggs organic free range', 'Dairy and Eggs');
    classifier.train('butter salted', 'Dairy and Eggs');
    classifier.train('butter unsalted', 'Dairy and Eggs');
    classifier.train('cheese cheddar', 'Dairy and Eggs');
    classifier.train('cheese mozzarella', 'Dairy and Eggs');
    classifier.train('cheese parmesan', 'Dairy and Eggs');
    classifier.train('yogurt greek plain', 'Dairy and Eggs');
    classifier.train('yogurt vanilla', 'Dairy and Eggs');
    classifier.train('cream cheese', 'Dairy and Eggs');
    classifier.train('sour cream', 'Dairy and Eggs');
    classifier.train('cottage cheese', 'Dairy and Eggs');
    classifier.train('heavy cream', 'Dairy and Eggs');
    classifier.train('half and half', 'Dairy and Eggs');

    // Meat and Seafood
    classifier.train('chicken breast boneless', 'Meat and Seafood');
    classifier.train('chicken thighs', 'Meat and Seafood');
    classifier.train('beef ground lean', 'Meat and Seafood');
    classifier.train('steak ribeye', 'Meat and Seafood');
    classifier.train('pork chops', 'Meat and Seafood');
    classifier.train('bacon strips', 'Meat and Seafood');
    classifier.train('sausage Italian', 'Meat and Seafood');
    classifier.train('turkey breast deli', 'Meat and Seafood');
    classifier.train('ham sliced', 'Meat and Seafood');
    classifier.train('salmon fresh fillet', 'Meat and Seafood');
    classifier.train('shrimp raw', 'Meat and Seafood');
    classifier.train('tilapia fillets', 'Meat and Seafood');
    classifier.train('turkey ground', 'Meat and Seafood');
    classifier.train('steak sirloin', 'Meat and Seafood');
    classifier.train('beef steak', 'Meat and Seafood');
    classifier.train('beef roast', 'Meat and Seafood');

    // Bakery
    classifier.train('bread white sliced', 'Bakery');
    classifier.train('bread wheat whole grain', 'Bakery');
    classifier.train('bread sourdough', 'Bakery');
    classifier.train('bagels plain', 'Bakery');
    classifier.train('croissants butter', 'Bakery');
    classifier.train('muffins blueberry', 'Bakery');
    classifier.train('donuts glazed', 'Bakery');
    classifier.train('rolls dinner', 'Bakery');
    classifier.train('baguette french', 'Bakery');
    classifier.train('cake chocolate', 'Bakery');
    classifier.train('cookies chocolate chip', 'Bakery');
    classifier.train('tortillas flour', 'Bakery');
    classifier.train('pita bread', 'Bakery');
    
    // Pantry
    classifier.train('flour all purpose', 'Pantry');
    classifier.train('sugar granulated white', 'Pantry');
    classifier.train('sugar brown', 'Pantry');
    classifier.train('baking powder', 'Pantry');
    classifier.train('baking soda', 'Pantry');
    classifier.train('yeast active dry', 'Pantry');
    classifier.train('vanilla extract pure', 'Pantry');
    classifier.train('chocolate chips semi sweet', 'Pantry');
    classifier.train('cocoa powder unsweetened', 'Pantry');
    classifier.train('cornstarch', 'Pantry');
    classifier.train('powdered sugar', 'Pantry');
    classifier.train('cake mix', 'Pantry');
    classifier.train('brownie mix', 'Pantry');
    classifier.train('shortening vegetable', 'Pantry');
    classifier.train('pasta spaghetti', 'Pantry');
    classifier.train('pasta penne', 'Pantry');
    classifier.train('rice white long grain', 'Pantry');
    classifier.train('rice brown', 'Pantry');
    classifier.train('beans black canned', 'Pantry');
    classifier.train('beans kidney canned', 'Pantry');
    classifier.train('tomato sauce canned', 'Pantry');
    classifier.train('tomatoes diced canned', 'Pantry');
    classifier.train('soup chicken noodle', 'Pantry');
    classifier.train('broth chicken', 'Pantry');
    classifier.train('broth vegetable', 'Pantry');
    classifier.train('oil olive extra virgin', 'Pantry');
    classifier.train('oil vegetable', 'Pantry');
    classifier.train('vinegar balsamic', 'Pantry');
    classifier.train('vinegar apple cider', 'Pantry');
    classifier.train('peanut butter creamy', 'Pantry');
    classifier.train('jelly strawberry', 'Pantry');
    classifier.train('honey pure', 'Pantry');
    classifier.train('syrup maple', 'Pantry');
    classifier.train('salt table', 'Pantry');
    classifier.train('pepper black ground', 'Pantry');
    classifier.train('spices garlic powder', 'Pantry');
    classifier.train('spices paprika', 'Pantry');
    classifier.train('spices cinnamon ground', 'Pantry');
    classifier.train('oatmeal rolled oats', 'Pantry');
    classifier.train('cereal corn flakes', 'Pantry');
    classifier.train('tuna canned', 'Pantry');
    classifier.train('crackers saltine', 'Pantry');

    // Snacks
    classifier.train('chips potato', 'Snacks');
    classifier.train('chips tortilla', 'Snacks');
    classifier.train('pretzels', 'Snacks');
    classifier.train('popcorn microwave', 'Snacks');
    classifier.train('nuts almonds', 'Snacks');
    classifier.train('nuts cashews', 'Snacks');
    classifier.train('nuts peanuts', 'Snacks');
    classifier.train('trail mix', 'Snacks');
    classifier.train('granola bars', 'Snacks');
    classifier.train('crackers cheese', 'Snacks');
    classifier.train('candy chocolate bar', 'Snacks');
    classifier.train('gummy bears', 'Snacks');

    // Frozen
    classifier.train('pizza frozen cheese', 'Frozen');
    classifier.train('pizza frozen pepperoni', 'Frozen');
    classifier.train('vegetables frozen mixed', 'Frozen');
    classifier.train('vegetables frozen peas', 'Frozen');
    classifier.train('vegetables frozen corn', 'Frozen');
    classifier.train('french fries frozen', 'Frozen');
    classifier.train('ice cream vanilla', 'Frozen');
    classifier.train('ice cream chocolate', 'Frozen');
    classifier.train('waffles frozen', 'Frozen');
    classifier.train('chicken nuggets frozen', 'Frozen');
    classifier.train('dinner frozen meal', 'Frozen');
    classifier.train('burrito frozen', 'Frozen');

    // Beverages
    classifier.train('water bottled', 'Beverages');
    classifier.train('water sparkling', 'Beverages');
    classifier.train('soda cola', 'Beverages');
    classifier.train('juice orange', 'Beverages');
    classifier.train('juice apple', 'Beverages');
    classifier.train('coffee ground', 'Beverages');
    classifier.train('coffee beans whole', 'Beverages');
    classifier.train('tea black bags', 'Beverages');
    classifier.train('tea green bags', 'Beverages');
    classifier.train('lemonade', 'Beverages');
    classifier.train('sports drink', 'Beverages');
    classifier.train('energy drink', 'Beverages');

    // Personal Care
    classifier.train('shampoo', 'Personal Care');
    classifier.train('conditioner hair', 'Personal Care');
    classifier.train('soap bar', 'Personal Care');
    classifier.train('body wash', 'Personal Care');
    classifier.train('toothpaste', 'Personal Care');
    classifier.train('toothbrush', 'Personal Care');
    classifier.train('deodorant', 'Personal Care');
    classifier.train('lotion body', 'Personal Care');
    classifier.train('shaving cream', 'Personal Care');
    classifier.train('razor', 'Personal Care');
    classifier.train('tissues facial', 'Personal Care');
    classifier.train('toilet paper', 'Personal Care');
    classifier.train('cotton swabs', 'Personal Care');

    // Cleaning Supplies
    classifier.train('dish soap liquid', 'Cleaning Supplies');
    classifier.train('laundry detergent', 'Cleaning Supplies');
    classifier.train('bleach', 'Cleaning Supplies');
    classifier.train('paper towels', 'Cleaning Supplies');
    classifier.train('sponges', 'Cleaning Supplies');
    classifier.train('trash bags', 'Cleaning Supplies');
    classifier.train('cleaner all purpose', 'Cleaning Supplies');
    classifier.train('glass cleaner', 'Cleaning Supplies');
    classifier.train('disinfectant wipes', 'Cleaning Supplies');

    return {
        wordCounts: classifier.wordCounts,
        categoryTotals: classifier.categoryTotals,
        vocabulary: classifier.vocabulary,
        totalItemsTrained: classifier.totalItemsTrained
    };
}

/**
 * Pre-built memory object ready to use with the grocery classifier.
 * Contains training data for all grocery categories.
 */
export const groceryMemory = buildGroceryMemory();
