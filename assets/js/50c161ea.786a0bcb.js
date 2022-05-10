"use strict";(self.webpackChunk_windingtree_videre_sdk_docs=self.webpackChunk_windingtree_videre_sdk_docs||[]).push([[247],{3905:function(e,t,n){n.d(t,{Zo:function(){return m},kt:function(){return u}});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=i.createContext({}),d=function(e){var t=i.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},m=function(e){var t=d(e.components);return i.createElement(p.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},c=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,p=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),c=d(n),u=a,g=c["".concat(p,".").concat(u)]||c[u]||l[u]||r;return n?i.createElement(g,o(o({ref:t},m),{},{components:n})):i.createElement(g,o({ref:t},m))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=c;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var d=2;d<r;d++)o[d]=n[d];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}c.displayName="MDXCreateElement"},3869:function(e,t,n){n.r(t),n.d(t,{assets:function(){return m},contentTitle:function(){return p},default:function(){return u},frontMatter:function(){return s},metadata:function(){return d},toc:function(){return l}});var i=n(7462),a=n(3366),r=(n(7294),n(3905)),o=["components"],s={sidebar_position:4,title:"Messaging (Off-chain)"},p=void 0,d={unversionedId:"protocol/messaging",id:"protocol/messaging",title:"Messaging (Off-chain)",description:"Messaging System",source:"@site/docs/protocol/messaging.md",sourceDirName:"protocol",slug:"/protocol/messaging",permalink:"/videre/docs/protocol/messaging",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/protocol/messaging.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,title:"Messaging (Off-chain)"},sidebar:"tutorialSidebar",previous:{title:"Primitives",permalink:"/videre/docs/protocol/primitives"},next:{title:"Storage (Off-chain)",permalink:"/videre/docs/protocol/storage"}},m={},l=[{value:"Messaging System",id:"messaging-system",level:2},{value:"Content Topics",id:"content-topics",level:2},{value:"Messages",id:"messages",level:2},{value:"Discovery",id:"discovery",level:3},{value:"Bid / Ask (Generic)",id:"bid--ask-generic",level:3},{value:"Stays (Accommodation Implementation)",id:"stays-accommodation-implementation",level:3},{value:"Videre Protocol",id:"videre-protocol",level:4},{value:"Messages",id:"messages-1",level:4}],c={toc:l};function u(e){var t=e.components,n=(0,a.Z)(e,o);return(0,r.kt)("wrapper",(0,i.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"messaging-system"},"Messaging System"),(0,r.kt)("p",null,"The protocol is designed to be messaging system ",(0,r.kt)("em",{parentName:"p"},"agnostic"),". For the quick-start and proof-of-concept implementations, the messaging system used is ",(0,r.kt)("a",{parentName:"p",href:"https://waku.org/"},(0,r.kt)("em",{parentName:"a"},"Waku")),". Waku fulfills the design requirement for ",(0,r.kt)("em",{parentName:"p"},"anonymous, decentralised")," messaging. In order to meet the design ",(0,r.kt)("em",{parentName:"p"},"transparency")," design requirements, no attempts are made to obfuscate / encrypt data. ",(0,r.kt)("em",{parentName:"p"},"Authenticity")," is asserted using payload signatures verified against a blockchain registry. "),(0,r.kt)("h2",{id:"content-topics"},"Content Topics"),(0,r.kt)("p",null,"All clients communicating on the Videre protocol do so on ",(0,r.kt)("em",{parentName:"p"},"known")," Waku ",(0,r.kt)("inlineCode",{parentName:"p"},"contentTopic"),"s. The specification for a ",(0,r.kt)("inlineCode",{parentName:"p"},"contentTopic")," in Videre covers:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"which")," real-world industry the service is conducted in (eg. ",(0,r.kt)("em",{parentName:"li"},"stays"),") for accommodation."),(0,r.kt)("li",{parentName:"ul"},"A protocol ",(0,r.kt)("inlineCode",{parentName:"li"},"version")," number to allow for graceful handling of protocol upgrades."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"what")," the specific component for the API is (eg. ",(0,r.kt)("inlineCode",{parentName:"li"},"ping"),")."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"where")," this interaction is taking place, defined by the industry implementation. For example, ",(0,r.kt)("inlineCode",{parentName:"li"},"stays")," elects to implement this as an ",(0,r.kt)("a",{parentName:"li",href:"https://h3geo.org/"},(0,r.kt)("inlineCode",{parentName:"a"},"h3Index")),", whereas aviation may elect for this to be a bytes string such as ",(0,r.kt)("inlineCode",{parentName:"li"},"JKF-LHR"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"how")," the protocol is encoded, ie. ",(0,r.kt)("inlineCode",{parentName:"li"},"proto")," for protobuf.")),(0,r.kt)("p",null,"A complete example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-raw"},"/videre/stays/1/ping/8928308280fffff/proto\n\nwhich   = stays\nversion = 1\nwhat    = ping\nwhere   = 8928308280fffff\nhow     = proto\n")),(0,r.kt)("h2",{id:"messages"},"Messages"),(0,r.kt)("h3",{id:"discovery"},"Discovery"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Content topics ",(0,r.kt)("em",{parentName:"strong"},"'what'")),": ping, pong"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-protobuf"},"message Ping {\n  // timestamp when this ping was sent.\n  google.protobuf.Timestamp timestamp = 1;\n}\n\nmessage Pong {\n  // primitive serviceProvider.id\n  bytes serviceProvider = 1;\n  // the location where the services are provided - specified by the industry implementation\n  bytes loc = 2;\n  // timestamp when the pong was sent.\n  google.protobuf.Timestamp timestamp = 3;\n  // signature of a bidder signer for the service provider, verifiable on-chain\n  bytes signature = 4;\n}\n")),(0,r.kt)("div",{className:"admonition admonition-warning alert alert--danger"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"warning")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},(0,r.kt)("strong",{parentName:"p"},"DO NOT ASSUME THAT TIMESTAMPS SENT VIA THE PROTOCOL ARE TRUSTWORTHY.")," "))),(0,r.kt)("h3",{id:"bid--ask-generic"},"Bid / Ask (Generic)"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Content topics ",(0,r.kt)("em",{parentName:"strong"},"'what'")),": bid, ask"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-protobuf"},"message AskWrapper {\n  // random salt used to target bid\n  bytes salt = 1;\n  // the payload (ask) from the consumer to the service providers\n  bytes payload = 2;\n}\n\nmessage BidWrapper {\n  // primitive serviceProvider.id\n  bytes serviceProvider = 1;\n  // keccak(AskWrapper.salt & AskWrapper.payload) for response filtering\n  bytes askDigest = 2;\n  // the payload (bid) from the service provider to the consumer\n  bytes payload = 3;\n  // bidder signs hash of fields (1,2,3)\n  bytes signature = 4;\n}\n\nmessage BidItem {\n  // primitive item.id - service being offered\n  bytes itemHash = 1;\n}\n\nmessage BidTerm {\n  // primitive term.id - terms by which the service is subject to\n  bytes termsHash = 1;\n  // the contract address implementing ITerm\n  bytes implementation = 2;\n  // abi encoded payload that may be passed to a contract implementing ITerm\n  optional bytes payload = 3;\n}\n\n// an optional item is an item that comes with an additional cost\nmessage BidOptionItem {\n  BidItem item = 1;\n  repeated videre.type.ERC20Native cost = 2;\n  // bidder signs hash of fields (1, 2, askDigest)\n  bytes signature = 3;\n}\n\n// an optional term is a term that comes with an additional cost\nmessage BidOptionTerm {\n  BidTerm term = 1;\n  repeated videre.type.ERC20Native cost = 2;\n  // bidder signs hash of fields (1, 2, askDigest)\n  bytes signature = 3;\n}\n\nmessage BidOptions {\n  // optional items and/or terms that may be purchased\n  repeated BidOptionItem items = 1;\n  repeated BidOptionTerm terms = 2;\n}\n\nmessage BidLine {\n  // the item(s) offered in a bundled state, ie. space + breakfast\n  repeated BidItem items = 1;\n  // the term(s) offered in a bundled state, ie. fully flexible + no cancellation\n  repeated BidTerm terms = 2;\n  // the option(s) offered, ie. add breakfast, add fully-flexible\n  BidOptions options = 3;\n  // the maximum number of times this bid authorisation can be used\n  uint32 limit = 4;\n  // the latest timestamp at which this bid is valid\n  google.protobuf.Timestamp expiry = 5;\n  // the cost in specified tokens or native unit of account\n  // TODO: expand to detailed cost structure\n  repeated videre.type.ERC20Native cost = 6; // include the capabilities for negative costs\n  // bidder signs hash (serviceProvider.id, askDigest, items, terms, expiry, cost))\n  bytes signature = 7;\n}\n\nmessage Bids {\n  // bids that match the ask\n  repeated BidLine bids = 1;\n}\n")),(0,r.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},(0,r.kt)("inlineCode",{parentName:"p"},"AskWrapper.payload")," is defined as ",(0,r.kt)("inlineCode",{parentName:"p"},"bytes")," to allow a generic, industry-agnostic bid / ask protocol to be defined. Specific ask parameters are defined in industry-specific protocol implementations of Videre."))),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},(0,r.kt)("inlineCode",{parentName:"p"},"BidWrapper.payload")," is defined as ",(0,r.kt)("inlineCode",{parentName:"p"},"bytes")," for possible future expansion to industry-specific bid replies."))),(0,r.kt)("h3",{id:"stays-accommodation-implementation"},"Stays (Accommodation Implementation)"),(0,r.kt)("p",null,"The quick-start / reference implementation for Videre is targetted at the accommodation industry. Here we define the ask parameters used by ",(0,r.kt)("em",{parentName:"p"},"consumers"),"."),(0,r.kt)("h4",{id:"videre-protocol"},"Videre Protocol"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Content-topic ",(0,r.kt)("inlineCode",{parentName:"li"},"where")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"loc")," reply: For ",(0,r.kt)("inlineCode",{parentName:"li"},"stays"),", this is implemented as an ",(0,r.kt)("a",{parentName:"li",href:"https://h3geo.org/"},(0,r.kt)("inlineCode",{parentName:"a"},"h3Index")),".")),(0,r.kt)("h4",{id:"messages-1"},"Messages"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-protobuf"},"message StaysAsk {\n  // the date of check-in for the stay\n  google.type.Date checkIn = 1;\n  // the date of check-out for the stay\n  google.type.Date checkOut = 2;\n  // the number of adults staying\n  uint32 numPaxAdult = 3;\n  // the number of children staying\n  optional uint32 numPaxChild = 4;\n  // the number of spaces (rooms)\n  uint32 numSpacesReq = 5;\n}\n")))}u.isMDXComponent=!0}}]);