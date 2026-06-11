export default function PokemonCard() {
  return (
    <div className="w-80 p-4 border rounded">
      <div className="flex justify-between">
        <h2 className="font-bold">Charizard</h2>
        <span>HP 120</span>
      </div>

      <div className="my-2">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
          alt="Charizard"
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <p>Type : Fire</p>
        <p>Stage 2</p>
      </div>

      <div className="mb-4">
        <div className="flex justify-between">
          <h3 className="font-bold">Fire Spin</h3>
          <span>100</span>
        </div>

        <p className="text-sm">
          Discard 2 Energy cards attached to Charizard in order to use this
          attack.
        </p>
      </div>
    </div>
  );
}