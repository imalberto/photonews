/** @jsx React.DOM */

import 'react';
import {config} from 'yui';

var React = config.global.React;

var PhotoComponent = React.createClass({


    prevPhoto: function () {

    },

    nextPhoto: function () {

    },

    render: function () {
        var data = this.props;

        return (
            <div className="photoComponent">
                <div className="pure-g-r">
                    <a data-page={data.prev}
                        href={'/photo/' + data.prev}
                        className="left-arrow"
                        onClick={this.prevPhoto} />
                    <div className="photo-container">
                        <div className="photo-image">
                            <img src={data.photo.url} />
                        </div>
                    </div>
                    <a data-page={data.next}
                        href={'/photo/' + data.next}
                        className="right-arrow"
                        onClick={this.nextPhoto} />
                </div>
                <div className="photo-news pure-g-r">
                    <div className="photo-news-container pure-u">
                        <h2>Check out related news from Tumblr:</h2>
                        <ul className="photo-news-list">
                          {data.news.map(function (item) {
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
