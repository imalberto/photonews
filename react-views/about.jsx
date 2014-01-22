/** @jsx React.DOM */

import 'react';
import {config} from 'yui';

var React = config.global.React;

var AboutComponent = React.createClass({

    render: function () {
        return (
            <div className="aboutComponent">
                <h5>About Photonews</h5>
            </div>
        );
    }
});

export default AboutComponent;
