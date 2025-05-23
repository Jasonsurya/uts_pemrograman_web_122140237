import React, { useEffect, useState } from 'react';
import { getSeries } from '../API/seriesApi';


const SeriesPage = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSeries();
      setSeries(data);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-5 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">Ultraman Series</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {series.map((item) => (
          <div key={item.id} className="bg-blue-800 rounded-xl p-4 shadow-lg">
            <img src={item.image} alt={item.title} className="h-48 w-full object-cover rounded-md mb-4" />
            <h2 className="text-2xl font-bold">{item.title}</h2>
            <p className="text-sm text-gray-300">Year: {item.year}</p>
            <p className="mt-2 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeriesPage;
