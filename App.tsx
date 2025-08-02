@@ .. @@
 import SignInForm from './components/SignInForm';
 import SignUpForm from './components/SignUpForm';
+import UserDashboard from './components/UserDashboard';
+import SellerDashboard from './components/SellerDashboard';
 
 // Initialize Supabase client
@@ .. @@
   const [searchQuery, setSearchQuery] = useState('');
   const [showAuthView, setShowAuthView] = useState(false);
   const [authMode, setAuthMode] = useState('signin');
+  const [showUserDashboard, setShowUserDashboard] = useState(false);
+  const [showSellerDashboard, setShowSellerDashboard] = useState(false);
   const [loading, setLoading] = useState(false);
 
@@ .. @@
     }
   }
 
+  // Show dashboards
+  if (showUserDashboard) {
+    return <UserDashboard user={user} onBack={() => setShowUserDashboard(false)} />;
+  }
+
+  if (showSellerDashboard) {
+    return <SellerDashboard user={user} onBack={() => setShowSellerDashboard(false)} />;
+  }
+
   return (
     <div className="min-h-screen bg-white">
       {/* Header */}
@@ .. @@
               {user ? (
                 <div className="relative group">
                   <button className="p-2 text-gray-600 hover:text-gray-900">
                     <UiwUser />
                   </button>
-                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border hidden group-hover:block">
+                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border hidden group-hover:block z-50">
                     <div className="p-2">
                       <p className="text-sm font-medium text-gray-900">{user.email}</p>
+                      <button 
+                        onClick={() => setShowUserDashboard(true)}
+                        className="mt-2 w-full text-left text-sm text-blue-600 hover:text-blue-800 py-1"
+                      >
+                        My Dashboard
+                      </button>
+                      <button 
+                        onClick={() => setShowSellerDashboard(true)}
+                        className="w-full text-left text-sm text-green-600 hover:text-green-800 py-1"
+                      >
+                        Seller Dashboard
+                      </button>
                       <button 
                         onClick={handleSignOut}
-                        className="mt-2 w-full text-left text-sm text-red-600 hover:text-red-800"
+                        className="mt-2 w-full text-left text-sm text-red-600 hover:text-red-800 py-1 border-t border-gray-200 pt-2"
                       >
                         Sign Out
                       </button>