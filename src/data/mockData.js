export const mockRecipes = [
    {
      id: '1',
      title: 'Spaghetti Carbonara',
      description: 'A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
      cookingTime: 25,
      servings: 4,
      difficulty: 'Medium',
      ingredients: [
        '350g spaghetti',
        '150g pancetta or guanciale, diced',
        '3 large eggs',
        '50g pecorino cheese, grated',
        '50g parmesan cheese, grated',
        'Freshly ground black pepper',
        'Salt to taste'
      ],
      substitutions: {
        'pancetta': ['bacon', 'ham'],
        'pecorino cheese': ['parmesan cheese'],
        'parmesan cheese': ['pecorino cheese', 'grana padano']
      },
      instructions: [
        'Bring a large pot of salted water to boil and cook spaghetti according to package instructions.',
        'While pasta cooks, heat a large skillet over medium heat and cook pancetta until crispy, about 5-7 minutes.',
        'In a bowl, whisk together eggs, grated cheeses, and black pepper.',
        'Drain pasta, reserving 1/2 cup of pasta water.',
        'Working quickly, add hot pasta to the skillet with pancetta, remove from heat.',
        'Add the egg and cheese mixture, tossing continuously until creamy. Add pasta water as needed to create a silky sauce.',
        'Serve immediately with extra grated cheese and black pepper.'
      ],
      imageUrl: 'https://i.imgur.com/wx4Y5zk.png',
      rating: 4.8,
      createdBy: 'chef_mario',
      createdAt: '2023-01-15T12:00:00Z',
      dietaryTags: ['dairy-free', 'nut-free']
    },
    {
      id: '2',
      title: 'Chicken Tikka Masala',
      description: 'Grilled chunks of chicken in a creamy spiced tomato sauce.',
      cookingTime: 45,
      servings: 4,
      difficulty: 'Medium',
      ingredients: [
        '800g boneless chicken thighs, cut into chunks',
        '2 cups plain yogurt',
        '3 tbsp lemon juice',
        '4 tsp ground cumin',
        '4 tsp ground coriander',
        '4 tsp paprika',
        '2 tsp turmeric',
        '2 tsp garam masala',
        '2 tsp salt',
        '2 tbsp ginger paste',
        '2 tbsp garlic paste',
        '2 tbsp vegetable oil',
        '1 large onion, finely chopped',
        '400g canned tomatoes',
        '1 cup heavy cream',
        'Fresh cilantro for garnish'
      ],
      substitutions: {
        'chicken thighs': ['chicken breast', 'tofu (for vegetarian)'],
        'heavy cream': ['coconut milk', 'cashew cream'],
        'yogurt': ['coconut yogurt (for dairy-free)']
      },
      instructions: [
        'In a large bowl, combine yogurt, lemon juice, cumin, coriander, paprika, turmeric, garam masala, salt, ginger paste, and garlic paste.',
        'Add chicken pieces and marinate for at least 2 hours, preferably overnight.',
        'Preheat oven to 400°F (200°C). Thread chicken onto skewers and place on a baking sheet. Bake for 15 minutes.',
        'Heat oil in a large pan over medium heat. Add onion and cook until soft, about 5 minutes.',
        'Add tomatoes and simmer for 15 minutes until sauce thickens.',
        'Add cream and simmer for 5 more minutes.',
        'Add the cooked chicken pieces and simmer for another 5-10 minutes.',
        'Garnish with fresh cilantro and serve with rice or naan bread.'
      ],
      imageUrl: 'https://i.imgur.com/wx4Y5zk.png',
      rating: 4.7,
      createdBy: 'spice_master',
      createdAt: '2023-02-20T15:30:00Z',
      dietaryTags: ['nut-free']
    },
    {
      id: '3',
      title: 'Avocado Toast',
      description: 'Simple and nutritious breakfast with mashed avocado on toasted bread.',
      cookingTime: 10,
      servings: 2,
      difficulty: 'Easy',
      ingredients: [
        '2 slices of sourdough bread',
        '1 ripe avocado',
        '1 tbsp lemon juice',
        'Salt and pepper to taste',
        'Red pepper flakes (optional)',
        '2 eggs (optional)',
        'Fresh herbs for garnish'
      ],
      substitutions: {
        'sourdough bread': ['whole grain bread', 'gluten-free bread'],
        'lemon juice': ['lime juice', 'white vinegar'],
        'eggs': ['tofu (for vegan)']
      },
      instructions: [
        'Toast the bread slices until golden and crisp.',
        'Cut the avocado in half, remove the pit, and scoop the flesh into a bowl.',
        'Add lemon juice, salt, and pepper. Mash with a fork to desired consistency.',
        'Spread the mashed avocado on the toast.',
        'If desired, top with a poached or fried egg.',
        'Sprinkle with red pepper flakes and fresh herbs before serving.'
      ],
      imageUrl: 'https://i.imgur.com/wx4Y5zk.png',
      rating: 4.5,
      createdBy: 'health_nut',
      createdAt: '2023-03-05T08:15:00Z',
      dietaryTags: ['vegetarian', 'dairy-free']
    },
    {
      id: '4',
      title: 'Chocolate Chip Cookies',
      description: 'Classic homemade cookies with chocolate chips and a soft, chewy center.',
      cookingTime: 30,
      servings: 24,
      difficulty: 'Easy',
      ingredients: [
        '2 1/4 cups all-purpose flour',
        '1 tsp baking soda',
        '1 tsp salt',
        '1 cup unsalted butter, softened',
        '3/4 cup granulated sugar',
        '3/4 cup packed brown sugar',
        '2 large eggs',
        '2 tsp vanilla extract',
        '2 cups semi-sweet chocolate chips'
      ],
      substitutions: {
        'all-purpose flour': ['gluten-free flour blend', 'whole wheat flour'],
        'butter': ['coconut oil', 'vegan butter'],
        'eggs': ['flax eggs (1 tbsp ground flaxseed + 3 tbsp water per egg)'],
        'chocolate chips': ['dairy-free chocolate chips', 'chopped dark chocolate']
      },
      instructions: [
        'Preheat oven to 375°F (190°C).',
        'In a small bowl, mix flour, baking soda, and salt.',
        'In a large bowl, cream together butter, granulated sugar, and brown sugar until smooth.',
        'Beat in eggs one at a time, then stir in vanilla.',
        'Gradually blend in the dry ingredients.',
        'Fold in chocolate chips.',
        'Drop rounded tablespoons of dough onto ungreased baking sheets.',
        'Bake for 9 to 11 minutes or until golden brown.',
        'Let stand on baking sheet for 2 minutes, then remove to cool on wire racks.'
      ],
      imageUrl: 'https://i.imgur.com/wx4Y5zk.png',
      rating: 4.9,
      createdBy: 'sweet_tooth',
      createdAt: '2023-04-10T14:45:00Z',
      dietaryTags: ['vegetarian']
    },
    {
      id: '5',
      title: 'Greek Salad',
      description: 'Fresh Mediterranean salad with tomatoes, cucumbers, olives, and feta cheese.',
      cookingTime: 15,
      servings: 4,
      difficulty: 'Easy',
      ingredients: [
        '4 large tomatoes, cut into chunks',
        '1 cucumber, sliced',
        '1 red onion, thinly sliced',
        '1 green bell pepper, chopped',
        '200g feta cheese, cubed',
        '1 cup kalamata olives',
        '2 tbsp extra virgin olive oil',
        '1 tbsp red wine vinegar',
        '1 tsp dried oregano',
        'Salt and pepper to taste'
      ],
      substitutions: {
        'feta cheese': ['tofu feta (for vegan)', 'goat cheese'],
        'red wine vinegar': ['balsamic vinegar', 'lemon juice'],
        'kalamata olives': ['black olives', 'green olives']
      },
      instructions: [
        'In a large bowl, combine tomatoes, cucumber, onion, bell pepper, feta cheese, and olives.',
        'In a small bowl, whisk together olive oil, red wine vinegar, oregano, salt, and pepper.',
        'Pour dressing over the salad and toss gently to combine.',
        'Let sit for 10 minutes before serving to allow flavors to meld.'
      ],
      imageUrl: 'https://i.imgur.com/wx4Y5zk.png',
      rating: 4.6,
      createdBy: 'mediterranean_chef',
      createdAt: '2023-05-22T11:20:00Z',
      dietaryTags: ['vegetarian', 'gluten-free', 'keto']
    },
    {
      id: '6',
      title: 'Beef Stir Fry',
      description: 'Quick and flavorful stir-fried beef with vegetables and a savory sauce.',
      cookingTime: 20,
      servings: 4,
      difficulty: 'Medium',
      ingredients: [
        '500g beef sirloin, thinly sliced',
        '2 tbsp vegetable oil',
        '1 onion, sliced',
        '2 bell peppers, sliced',
        '2 carrots, julienned',
        '2 cups broccoli florets',
        '3 cloves garlic, minced',
        '1 tbsp ginger, minced',
        '3 tbsp soy sauce',
        '1 tbsp oyster sauce',
        '1 tbsp honey',
        '1 tsp sesame oil',
        '1/4 cup beef broth',
        '1 tbsp cornstarch',
        'Green onions for garnish',
        'Sesame seeds for garnish'
      ],
      substitutions: {
        'beef sirloin': ['chicken breast', 'tofu', 'tempeh'],
        'oyster sauce': ['hoisin sauce', 'vegetarian oyster sauce'],
        'soy sauce': ['tamari (gluten-free)', 'coconut aminos'],
        'honey': ['maple syrup', 'brown sugar']
      },
      instructions: [
        'In a small bowl, mix soy sauce, oyster sauce, honey, sesame oil, beef broth, and cornstarch. Set aside.',
        'Heat 1 tablespoon of oil in a large wok or skillet over high heat.',
        'Add beef and stir-fry for 2-3 minutes until browned. Remove and set aside.',
        'Add remaining oil to the wok. Add garlic and ginger, stir-fry for 30 seconds.',
        'Add onions, bell peppers, carrots, and broccoli. Stir-fry for 4-5 minutes until vegetables are crisp-tender.',
        'Return beef to the wok. Pour in the sauce mixture.',
        'Cook for 1-2 minutes until sauce thickens.',
        'Garnish with green onions and sesame seeds. Serve with rice.'
      ],
      imageUrl: 'https://i.imgur.com/wx4Y5zk.png',
      rating: 4.7,
      createdBy: 'wok_master',
      createdAt: '2023-06-15T18:30:00Z',
      dietaryTags: ['dairy-free']
    },
    {
      id: '7',
      title: 'Vegan Buddha Bowl',
      description: 'Nutritious bowl with grains, vegetables, and plant-based protein.',
      cookingTime: 30,
      servings: 2,
      difficulty: 'Easy',
      ingredients: [
        '1 cup quinoa, rinsed',
        '2 cups vegetable broth',
        '1 sweet potato, diced',
        '1 tbsp olive oil',
        '1 tsp cumin',
        '1 can chickpeas, drained and rinsed',
        '1 avocado, sliced',
        '2 cups kale, chopped',
        '1 cup cherry tomatoes, halved',
        '1/4 cup tahini',
        '2 tbsp lemon juice',
        '1 tbsp maple syrup',
        '2 tbsp water',
        'Salt and pepper to taste',
        'Sesame seeds for garnish'
      ],
      substitutions: {
        'quinoa': ['brown rice', 'farro', 'cauliflower rice'],
        'chickpeas': ['tofu', 'tempeh', 'lentils'],
        'tahini': ['almond butter', 'sunflower seed butter'],
        'kale': ['spinach', 'arugula', 'mixed greens']
      },
      instructions: [
        'Cook quinoa in vegetable broth according to package instructions.',
        'Preheat oven to 400°F (200°C). Toss sweet potato with olive oil, cumin, salt, and pepper. Roast for 20-25 minutes until tender.',
        'In a small bowl, whisk together tahini, lemon juice, maple syrup, water, salt, and pepper to make the dressing.',
        'Massage kale with a little olive oil and salt until softened.',
        'Assemble bowls with quinoa, roasted sweet potato, chickpeas, avocado, kale, and cherry tomatoes.',
        'Drizzle with tahini dressing and sprinkle with sesame seeds.'
      ],
      imageUrl: 'https://i.imgur.com/wx4Y5zk.png',
      rating: 4.8,
      createdBy: 'plant_based_chef',
      createdAt: '2023-07-05T10:15:00Z',
      dietaryTags: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free']
    }
  ]
  