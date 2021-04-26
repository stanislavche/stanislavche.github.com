import React, { Component } from 'react';
import './mup.scss';

class Mup extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="container">
                <h2 className="container__header">MUP</h2>
                <div className="container__wrapper mup">
                    <iframe width={'100%'} height={'450px'} src={"https://s-tn.space/mup?animation=hide"} sandbox='allow-scripts allow-same-origin'></iframe>
                </div>
            </section>
        );
    }
}

export default Mup;