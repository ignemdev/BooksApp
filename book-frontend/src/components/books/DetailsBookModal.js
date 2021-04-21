import React, { Component } from 'react';

import { Modal, Button, Card } from 'react-bootstrap';

export class DetailsBookModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Book Details
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Card className="p-2 mt-2">
                            <h5>Id</h5>
                            <p>{this.props.book?.id}</p>
                        </Card>
                        <Card className="p-2 mt-2">
                            <h5>Title</h5>
                            <p>{this.props.book?.title}</p>
                        </Card>
                        <Card className="p-2 mt-2">
                            <h5>Description</h5>
                            <p>{this.props.book?.description}</p>
                        </Card>
                        <Card className="p-2 mt-2">
                            <h5>Page Count</h5>
                            <p>{this.props.book?.pageCount}</p>
                        </Card>
                        <Card className="p-2 mt-2">
                            <h5>Excerpt</h5>
                            <p>{this.props.book?.excerpt}</p>
                        </Card>
                        <Card className="p-2 mt-2">
                            <h5>Publish Date</h5>
                            <p>{this.props.book?.publishDate}</p>
                        </Card>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}