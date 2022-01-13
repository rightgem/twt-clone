import { useState } from "react";
import AppRouter from "components/Router";
import authService from "fbase"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser); //isLoggedIn 기본값 false
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer></footer>
    </>
  );
}


export default App;