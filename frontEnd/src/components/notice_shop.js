import React, { Component } from 'react';
import Navbar from './NavBarShop'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class notice_Cus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notice: '',
            icon: 'null',
            image: 'null',
            noticecontent: '',
            noticestage: null,
            isLoading: true,
            isEmpty: false
        };
    }

    componentDidMount() {
        axios.get('https://us-central1-g10ahair.cloudfunctions.net/api/bookingforshop', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
            .then(res => {
                this.setState({ noticecontent: res.data, isLoading: false })
                if (this.state.noticecontent.length === 0) {
                    this.setState({ isEmpty: true })
                }
                console.log(this.state.isEmpty)
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    onclickBooking(bookingId) {
        this.props.history.push(`/bookInfo_Shop/${bookingId}`)
    }
    onclickReview(bookingId, reviewed) {
        console.log(reviewed)
        if (reviewed) {
            this.props.history.push('/noticeforshop');
        }
        else {
            this.props.history.push(`/ReviewforShop/${bookingId}`)
        }
    }

    handleCancle (bookid) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1 style={{ color: 'white', textAlign: 'center' }}>Are you sure to CANCEL this Booking?</h1>
                        <button className='confirmBT' onClick={() => { this.delBook(bookid); onClose(); }}>Yes</button>
                        <button
                            className='confirmBT'
                            onClick={() => {
                                onClose();
                            }}
                        >
                            No
                      </button>
                    </div>
                );
            }
        });
    }
    delBook = (bookid) => {
        axios.delete(`https://us-central1-g10ahair.cloudfunctions.net/api/bookingfromshop/${bookid}`, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
            .then(res => {
                console.log(res.status)
                this.props.push.history('/noticeforshop')
            })
            .catch(err => {
                console.log(err.response)
            })
    }
    

    render() {
        return (
            <div>
                <Navbar />
                <div className="Format_Container">
                    <div className="title">
                        <h1 className='NoticeTitle'
                            style={{
                                color: "#cb2c6f",
                                fontSize: "30px",
                                fontFamily: "cloud",
                            }}>Notification
                    </h1>
                    </div>
                    {
                        (this.state.isEmpty && !this.state.isLoading) ?
                            <div>
                                <h1 style={{ color: 'white', fontSize: '250%', textAlign: 'center' }}> No Notification Now </h1>
                            </div>
                            : null
                    }
                    {
                        !this.state.isLoading ?
                            (
                                this.state.noticecontent &&
                                this.state.noticecontent.map((data) => {
                                    return (
                                        <div key={data.bookingId}>
                                            {
                                                (data.done && !data.reviewedFromShop) ?
                                                    (
                                                        <button className='NoticeContent' onClick={() => this.onclickReview(data.bookingId, data.reviewedFromShop)}>
                                                            <p style={{ margin: '10px 0px 0px 20px', fontSize: '20px' }}><i className='thumbs up icon'></i> Review your Customer Here!</p>
                                                            <p
                                                                style={{
                                                                    margin: '0px 0px 0px 50px',
                                                                    fontSize: '15px',
                                                                    color: 'white',
                                                                }}>
                                                                username : {data.username}
                                                            </p>
                                                            <p
                                                                style={{
                                                                    margin: '0px 0px 20px 25px',
                                                                    fontSize: '10px',
                                                                    color: '#8DE8E3',
                                                                }}>
                                                                order number #{data.bookingId}
                                                            </p>
                                                            <p style={{ marginLeft: '20px', color: "white", fontSize: '10px', marginBottom: '20px' }}>
                                                                <i className="hand point right outline icon" style={{ color: 'white' }}></i>
                                                click for more information</p>
                                                        </button>
                                                    )
                                                    :
                                                    (null)
                                            }
                                            < button className='NoticeContent' onClick={() => data.username?this.onclickBooking(data.bookingId):this.handleCancle(data.bookingId)}>
                                                <p style={{ margin: '10px 0px 0px 20px', fontSize: '20px' }}>
                                                    <i className={data.done ? 'check icon' : 'bookmark icon'}></i>{data.done ? 'Booking Done!' : 'New Booking'}</p>
                                                <p
                                                    style={{
                                                        margin: '0px 0px 0px 50px',
                                                        fontSize: '15px',
                                                        color: 'white',
                                                    }}>
                                                    {data.username?('username : '+ data.username):'Booking by ADMIN'}
                                                </p>
                                                <p
                                                    style={{
                                                        margin: '0px 0px 20px 25px',
                                                        fontSize: '10px',
                                                        color: '#8DE8E3',
                                                    }}>
                                                    order number #{data.bookingId}
                                                </p>
                                                <p style={{ marginLeft: '20px', color: "white", fontSize: '10px', marginBottom: '20px' }}>
                                                    <i className="hand point right outline icon" style={{ color: 'white' }}></i>
                                                    {data.username?'click for more information':'click for CANCLE this Booking'}</p>
                                            </button>
                    
                                        </div>
                                    );
                                })
                            )
                            :
                            (
                                <div class="ui massive active centered inline loader"></div>
                            )


                    }
                </div>
            </div>
        );
    }
}

export default notice_Cus;