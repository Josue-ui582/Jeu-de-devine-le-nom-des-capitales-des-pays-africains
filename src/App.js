import React from "react";
import SelectContry from "./components/SelectContry";

function App() {
  return (
    <main className="App">
      <div className="container">
        <img src="avatar.jpg" alt="avatar" />
        <h2>Bienvenue mon ami(e) 😎, alors tu es prêt(e) pour t'amuser ? Rejoins-moi 👇</h2>
        <SelectContry />
      </div>
    </main>
  );
}

export default App;
