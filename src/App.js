
import './App.css';

import Weather from "./components/Weather";

function App() {
  return (
    <div
      className="flex min-h-screen flex-col text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(14, 116, 144, 0.65), rgba(30, 64, 175, 0.75)), url('https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <header className="px-4 py-8 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Weather Report</h1>
        <p className="mt-2 text-white/80">Search any city for live conditions</p>
      </header>

      <main className="flex flex-1 justify-center px-4 pb-8">
        <Weather />
      </main>

      <footer className="px-4 py-4 text-center text-sm text-white/70">
        Data from OpenWeatherMap
      </footer>
    </div>
  );
}

export default App;
