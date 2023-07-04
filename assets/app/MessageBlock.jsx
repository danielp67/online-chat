import React from 'react';
import MessageRow from "./MessageRow";

const MessageBlock = ({selectedRoom, fetchSelectedRoom}) => {

    return (
        <>

            {
                selectedRoom.message.length > 0 ? selectedRoom.message.map((message, index) => {

                        return(
                            <MessageRow key={index} message={message} fetchSelectedRoom={fetchSelectedRoom}/>
                        )
                    }) : null
                    }
        </>
        );
}


export default MessageBlock;