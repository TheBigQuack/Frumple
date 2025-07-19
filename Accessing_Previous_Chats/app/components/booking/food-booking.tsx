
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { Coffee, Plus, Minus, ShoppingCart, DollarSign } from 'lucide-react'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
  isAvailable: boolean
}

interface CartItem extends MenuItem {
  quantity: number
}

// Mock menu data - in real app this would come from API
const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Gaming Fuel Coffee',
    description: 'High-caffeine blend for extended gaming sessions',
    price: 4.50,
    category: 'Beverages',
    imageUrl: 'https://i.pinimg.com/originals/d7/77/3d/d7773d8d98a6f5ddc013a059c2240278.jpg',
    isAvailable: true
  },
  {
    id: '2',
    name: 'Energy Boost Smoothie',
    description: 'Protein-packed smoothie with natural energy boosters',
    price: 6.99,
    category: 'Beverages',
    imageUrl: 'https://play-lh.googleusercontent.com/Kf-21ECQj-v_QDMa6efgYPO9m731xBAHlqdfQBRRnUZq_zguW99NhVhDx-eeMnTqGvY',
    isAvailable: true
  },
  {
    id: '3',
    name: 'Victory Sandwich',
    description: 'Premium gaming sandwich designed for one-handed eating',
    price: 12.99,
    category: 'Food',
    imageUrl: 'https://i.pinimg.com/originals/28/3b/01/283b01c467b1e776a9d9a3e3dcee0bc6.png',
    isAvailable: true
  },
  {
    id: '4',
    name: 'Gamer\'s Trail Mix',
    description: 'Premium nuts and dried fruits for sustained energy',
    price: 5.99,
    category: 'Snacks',
    imageUrl: 'https://i5.peapod.com/c/BI/BIMHW.png',
    isAvailable: true
  },
  {
    id: '5',
    name: 'Pixel Pizza Slice',
    description: 'Artisan pizza slice with gamer-friendly toppings',
    price: 8.99,
    category: 'Food',
    imageUrl: 'https://img.freepik.com/premium-vector/pixel-art-pizza-slice-with-toppings-retro-8-bit-gaming-icon_1292377-12135.jpg',
    isAvailable: true
  },
  {
    id: '6',
    name: 'Hydration Station',
    description: 'Electrolyte-enhanced water with natural flavors',
    price: 2.99,
    category: 'Beverages',
    imageUrl: 'https://i.pinimg.com/736x/08/6d/72/086d7283a55b1c91af001f4045fded12.jpg',
    isAvailable: true
  }
]

export function FoodBooking() {
  const { data: session } = useSession()
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems)
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [deliveryLocation, setDeliveryLocation] = useState('')
  const [deliveryNotes, setDeliveryNotes] = useState('')
  const [loading, setLoading] = useState(false)

  const categories = ['All', 'Beverages', 'Food', 'Snacks']

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory)

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      } else {
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === itemId)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(cartItem =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      } else {
        return prevCart.filter(cartItem => cartItem.id !== itemId)
      }
    })
  }

  const getItemQuantity = (itemId: string) => {
    const item = cart.find(cartItem => cartItem.id === itemId)
    return item ? item.quantity : 0
  }

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const handleOrder = async () => {
    if (!session) {
      toast.error('Please sign in to place an order')
      return
    }

    if (cart.length === 0) {
      toast.error('Please add items to your cart')
      return
    }

    if (!deliveryLocation) {
      toast.error('Please specify delivery location')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            menuItemId: item.id,
            quantity: item.quantity,
            price: item.price
          })),
          location: deliveryLocation,
          deliveryNotes,
          totalAmount: getTotalAmount(),
        }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Order placed successfully!')
        // Reset form
        setCart([])
        setDeliveryLocation('')
        setDeliveryNotes('')
      } else {
        toast.error(result.message || 'Failed to place order')
      }
    } catch (error) {
      toast.error('An error occurred while placing the order')
      console.error('Order error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Menu Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-red-600 hover:bg-red-700" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          {selectedCategory === 'All' ? 'All Items' : selectedCategory}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const quantity = getItemQuantity(item.id)
            return (
              <Card key={item.id} className="bg-gray-800/50 border-gray-700">
                <CardHeader className="pb-3">
                  <div className="aspect-square bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                    <Coffee className="h-8 w-8 text-gray-500" />
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base text-white">{item.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1">${item.price}</Badge>
                    </div>
                  </div>
                  <CardDescription className="text-sm text-gray-400">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  {quantity > 0 ? (
                    <div className="flex items-center justify-between">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeFromCart(item.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-white font-medium">{quantity}</span>
                      <Button
                        size="sm"
                        onClick={() => addToCart(item)}
                        className="h-8 w-8 p-0 bg-red-600 hover:bg-red-700"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => addToCart(item)}
                      className="w-full bg-red-600 hover:bg-red-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Cart and Delivery */}
      {cart.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cart Summary */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-white flex items-center">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Your Order ({cart.length} item{cart.length > 1 ? 's' : ''})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-white">{item.name}</div>
                    <div className="text-xs text-gray-400">${item.price} × {item.quantity}</div>
                  </div>
                  <div className="text-sm text-white font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
              <div className="border-t border-gray-700 pt-3">
                <div className="flex justify-between text-base font-semibold text-white">
                  <span>Total:</span>
                  <span>${getTotalAmount().toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <div className="space-y-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-white">Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="deliveryLocation" className="text-sm font-medium text-gray-300">
                    Delivery Location *
                  </Label>
                  <Input
                    id="deliveryLocation"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    placeholder="e.g., Gaming Station #15, VR Room 2, Streaming Studio B"
                    className="mt-1 bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="deliveryNotes" className="text-sm font-medium text-gray-300">
                    Special Instructions (Optional)
                  </Label>
                  <Textarea
                    id="deliveryNotes"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="Any special instructions for delivery..."
                    className="mt-1 bg-gray-800 border-gray-700 text-white"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Order Button */}
            <Button 
              onClick={handleOrder}
              disabled={!session || loading || cart.length === 0 || !deliveryLocation}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50"
              size="lg"
            >
              {loading ? (
                <>
                  <div className="loading-spinner mr-2"></div>
                  Placing Order...
                </>
              ) : (
                <>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Place Order - ${getTotalAmount().toFixed(2)}
                </>
              )}
            </Button>

            {!session && (
              <p className="text-center text-sm text-gray-400">
                Please sign in to place an order
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
