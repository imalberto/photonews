/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {PN} from 'pn';
import {config} from 'yui';

import AboutComponent from 'jsx/about';

var React = config.global.React;

var AboutView = PN.View.extend({

    template: AboutComponent,

    // aboutTemplate: function (locals, container) {
    //     var result,
    //         instance;

    //     instance = this.Template(locals);
    //     if (container && container._node) {
    //         // render on client
    //         // Let React take over
    //         React.renderComponent(
    //             instance,
    //             container._node
    //         );
    //     } else {
    //         // render on server
    //         React.renderComponentToString(instance, function (html) {
    //             result = html;
    //         });
    //         return result;
    //     }
    // },

    events: {},
    render: function () {
        var container = this.get('container'),
            locals = this.get('locals'),
            html;

        // NOTE: handle rendering both on server and client runtimes
        html = this.renderComponent(locals, container);
        if (html) {
            container.setHTML(html);
        }

        return this;
    },

    renderXXXX: function () {
        var container = this.get('container'),
            locals = this.get('locals'),
            html;

        // NOTE: handle rendering both on server and client runtimes
        html = this.template(locals, container);
        if (html) {
            container.setHTML(html);
        }

        return this;

        // html = this.template({ src: 'about' });
        // container.setHTML(html);

        // return this;
    }

});

export default AboutView;
