import { useEffect, useState } from "react";
import AppRouter from "components/Router";
// import authService from "fbase"
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const auth = getAuth();
  const [init, setInit] = useState(auth); //isLoggedIn 기본값 false
  const [isLoggedIn, setIsLoggedIn] = useState(auth); //isLoggedIn 기본값 false

  useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        // console.log(user);
        if(user) {
          setIsLoggedIn(true);
          const uid = user.uid;
        } else {
          setIsLoggedIn(false);
        }
        setInit(true);
      })
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..." }
      <footer></footer>
    </>
  );
}


export default App;