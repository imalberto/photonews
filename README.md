photonews
=========

Photonews is an example web application showing "modown" in action.

## To setup and run the app

```
git clone https://github.com/imalberto/photonews.git
cd photonews
npm install
npm install grunt -g
grunt
npm start
```

## What is the purpose of the app ?

The app attempts to show the following concepts using the `modown` family of
components.

- Isomophic design, meaning that controllers, models and views are both shared
  between the client and server runtimes.
- Sharing of Express routes configuration to the browser that the client
  framework (YAF) uses to setup its own routing.
- Application level modules are written in ES6 module format, and levaraging the
  ES6 transpiler to enable loader metadata generation for YUI modules to share
  with the client runtime.
- Integrating YAF on the client side.


