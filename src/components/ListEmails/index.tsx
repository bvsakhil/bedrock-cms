"use client";
import React, { useEffect, useState } from 'react';
import './SubscriberList.css'; // Normal CSS

type Subscriber = {
  id: string;
  maile: string;
};

const ITEMS_PER_PAGE = 10; // Show 10 subscribers per page

const SubscriberList: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await fetch('/api/subscribers?limit=1000'); // fetch a lot (or adjust as needed)
        const data = await res.json();
        setSubscribers(data.docs);
      } catch (error) {
        console.error('Failed to fetch subscribers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  const exportCSV = () => {
    if (subscribers.length === 0) return;
  
    const csvHeader = 'Email\n';
    const csvRows = subscribers.map(subscriber => `${subscriber.maile}`).join('\n');
    const csvContent = csvHeader + csvRows;
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
  
    // Generate a very human-readable timestamp
    const now = new Date();
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = months[now.getMonth()];
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();
  
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strHours = String(hours).padStart(2, '0');
  
    const timestamp = `${month}-${day}-${year}_${strHours}-${minutes}-${seconds}_${ampm}`;
  
    link.download = `subscribers_${timestamp}.csv`;
  
    link.click();
    URL.revokeObjectURL(url);
  };
  
  

  const totalPages = Math.ceil(subscribers.length / ITEMS_PER_PAGE);

  const displayedSubscribers = subscribers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goBack = () => {
    window.history.back();
  };

  if (loading) {
    return <p className="loading-text">Loading subscribers...</p>;
  }

  return (
    <div className="subscriber-list">
      <button onClick={goBack} className="back-button">← Back</button>

      <h2 className="title">Subscribers List</h2>

      <div className="button-container">
        <button onClick={exportCSV} className="export-button">Export CSV</button>
      </div>

      {subscribers.length === 0 ? (
        <p className="no-subscribers">No subscribers found.</p>
      ) : (
        <div className="table-container">
          <table className="subscriber-table">
            <thead>
              <tr>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {displayedSubscribers.map((subscriber) => (
                <tr key={subscriber.id}>
                  <td>{subscriber.maile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>Page {currentPage} of {totalPages}</span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}


    </div>
  );
};

export default SubscriberList;
