import React from 'react';
import RoomRow from "./RoomRow";
import MessageRow from "./MessageRow";

const MessageBlock = ({selectedRoom}) => {

    return (
        <>

            {
                selectedRoom.message.map((message, index) => {

                        return(
                            <MessageRow key={index} message={message}/>
                        )
                    })
                    }
        </>
        );
}


export default MessageBlock;