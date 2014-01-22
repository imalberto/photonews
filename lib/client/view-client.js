/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('view-class', function (Y, NAME) {

    'use strict';

    var React = Y.config.global.React;

    var ViewClass = Y.Base.create('smartView', Y.View, [], {

        initialize: function (config) {

        },

        renderComponent: function (locals, container) {
            var result,
                instance;

            // TODO preserve the instance of the component to be reused
            instance = this.template(locals);

            // OR
            // Y.mix(instance.props, locals, true);
            if (container) {
                React.renderComponent(
                    instance,
                    container._node || container
                );
                return;
            }

            container = document.createElement('div');
            React.renderComponent(instance, container);
            return container.innerHTML;
        }
    }, {
        ATTRS: {
            componentInstance: {
                value: null
            }
        }
    });

    Y.ViewClass = ViewClass;

}, '@VERSION', {
    affinity: 'client',
    requires: [
        'view',
        'react'
    ]
});
