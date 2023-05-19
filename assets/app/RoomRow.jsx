import React from 'react';

const RoomRow = ({room}) => {

    return (
        <tr>
            <td>
                <a className="" href={`rooms/${room.id}`}>
                    {room.id} - {room.name}
                </a>
            </td>
        </tr>

    );
}


export default RoomRow;