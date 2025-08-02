import { useState, useEffect } from 'react';
import svgPaths from "./imports/svg-n380qz7l1o";
import imgImage7 from "figma:asset/56f9ebf853a80de4ef34b0a5f43df7a426802e02.png";
import imgImage21 from "figma:asset/cd9dc7240d918cad4ee780c75d4aaad9725dbcba.png";
import imgImage10 from "figma:asset/ec3de2e069e497a47df346c69af3b433d84b6c3f.png";
import imgImage20 from "figma:asset/9287e5e672d5ee6c91e3737e32005f93521ad5f3.png";
import imgRectangle17 from "figma:asset/62873482c9410a319554ac22d04517c4c58f9879.png";
import imgRectangle18 from "figma:asset/fe573697bcacab320c0be8440da0ab97086e6c61.png";
import imgRectangle19 from "figma:asset/f59ac60bd7dd8bb3bde3d03710f7e7feb87105ed.png";
import imgRectangle20 from "figma:asset/8350cec2703389ee4ccc52d2bd58306d7f25d470.png";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog";
import { Badge } from "./components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Search, ShoppingBag, User, Facebook, Instagram, Twitter, Youtube, Plus, Heart, Star } from "lucide-react";
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './utils/supabase/info';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';

// Initialize Supabase client
const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// API helper functions
const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-a0e2e37a`;

async function apiCall(endpoint: string, options: any = {}) {
  const token = localStorage.getItem('access_token') || publicAnonKey;
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`API Error (${response.status}):`, errorText);
    throw new Error(errorText);
  }
  
  return response.json();
}

// SVG Components from imported design
function TeenyiconsBagOutline() {
  return (
    <div className="size-[18px]">
      <svg className="block size-full" fill="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_1_320)">
          <g filter="url(#filter0_d_1_320)">
            <path d={svgPaths.p17044200} fill="currentColor" />
          </g>
        </g>
        <defs>
          <filter
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            height="26"
            id="filter0_d_1_320"
            width="23.3195"
            x="-2.65986"
            y="0"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              in2="BackgroundImageFix"
              mode="normal"
              result="effect1_dropShadow_1_320"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_1_320"
              mode="normal"
              result="shape"
            />
          </filter>
          <clipPath id="clip0_1_320">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function UiwUser() {
  return (
    <div className="size-[18px]">
      <svg className="block size-full" fill="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_1_331)">
          <path d={svgPaths.p21cace00} fill="currentColor" />
        </g>
        <defs>
          <clipPath id="clip0_1_331">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthView, setShowAuthView] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkAuth();
    loadProducts();
  }, []);

  async function checkAuth() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session?.access_token) {
        localStorage.setItem('access_token', session.access_token);
        setUser(session.user);
        await loadCart();
      }
    } catch (error) {
      console.error('Auth check error:', error);
    }
  }

  async function handleSignIn(email: string, password: string) {
    setLoading(true);
    try {
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      localStorage.setItem('access_token', session.access_token);
      setUser(session.user);
      setShowAuthView(false);
      await loadCart();
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp(email: string, password: string, fullName: string) {
    setLoading(true);
    try {
      // Call our custom signup endpoint
      await apiCall('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, fullName })
      });

      // Then sign in
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      localStorage.setItem('access_token', session.access_token);
      setUser(session.user);
      setShowAuthView(false);
      await loadCart();
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('access_token');
      setUser(null);
      setCartCount(0);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }

  async function loadProducts(category = '', search = '') {
    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (search) params.append('search', search);
      
      const data = await apiCall(`/products?${params.toString()}`);
      setProducts(data || []);
    } catch (error) {
      console.error('Load products error:', error);
    }
  }

  async function loadCart() {
    if (!user) return;
    try {
      const data = await apiCall('/cart');
      setCartCount(data.cart?.items?.length || 0);
    } catch (error) {
      console.error('Load cart error:', error);
    }
  }

  async function addToCart(productId: string) {
    if (!user) {
      setShowAuthView(true);
      setAuthMode('signin');
      return;
    }

    try {
      await apiCall('/cart/add', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity: 1 })
      });
      
      await loadCart();
      alert('Item added to cart!');
    } catch (error) {
      console.error('Add to cart error:', error);
      alert('Failed to add item to cart: ' + error.message);
    }
  }

  async function handleSearch() {
    setSelectedCategory('');
    await loadProducts('', searchQuery);
    setCurrentView('products');
  }

  function handleCategoryClick(category: string) {
    setSelectedCategory(category);
    setSearchQuery('');
    loadProducts(category);
    setCurrentView('products');
  }

  // Product Grid Component
  function ProductGrid() {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-black">
              {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` : 'All Products'}
            </h2>
            {searchQuery && (
              <p className="text-gray-600">Search results for: "{searchQuery}"</p>
            )}
          </div>
          
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-200 relative">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                    <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                      {product.condition}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-2xl font-bold text-green-600">${product.price}</span>
                      {product.size && product.size !== 'N/A' && (
                        <Badge variant="outline">Size: {product.size}</Badge>
                      )}
                    </div>
                    <Button 
                      onClick={() => addToCart(product.id)} 
                      className="w-full"
                      disabled={product.sellerId === user?.id || !product.isAvailable}
                    >
                      {!product.isAvailable ? 'Sold' : (product.sellerId === user?.id ? 'Your Item' : 'Add to Cart')}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // Sell Item Modal
  function SellItemModal() {
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      price: '',
      category: '',
      condition: 'good',
      size: '',
      brand: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await apiCall('/products', {
          method: 'POST',
          body: JSON.stringify({
            ...formData,
            price: parseFloat(formData.price)
          })
        });
        
        alert('Product listed successfully!');
        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          condition: 'good',
          size: '',
          brand: ''
        });
        loadProducts();
      } catch (error) {
        console.error('Error listing product:', error);
        alert('Failed to list product: ' + error.message);
      }
    };

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Sell Item
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>List Your Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clothes">Clothes</SelectItem>
                    <SelectItem value="shoes">Shoes</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="condition">Condition</Label>
                <Select value={formData.condition} onValueChange={(value) => setFormData({ ...formData, condition: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Excellent">Excellent</SelectItem>
                    <SelectItem value="Very Good">Very Good</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="size">Size (Optional)</Label>
              <Input
                id="size"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full">
              List Item
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  // Show auth forms if user is not authenticated and trying to access auth
  if (showAuthView) {
    if (authMode === 'signin') {
      return (
        <SignInForm
          onSignIn={handleSignIn}
          onSwitchToSignUp={() => setAuthMode('signup')}
          loading={loading}
        />
      );
    } else {
      return (
        <SignUpForm
          onSignUp={handleSignUp}
          onSwitchToSignIn={() => setAuthMode('signin')}
          loading={loading}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button onClick={() => { setCurrentView('home'); setSelectedCategory(''); setSearchQuery(''); }}>
                <h1 className="text-2xl font-bold text-gray-900">WearUp</h1>
              </button>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => { setCurrentView('home'); setSelectedCategory(''); setSearchQuery(''); }}
                className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md"
              >
                Home
              </button>
              <button 
                onClick={() => { loadProducts(); setCurrentView('products'); }}
                className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md"
              >
                Explore
              </button>
              <button 
                onClick={() => handleCategoryClick('clothes')}
                className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md"
              >
                Categories
              </button>
              <button 
                onClick={() => { loadProducts(); setCurrentView('products'); }}
                className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md"
              >
                Products
              </button>
            </nav>

            {/* Search and Icons */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="search"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10 w-40 bg-gray-100 border-none"
                />
              </div>
              
              {user && <SellItemModal />}
              
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <TeenyiconsBagOutline />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                    {cartCount}
                  </Badge>
                )}
              </button>
              
              {user ? (
                <div className="relative group">
                  <button className="p-2 text-gray-600 hover:text-gray-900">
                    <UiwUser />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border hidden group-hover:block">
                    <div className="p-2">
                      <p className="text-sm font-medium text-gray-900">{user.email}</p>
                      <button 
                        onClick={handleSignOut}
                        className="mt-2 w-full text-left text-sm text-red-600 hover:text-red-800"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => { setShowAuthView(true); setAuthMode('signin'); }}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <UiwUser />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {currentView === 'home' ? (
        <>
          {/* Hero Section */}
          <section className="relative bg-gray-200 h-[547px] overflow-hidden">
            {/* Background Images */}
            <div className="absolute inset-0 flex">
              <div 
                className="w-[151px] h-[536px] mt-[11px] ml-[176px] bg-cover bg-center"
                style={{ backgroundImage: `url('${imgImage21}')` }}
              />
              <div 
                className="w-[194px] h-[537px] mt-[10px] ml-[20px] bg-cover bg-center"
                style={{ backgroundImage: `url('${imgImage10}')` }}
              />
              <div 
                className="w-[208px] h-[535px] mt-[24px] ml-[354px] bg-cover bg-center"
                style={{ backgroundImage: `url('${imgImage20}')` }}
              />
              <div 
                className="w-[230px] h-[546px] ml-[26px] bg-cover bg-center border border-black"
                style={{ backgroundImage: `url('${imgImage7}')` }}
              />
            </div>

            {/* Hero Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
              <h2 className="text-5xl font-bold text-black mb-4">WearUp</h2>
              <p className="text-2xl text-black mb-8 max-w-md">
                Find great secondhand fashion at unbeatable prices
              </p>
              <Button 
                size="lg" 
                className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-lg"
                onClick={() => { loadProducts(); setCurrentView('products'); }}
              >
                Shop Now
              </Button>
            </div>
          </section>

          {/* Shop By Category */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-5xl font-bold text-center text-black mb-12">Shop By Category</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Clothes */}
                <div className="group cursor-pointer" onClick={() => handleCategoryClick('clothes')}>
                  <div 
                    className="h-[274px] w-full bg-cover bg-center rounded-lg overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url('${imgRectangle17}')` }}
                  />
                  <h3 className="text-2xl font-semibold text-center text-black">Clothes</h3>
                </div>

                {/* Shoes */}
                <div className="group cursor-pointer" onClick={() => handleCategoryClick('shoes')}>
                  <div 
                    className="h-[274px] w-full bg-cover bg-center rounded-lg overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url('${imgRectangle19}')` }}
                  />
                  <h3 className="text-2xl font-semibold text-center text-black">Shoes</h3>
                </div>

                {/* Accessories */}
                <div className="group cursor-pointer" onClick={() => handleCategoryClick('accessories')}>
                  <div 
                    className="h-[274px] w-full bg-cover bg-center rounded-lg overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url('${imgRectangle18}')` }}
                  />
                  <h3 className="text-2xl font-semibold text-center text-black">Accessories</h3>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-5xl font-bold text-black mb-8">About Us</h2>
                  <h3 className="text-xl font-semibold text-black mb-6">
                    WearUp is your premier destination for sustainable secondhand fashion.
                  </h3>
                  <p className="text-lg text-black leading-relaxed mb-6">
                    At WearUp, our mission is to create a simple and trusted marketplace where anyone can buy or sell high-quality secondhand fashion. Whether it's vintage clothing, designer shoes, or unique accessories, users can easily list their items and connect with buyers who appreciate sustainable style.
                  </p>
                  <p className="text-lg text-black leading-relaxed">
                    Every purchase on WearUp is a step toward reducing fashion waste and making style more affordable and accessible. By supporting secondhand shopping, we're building a community that values both fashion and environmental responsibility.
                  </p>
                </div>
                <div>
                  <div 
                    className="h-[376px] w-full bg-cover bg-center rounded-lg"
                    style={{ backgroundImage: `url('${imgRectangle20}')` }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Promotional Text */}
          <section className="py-8 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-xl font-bold italic text-black leading-relaxed">
                ✨ Refresh. Reuse. Reinvent Fashion. ✨<br />
                Join the sustainable style revolution today.
              </p>
            </div>
          </section>

          {/* Sign Up Section */}
          <section className="py-16 bg-[#f7f6f0]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Side - Benefits */}
                <div>
                  <h2 className="text-4xl font-semibold text-black mb-6">
                    Sign Up. Shop Smart. Save More.
                  </h2>
                  <h3 className="text-2xl font-bold text-black mb-8">
                    Join WearUp & unlock:
                  </h3>
                  <div className="space-y-4 text-xl font-semibold text-black">
                    <p>🎁 A FREE welcome gift just for signing up</p>
                    <p>💎 2x Points on every purchase</p>
                    <p>🎟 Monthly members-only discount vouchers</p>
                    <p>🔥 Exclusive deals up to 50% off</p>
                  </div>
                </div>

                {/* Right Side - Sign Up Button */}
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  {!user ? (
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-black mb-6">Ready to get started?</h3>
                      <Button 
                        onClick={() => { setShowAuthView(true); setAuthMode('signup'); }}
                        className="w-full bg-black text-white hover:bg-gray-800 py-3 rounded-lg mb-4"
                      >
                        CREATE ACCOUNT
                      </Button>
                      <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <button
                          onClick={() => { setShowAuthView(true); setAuthMode('signin'); }}
                          className="text-black font-medium hover:underline"
                        >
                          Sign in here
                        </button>
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <h3 className="text-2xl font-bold text-black mb-4">Welcome back!</h3>
                      <p className="text-gray-600 mb-6">You're already part of the WearUp community.</p>
                      <Button 
                        onClick={() => { loadProducts(); setCurrentView('products'); }}
                        className="bg-black text-white hover:bg-gray-800"
                      >
                        Start Shopping
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <ProductGrid />
      )}

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold text-black mb-4">WearUp</h3>
              <p className="text-gray-600">
                Sustainable fashion marketplace for the conscious consumer.
              </p>
            </div>

            {/* About Us */}
            <div>
              <h4 className="font-semibold text-black mb-4">About Us</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black">News</a></li>
                <li><a href="#" className="hover:text-black">Official Store</a></li>
                <li><a href="#" className="hover:text-black">Company</a></li>
                <li><a href="#" className="hover:text-black">Careers</a></li>
              </ul>
            </div>

            {/* Get Help */}
            <div>
              <h4 className="font-semibold text-black mb-4">Get Help</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black">FAQ</a></li>
                <li><a href="#" className="hover:text-black">Shipping</a></li>
                <li><a href="#" className="hover:text-black">Payment</a></li>
                <li><a href="#" className="hover:text-black">Returns</a></li>
                <li><a href="#" className="hover:text-black">Contact Us</a></li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h4 className="font-semibold text-black mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                  <Facebook className="w-5 h-5 text-blue-600" />
                </a>
                <a href="#" className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                  <Instagram className="w-5 h-5 text-pink-600" />
                </a>
                <a href="#" className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                  <Twitter className="w-5 h-5 text-blue-400" />
                </a>
                <a href="#" className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                  <Youtube className="w-5 h-5 text-red-600" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <p className="text-gray-600">© 2025 WearUp. All Rights Reserved</p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-black">Guide</a>
              <a href="#" className="text-gray-600 hover:text-black">Terms & Conditions</a>
              <a href="#" className="text-gray-600 hover:text-black">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Copyright Bar */}
      <div className="bg-black py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-white">© 2025 WearUp. All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}