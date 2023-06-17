import React, {Component} from 'react';
import AsideLeft from "./AsideLeft";
import RoomBottom from "./RoomBottom";

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            rooms: [],
            loading:false,
        }
    }

    componentDidMount() {
console.log("test")
        this.fetchAllRooms();
    }

    fetchAllRooms = () => {
        this.setState({loading: false});
        const url = `/api/rooms`;

        fetch(url, {method: 'get'})
            .then(function (response) {
                return response.json();
            })
            .then(json => {
                console.log(json)
                this.setState({ rooms: json["hydra:member"], loading:true})

                // this.displayItemFromCart();

            });
    }


    setNewMessage = () => {

        console.log("tests")

    }

    render() {
        if(this.state.loading){

            return (
                <>
                    <RoomBottom setNewMessage={this.setNewMessage}/>

                </>

            )}
else{
    return <>waiting</>
            }
    }

}

export default Home;