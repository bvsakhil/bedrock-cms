"use client"
import { Link } from '@payloadcms/ui';
import React from 'react';
import './CustomNav.css'; // Import the CSS
import { useTheme } from '@/providers/Theme';

const CustomNav: React.FC = () => {

  const { theme } = useTheme();
  return (
    <nav className="custom-nav">
      <Link 
      href="/admin/collections/posts"        
      style={{
          color: theme === 'dark' ? '#ffffff' : '#000000'
      }}>
      Posts
      </Link>
      <Link href="/admin/collections/media"       style={{
          color: theme === 'dark' ? '#ffffff' : '#000000'
      }}
      >Media</Link>
      <Link href="/admin/collections/categories"       style={{
          color: theme === 'dark' ? '#ffffff' : '#000000'
      }}>Categories</Link>
      <Link href="/admin/list-emails"       style={{
          color: theme === 'dark' ? '#ffffff' : '#000000'
      }}>Emails</Link>
    </nav>
  );
};

export default CustomNav;
