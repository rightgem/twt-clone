import { authService } from "fbase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

const Auth = () => { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setnewAccount] = useState(true);
    
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
            console.log(error);
        }
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
        </form>
        <div>
            <button>Continue with Google</button>
            <button>Continue with Github</button>
        </div>
    </div> )};

export default Auth;