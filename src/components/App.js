import { useState } from "react";
import AppRouter from "components/Router";
import fbase from "fbase"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //isLoggedIn 기본값 false
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer></footer>
    </>
  );
}


export default App;
