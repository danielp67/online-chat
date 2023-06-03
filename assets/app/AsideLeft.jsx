import React, {useState} from 'react';
import RoomRow from "./RoomRow";

const AsideLeft = ({state, setNewRoom}) => {

    const [roomName, setRoomName] = useState('')
    const handleChange = (e) => {
        setRoomName(e.target.value)
    }

    const handleClick = () => {
        setNewRoom(roomName)
    }
    return (
<>
        <div className="row g-0">
            <div className="col-3 bg-info vh-100 fixed-top">
                <h3>Online Chat
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i className="fa fa-plus" aria-hidden="true"/>
                    </button>
                </h3>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>

                    {state.rooms.length > 0 ? state.rooms.map((room, index) => {

                        return (
                            <RoomRow key={index} room={room}/>

                        )
                    }) : null
                    }

                    </tbody>
                </table>
            </div>
        </div>


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">New Room</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                </div>
                <div className="modal-body">
                    <div className="input-group mb-3">
                        <input type="text" name="room" value={roomName}
                               onChange={handleChange}
                               className="form-control" aria-describedby="button-addon2" />
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClick}>
                        <i className="fa fa-send" aria-hidden="true"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
</>
    );
}


export default AsideLeft;