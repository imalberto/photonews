/** @jsx React.DOM */

import 'react';

var HomeComponent = React.createClass({

    render: function () {
        return (
            <div className="homeComponent">
                <div className="pure-g-r">
                    <div className="pure-u-1-5">
                    </div>
                    <div className="pure-u-3-5">
                        <h4>Landing Page</h4>
                        <div>
                            Use the links in the top menu to naviage between <a href="/news">news</a> 
                            and <a href="/photos">photos</a>.
                        </div>
                    </div>
                    <div className="pure-u-1-5">
                    </div>
                </div>
            </div>
        );
    }
});

export default HomeComponent;
