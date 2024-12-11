import './styles.css';

import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

export const AppLayout: React.FC = () => {
  const [navCollapsed, setNavCollapsed] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const getLayoutGutter = () => {
    return isMobile ? '0' : navCollapsed ? '80px' : '250px'; // Adjusted for consistent CSS units
  };

  return (
    <div className="app-layout">
      <header className="header">
        <div className="logo">My App</div>
        <nav className="header-nav">
          {/* Add navigation links or buttons here */}
          <button onClick={() => setNavCollapsed((prev) => !prev)}>
            {navCollapsed ? 'Expand' : 'Collapse'}
          </button>
        </nav>
      </header>

      <div className="main-layout">
        {!isMobile && (
          <aside
            className="sidebar"
            style={{ width: navCollapsed ? '80px' : '250px' }}
          >
            <nav>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/about">About</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </nav>
          </aside>
        )}
        <main className="content">
          <Outlet />
        </main>
      </div>

      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()}Sarathi App. All rights reserved.
        </p>
      </footer>
    </div>
  );
};
