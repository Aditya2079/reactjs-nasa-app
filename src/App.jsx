import React, { useState, useEffect } from 'react';
import Footer from './components/Footer';
import Main from './components/Main';
import Sidebar from './components/Sidebar';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleToggleModal() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;

      try {
        const res = await fetch(url);
        const apiData = await res.json();
        setData(apiData);
        console.log('Fetched from API today:', apiData);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchAPIData();
  }, []);

  return (
    <>
      {data ? (
        <Main data={data} />
      ) : (
        <div className="loadingState">
          <i className="fa-solid fa-spinner"></i>
        </div>
      )}
      {showModal && (
        <Sidebar data={data} handleToggleModal={handleToggleModal} />
      )}
      <Footer data={data} handleToggleModal={handleToggleModal} />
    </>
  );
}
