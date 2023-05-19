import React from 'react';

const RoomBottom = ({setNewMessage}) => {
        return (
            <div className="col-9 offset-3">
                <div className="bg-info col-9 offset-3 fixed-bottom pt-2">

                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Hello !"
                               aria-label="Recipient's username" aria-describedby="button-addon2" />
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={setNewMessage}>
                                <i className="fa fa-send" aria-hidden="true"/>

                            </button>
                    </div>

                </div>
            </div>

        );
}


export default RoomBottom;