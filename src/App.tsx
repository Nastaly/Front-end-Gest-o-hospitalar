import { useState } from 'react';
import { Login } from 'e:/Front-end-Gest-o-hospitalar/src/Components/Login';
import { Dashboard } from 'e:/Front-end-Gest-o-hospitalar/src/Components/Dashboard';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleLogin = (user: any) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return <Dashboard user={currentUser} onLogout={handleLogout} />;
}
