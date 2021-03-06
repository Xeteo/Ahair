import React, { useState } from 'react'
import ImageUpload from './imgUploadforReview';
import { Link } from 'react-router-dom';
import StarRate from './StarRate';
import errorIcon from './pic/error_icon.png';
import Navbar from './navbar'
import axios from 'axios';

class review_Cus extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageFile: [],
            imagePreview: [],
            imageUrl: [],
            reviewdata: '',
            ratingValue: '',
            isEmpty: '',
            starError: '',
            bookingId: '',
            shopId: ''
        }
        this.getFile = this.getFile.bind(this);
        this.getStar = this.getStar.bind(this);
    }
    getFile(img_file, img_preview, img_url) {
        this.setState({
            imageFile: img_file, imagePreview: img_preview, imageUrl: img_url
        });
    }
    getStar(rating) {
        this.setState({ ratingValue: rating });
    }
    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    componentDidMount() {
        const { bookingId } = this.props.match.params;

        this.setState({ bookingId: bookingId });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const rate = this.state.ratingValue;
        console.log(this.state);
        const reviewData = {
            rate: this.state.ratingValue,
            message: this.state.reviewdata,
            bookingId: this.state.bookingId,
            imgUrl : this.state.getFile
        }
        if (rate != null) {
            this.setState({ isEmpty: false }, () => {
                console.log(this.state.isEmpty);
            });
            axios.post(`https://us-central1-g10ahair.cloudfunctions.net/api/reviewfromuser`, reviewData, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
                .then(res => {
                    console.log(res);
                    this.props.history.push('/thank4Review_Cus');
                })
                .catch(err => {
                    console.log(err.response);
                })
        }
        else {
            this.setState({ isEmpty: true }, () => {
                console.log(this.state.isEmpty);
            });

        }
       
    }

    render() {
        return (
            <div><Navbar />
                <div className="Format_Container">
                    <div className="title">
                        <h1 style={{ color: "#cb2d6f", fontSize: "30px" }}>
                            Review
                    </h1>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="starRate">
                            <StarRate getStar={this.getStar} />
                            <div
                                className={!this.state.isEmpty ? "validate_review_wrap" : "invalidate_review_wrap"}>
                                <div className="erroricon_review">
                                    <img src={errorIcon} alt="" width="20px" />
                                </div>
                                <div className="texterror_review">
                                    <p>Please Rate Some Star!</p>
                                </div>
                            </div>
                        </div>

                        <div className="wrapAddimg">
                            <div className="AddImgReview">
                                <ImageUpload getFile={this.getFile} />
                            </div>
                        </div>
                        <div className="ReviewtxtBox">
                            <h2 style={{ color: "white", fontSize: "20px" }}>Description</h2>
                            <div className="descriptionBox">
                                <textarea
                                    type="text"
                                    placeholder="Write some Review..."
                                    rows="5"
                                    name="reviewdata"
                                    onChange={this.handleInputChange}
                                >
                                </textarea>
                            </div>
                        </div>
                        <div className="container_right_bt" >
                            <button
                                type="submit"
                                className="submit_button"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default (review_Cus);