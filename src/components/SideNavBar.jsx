// src/components/SideNavBar.jsx
import React from 'react';
import './SideNavBar.css';

// KEY CHANGE: Accept onToggleSidebar prop
function SideNavBar({ selectedCategory, onSelectCategory, isExpanded, onToggleSidebar }) { 
  const categories = [
    'All Roles',
    'Software Development Roles',
    'Data & AI Roles',
    'DevOps & Infrastructure',
    'Quality Assurance & Testing',
    'Cybersecurity & Networking',
    'Database & Storage',
    'Project & Product Management',
    'UI/UX & Design',
    'IT Support & System Roles',
    'Sales, Marketing & Client-Facing Tech Roles',
    'Research & Innovation',
    'Miscellaneous / Specialized Roles'
  ];

  return (
    <div className={`sidenavbar ${isExpanded ? '' : 'collapsed'}`}>
      {/* NEW: Toggle button inside the sidebar */}
      <button className="sidebar-collapse-toggle-btn" onClick={onToggleSidebar}>
        {isExpanded ? '❮' : '❯'} {/* Arrow icon changes based on state */}
      </button>

      <h3 className="sidenavbar-title">Job Categories</h3> 
      
      <ul className="sidenavbar-menu">
        {categories.map((category) => (
          <li key={category}>
            <button
              className={`sidenavbar-item ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onSelectCategory(category)}
            >
              <span className="sidenavbar-item-icon">●</span>
              <span className="sidenavbar-item-text">{category}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideNavBar;