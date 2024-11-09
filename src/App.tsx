import "./App.css";

import BeerRunLogo from "./assets/beer_run_logo.svg";

function App() {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <img src={BeerRunLogo} width="100rem" />
      <h1 className="text-6xl">BEER RUN</h1>
      <p>Yolo mini yeeter</p>
    </div>
  );
}

export default App;
