import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


    
    function RenderDish({dish}) {
        // Rendering the dish name and description
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }

    function RenderComments({comments, postComment, dishId}) {
        // Rendering the comments of dishes
        if (comments == null) {
            return (<div></div>)
        }
        // Maping cmts to dishe's comments 
        const cmnts = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(comment.date))}
                    {/* Converting a date into us date format */}
                    </p>
                </li>
            )
        })
        return (
            <div className='col-12 col-md-5 m-1'>
            <h4> Comments </h4>
            {/* Line 32 */}
                    {cmnts}
                    {/* Calling the comment form on line 94  */}
                    <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        )
    }


    const DishDetail = (props) => {
        // Storing the Renderdish and RenderComments for a particular dish
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null){
            return (
                    <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                            <RenderDish dish={props.dish} />
                            <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />                    
                            
                    </div>
                </div>
                );
                
        } else {
            return (
                <div></div>
            );
        }
    }
export default DishDetail

// Validation fopr submitting comments
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

export class CommentForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"> Submit comment</span>
                </Button>

                <div className="row row-content">
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}> Submit comment</ModalHeader>
                        <ModalBody>
                            {/* The form for submitting a comment */}
                            <div className="col-12 col-md-9">
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                                    <Row className="form-group">
                                        <Label htmlFor="rating">Rating</Label>
                                        <Col md={10}>
                                            <Control.select model=".rating" name="rating" className="form-control" >
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>
                                        </Col>
                                    </Row>

                                    <Row className="form-group">
                                        <Label htmlFor="author" md={2}>Your name</Label>
                                        <Col md={10}>
                                            <Control.text model=".author" id="author" name="author" placeholder="Author" className="form-control" validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }} />
                                            {/* Validations are being called  */}
                                            <Errors className="text-danger" model=".author" show="touched" messages={{ required: 'Required', minLength: 'Must be greater than 3 characters', maxLength: 'Must be 15 charaters or less' }} />
                                            {/* Paritcular errors for particular validation failure */}
                                        </Col>
                                    </Row>

                                    <Row className="form-group">
                                        <Label htmlFor="feedback" md={2}>Your feedback</Label>
                                        <Col md={10}>
                                            <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" validators={{ required }} />
                                            <Errors className="text-danger" model=".comment" show="touched" messages={{ required: 'Required' }} />
                                        </Col>
                                    </Row>

                                    <Button type="submit" value="submit" color="primary">Submit</Button>
                                </LocalForm>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        );
    }
}