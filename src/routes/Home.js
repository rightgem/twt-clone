import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection, getDocs, query, serverTimestamp } from "firebase/firestore";

const Home = () => { 
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    const getNweets = async() => {
        const q = query(collection(dbService, "nweets"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const nweetObj = {
                ...doc.data(), // ...=>doc의 모든 data를 가진다는 뜻, spread attribute
                id: doc.id,
            }
            setNweets(prev => [nweetObj, ...prev]); //set이 붙는 함수 사용 시 값 대신에 함수 전달할 수 있음
        });
    };

    useEffect(() => {
        getNweets();
    }, []);

    const onSubmit = async (event) =>{
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "nweets"), {
                nweet,
                // createdAt: Date.now(),
                createAt: serverTimestamp(),
            });
            setNweet("");
            console.log("Doc written ID : ", docRef.id);
        } catch (error) {
            console.log("Error Adding document" ,error)
        }
    }
    const onChange = (event) => {
        const {
            target : {value},
        } = event; //evnet 안의 target 안의 value를 저장한다
        setNweet(value);
    }
    // const onChange = ({ target: {value} }) => {
    //     setNweet(value);
    // }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type={"text"} value={nweet} onChange={onChange} placeholder="tweet" maxLength={240} />
                <input type={"submit"} value="Nweet"/>
            </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div>
                    )
                )}
            </div>
        </div> 
    )
};
export default Home;