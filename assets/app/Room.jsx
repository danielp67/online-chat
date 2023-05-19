import React, {useState} from 'react';
import AsideLeft from "./AsideLeft";
import {useParams} from "react-router-dom";
import RoomBottom from "./RoomBottom";
import MessageBlock from "./MessageBlock";

const Room = () => {
    const [state, setState] = useState({
        selectedRoom: {},
        user:''
    })
    const [loading, setLoading] = useState(false)
    const {roomId} = useParams()

    const fetchSelectedRoom = () => {
       // setLoading(false)
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


    const setNewMessage = () => {

console.log("tests")

    }

    if(!loading){
    fetchSelectedRoom()
    }


    if(loading){

            return (
                <>
                  {/*  <AsideLeft rooms={state.rooms} />*/}

                    <div className="col-9 offset-3">
                        <div className="bg-info col-9 offset-3 fixed-top pt-4">

                            {selectedRoom.id} - {selectedRoom.name}test


                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Hello !"
                                       aria-label="Recipient's username" aria-describedby="button-addon2" />
                                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={setNewMessage}>
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