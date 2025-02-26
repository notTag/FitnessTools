import { useNavigate } from 'react-router-dom';

function MainScreen() {
  const nav = useNavigate();

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Main Screen</h1>
      <div className="h-screen flex items-center justify-center">
        <button
          onClick={() => nav('/macro-calculator')}
          className="bg-snes-button hover:bg-snes-button-hover text-white font-bold py-2 px-4 rounded"
          >
          Calculate Macros
        </button>
      </div>
    </div>
  );
}

export default MainScreen;