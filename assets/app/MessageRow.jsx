import React, {useEffect, useState} from 'react';
import moment from "moment";
import Modal from "./Modal";

const MessageRow = ({message, refreshSelectedRoom}) => {
let user = {
    "@context": "/api/contexts/User",
    "@id": "/api/users/1",
    "@type": "User",
    "id": 1,
    "email": "john.doe@test.com",
    "username": "Pseudo1"
}
    const [state, setState] = useState({
        content:message.content,
        displayForm:false,
        displayMessage:true
    })
    const displayForm = (props) => {

        setState(prevState =>{
            return{
                ...prevState,
                displayForm : props}})
    }

    const handleChange = (e) => {
        setState(prevState =>{
            return{
                ...prevState,
                content : e.target.value}})
    }


    const updateMessage = () => {

        const url = `/api/messages/`+ message.id ;
console.log('updateMessage',url)
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/ld+json',
                'Content-Type': 'application/ld+json'
            },
            body: JSON.stringify({content: state.content})
        })            .then(function (response) {
            return response.json();
        })
            .then(json => {
                setState(prevState =>{
                    return{
                        ...prevState,
                         displayForm: false}})
            });
    }

    const deleteMessage = () => {

        const url = `/api/messages/` + message.id;
        fetch(url, {method: 'DELETE'})
            .then(function (response) {
                console.log(response)
               refreshSelectedRoom()
                return true
            })
    }

    useEffect(() => {
        const eventSource = new EventSource("https://localhost/.well-known/mercure?topic=https://127.0.0.1:8000/api/messages/" + message.id
        )
        eventSource.onmessage = event => {
            let message = JSON.parse(event.data)
            console.log(JSON.parse(event.data));
            // setLoading(false)

          //  refreshSelectedRoom()

            if(message.content)
            {console.log(message.content)
               setState(
                   prevState =>{
                       return{
                           ...prevState,
                           content: message.content}})


            }/*else{
                setState(
                    prevState =>{
                        return{
                            ...prevState,
                            displayMessage: false}})
            }*/
        }
        return () => {
            eventSource.close();
        };
    }, []);


    if (message.user.id === user.id){
        return(

            <>
    <div className="card col-6  border-primary bg-light offset-6">
        <div className="card-header">

            <span className="fs-8"> { message.user.username } - { moment(message.createdAt).format("DD/MM/YYYY à HH:mm") }
            </span>

        </div>
        <div className="card-body">
            <div className={state.displayForm ? "d-none" : "d-block"}>
                { state.content }
                <i className="btn fa fa-pencil" aria-hidden="true" onClick={()=>displayForm(true)}/>
                <i className="btn fa fa-trash" aria-hidden="true" data-bs-toggle="modal" data-bs-target={'#message' + message.id} />
            </div>

            <div className={!state.displayForm ? "d-none" : "input-group"}>

                <input type="text" name="room" value={ state.content }
                       onChange={handleChange}
                       className="" />
                <i className="fa fa-send" aria-hidden="true" onClick={updateMessage}/>
                <i className="btn fa fa-times" aria-hidden="true" onClick={()=>displayForm(false)}/>

            </div>
        </div>
    </div>

                <Modal value={'message'} id={'message'+ message.id} deleteFunc={deleteMessage} />

            </>

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