import React, {useContext, useState} from 'react';
import AsideLeft from "./AsideLeft";
import {useNavigate, useParams} from "react-router-dom";
import RoomBottom from "./RoomBottom";
import MessageBlock from "./MessageBlock";
import Modal from "./Modal";

const Room = () => {
    const [state, setState] = useState({
        selectedRoom: {},
        user: null,
        roomName:'',
        rooms: []
    })
    const [loading, setLoading] = useState(false)
    const {roomId} = useParams()
    const navigate = useNavigate();

    const fetchHome = () => {

        const url = `/api/home`;

        fetch(url, {method: 'get'})
            .then(function (response) {
                return response.json();
            })
            .then(json => {
                setState(prevState =>{
                    return{
                        ...prevState,
                        rooms: json.rooms, user: json.user}})
            });
    }

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


    const createRoom = (props) => {

        console.log(props, state, JSON.stringify({name: props, createBy: "api/users/" + state.user.id}))
        const url = `/api/rooms` ;

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/ld+json',
                'Content-Type': 'application/ld+json'
            },
            body: JSON.stringify({name: props, createBy: "api/users/" + state.user.id})
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
                navigate("/app/rooms/" + json.id)
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

        fetch(url, {method: 'DELETE'})
            .then(function (response) {
                console.log(response)
                fetchAllRooms()

                return true
            })
        navigate("/app/rooms/1");
    }


    const createMessage = (props) => {

        console.log(props, state)
        const url = `/api/messages` ;

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/ld+json',
                'Content-Type': 'application/ld+json'
            },
            body: JSON.stringify(
                {
                    content: props,
                    user: "api/users/" + state.user.id,
                    room: "api/rooms/"+ state.selectedRoom.id
                })
        })            .then(function (response) {
            return response.json();
        })
            .then(json => {
                console.log(json)
                fetchSelectedRoom()
            });
    }


    const deleteMessage = (props) => {

        const url = `/api/messages/` ;

        /*fetch(url, {method: 'DELETE'})
            .then(function (response) {
                console.log(response)
                fetchAllRooms()
                return true
            })*/
    }


    if(state.user === null)
    {
        fetchHome()
    }

    if(!loading){

    fetchSelectedRoom()
    }


    if(loading){

            return (
                <>
                    <AsideLeft state={state} createRoom={createRoom} />

                    <div className="col-9 offset-3">
                        <div className="bg-info col-9 offset-3 fixed-top pt-4">

                            {state.selectedRoom.id} - {state.selectedRoom.name}
                            <i className="btn fa fa-pencil" aria-hidden="true" onClick={''}/>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                            <i className="btn fa fa-trash" aria-hidden="true"/>
                            </button>


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


                    <RoomBottom createMessage={createMessage}/>
                    </div>
                    <Modal value={'room'} deleteFunc={deleteRoom} />
                    <Modal value={'message'} deleteFunc={deleteMessage} />

                </>

            )}
else{
    return <>waitiinng</>
            }

}

export default Room;