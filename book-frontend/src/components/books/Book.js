import React, { Component } from 'react';
import env from "react-dotenv";

import { Table, Spinner, Alert } from 'react-bootstrap';
import { Button, ButtonToolbar, Form } from 'react-bootstrap';

import { AddBookModal } from './AddBookModal';
import { EditBookModal } from './EditBookModal';
import { DetailsBookModal } from './DetailsBookModal';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class Book extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            addModalShow: false,
            editModalShow: false,
            detailsModalShow: false,
            listStatus: 0,
            snackbarStatus: 0,
            snackbarOpen: false,
            snackbarMessage: '',
            isListOk: true
        }
    }

    snackBarClose = (e) => {
        this.setState({ snackbarOpen: false });
    }

    componentDidMount() {
        this.refreshList()
    }

    async refreshList() {
        let response = await fetch(`${env.API_BASE}Books`);
        let data = await response.json();
        let { ok, status } = await response;
        this.setState({
            books: (ok) ? data : [],
            snackbarOpen: true,
            snackbarStatus: status,
            listStatus: status,
            isListOk: ok,
            snackbarMessage: (ok) ? 'Book list loaded successfully.' : data.message,
            addModalShow: false
        })
        //Dummy data
        // this.setState({
        //     books: [
        //         {
        //             "id": 1,
        //             "title": "string",
        //             "description": "string",
        //             "pageCount": 0,
        //             "excerpt": "string",
        //             "publishDate": "2021-04-21T04:38:17.715Z"
        //         },
        //         {
        //             "id": 2,
        //             "title": "string",
        //             "description": "string",
        //             "pageCount": 0,
        //             "excerpt": "string",
        //             "publishDate": "2021-04-21T04:38:17.715Z"
        //         }
        //     ],
        //     addModalShow: false
        // })
    }

    async deleteBook(id) {
        let request = {
            method: 'DELETE',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        }
        let response = await fetch(`${env.API_BASE}Books/${id}`, request);
        let data = await response.json();
        let { ok, status } = await response;
        this.setState({
            snackbarOpen: true,
            snackbarStatus: status,
            snackbarMessage: data.message,
        })
    }

    async searchBook(e) {
        e.preventDefault();
        let response = await fetch(`${env.API_BASE}Books/${e.target.BookId.value}`);
        let data = await response.json();
        let { ok, status } = await response;
        this.setState({
            books: (ok) ? [data] : this.state.books,
            snackbarOpen: true,
            snackbarStatus: status,
            snackbarMessage: (ok) ? 'Book found.' : data.message ?? data.errors.id[0],
        })
    }

    render() {
        const { books, bookToUpdate, bookDetails, listStatus, isListOk } = this.state;

        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        let detailsModalClose = () => this.setState({ detailsModalShow: false });
        let BookChange = () => this.refreshList();

        return (
            <section>
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={this.state.snackbarOpen} autoHideDuration={6000} onClose={this.snackbarClose}
                    message={<span>{this.state.snackbarStatus} - {this.state.snackbarMessage}</span>}
                    action={[
                        <IconButton key="close" color="inherit" onClick={this.snackBarClose}>x</IconButton>
                    ]}>
                </Snackbar>
                <ButtonToolbar>
                    <Button className="mt-4" variant="success" onClick={() => this.setState({ addModalShow: true })}>Add Book</Button>
                    <AddBookModal show={this.state.addModalShow} onHide={addModalClose} onBookAdded={BookChange} />
                </ButtonToolbar>
                <Form inline className="mt-4" onSubmit={(e) => this.searchBook(e)}>
                    <Form.Group>
                        <Form.Control
                            required
                            type="int"
                            id="BookId"
                            Name="BookId"
                            placeholder="Book Id"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mx-1">
                        Search
                    </Button>
                    <Button variant="danger" className="mx-1" onClick={async () => await this.refreshList()}>
                        Cancel
                    </Button>
                </Form>
                <Table striped bordered hover className="my-4">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Page Count</th>
                            <th>Publish Date</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr Key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>{book.pageCount}</td>
                                <td>{book.publishDate}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button size="sm" variant="primary" className="mx-2" onClick={() => this.setState({ editModalShow: true, bookToUpdate: book })}>Edit</Button>
                                        <EditBookModal
                                            book={bookToUpdate}
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            onBookEdited={BookChange} />
                                        <Button size="sm" variant="danger" className="mx-2" onClick={() => this.deleteBook(book.id)}>Delete</Button>
                                        <Button size="sm" variant="dark" className="mx-2" onClick={() => this.setState({ detailsModalShow: true, bookDetails: book })}>Details</Button>
                                        <DetailsBookModal
                                            book={bookDetails}
                                            show={this.state.detailsModalShow}
                                            onHide={detailsModalClose} />
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className={(listStatus === 0) ? 'd-flex p-4 justify-content-center' : 'd-none'}>
                    <Spinner animation="grow" />
                </div>
                <Alert variant="danger" className={(isListOk) ? 'd-none' : 'd-block'}>
                    An error has occurred while loading the books list.
                </Alert>
            </section>
        )
    }
}