YUI.add('resize-client', function (Y) {

    'use strict';

    var HEIGHTS = [];

    function getHeight(images, width) {
        width -= images.length * 5;
        var h = 0;
        var i;
        var imgNode;
        for (i = 0; i < images.length; ++i) {
            // h += $(images[i]).data('width') / $(images[i]).data('height');

            // h += Y.one(images[i]).getData('width') / Y.one(images[i]).getData('height');
            imgNode = Y.one(images[i]);
            h += imgNode.getData('width') / imgNode.getData('height');

        }
        return width / h;
    }

    function setHeight(images, height) {
        var i;
        var imgNode;
        var h, w;

        HEIGHTS.push(height);
        for (i = 0; i < images.length; ++i) {

            // $(images[i]).css({
            //   width: height * $(images[i]).data('width') / $(images[i]).data('height'),
            //   height: height
            // });
            //
            // $(images[i]).attr('src', $(images[i]).attr('src').
            // replace(/w[0-9]+-h[0-9]+/, 'w' + $(images[i]).width() +
            // '-h' + $(images[i]).height()));


            imgNode = Y.one(images[i]);
            w = height * imgNode.getData('width') / imgNode.getData('height');
            imgNode.setStyle('width', w);
            imgNode.setStyle('height', h);
        }
    }

    // function resize(images, width) {
    //     setHeight(images, getHeight(images, width));
    // }

    function run(max_height) {
        var size = window.innerWidth - 50;

        var n = 0;
        var images = Y.all('img');
        var i, h;
        var slice;

        w: while (images.length > 0) {
            for (i = 1; i < images.length + 1; ++i) {
                slice = images.slice(0, i);
                h = getHeight(slice, size);
                if (h < max_height) {
                    setHeight(slice, h);
                    n++;
                    images = images.slice(i);
                    continue w;
                }
            }
            setHeight(slice, Math.min(max_height, h));
            n++;
            break;
        }
        console.log(n);
    }

    Y.resize = run;

}, '@VERSION@', {"affinity": "client", "requires": ["node"]});
