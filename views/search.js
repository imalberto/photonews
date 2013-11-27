/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {DefaultView} from 'default-view';
import {Template} from 'photonews-template-photos';
import {Base} from 'base-build';

var SearchView = Base.create('search-view', DefaultView, [], {

    template: Template.get('photonews/photos'),

    events: {},

    initializer: function (config) {
        this.config = config;
    },

    render: function () {
        var container = this.get('container'),
            html;

        html = this.template({ src: 'search' });
        container.setHTML(html);

        return this;
    }

});

export default SearchView;
