YUI.add('template-react', function (Y) {

    var React = Y.config.global.React;

    React.revive = React.revive || function (fn) {
        return function (data, node) {
            var fragment = !node && document.createDocumentFragment(),
                component = React.createClass({
                    render: fn
                }),
                instance = component();

            // supporting node and elements
            node = (node && node._node) || node;
            // mixing in the template data
            Y.mix(instance.props, data, true);
            React.renderComponent(instance, node || fragment);
            return !node && fragment.innerHTML;
        };
    };

}, '', {requires: ['template-base']});
