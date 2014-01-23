/*jslint nomen:true, node:true*/
/*global YUI, document*/

YUI.add('view-class', function (Y, NAME) {

    'use strict';

    var React = Y.config.global.React;

    var ViewClass = Y.Base.create('smartView', Y.View, [], {

        initializer: function () {
            this.instance = this.component();
        },
        /**
        @return {String|undefined} The rendered markup if `container`
            is not specified, otherwise return undefined.
        **/
        renderComponent: function (locals, container) {
            var result,
                instance = this.instance;

            if (instance.isMounted()) {
                instance.setProps(locals);
            } else {
                Y.mix(instance.props, locals, true);

                if (container) {
                    React.renderComponent(
                        instance,
                        container._node || container
                    );
                    return;
                } else {
                    container = document.createElement('div');
                    React.renderComponent(instance, container);
                    return container.innerHTML;
                }
            }
        }
    }, {
        ATTRS: {
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
