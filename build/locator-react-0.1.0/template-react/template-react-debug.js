YUI.add('template-react', function (Y) {

    var React = Y.config.global.React;

    React.revive = React.revive || function (component) {
        var instance = component();
        return function (data, node) {
            var html;

            Y.mix(instance.props, data, true);

            if (node) {
                // supporting node and elements
                React.renderComponent(instance, node._node || node);
                return; // not need to return the html since the node was passed in
            }
            // fallback to return the html if node was not provided
            node = document.createElement('div');
            React.renderComponent(instance, node);
            return node.innerHTML;
        };
    };

    Y.React = React;

}, '@VERSION@', {"requires": ["template-base"]});
