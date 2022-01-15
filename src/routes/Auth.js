import { authService } from "fbase";
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";

const Auth = () => { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setnewAccount] = useState(true);
    const [error, setError] = useState("");
    
    const onChange = (event) => {
        const{ 
            target : {name, value}, 
        }= event;
        if(name === "email"){
            setEmail(value);
        } else if (name === "pw"){
            setPassword(value);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if(newAccount) {
                data = createUserWithEmailAndPassword(authService, email, password);
            } else {
                data = signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleAccount = () => setnewAccount((prev) => !prev);
    const onSocialClick = async (event) => {
        const {
            target: {name},
        } = event ;
        let provider;
        if(name === "google"){
            provider = new GoogleAuthProvider();
        } else if (name === "github"){
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
        console.log(data);
    } 
    return ( <div>
        <form onSubmit={onSubmit}>
            <input 
                type="text"
                name="email"
                placeholder="Email" 
                required 
                value={email}
                onChange={onChange} 
            />
            <input 
                type="password"
                name="pw" 
                placeholder="Password" 
                required 
                value={password} 
                onChange={onChange}
            />
            <input type="submit" value={newAccount ? "Create Account" : "Login"} />
            <div>{error}</div>
        </form>
        <span onClick={toggleAccount}>{newAccount ? "Login" : "Create Account"}

        </span>
        <div>
            <button onClick={onSocialClick} name="google">Continue with Google</button>
            <button onClick={onSocialClick} name="github">Continue with Github</button>
        </div>
    </div> )};

export default Auth;