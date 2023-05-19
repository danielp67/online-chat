import React from 'react';
import moment from "moment";

const MessageRow = ({message}) => {
let user = {
    "@context": "/api/contexts/User",
    "@id": "/api/users/1",
    "@type": "User",
    "id": 1,
    "email": "john.doe@test.com",
    "username": "Pseudo1"
}

    if (message.user.id === user.id){
        return(
    <div className="card col-6  border-primary bg-light offset-6">
        <div className="card-header">

            <span className="fs-8"> { message.user.username } - { moment(message.createdAt).format("DD/MM/YYYY à HH:mm") }
            </span>
                <i className="btn fa fa-pencil" aria-hidden="true"/>
                <i className="btn fa fa-trash" aria-hidden="true"/>

        </div>
        <div className="card-body">
            <p className="card-text">{ message.content }</p>
        </div>
    </div>
        )}

    else{
        return (

            <div className="card col-6">
                <div className="card-header">
                    { message.user.username } - { moment(message.createdAt).format("DD/MM/YYYY à HH:mm") }
                </div>
                <div className="card-body">

                    <p className="card-text">{message.content}</p>
                </div>
            </div>
        )
    }
}


export default MessageRow;