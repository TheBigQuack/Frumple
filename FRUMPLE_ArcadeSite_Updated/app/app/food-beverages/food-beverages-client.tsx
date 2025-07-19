
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Coffee, 
  Pizza,
  Sandwich,
  IceCream,
  Zap,
  Star,
  Plus,
  Minus,
  ShoppingCart,
  Search,
  Clock,
  Flame,
  Leaf
} from 'lucide-react'

interface MenuItem {
  id: string
  name: string
  category: 'energy-drinks' | 'snacks' | 'meals' | 'desserts' | 'combos'
  price: number
  description: string
  ingredients?: string[]
  nutritionalInfo?: {
    calories: number
    protein?: number
    caffeine?: number
  }
  tags: string[]
  image: string
  isPopular?: boolean
  isNew?: boolean
  isVegan?: boolean
  isSpicy?: boolean
}

const menuItems: MenuItem[] = [
  // Energy Drinks
  {
    id: 'drink-001',
    name: 'Cyber Fuel Max',
    category: 'energy-drinks',
    price: 8,
    description: 'Ultimate gaming energy drink with 300mg caffeine, B-vitamins, and taurine for peak performance',
    ingredients: ['Caffeine', 'Taurine', 'B-Vitamins', 'Natural Flavors'],
    nutritionalInfo: { calories: 15, caffeine: 300 },
    tags: ['High Caffeine', 'Zero Sugar', 'Performance'],
    image: 'https://i.pinimg.com/originals/5b/03/66/5b0366a23b220eba94fb50325311b171.jpg',
    isPopular: true
  },
  {
    id: 'drink-002',
    name: 'Neon Hydration',
    category: 'energy-drinks',
    price: 6,
    description: 'Electrolyte-enhanced hydration drink with natural fruit flavors and moderate caffeine boost',
    ingredients: ['Electrolytes', 'Natural Fruit Extract', 'Light Caffeine'],
    nutritionalInfo: { calories: 25, caffeine: 80 },
    tags: ['Hydration', 'Natural', 'Low Caffeine'],
    image: 'https://i.pinimg.com/736x/85/4e/27/854e2794dc1af30a071c14de98c182c7.jpg'
  },
  
  // Snacks
  {
    id: 'snack-001',
    name: 'Pro Gamer Mix',
    category: 'snacks',
    price: 12,
    description: 'Premium trail mix with nuts, dark chocolate, and energy-boosting dried fruits',
    ingredients: ['Almonds', 'Cashews', 'Dark Chocolate', 'Dried Berries'],
    nutritionalInfo: { calories: 280, protein: 8 },
    tags: ['Protein Rich', 'Natural Energy', 'Brain Food'],
    image: 'https://cdn.shoplightspeed.com/shops/648026/files/63470099/nuts-dark-chocolate-trail-mix-125oz.jpg',
    isVegan: true
  },
  {
    id: 'snack-002',
    name: 'Spicy Pixel Chips',
    category: 'snacks',
    price: 5,
    description: 'Artisanal kettle-cooked chips with a fiery gaming-inspired spice blend',
    ingredients: ['Potatoes', 'Spice Blend', 'Sea Salt'],
    nutritionalInfo: { calories: 150 },
    tags: ['Spicy', 'Crunchy', 'Artisanal'],
    image: 'https://i.pinimg.com/originals/ea/3b/98/ea3b9875fa252efc711d608d866ad8a6.jpg',
    isSpicy: true
  },

  // Meals
  {
    id: 'meal-001',
    name: 'Elite Gaming Burger',
    category: 'meals',
    price: 18,
    description: 'Juicy beef patty with bacon, cheddar, and our signature cyber sauce on a brioche bun',
    ingredients: ['Beef Patty', 'Bacon', 'Cheddar', 'Cyber Sauce', 'Brioche Bun'],
    nutritionalInfo: { calories: 650, protein: 35 },
    tags: ['Signature', 'High Protein', 'Comfort Food'],
    image: 'https://i.pinimg.com/originals/42/17/e6/4217e65c28236d8998f530cdb01b7cda.jpg',
    isPopular: true
  },
  {
    id: 'meal-002',
    name: 'Vegan Power Bowl',
    category: 'meals',
    price: 16,
    description: 'Quinoa bowl with roasted vegetables, avocado, and tahini dressing for sustained energy',
    ingredients: ['Quinoa', 'Roasted Vegetables', 'Avocado', 'Tahini'],
    nutritionalInfo: { calories: 420, protein: 15 },
    tags: ['Vegan', 'Healthy', 'Sustained Energy'],
    image: 'https://i.pinimg.com/originals/fb/e9/b7/fbe9b7f202cd11c5c7ac3e4f0139c53c.jpg',
    isVegan: true,
    isNew: true
  },

  // Desserts
  {
    id: 'dessert-001',
    name: 'Pixel Ice Cream',
    category: 'desserts',
    price: 10,
    description: 'Artisanal ice cream with pop rocks and color-changing elements for a fun gaming experience',
    ingredients: ['Premium Ice Cream', 'Pop Rocks', 'Color-Changing Candy'],
    nutritionalInfo: { calories: 320 },
    tags: ['Interactive', 'Premium', 'Fun'],
    image: 'https://i.pinimg.com/736x/a3/29/a3/a329a3b2049cfa57557fac4bf15ec9f1.jpg',
    isNew: true
  },

  // Combos
  {
    id: 'combo-001',
    name: 'Ultimate Gaming Combo',
    category: 'combos',
    price: 25,
    description: 'Elite Gaming Burger + Cyber Fuel Max + Pro Gamer Mix - Perfect for extended gaming sessions',
    tags: ['Best Value', 'Complete Meal', 'High Energy'],
    image: 'https://i.pinimg.com/736x/51/2b/35/512b35e4f4ecf8ea5709bc71a9d9a6b2.jpg',
    isPopular: true
  }
]

const categories = [
  { value: 'all', label: 'All Items', icon: Coffee, count: menuItems.length },
  { value: 'energy-drinks', label: 'Energy Drinks', icon: Zap, count: menuItems.filter(item => item.category === 'energy-drinks').length },
  { value: 'snacks', label: 'Snacks', icon: Sandwich, count: menuItems.filter(item => item.category === 'snacks').length },
  { value: 'meals', label: 'Meals', icon: Pizza, count: menuItems.filter(item => item.category === 'meals').length },
  { value: 'desserts', label: 'Desserts', icon: IceCream, count: menuItems.filter(item => item.category === 'desserts').length },
  { value: 'combos', label: 'Combos', icon: Star, count: menuItems.filter(item => item.category === 'combos').length }
]

export function FoodBeveragesClient() {
  const [mounted, setMounted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState<{[key: string]: number}>({})

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }))
  }

  const removeFromCart = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
    }))
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0)
  }

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [itemId, count]) => {
      const item = menuItems.find(item => item.id === itemId)
      return total + (item?.price || 0) * count
    }, 0)
  }

  if (!mounted) return null

  return (
    <main className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-orbitron mb-4 gradient-text">
            Food & Beverages
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Gourmet gaming fuel including energy drinks, premium snacks, and full meals to keep you powered up
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-purple-600 mx-auto" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Filters */}
            <div className="mb-8">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="cyber-input pl-10"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <Button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      variant={selectedCategory === category.value ? "default" : "outline"}
                      className={`${
                        selectedCategory === category.value 
                          ? 'cyber-button' 
                          : 'cyber-border text-green-400 hover:bg-green-500/10'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {category.label} ({category.count})
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <Card 
                  key={item.id} 
                  className="cyber-card overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg font-orbitron text-white">
                        {item.name}
                      </CardTitle>
                      <div className="flex flex-col items-end gap-1">
                        {item.isNew && (
                          <Badge className="bg-green-500 text-black border-0 text-xs">NEW</Badge>
                        )}
                        {item.isPopular && (
                          <Badge className="bg-yellow-500 text-black border-0 text-xs">POPULAR</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      {item.isVegan && <Leaf className="w-4 h-4 text-green-400" />}
                      {item.isSpicy && <Flame className="w-4 h-4 text-red-400" />}
                      <div className="data-display text-xl font-bold">
                        ${item.price}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Item Image */}
                    <div className="relative aspect-square bg-gray-800 rounded-lg mb-4 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-purple-500/20" />
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Nutritional Info */}
                    {item.nutritionalInfo && (
                      <div className="flex items-center gap-4 mb-4 text-xs">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 text-green-400 mr-1" />
                          <span className="text-gray-400">{item.nutritionalInfo.calories} cal</span>
                        </div>
                        {item.nutritionalInfo.protein && (
                          <div className="flex items-center">
                            <Zap className="w-3 h-3 text-purple-400 mr-1" />
                            <span className="text-gray-400">{item.nutritionalInfo.protein}g protein</span>
                          </div>
                        )}
                        {item.nutritionalInfo.caffeine && (
                          <div className="flex items-center">
                            <Coffee className="w-3 h-3 text-yellow-400 mr-1" />
                            <span className="text-gray-400">{item.nutritionalInfo.caffeine}mg caffeine</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.tags.slice(0, 3).map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-green-400/50 text-green-400">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Add to Cart */}
                    <div className="flex items-center justify-between">
                      {cart[item.id] > 0 ? (
                        <div className="flex items-center space-x-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeFromCart(item.id)}
                            className="cyber-border text-red-400 hover:bg-red-500/10 w-8 h-8 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="data-display font-bold">{cart[item.id]}</span>
                          <Button
                            size="sm"
                            onClick={() => addToCart(item.id)}
                            className="cyber-button w-8 h-8 p-0"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => addToCart(item.id)}
                          className="cyber-button flex-1"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:w-80">
            <div className="sticky top-24">
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg font-orbitron text-white">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Cart ({getTotalItems()})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {getTotalItems() === 0 ? (
                    <p className="text-gray-400 text-center py-8">
                      Your cart is empty
                    </p>
                  ) : (
                    <>
                      <div className="space-y-3 mb-6">
                        {Object.entries(cart).filter(([_, count]) => count > 0).map(([itemId, count]) => {
                          const item = menuItems.find(item => item.id === itemId)
                          if (!item) return null
                          
                          return (
                            <div key={itemId} className="flex items-center justify-between">
                              <div className="flex-1">
                                <p className="text-white text-sm font-medium">{item.name}</p>
                                <p className="text-gray-400 text-xs">${item.price} each</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => removeFromCart(itemId)}
                                  className="cyber-border text-red-400 hover:bg-red-500/10 w-6 h-6 p-0"
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="data-display text-sm w-8 text-center">{count}</span>
                                <Button
                                  size="sm"
                                  onClick={() => addToCart(itemId)}
                                  className="cyber-button w-6 h-6 p-0"
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      
                      <div className="border-t border-green-400/30 pt-4">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-white font-medium">Total:</span>
                          <span className="data-display text-xl font-bold">
                            ${getTotalPrice().toFixed(2)}
                          </span>
                        </div>
                        <Button className="w-full cyber-button">
                          Proceed to Checkout
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
