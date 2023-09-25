import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';

function Header() {
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser()
      .then((user) => {
        setUserName(user.name);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <header data-testid="header-component">
      {loading ? (
        'Carregando...'
      ) : (
        <>
          <NavLink to="/search" data-testid="link-to-search">
            Pesquisar
          </NavLink>
          <NavLink to="/favorites" data-testid="link-to-favorites">
            Favoritos
          </NavLink>
          <NavLink to="/profile" data-testid="link-to-profile">
            Perfil
          </NavLink>
          <span data-testid="header-user-name">{userName}</span>
        </>
      )}
    </header>
  );
}

export default Header;
