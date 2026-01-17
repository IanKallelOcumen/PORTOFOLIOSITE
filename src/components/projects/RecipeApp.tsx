import { useState } from 'react';
import { Search, Clock, Users, ChefHat, Heart, Star, X, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Footer } from '../Footer';

interface Recipe {
  id: number;
  title: string;
  image: string;
  time: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  rating: number;
  ingredients: string[];
  instructions: string[];
  calories: number;
}

const recipes: Recipe[] = [
  {
    id: 1,
    title: 'Classic Margherita Pizza',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
    time: 30,
    servings: 4,
    difficulty: 'Easy',
    category: 'Italian',
    rating: 4.8,
    calories: 250,
    ingredients: [
      '2 cups all-purpose flour',
      '1 tsp active dry yeast',
      '1 cup warm water',
      '2 tbsp olive oil',
      '1 tsp salt',
      '1 cup tomato sauce',
      '200g fresh mozzarella',
      'Fresh basil leaves'
    ],
    instructions: [
      'Mix flour, yeast, and warm water. Let it rest for 10 minutes.',
      'Add olive oil and salt. Knead for 5 minutes until smooth.',
      'Let dough rise for 1 hour in a warm place.',
      'Roll out dough and add tomato sauce.',
      'Top with mozzarella and bake at 475°F for 12-15 minutes.',
      'Garnish with fresh basil and serve hot.'
    ]
  },
  {
    id: 2,
    title: 'Chicken Teriyaki Bowl',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
    time: 25,
    servings: 2,
    difficulty: 'Easy',
    category: 'Asian',
    rating: 4.6,
    calories: 420,
    ingredients: [
      '400g chicken breast',
      '3 tbsp soy sauce',
      '2 tbsp honey',
      '1 tbsp rice vinegar',
      '2 cups cooked rice',
      '1 cup broccoli florets',
      'Sesame seeds',
      'Green onions'
    ],
    instructions: [
      'Cut chicken into bite-sized pieces.',
      'Mix soy sauce, honey, and rice vinegar for the teriyaki sauce.',
      'Cook chicken in a pan until golden brown.',
      'Add teriyaki sauce and simmer for 5 minutes.',
      'Steam broccoli until tender.',
      'Serve chicken over rice, top with broccoli, sesame seeds, and green onions.'
    ]
  },
  {
    id: 3,
    title: 'Creamy Pasta Carbonara',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800',
    time: 20,
    servings: 3,
    difficulty: 'Medium',
    category: 'Italian',
    rating: 4.9,
    calories: 580,
    ingredients: [
      '350g spaghetti',
      '200g bacon or pancetta',
      '3 egg yolks',
      '1 cup parmesan cheese',
      '2 cloves garlic',
      'Black pepper',
      'Salt',
      'Fresh parsley'
    ],
    instructions: [
      'Cook spaghetti according to package instructions.',
      'Fry bacon until crispy, add minced garlic.',
      'Mix egg yolks with parmesan cheese.',
      'Drain pasta, reserving 1 cup pasta water.',
      'Toss hot pasta with bacon, then remove from heat.',
      'Quickly stir in egg mixture, adding pasta water as needed.',
      'Season with black pepper and garnish with parsley.'
    ]
  },
  {
    id: 4,
    title: 'Greek Salad',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800',
    time: 10,
    servings: 4,
    difficulty: 'Easy',
    category: 'Mediterranean',
    rating: 4.5,
    calories: 180,
    ingredients: [
      '4 tomatoes, diced',
      '1 cucumber, diced',
      '1 red onion, sliced',
      '200g feta cheese',
      '1 cup olives',
      '3 tbsp olive oil',
      '1 tbsp red wine vinegar',
      'Oregano'
    ],
    instructions: [
      'Chop all vegetables into bite-sized pieces.',
      'Combine tomatoes, cucumber, and onion in a bowl.',
      'Add olives and crumbled feta cheese.',
      'Whisk together olive oil, vinegar, and oregano.',
      'Pour dressing over salad and toss gently.',
      'Serve immediately or chill for 30 minutes.'
    ]
  },
  {
    id: 5,
    title: 'Beef Tacos',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800',
    time: 35,
    servings: 6,
    difficulty: 'Easy',
    category: 'Mexican',
    rating: 4.7,
    calories: 320,
    ingredients: [
      '500g ground beef',
      '1 onion, diced',
      '2 tbsp taco seasoning',
      '12 taco shells',
      'Lettuce, shredded',
      'Tomatoes, diced',
      'Cheddar cheese',
      'Sour cream',
      'Salsa'
    ],
    instructions: [
      'Brown ground beef with diced onion in a large pan.',
      'Add taco seasoning and 1/2 cup water. Simmer for 10 minutes.',
      'Warm taco shells according to package directions.',
      'Fill shells with seasoned beef.',
      'Top with lettuce, tomatoes, and cheese.',
      'Serve with sour cream and salsa on the side.'
    ]
  },
  {
    id: 6,
    title: 'Chocolate Lava Cake',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
    time: 40,
    servings: 4,
    difficulty: 'Hard',
    category: 'Dessert',
    rating: 4.9,
    calories: 450,
    ingredients: [
      '200g dark chocolate',
      '100g butter',
      '2 eggs',
      '2 egg yolks',
      '1/4 cup sugar',
      '2 tbsp flour',
      'Butter for ramekins',
      'Powdered sugar for dusting'
    ],
    instructions: [
      'Preheat oven to 425°F. Butter 4 ramekins.',
      'Melt chocolate and butter together in a double boiler.',
      'Beat eggs, egg yolks, and sugar until thick.',
      'Fold melted chocolate into egg mixture.',
      'Gently fold in flour until just combined.',
      'Pour into ramekins and bake for 12-14 minutes.',
      'Let cool for 1 minute, invert onto plates, dust with powdered sugar.'
    ]
  }
];

export function RecipeApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [categoryStartIndex, setCategoryStartIndex] = useState(0);

  const categories = ['All', ...Array.from(new Set(recipes.map(r => r.category)))];
  const visibleCategoriesCount = 4; // Show 4 categories at a time
  const canScrollLeft = categoryStartIndex > 0;
  const canScrollRight = categoryStartIndex + visibleCategoriesCount < categories.length;
  
  const visibleCategories = categories.slice(categoryStartIndex, categoryStartIndex + visibleCategoriesCount);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (direction === 'left' && canScrollLeft) {
      setCategoryStartIndex(Math.max(0, categoryStartIndex - 1));
    } else if (direction === 'right' && canScrollRight) {
      setCategoryStartIndex(Math.min(categories.length - visibleCategoriesCount, categoryStartIndex + 1));
    }
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || recipe.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">RecipeHub</h1>
                <p className="text-gray-600 text-sm">Discover delicious recipes</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-2xl font-bold text-orange-600">{recipes.length}</p>
                <p className="text-sm text-gray-600">Recipes</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-red-600">{favorites.length}</p>
                <p className="text-sm text-gray-600">Favorites</p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes by name or category..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 flex-shrink-0">
              <Filter className="w-5 h-5 text-gray-400" />
              
              {/* Left Arrow */}
              <button
                onClick={() => scrollCategories('left')}
                disabled={!canScrollLeft}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  canScrollLeft
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {visibleCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    categoryFilter === category
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scrollCategories('right')}
              disabled={!canScrollRight}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all flex-shrink-0 ${
                canScrollRight
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Page Indicator */}
            <div className="hidden md:flex items-center gap-1.5 ml-2 flex-shrink-0">
              {Array.from({ length: Math.ceil(categories.length / visibleCategoriesCount) }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    Math.floor(categoryStartIndex / visibleCategoriesCount) === i
                      ? 'bg-orange-500 w-4'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Recipe Grid */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.4,
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <div className="relative h-48 overflow-hidden">
                  <motion.img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(recipe.id);
                    }}
                    className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      initial={false}
                      animate={favorites.includes(recipe.id) ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Heart className={`w-5 h-5 transition-colors ${favorites.includes(recipe.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                    </motion.div>
                  </motion.button>
                  <motion.div 
                    className="absolute bottom-3 left-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold">
                      {recipe.category}
                    </span>
                  </motion.div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-3">{recipe.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.time} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{recipe.servings} servings</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{recipe.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {recipe.difficulty}
                    </span>
                    <span className="text-sm text-gray-600">{recipe.calories} cal</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {filteredRecipes.length === 0 && (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              </motion.div>
              <p className="text-gray-500 text-lg">No recipes found. Try a different search!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Recipe Detail Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <motion.div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6" 
            onClick={() => setSelectedRecipe(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" 
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="relative h-64 overflow-hidden">
                <motion.img 
                  src={selectedRecipe.image} 
                  alt={selectedRecipe.title} 
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
                <motion.button
                  onClick={() => setSelectedRecipe(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="p-8">
                <motion.h2 
                  className="text-3xl font-bold mb-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {selectedRecipe.title}
                </motion.h2>
                <motion.div 
                  className="flex items-center gap-6 mb-6 text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{selectedRecipe.time} minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{selectedRecipe.servings} servings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span>{selectedRecipe.rating}/5.0</span>
                  </div>
                </motion.div>

                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl font-bold mb-3">Ingredients</h3>
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                      >
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                        <span className="text-gray-700">{ingredient}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-xl font-bold mb-3">Instructions</h3>
                  <ol className="space-y-4">
                    {selectedRecipe.instructions.map((instruction, index) => (
                      <motion.li 
                        key={index} 
                        className="flex gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 pt-1">{instruction}</span>
                      </motion.li>
                    ))}
                  </ol>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer darkMode={false} />
    </div>
  );
}