/** @jsx React.DOM */

import 'react';
import {config} from 'yui';

var React = config.global.React;

var PhotoComponent = React.createClass({

    render: function () {
        return (
            <div className="photoComponent">
                <div className="pure-g-r">
                    <a data-page={this.props.prev} href={'/photo/' + this.props.prev} className="left-arrow" />
                    <div className="photo-container">
                        <div className="photo-image">
                            <img src={this.props.photo.url} />
                        </div>
                    </div>
                    <a data-page={this.props.next} href={'/photo/' + this.props.next} className="right-arrow" />
                </div>
                <div className="photo-news pure-g-r">
                    <div className="photo-news-container pure-u">
                        <h2>Check out related news from Tumblr:</h2>
                        <ul className="photo-news-list">
                          {this.props.news.map(function (item) {
                              return <li>{item.title}</li>
                          })}
                        </ul>
                    </div>
                </div>
            </div> 
        );
    }

});

export default PhotoComponent;
