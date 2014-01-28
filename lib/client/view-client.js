/*jslint nomen:true, node:true*/
/*global YUI, document*/
/*global React*/

YUI.add('view-client', function (Y, NAME) {

    'use strict';

    var React = Y.config.global.React,
        ReactView;

    ReactView = Y.Base.create('reactView', Y.View, [Y.Model], {

        initializer: function () {
            var attrs = this.getOwnAttrs();

            this.component = this.get('component')(attrs.locals);
            React.renderComponent(this.component, this.get('container').getDOMNode());

            this.after('*:change', this.render, this);
            this.after('change', this.updateObservers, this);

        },

        observe: function (obj) {
            this.observed || (this.observed = {});

            if (obj && typeof obj.addTarget === 'function' && (obj._isYUIModel || obj._isYUIModelList)) {
                this.observed[Y.stamp(obj, true)] = obj.addTarget(this);
            }
        },

        unobserve: function (obj) {
            this.observed || (this.observed = {});
            var id = obj && Y.stamp(obj, true);

            if (obj && this.observed[id]) {
                obj.removeTarget(this);
                delete this.observed[id];
            }
        },

        updateObservers: function (e) {
            if (e.target !== this) { return; }

            Y.Object.each(e.changed, function (attrChange) {
                this.unobserve(attrChange.prevVal);
                this.observe(attrChange.newVal);
            }, this);
        },

        render: function () {
            this.component.setProps(this.getOwnAttrs());
            return this;
        },

        getOwnAttrs: function () {
            var attrs = this.getAttrs();

            // Prune view-specific attributes.
            delete attrs.initialized;
            delete attrs.destroyed;
            delete attrs.container;
            delete attrs.component;
            delete attrs.id;
            delete attrs.clientId;

            return attrs;
        }

    }, {
        ATTRS: {
            component: {writeOnce: true}
        }
    });

    Y.ReactView = ReactView;

}, '@VERSION', {
    affinity: 'client',
    requires: [
        'view',
        'react'
    ]
});
