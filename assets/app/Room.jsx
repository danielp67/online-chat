import React, {useState} from 'react';
import AsideLeft from "./AsideLeft";
import {useParams} from "react-router-dom";
import RoomBottom from "./RoomBottom";
import MessageBlock from "./MessageBlock";

const Room = () => {
    const [state, setState] = useState({
        selectedRoom: {},
        user:'',
        roomName:'',
        createBy: 1,
        newMessage:'',
        rooms: []
    })
    const [loading, setLoading] = useState(false)
    const {roomId} = useParams()


    const fetchAllRooms = () => {
        const url = `/api/rooms`;
            fetch(url, {method: 'get'})
            .then(function (response) {
                return response.json();
            })
            .then(json => {
                setState(prevState =>{
                    return{
                        ...prevState,
                        rooms: json["hydra:member"]}})
            });
    }


        const fetchSelectedRoom = () => {
            const url = `/api/rooms/`+ roomId ;
        fetch(url, {method: 'get'})
            .then(function (response) {
                return response.json();
            })
            .then(json => {
                setState(prevState =>{
                    return{
                        ...prevState,
                        selectedRoom: json}})
                setLoading(true)
            });
        fetchAllRooms()
    }

    const handleChange = (e) => {
        setState(prevState =>{
            return{
                ...prevState,
                roomName : e.target.value}})
    }

    const setNewMessage = () => {

console.log("tests")

    }

    const setNewRoom = (props) => {

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
                fetchAllRooms()
            });
    }

    const updateRoom = () => {

        const url = `/api/rooms/`+ roomId ;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/ld+json',
                'Content-Type': 'application/ld+json'
            },
            body: JSON.stringify({name: state.roomName})
        })            .then(function (response) {
                return response.json();
            })
            .then(json => {
                setState(prevState =>{
                    return{
                        ...prevState,
                        selectedRoom : json}})
                fetchAllRooms()
            });
    }

    const deleteRoom = () => {

        const url = `/api/rooms/`+ roomId ;

        fetch(url, {method: 'get'})
            .then(function (response) {
                return response.json();
            })
            .then(json => {
                console.log(json)
                setState( {selectedRoom: json })
                setLoading(true)
                // this.displayItemFromCart();

            });
    }

    if(!loading){
    fetchSelectedRoom()
    }


    if(loading){

            return (
                <>
                    <AsideLeft state={state} setNewRoom={setNewRoom} />

                    <div className="col-9 offset-3">
                        <div className="bg-info col-9 offset-3 fixed-top pt-4">

                            {state.selectedRoom.id} - {state.selectedRoom.name}
                            <i className="btn fa fa-pencil" aria-hidden="true"/>
                            <i className="btn fa fa-trash" aria-hidden="true"/>


                            <div className="input-group mb-3">
                                <input type="text" name="room" value={state.roomName}
                                       onChange={handleChange}
                                       className="form-control" aria-describedby="button-addon2" />
                                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={updateRoom}>
                                    <i className="fa fa-send" aria-hidden="true"/>

                                </button>
                            </div>

                        </div>


                    <MessageBlock selectedRoom={state.selectedRoom}/>


                    <RoomBottom setNewMessage={setNewMessage}/>
                    </div>

                </>

            )}
else{
    return <>waitiinng</>
            }

}

export default Room;