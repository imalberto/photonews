
## TODO

- In the React component implementation, instead of having this:

```
import {config} from 'yui';

var React = config.global.React;

React.renderComponent(...);
```

Add the `react.js` file wrapped as a YUI module under `lib/common` and then:

```
import React from 'react';

React.renderComponent(...);
```


## DONE


- In `lib/client/view-client.js` in `renderComponent` function:
    - Check if the component is already mounted, and if so, use `setProps`.
    - If the component is not mounted, then use the current code path.
    - Also simplify the logic in the actual `Y.View` implementation and add the 
      code to `container.setHTML(html);` instead of having every single view
      to add that code, since the View code will be executed on both client and
      server, and this code is really meant for the server environment.
- Remove the `container.setHTML(html)` code from all `Y.View` subclasses since
  this is being done now in `lib/client/view-client#renderComponent`
