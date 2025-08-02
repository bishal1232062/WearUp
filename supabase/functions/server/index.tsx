@@ .. @@
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
-      status: 'pending',
+      status: 'processing',
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