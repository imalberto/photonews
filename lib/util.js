
/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('util', function (Y, NAME) {

    var STRING_CAMELIZE_REGEXP = (/(\-|_|\.|\s)+(.)?/g),
        STRING_DECAMELIZE_REGEXP = (/([a-z])([A-Z])/g);


    /**
      Returns the lowerCamelCase form of a string.

      ```javascript
      'innerHTML'.camelize();          // 'innerHTML'
      'action_name'.camelize();        // 'actionName'
      'css-class-name'.camelize();     // 'cssClassName'
      'my favorite items'.camelize();  // 'myFavoriteItems'
      'My Favorite Items'.camelize();  // 'myFavoriteItems'
      ```

      @method camelize
      @param {String} str The string to camelize.
      @return {String} the camelized string.
    */
    function camelize(str) {
        return str.replace(STRING_CAMELIZE_REGEXP, function (match, separator, chr) {
            return chr ? chr.toUpperCase() : '';
        }).replace(/^([A-Z])/, function (match, separator, chr) {
            return match.toLowerCase();
        });
    }


    /**
      Converts a camelized string into all lower case separated by underscores.

      ```javascript
      'innerHTML'.decamelize();           // 'inner_html'
      'action_name'.decamelize();        // 'action_name'
      'css-class-name'.decamelize();     // 'css-class-name'
      'my favorite items'.decamelize();  // 'my favorite items'
      ```

      @method decamelize
      @param {String} str The string to decamelize.
      @return {String} the decamelized string.
    */
    function decamelize(str) {
        return str.replace(STRING_DECAMELIZE_REGEXP, '$1_$2').toLowerCase();
    }

    /**
      Returns the UpperCamelCase form of a string.

      ```javascript
      'innerHTML'.classify();          // 'InnerHTML'
      'action_name'.classify();        // 'ActionName'
      'css-class-name'.classify();     // 'CssClassName'
      'my favorite items'.classify();  // 'MyFavoriteItems'
      ```

      @method classify
      @param {String} str the string to classify
      @return {String} the classified string
    */
    function classify(str) {
        var parts = str.split("."),
            out = [],
            camelized,
            i;

        for (i = 0, l = parts.length; i < l; i++) {
            camelized = camelize(parts[i]);
            out.push(camelized.charAt(0).toUpperCase() + camelized.substr(1));
        }

        return out.join(".");
    }

    Y.namespace('PN').util = {
        classify: classify,
        camelize: camelize,
        decamelize: decamelize
    };

}, '0.0.1', {
    requires: []
});

