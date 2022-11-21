import React, { Component } from 'react';
import './emulator.scss';

class Emulator extends Component {
    render() {
        return (
            <section className="container">
                <h2 className="container__header">HELLO WORLD</h2>
                <div className="container__wrapper emulator">
                    <iframe width={'100%'} height={'580px'} title={"emulator"} src={"https://s-tn.space/helloworld/"} sandbox='allow-scripts allow-same-origin'></iframe>
                </div>
            </section>
        );
    }
}

export default Emulator
