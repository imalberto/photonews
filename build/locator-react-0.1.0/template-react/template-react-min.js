YUI.add("template-react",function(e){var t=e.config.global.React;t.revive=t.revive||function(n){return function(r,i){var s=!i&&document.createDocumentFragment(),o=t.createClass({render:n}),u=o();return i=i&&i._node||i,e.mix(u.props,r,!0),t.renderComponent(u,i||s),!i&&s.innerHTML}}},"@VERSION@",{requires:["template-base"]});
