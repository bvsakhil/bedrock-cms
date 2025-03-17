"use client"
import React, { useEffect } from 'react';

const HideAPIButton: React.FC = () => {
  useEffect(() => {
    // Create a style element
    const style = document.createElement('style');
    
    // Add CSS to hide the API button
    style.textContent = `
      .api-url {
        display: none !important;
      }
    `;
    
    // Append the style to the document head
    document.head.appendChild(style);
    
    // Clean up on unmount
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return null;
};

export default HideAPIButton; 