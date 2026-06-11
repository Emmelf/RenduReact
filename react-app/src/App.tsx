// @ts-ignore
import {Header} from "./components/Header.jsx";
// @ts-ignore
import {Footer} from "./components/Footer.jsx";
// @ts-ignore
import PokemonCard from "./components/PokemonCard.jsx";

function App() {

    const items = ["Lorem", "Ipsum", "Dolores"];

    const logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Vite_Logo_2026.svg/3840px-Vite_Logo_2026.svg.png"

  return (
        <div className="flex min-h-svh flex-col">
            <Header listItems={items} logo={logo} />
            <main className="flex flex-1 flex-col items-center justify-center bg-gray-50 p-6">
            <PokemonCard></PokemonCard>
            </main>
            <Footer />
        </div>
  )
}

export default App