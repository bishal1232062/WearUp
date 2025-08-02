import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Package, Clock, MapPin, CreditCard, User, ShoppingBag } from "lucide-react";

interface UserDashboardProps {
  user: any;
  onBack: () => void;
}

interface Order {
  id: string;
  items: Array<{
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    subtotal: number;
  }>;
  totalAmount: number;
  shippingAddress: any;
  paymentMethod: string;
  status: string;
  createdAt: string;
  estimatedDelivery?: string;
}

export default function UserDashboard({ user, onBack }: UserDashboardProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // Load orders
      const ordersResponse = await fetch(`https://fxllklhqwsdalbxhbknw.supabase.co/functions/v1/make-server-a0e2e37a/orders`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json();
        // Calculate estimated delivery dates (2-5 days from order date)
        const ordersWithDelivery = ordersData.map((order: Order) => ({
          ...order,
          estimatedDelivery: calculateDeliveryDate(order.createdAt)
        }));
        setOrders(ordersWithDelivery);
      }

      // Load profile
      const profileResponse = await fetch(`https://fxllklhqwsdalbxhbknw.supabase.co/functions/v1/make-server-a0e2e37a/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        setProfile(profileData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDeliveryDate = (orderDate: string) => {
    const order = new Date(orderDate);
    const deliveryDays = Math.floor(Math.random() * 4) + 2; // 2-5 days
    const delivery = new Date(order);
    delivery.setDate(delivery.getDate() + deliveryDays);
    return delivery.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'shipped': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDeliveryStatus = (orderDate: string, estimatedDelivery: string) => {
    const now = new Date();
    const estimated = new Date(estimatedDelivery);
    const order = new Date(orderDate);
    
    if (now > estimated) {
      return { status: 'Delivered', color: 'text-green-600', icon: Package };
    } else if (now.getTime() - order.getTime() > 24 * 60 * 60 * 1000) {
      return { status: 'In Transit', color: 'text-blue-600', icon: Package };
    } else {
      return { status: 'Processing', color: 'text-yellow-600', icon: Clock };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack}>
                ← Back to Shop
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">{user.email}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{orders.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${orders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {orders.filter(order => !['delivered', 'cancelled'].includes(order.status.toLowerCase())).length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
              
              {orders.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-600">Start shopping to see your orders here!</p>
                    <Button onClick={onBack} className="mt-4">
                      Start Shopping
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                orders.map((order) => {
                  const deliveryInfo = getDeliveryStatus(order.createdAt, order.estimatedDelivery || '');
                  const StatusIcon = deliveryInfo.icon;
                  
                  return (
                    <Card key={order.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">Order #{order.id.slice(-8)}</CardTitle>
                            <p className="text-sm text-gray-600">
                              Placed on {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Delivery Status */}
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                          <StatusIcon className={`w-5 h-5 ${deliveryInfo.color}`} />
                          <div className="flex-1">
                            <p className={`font-medium ${deliveryInfo.color}`}>
                              {deliveryInfo.status}
                            </p>
                            <p className="text-sm text-gray-600">
                              {deliveryInfo.status === 'Delivered' 
                                ? `Delivered on ${order.estimatedDelivery}`
                                : `Expected delivery: ${order.estimatedDelivery}`
                              }
                            </p>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900">Items:</h4>
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                              <div>
                                <p className="font-medium">{item.productName}</p>
                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                              </div>
                              <p className="font-medium">${item.subtotal.toFixed(2)}</p>
                            </div>
                          ))}
                        </div>

                        {/* Order Total */}
                        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                          <span className="font-semibold text-lg">Total:</span>
                          <span className="font-semibold text-lg">${order.totalAmount.toFixed(2)}</span>
                        </div>

                        {/* Shipping Address */}
                        <div className="flex items-start space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mt-0.5" />
                          <div>
                            <p className="font-medium">Shipping to:</p>
                            <p>{order.shippingAddress?.street}</p>
                            <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <p className="text-lg">{profile.fullName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-lg">{profile.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                      <p className="text-lg">{new Date(profile.joinedAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Orders</label>
                      <p className="text-lg">{profile.totalOrders || 0}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">Loading profile information...</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}