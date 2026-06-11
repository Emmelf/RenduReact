import React, { useEffect, useState } from "react";

export default function PokemonCard() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function randomId() {
    return Math.floor(Math.random() * 1010) + 1;
  }

  async function fetchPokemon(id) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setPokemon(data);
    } catch (err) {
      setError(err.message || "Erreur réseau");
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPokemon(randomId());
  }, []);

  function getImage(p) {
    if (!p) return null;
    return (
      p.sprites?.other?.["official-artwork"]?.front_default || p.sprites?.front_default
    );
  }

  const image = getImage(pokemon);
  const hp = pokemon?.stats?.find((s) => s.stat?.name === "hp")?.base_stat ?? "--";
  const types = pokemon?.types?.map((t) => t.type.name).join(", ");
  const abilities = pokemon?.abilities?.map((a) => a.ability.name).join(", ");

  return (
    <div className="w-80 p-4 border rounded bg-white shadow-md">
      {loading ? (
        <div>Chargement...</div>
      ) : error ? (
        <div className="text-red-600">Erreur: {error}</div>
      ) : pokemon ? (
        <>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold capitalize">{pokemon.name}</h2>
            <span>HP {hp}</span>
          </div>

          <div className="my-2">
            {image ? (
              <img src={image} alt={pokemon.name} className="w-full" />
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center">No image</div>
            )}
          </div>

          <div className="mb-4">
            <p>Type : {types}</p>
            <p>Weight : {pokemon.weight} | Height : {pokemon.height}</p>
          </div>

          <div className="mb-4">
            <div className="flex justify-between">
              <h3 className="font-bold">Abilities</h3>
            </div>

            <p className="text-sm">{abilities}</p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => fetchPokemon(randomId())}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
            >
              Générer un autre
            </button>
          </div>
        </>
      ) : (
        <div>Aucun pokémon</div>
      )}
    </div>
  );
}