import React, { Component } from 'react';
import env from "react-dotenv";

import { Modal, Button, Form } from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class AddBookModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            snackbarOpen: false,
            snackbarMessage: '',
            snackbarStatus: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    snackBarClose = (e) => {
        this.setState({ snackbarOpen: false });
    }

    async handleSubmit(e) {
        e.preventDefault();

        let request = {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: e.target.id.value,
                title: e.target.title.value,
                description: e.target.description.value,
                pageCount: e.target.pageCount.value,
                excerpt: e.target.excerpt.value,
                publishDate: e.target.excerpt.publishDate,
            })
        }
        let response = await fetch(`${env.API_BASE}Books`, request);
        let data = await response.json();
        let { ok, status } = await response;
        this.setState({
            snackbarOpen: true,
            snackbarStatus: status,
            snackbarMessage: (ok) ? `${data.title} succesfully added.` : data.message ?? data.title,
        })
        if (ok) this.props.onBookAdded()
    }

    render() {
        return (
            <div>
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={this.state.snackbarOpen} autoHideDuration={6000} onClose={this.snackbarClose}
                    message={<span>{this.state.snackbarStatus} - {this.state.snackbarMessage}</span>}
                    action={[
                        <IconButton key="close" color="inherit" onClick={this.snackBarClose}>x</IconButton>
                    ]}>
                </Snackbar>
                <Modal
                    {...this.props}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Book
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="id">
                                    <Form.Label>Id</Form.Label>
                                    <Form.Control required id="id" name="id" type="number" placeholder="Enter book id" />
                                </Form.Group>
                                <Form.Group controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control required id="title" name="title" type="text" placeholder="Enter book title" />
                                </Form.Group>
                                <Form.Group controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control required id="description" name="description" as="textarea" rows="3" placeholder="Enter book description" />
                                </Form.Group>
                                <Form.Group controlId="pageCount">
                                    <Form.Label>Page Count</Form.Label>
                                    <Form.Control required id="pageCount" name="pageCount" type="number" placeholder="Enter book page count" />
                                </Form.Group>
                                <Form.Group controlId="excerpt">
                                    <Form.Label>Excerpt</Form.Label>
                                    <Form.Control required id="excerpt" name="excerpt" as="textarea" rows="3" placeholder="Enter book excerpt" />
                                </Form.Group>
                                <Form.Group controlId="publishDate">
                                    <Form.Label>Publish Date</Form.Label>
                                    <Form.Control required id="publishDate" name="publishDate" type="date" placeholder="Enter book publish date" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Save
                            </Button>
                            </Form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}