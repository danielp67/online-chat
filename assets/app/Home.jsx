import React, {useState} from 'react';
import AsideLeft from "./AsideLeft";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const [state, setState] = useState({
        rooms: []
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();


    const fetchHome = () => {

        const url = `/api/home`;

        fetch(url, {method: 'get'})
            .then(function (response) {
                return response.json();
            })
            .then(json => {
                console.log(json)
                setState({ rooms: json.rooms})
                setLoading(true)
                // this.displayItemFromCart();


                const User = {
                   "user": json.user
                }

                const UserContext = React.createContext({
                    user: User,
                });
                console.log(UserContext)
            });
    }

   const createRoom = (props) => {

        console.log(props, JSON.stringify({name: props, createBy: "api/users/" + state.createBy}))
        const url = `/api/rooms` ;

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/ld+json',
                'Content-Type': 'application/ld+json'
            },
            body: JSON.stringify({name: props, createBy: "api/users/" + state.createBy})
        })            .then(function (response) {
            return response.json();
        })
            .then(json => {
                console.log(json)
                setState(prevState =>{
                    return{
                        ...prevState,
                        selectedRoom : json}})
                //fetchAllRooms()
                navigate("/app/rooms/" + json.id)
            });
    }

    if(!loading){
        fetchHome()
    }


        if(loading){

            return (
                <>
                    <AsideLeft state={state} createRoom={createRoom} />


                </>

            )}
else{
    return <>waiting</>
            }


}

export default Home;