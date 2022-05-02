"use strict";(self.webpackChunkpackages_docs=self.webpackChunkpackages_docs||[]).push([[120],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return d}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),u=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},p=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),f=u(r),d=o,m=f["".concat(s,".").concat(d)]||f[d]||l[d]||i;return r?n.createElement(m,a(a({ref:t},p),{},{components:r})):n.createElement(m,a({ref:t},p))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,a=new Array(i);a[0]=f;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:o,a[1]=c;for(var u=2;u<i;u++)a[u]=r[u];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},4965:function(e,t,r){r.r(t),r.d(t,{assets:function(){return p},contentTitle:function(){return s},default:function(){return d},frontMatter:function(){return c},metadata:function(){return u},toc:function(){return l}});var n=r(7462),o=r(3366),i=(r(7294),r(3905)),a=["components"],c={sidebar_position:2,title:"Process"},s=void 0,u={unversionedId:"protocol/process",id:"protocol/process",title:"Process",description:"Sequence Diagram",source:"@site/docs/protocol/process.md",sourceDirName:"protocol",slug:"/protocol/process",permalink:"/videre/docs/protocol/process",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/protocol/process.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Process"},sidebar:"tutorialSidebar",previous:{title:"Overview",permalink:"/videre/docs/protocol/overview"},next:{title:"Primitives",permalink:"/videre/docs/protocol/primitives"}},p={},l=[{value:"Sequence Diagram",id:"sequence-diagram",level:2},{value:"Verification",id:"verification",level:2}],f={toc:l};function d(e){var t=e.components,r=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,n.Z)({},f,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"sequence-diagram"},"Sequence Diagram"),(0,i.kt)("img",{src:"https://www.plantuml.com/plantuml/png/ZLDDJ-Cm4BtxLuoALC4XVw124TI0X52XkqPxukB6azQgOuUnNRR_ViTH5iANTY-99lDctfitaukODANSEI6IJGxX9sfNlGHo1YBImJO8-BlPQRz58NIJ0e4CFkOE2NG4APupPeJP2cFKM-kte8unOVVaJn_Qjk9Awyzc1RfImkYaDpeoVEb2in-IS3wFEulEr0DgAKUMcHhfrnGErY0DQRKMOaiXz_0Z8nq50CYgNYbOW49DpGuasOHaTKbn9tlG2GitXojLrMhz3oWpS4YOCdbGUTFP13m9KeGvFFJ9ylIiUO_7UWBy3e7U_1LynSwEUfToCOICCi4vJVMauwiIjeB3vOX_9EqZaq2RlOcGGjb38aQ_TPdY9M5fyYlaPiTLzpUFOxPui83h0_e4fqN5MKc4FfqG6ZZfhT_3RGi--8gmaEaDtyNv_4MJv_s-afGkxqMLJ1cONmO_63eGoy-y4o3FEx5BvRvts35QJ_QyW3Nx73nxTyN7nBAiRyENzdtO-N_NlJk0ItdtUTcJZuFW2txoB_G7",alt:"Your title"}),(0,i.kt)("h2",{id:"verification"},"Verification"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"./messaging"},"Messages")," exchanged and ",(0,i.kt)("a",{parentName:"p",href:"./storage"},"data")," stored are verified using an ",(0,i.kt)("a",{parentName:"p",href:"./on-chain"},"on-chain")," registry of valid service providers. This registry provides:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Role-based authentication to verify signers for the service-provider."),(0,i.kt)("li",{parentName:"ol"},"Document timestamping for data storage.")))}d.isMDXComponent=!0}}]);