import React, { Component } from 'react'
import img1 from './pic/1.jpg';
import { connect } from 'react-redux';

class HairStyleItem extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const { hairId, hairName, price, img ,time } = this.props.hairstyle_item
        return (

            // ShopItem
            <div class="box_item2" style={{ textAlign: 'left', border: '0', padding: '0' }}>

                {/* hairdresser image */}
                <div class="row_box"><img className="image_shop" src={img1} alt="" /></div>

                {/* hairdresser information */}
                {/* เขียว color: '#cb2c6f' */}
                <div class="sub_box_item" style={{ width: '50%', marginTop:'1em' }}>
                    <h3 style={{ color: '#cb2c6f', marginBottom:'1em'}}>{hairName}</h3>
                    <p style={{ color: '#14a098' }}>{price} baht.</p>
                    <p style={{ color: '#14a098' }}>{time} min.</p>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => { //subscribe
    return {
        shopStore: state.ShopReducer.shop
    }
}

export default connect(mapStateToProps)(HairStyleItem);