import React from 'react';
import MessageRow from "./MessageRow";

const MessageBlock = ({selectedRoom}) => {

    return (
        <>

            {
                selectedRoom.message.length > 0 ? selectedRoom.message.map((message, index) => {

                        return(
                            <MessageRow key={index} message={message}/>
                        )
                    }) : null
                    }
        </>
        );
}


export default MessageBlock;