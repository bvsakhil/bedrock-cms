import { Link } from '@payloadcms/ui';
import React from 'react';
import './CustomNav.css'; // Import the CSS

const CustomNav: React.FC = () => {
  return (
    <nav className="custom-nav">
      <Link href="/admin/collections/posts">Posts</Link>
      <Link href="/admin/collections/media">Media</Link>
      <Link href="/admin/collections/categories">Categories</Link>
      <Link href="/admin/list-emails">Emails</Link>
    </nav>
  );
};

export default CustomNav;
