import React, { Component } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

export class Home extends Component {
    render() {
        return (
            <section>
                <Jumbotron className="my-4">
                    <h1>Bienvenidos!</h1>
                    <p>
                        Books App es una aplicación para brindar mantenimiento a libros hecha con ASP.NET Core WebApi y ReactJs.
                    </p>
                    <p>
                        <Button variant="primary" target="_blank" href="//github.com/ignemdev/BooksApp.git">Codigo</Button>
                    </p>
                </Jumbotron>
            </section>
        )
    }
}