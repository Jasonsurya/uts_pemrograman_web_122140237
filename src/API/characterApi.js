import React, { useEffect, useState } from 'react';
import { getCharacters } from '../API/characterApi';

// Komponen CardCharacter
const CardCharacter = ({ image, name, category }) => {
  return (
    <div
      className={`flex flex-col items-center rounded-xl overflow-hidden p-3 w-fit shadow-lg hover:scale-105 transform transition
        ${category === "Ultraman" ? "bg-blue-700" : "bg-red-700"}`}
    >
      <img
        src={image}
        alt={name}
        className="h-48 w-auto object-contain rounded-lg mb-4"
      />
      <div className="text-white text-center">
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-sm text-gray-300">{category}</p>
      </div>
    </div>
  );
};

const CharacterPage = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCharacters();
        console.log("Data dari API:", res);
        setCharacters(res);
        setLoading(false);
      } catch (error) {
        console.error("Gagal fetch karakter:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const ultramanCharacters = characters.filter((char) => char.type === "Ultraman");
  const kaijuCharacters = characters.filter((char) => char.type === "Kaiju");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading characters...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-5 py-10 space-y-16">
      <h1 className="text-4xl font-bold text-center mb-8">Character</h1>

      {/* Section: Ultraman */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Ultraman</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 justify-items-center">
          {ultramanCharacters.map((char) => (
            <CardCharacter
              key={char.id}
              image={char.image}
              name={char.name}
              category={char.type}
            />
          ))}
        </div>
      </section>

      {/* Section: Kaiju */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Kaiju</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 justify-items-center">
          {kaijuCharacters.map((char) => (
            <CardCharacter
              key={char.id}
              image={char.image}
              name={char.name}
              category={char.type}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CharacterPage;
