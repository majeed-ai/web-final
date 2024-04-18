import React, { useEffect, useState, createContext, useContext } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Products from './components/Products';

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }

    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    }

    setInitialRender(false);
  }, []);

  useEffect(() => {
    if (!initialRender) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user, initialRender]);

  useEffect(() => {
    if (!initialRender) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, initialRender]);

  return (
    <div>
      <UserContext.Provider
        value={{
          user,
          cart,
          setUser,
          setCart,
          showLogin,
          setShowLogin,
          showCart,
          setShowCart,
        }}
      >
        <Nav />
        <Products />
        <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;
