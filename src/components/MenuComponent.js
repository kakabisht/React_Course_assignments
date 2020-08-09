import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import Dishdetail from './DishdetailComponent'

class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null
        }
    }

    onSelectedDish(dish) {
        // For selecting the clicked dish
        this.setState({
            selectedDish: dish
        })
    }

    render() {
        // Iterating through the entire dishes and storing the values in menu variable
        const menu = this.props.dishes.map(dish => {
            return (
                <div key={dish.id} className='col-12 col-md-5 m-1'>
                    <Card onClick={() => this.onSelectedDish(dish)} >
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle >{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        return (
            <div className='container'>
                <div className='row'>
                    {/* Callling menu  variable*/}
                    {menu}
                </div>
                {/* Callling Dishdetail componet and passing the dish as the parameter */}
                <Dishdetail dish={this.state.selectedDish}></Dishdetail>
            </div>
        );
    }
}

export default Menu; 