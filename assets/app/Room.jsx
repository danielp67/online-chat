import React, {useContext, useState} from 'react';
import AsideLeft from "./AsideLeft";
import {useNavigate, useParams} from "react-router-dom";
import RoomBottom from "./RoomBottom";
import MessageBlock from "./MessageBlock";
import Modal from "./Modal";


    const eventSource = new EventSource("{{ mercure([
    'https://127.0.0.1:8000/api/rooms/{id}',
        'https://127.0.0.1:8000/api/messages/{id}',
        'https://example.com/app/rooms/1',
])|escape('js') }}");

eventSource.onmessage = event => {
    console.log(JSON.parse(event.data));
}}


const Room = () => {
    const [state, setState] = useState({
        selectedRoom: {},
        user: null,
        roomName: '',
        rooms: [],
        displayForm:false
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
                        selectedRoom: json, roomName:json.name}})
                setLoading(true)
            });
        fetchAllRooms()
    }


    const refreshSelectedRoom = () => {
        setLoading(false)

        fetchSelectedRoom()


    }

    const handleChange = (e) => {
        setState(prevState =>{
            return{
                ...prevState,
                roomName : e.target.value}})
    }


    const createRoom = (props) => {

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
                        selectedRoom : json, displayForm: false}})
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

    const displayForm = (props) => {

            setState(prevState =>{
                return{
                    ...prevState,
                    displayForm : props}})
    }


    useEffect(() => {
        const eventSource = new EventSource(mercure([
        'https://127.0.0.1:8000/api/rooms/{id}',
            'https://127.0.0.1:8000/api/messages/{id}',
            'https://example.com/app/rooms/1',
    ]);
        eventSource.onmessage = (e) => updateStockPrices(e.data);
        return () => {
            eventSource.close();
        };
    }, []);

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
                            <div className={state.displayForm ? "d-none" : "d-block"}>
                            {state.selectedRoom.id} - {state.selectedRoom.name}
                            <i className="btn fa fa-pencil" aria-hidden="true" onClick={()=>displayForm(true)}/>
                            <i className="btn fa fa-trash" aria-hidden="true" data-bs-toggle="modal" data-bs-target={'#room'+  + roomId} />
                            </div>
                            <div className={!state.displayForm ? "d-none" : "input-group"}>

                             {state.selectedRoom.id} -
                                <input type="text" name="room" value={state.roomName}
                                       onChange={handleChange}
                                       className="" />

                                       <i className="fa fa-send" aria-hidden="true" onClick={updateRoom}/>
                                <i className="btn fa fa-times" aria-hidden="true" onClick={()=>displayForm(false)}/>

                            </div>
                        </div>


                    <MessageBlock selectedRoom={state.selectedRoom} refreshSelectedRoom={refreshSelectedRoom}/>


                    <RoomBottom createMessage={createMessage}/>
                    </div>
                    <Modal value={'room'} id={'room'+ roomId} deleteFunc={deleteRoom} />


                </>

            )}
else{
    return <>waitiinng</>
            }

}

export default Room;