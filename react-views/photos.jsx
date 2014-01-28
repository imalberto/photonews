/** @jsx React.DOM */

import 'react';

var PhotosComponent = React.createClass({

    render: function () {
        var items = this.props.items,
            query = this.props.query;

        return (
            <div className="photosComponent">
                <div className="pure-g-r">
                    <div className="pure-u-2-3 text-box">
                        <div className="l-box">
                            <h1 className="text-box-head">The city is your museum.</h1>
                            <p className="text-box-subhead">Explore the public art that makes your neighborhood beautiful</p>
                            <p className="text-box-byline">Powered by Yahoo open source technology, and photos from the Flickr and Tumblr community.</p>
                            <p className="text-box-byline">Built by Yahoo engineers, for the community around us all.</p>
                        </div>
                    </div>
                    {items.map(function (item, i) {
                        return (
                            <div className="pure-u-1-3 photo-box">
                                <a href={query ? "/photo/" + item.index + "?q=" + query : "/photo/" + item.index}>
                                    <img src={item.url}
                                         alt={item.title} />
                                </a>
                                <aside className="photo-box-caption">
                                    {item.title}
                                    <span>
                                        by <a href={item.url}>{item.user}</a> / <a href="http://creativecommons.org/licenses/by-nc-sa/2.0/">cc</a>
                                    </span>
                                </aside>
                            </div>
                        );
                    }, this)}
                </div>
            </div>
        );
    }
});

export default PhotosComponent;


