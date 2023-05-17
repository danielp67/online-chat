import React, {Component} from 'react';
import AsideLeft from "./AsideLeft";

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            rooms: [],
            loading:false,
        }
    }

    componentDidMount() {

        this.fetchRooms();
    }

    fetchRooms() {
        this.setState({loading: false});
        const url = `/api/room`;

        fetch(url, {method: 'get'})
            .then(function (response) {
                return response.json();
            })
            .then(json => {
                this.setState({
                    rooms: json["rooms"],
                });
                this.setState({buttonStatus: [], loading:true})

                // this.displayItemFromCart();

            });
    }

    displayItemFromCart = () => {
        if(this.state.cartData && this.state.loading === false){
            let buttonStatus = [];
            this.state.cartData.items.forEach(item => {
                buttonStatus.push([item.bet.id, item.expectedBetResult, item.id]);
            })

            this.setState({buttonStatus : buttonStatus,  loading: true});
        }else{
            this.setState({buttonStatus: [], loading:true})
        }
    }


    addOddsToCart = (props) => {
        const url = `/api/cart/add/` + props[0] + `/` + props[1];
        fetch(url, {method: 'get'})
            .then(function (response) {
                return response.json();
            })
            .then(json => {
                this.setState({cartData: json, loading: false});
                this.displayItemFromCart();
            });
    }

    removeOddsFromBetBoard = (props) => {
        const url = `/api/cart/remove/` + props;
        fetch(url, {method: 'get'})
            .then(function (response) {
                return response.json();
            })
            .then(json => {
                this.setState({cartData: json, loading: false});
                this.displayItemFromCart();
            });
    }


    editOddsFromCart = (props) => {
        const url = `/api/cart/changeBetAmount/` + props[0].id;
        fetch(url, {
            method: 'post', body: props[1]
        })
            .then(function (response) {
                return response.json();
            })
            .then(json => {
                this.setState({cartData: json, loading: false});
                this.displayItemFromCart();
            });
    }

    removeOddsFromCart = (props) => {
        const url = `/api/cart/remove/` + props[0].id;
        fetch(url, {method: 'get'})
            .then(function (response) {
                return response.json();
            })
            .then(json => {
                this.setState({cartData: json, loading: false});
                this.displayItemFromCart();
            });
    }

    render() {
        if(this.state.loading){

            return (
                <>
                    <AsideLeft rooms={rooms}/>
                </>

            )}
else{
    return <>waitiinng</>
            }
    }

}











export default Home;