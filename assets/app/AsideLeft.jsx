import React, {Component} from 'react';
import RoomRow from "./RoomRow";

const AsideLeft = ({rooms}) => {

        return (

            <div className="row g-0">
                <div className="col-3 bg-info vh-100 fixed-top">
                    <h3>Online Chat
                        <a href="room/new" className="btn btn-danger"><i className="fa fa-plus" aria-hidden="true"/>
                        </a>
                    </h3>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>

                        {rooms.map((room, index) => {

                            return(
                                <RoomRow key={index} room={room}/>

                            )
                        })
                        }

                        </tbody>
                    </table>
                </div>
            </div>

        );
}


export default AsideLeft;