/** @jsx React.DOM */

import 'react';

var NewsComponent = React.createClass({

    render: function () {
        var props = this.props;

        return (
            <div className="newsComponent">
                <div className="pure-g-r">
                    <div className="pure-u-1-5">
                    </div>
                    <div className="pure-u-3-5">
                        <div className="content">
                            <div className="posts">
                                <h1 className="content-subhead">Latest Stories</h1>

                                {props.items.map(function (item, i) {
                                    return  (
                                        <section className="post">
                                            <header className="post-header">
                                                <h4 className="post-title">{item.title}</h4>
                                                <p className="post-meta">
                                                    Published on {item.publishedDate}.
                                                </p>
                                            </header>
                                            <div className="post-description">
                                                <p>
                                                    {item.content}
                                                </p>
                                            </div>
                                        </section>
                                        );
                                }, this)}

                            </div> 
                        </div>
                    </div>
                    <div className="pure-u-1-5">
                    </div>
                </div>
            </div>
        );
    }
});

export default NewsComponent;
