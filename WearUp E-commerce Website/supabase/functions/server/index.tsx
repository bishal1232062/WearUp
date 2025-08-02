import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js@2'
import * as kv from './kv_store.tsx'

const app = new Hono()

app.use('*', logger(console.log))
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// Initialize storage bucket for product images
const initStorage = async () => {
  const bucketName = 'make-a0e2e37a-products'
  const { data: buckets } = await supabase.storage.listBuckets()
  const bucketExists = buckets?.some(bucket => bucket.name === bucketName)
  
  if (!bucketExists) {
    await supabase.storage.createBucket(bucketName, {
      public: false,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
    })
  }
}

// Initialize storage on startup
initStorage().catch(console.error)

// Authentication middleware
const requireAuth = async (c: any, next: () => Promise<void>) => {
  const accessToken = c.req.header('Authorization')?.split(' ')[1]
  
  if (!accessToken) {
    return c.json({ error: 'Authorization token required' }, 401)
  }

  const { data: { user }, error } = await supabase.auth.getUser(accessToken)
  
  if (error || !user?.id) {
    return c.json({ error: 'Invalid or expired token' }, 401)
  }

  c.set('userId', user.id)
  c.set('userEmail', user.email)
  await next()
}

// User signup
app.post('/make-server-a0e2e37a/auth/signup', async (c) => {
  try {
    const { email, password, fullName } = await c.req.json()
    
    if (!email || !password || !fullName) {
      return c.json({ error: 'Email, password, and full name are required' }, 400)
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        full_name: fullName,
        display_name: fullName 
      },
      email_confirm: true // Auto-confirm since email server isn't configured
    })

    if (error) {
      console.log(`Signup error for user ${email}:`, error)
      return c.json({ error: error.message }, 400)
    }

    // Create user profile in KV store
    await kv.set(`user_profile:${data.user.id}`, {
      id: data.user.id,
      email: data.user.email,
      fullName,
      joinedAt: new Date().toISOString(),
      totalOrders: 0,
      totalSpent: 0
    })

    return c.json({ 
      message: 'User created successfully',
      user: {
        id: data.user.id,
        email: data.user.email,
        fullName
      }
    })
  } catch (error) {
    console.log('Signup error:', error)
    return c.json({ error: 'Failed to create user account' }, 500)
  }
})

// Get user profile
app.get('/make-server-a0e2e37a/auth/profile', requireAuth, async (c) => {
  try {
    const userId = c.get('userId')
    const profile = await kv.get(`user_profile:${userId}`)
    
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404)
    }

    return c.json(profile)
  } catch (error) {
    console.log('Get profile error:', error)
    return c.json({ error: 'Failed to fetch user profile' }, 500)
  }
})

// Get all products
app.get('/make-server-a0e2e37a/products', async (c) => {
  try {
    const category = c.req.query('category')
    const search = c.req.query('search')
    
    let products = await kv.getByPrefix('product:')
    
    // Filter by category if specified
    if (category && category !== 'all') {
      products = products.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      )
    }

    // Filter by search term if specified
    if (search) {
      const searchLower = search.toLowerCase()
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower)
      )
    }

    // Sort by created date (newest first)
    products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return c.json(products)
  } catch (error) {
    console.log('Get products error:', error)
    return c.json({ error: 'Failed to fetch products' }, 500)
  }
})

// Add product (protected route)
app.post('/make-server-a0e2e37a/products', requireAuth, async (c) => {
  try {
    const userId = c.get('userId')
    const { name, description, price, category, brand, condition, size, images } = await c.req.json()
    
    if (!name || !description || !price || !category) {
      return c.json({ error: 'Name, description, price, and category are required' }, 400)
    }

    const productId = crypto.randomUUID()
    const product = {
      id: productId,
      sellerId: userId,
      name,
      description,
      price: parseFloat(price),
      category,
      brand: brand || 'Unknown',
      condition: condition || 'Good',
      size: size || 'N/A',
      images: images || [],
      isAvailable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    await kv.set(`product:${productId}`, product)
    
    return c.json({ message: 'Product added successfully', product })
  } catch (error) {
    console.log('Add product error:', error)
    return c.json({ error: 'Failed to add product' }, 500)
  }
})

// Get user's cart
app.get('/make-server-a0e2e37a/cart', requireAuth, async (c) => {
  try {
    const userId = c.get('userId')
    const cart = await kv.get(`cart:${userId}`) || { items: [] }
    
    // Get full product details for each item in cart
    const cartWithProducts = await Promise.all(
      cart.items.map(async (item: any) => {
        const product = await kv.get(`product:${item.productId}`)
        return {
          ...item,
          product
        }
      })
    )

    return c.json({ 
      items: cartWithProducts,
      totalItems: cart.items.length,
      totalAmount: cartWithProducts.reduce((sum, item) => 
        sum + (item.product?.price || 0) * item.quantity, 0
      )
    })
  } catch (error) {
    console.log('Get cart error:', error)
    return c.json({ error: 'Failed to fetch cart' }, 500)
  }
})

// Add item to cart
app.post('/make-server-a0e2e37a/cart/add', requireAuth, async (c) => {
  try {
    const userId = c.get('userId')
    const { productId, quantity = 1 } = await c.req.json()
    
    if (!productId) {
      return c.json({ error: 'Product ID is required' }, 400)
    }

    // Check if product exists and is available
    const product = await kv.get(`product:${productId}`)
    if (!product || !product.isAvailable) {
      return c.json({ error: 'Product not found or unavailable' }, 404)
    }

    const cart = await kv.get(`cart:${userId}`) || { items: [] }
    
    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex((item: any) => item.productId === productId)
    
    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += quantity
    } else {
      cart.items.push({
        productId,
        quantity,
        addedAt: new Date().toISOString()
      })
    }

    await kv.set(`cart:${userId}`, cart)
    
    return c.json({ message: 'Item added to cart successfully' })
  } catch (error) {
    console.log('Add to cart error:', error)
    return c.json({ error: 'Failed to add item to cart' }, 500)
  }
})

// Remove item from cart
app.delete('/make-server-a0e2e37a/cart/remove/:productId', requireAuth, async (c) => {
  try {
    const userId = c.get('userId')
    const productId = c.req.param('productId')
    
    const cart = await kv.get(`cart:${userId}`) || { items: [] }
    cart.items = cart.items.filter((item: any) => item.productId !== productId)
    
    await kv.set(`cart:${userId}`, cart)
    
    return c.json({ message: 'Item removed from cart successfully' })
  } catch (error) {
    console.log('Remove from cart error:', error)
    return c.json({ error: 'Failed to remove item from cart' }, 500)
  }
})

// Create order from cart
app.post('/make-server-a0e2e37a/orders/create', requireAuth, async (c) => {
  try {
    const userId = c.get('userId')
    const { shippingAddress, paymentMethod } = await c.req.json()
    
    if (!shippingAddress || !paymentMethod) {
      return c.json({ error: 'Shipping address and payment method are required' }, 400)
    }

    const cart = await kv.get(`cart:${userId}`)
    if (!cart || !cart.items || cart.items.length === 0) {
      return c.json({ error: 'Cart is empty' }, 400)
    }

    // Calculate order total and get product details
    let totalAmount = 0
    const orderItems = []
    
    for (const item of cart.items) {
      const product = await kv.get(`product:${item.productId}`)
      if (!product || !product.isAvailable) {
        return c.json({ error: `Product ${item.productId} is no longer available` }, 400)
      }
      
      const itemTotal = product.price * item.quantity
      totalAmount += itemTotal
      
      orderItems.push({
        productId: item.productId,
        productName: product.name,
        price: product.price,
        quantity: item.quantity,
        subtotal: itemTotal
      })
      
      // Mark product as sold (you might want to implement inventory management instead)
      await kv.set(`product:${item.productId}`, { 
        ...product, 
        isAvailable: false,
        soldAt: new Date().toISOString(),
        soldTo: userId
      })
    }

    // Create order
    const orderId = crypto.randomUUID()
    const order = {
      id: orderId,
      userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    await kv.set(`order:${orderId}`, order)
    
    // Update user profile
    const profile = await kv.get(`user_profile:${userId}`)
    if (profile) {
      profile.totalOrders = (profile.totalOrders || 0) + 1
      profile.totalSpent = (profile.totalSpent || 0) + totalAmount
      await kv.set(`user_profile:${userId}`, profile)
    }

    // Clear cart
    await kv.set(`cart:${userId}`, { items: [] })
    
    return c.json({ 
      message: 'Order created successfully',
      orderId,
      totalAmount
    })
  } catch (error) {
    console.log('Create order error:', error)
    return c.json({ error: 'Failed to create order' }, 500)
  }
})

// Get user's orders
app.get('/make-server-a0e2e37a/orders', requireAuth, async (c) => {
  try {
    const userId = c.get('userId')
    const allOrders = await kv.getByPrefix('order:')
    const userOrders = allOrders.filter(order => order.userId === userId)
    
    // Sort by date (newest first)
    userOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    return c.json(userOrders)
  } catch (error) {
    console.log('Get orders error:', error)
    return c.json({ error: 'Failed to fetch orders' }, 500)
  }
})

// Seed some sample products for demo
app.post('/make-server-a0e2e37a/seed-products', async (c) => {
  try {
    const sampleProducts = [
      {
        id: crypto.randomUUID(),
        sellerId: 'demo-seller',
        name: 'Vintage Denim Jacket',
        description: 'Classic blue denim jacket in excellent condition. Perfect for layering and adding a vintage touch to any outfit.',
        price: 45.99,
        category: 'clothes',
        brand: 'Levi\'s',
        condition: 'Excellent',
        size: 'M',
        images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400'],
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        sellerId: 'demo-seller',
        name: 'Designer Leather Handbag',
        description: 'Luxurious black leather handbag with gold hardware. Minor wear on corners but overall great condition.',
        price: 120.00,
        category: 'accessories',
        brand: 'Coach',
        condition: 'Good',
        size: 'One Size',
        images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400'],
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        sellerId: 'demo-seller',
        name: 'Nike Air Max Sneakers',
        description: 'White and black Nike Air Max in great condition. Minimal signs of wear, perfect for casual outfits.',
        price: 85.00,
        category: 'shoes',
        brand: 'Nike',
        condition: 'Very Good',
        size: '9',
        images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400'],
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        sellerId: 'demo-seller',
        name: 'Cashmere Scarf',
        description: 'Soft gray cashmere scarf, perfect for winter. Gently used with no visible flaws.',
        price: 35.00,
        category: 'accessories',
        brand: 'Burberry',
        condition: 'Like New',
        size: 'One Size',
        images: ['https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400'],
        isAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]

    for (const product of sampleProducts) {
      await kv.set(`product:${product.id}`, product)
    }

    return c.json({ 
      message: 'Sample products seeded successfully',
      count: sampleProducts.length
    })
  } catch (error) {
    console.log('Seed products error:', error)
    return c.json({ error: 'Failed to seed products' }, 500)
  }
})

Deno.serve(app.fetch)