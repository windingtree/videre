"use strict";(self.webpackChunk_windingtree_videre_sdk_docs=self.webpackChunk_windingtree_videre_sdk_docs||[]).push([[95],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return h}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=p(n),h=r,u=m["".concat(s,".").concat(h)]||m[h]||d[h]||i;return n?a.createElement(u,o(o({ref:t},c),{},{components:n})):a.createElement(u,o({ref:t},c))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var p=2;p<i;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8028:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return s},default:function(){return h},frontMatter:function(){return l},metadata:function(){return p},toc:function(){return d}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),o=["components"],l={sidebar_position:1},s="Quick-start",p={unversionedId:"tutorial/quick-start",id:"tutorial/quick-start",title:"Quick-start",description:"When running the proof of concept, there are three features that need to be run simultaneously: the blockchain node, the real-world service provider, and the consumer.",source:"@site/docs/tutorial/quick-start.md",sourceDirName:"tutorial",slug:"/tutorial/quick-start",permalink:"/videre/docs/tutorial/quick-start",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tutorial/quick-start.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Welcome!",permalink:"/videre/docs/"},next:{title:"Overview",permalink:"/videre/docs/protocol/overview"}},c={},d=[{value:"Hardhat node",id:"hardhat-node",level:2},{value:"Server",id:"server",level:2},{value:"Client",id:"client",level:2}],m={toc:d};function h(e){var t=e.components,n=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"quick-start"},"Quick-start"),(0,i.kt)("p",null,"When running the proof of concept, there are three features that need to be run simultaneously: the blockchain ",(0,i.kt)("a",{parentName:"p",href:"#hardhat-node"},"node"),", the ",(0,i.kt)("a",{parentName:"p",href:"#server"},"real-world service provider"),", and the ",(0,i.kt)("a",{parentName:"p",href:"#client"},"consumer"),"."),(0,i.kt)("h2",{id:"hardhat-node"},"Hardhat node"),(0,i.kt)("p",null,"Clone the ",(0,i.kt)("inlineCode",{parentName:"p"},"videre-contracts")," repository:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"git clone https://github.com/windingtree/videre-contracts\n")),(0,i.kt)("p",null,"Install the dependencies:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"cd videre-contracts\nyarn\n")),(0,i.kt)("p",null,"Compile ",(0,i.kt)("inlineCode",{parentName:"p"},"typechain")," artifacts:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"yarn hardhat compile\n")),(0,i.kt)("p",null,"Generate a ",(0,i.kt)("inlineCode",{parentName:"p"},"mnemonic")," that you can use for test accounts. To do so, you can use ",(0,i.kt)("a",{parentName:"p",href:"https://iancoleman.io/bip39/"},"this BIP39 generator"),". At the Mnemonic Code Converter:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Select '24' words from the drop-down box."),(0,i.kt)("li",{parentName:"ul"},"Press 'GENERATE'"),(0,i.kt)("li",{parentName:"ul"},"Copy the results of the ",(0,i.kt)("inlineCode",{parentName:"li"},"BIP39 Mnemonic")," field to clipboard for the next step.")),(0,i.kt)("p",null,"Configure the environment variables (",(0,i.kt)("inlineCode",{parentName:"p"},".env"),"), within the cloned repository's root directory to be similar to:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-raw",metastring:'title=".env"',title:'".env"'},'# network specific node uri : `"ETH_NODE_URI_" + networkName.toUpperCase()`\nETH_NODE_URI_MAINNET=https://eth-mainnet.alchemyapi.io/v2/<apiKey>\nETH_NODE_URI_SOKOL=https://sokol.poa.network\nETH_NODE_URI_GNOSIS=https://rpc.xdaichain.com\n# generic node uri (if no specific found) :\nETH_NODE_URI=https://{{networkName}}.infura.io/v3/<apiKey>\n\n# network specific mnemonic : `"MNEMONIC_ " + networkName.toUpperCase()`\n# MNEMONIC_MAINNET=<mnemonic for mainnet>\n# generic mnemonic (if no specific found):\nMNEMONIC=<paste your mnemonic here with greater than/less than symbols>\n\n# forking\n# HARDHAT_FORK=gnosis\n\n# coinmarketcap api key for gas report\nCOINMARKETCAP_API_KEY=\nREPORT_GAS=true\n\n# Etherscan API key for automatic verification of contracts\nETHERSCAN_API_KEY=\n')),(0,i.kt)("p",null,"Now start the hardhat local blockchain for testing:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"yarn hardhat node\n")),(0,i.kt)("p",null,"When starting the hardhat local node, search through the console output for the address at which the ",(0,i.kt)("inlineCode",{parentName:"p"},"StaysFacility")," contract was deployed. Example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'deploying "StaysFacility" (tx: 0x717c1eb6649abe7b92a0a2bead9b9f3b505da385980486283e5912ac90d699a9)...: deployed at 0x29b67856f9ca63dF5E688454B17F70Afd5071aa0 with 1758370 gas\n')),(0,i.kt)("p",null,"In the above example, the ",(0,i.kt)("inlineCode",{parentName:"p"},"StaysFacility")," contract was deployed to ",(0,i.kt)("inlineCode",{parentName:"p"},"0x29b67856f9ca63dF5E688454B17F70Afd5071aa0"),". Copy the address where it deployed on ",(0,i.kt)("strong",{parentName:"p"},"your")," local hardhat node as this will be used in subsequent configuration. For now though, your local blockchain node is running and ready to accept connections!"),(0,i.kt)("h2",{id:"server"},"Server"),(0,i.kt)("p",null,"Open another terminal window and clone the ",(0,i.kt)("inlineCode",{parentName:"p"},"videre")," repository."),(0,i.kt)("div",{className:"admonition admonition-danger alert alert--danger"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"danger")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Be sure not to clone ",(0,i.kt)("inlineCode",{parentName:"p"},"videre")," into the ",(0,i.kt)("inlineCode",{parentName:"p"},"videre-contracts")," directory."))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"git clone https://github.com/windingtree/videre\n")),(0,i.kt)("p",null,"Install the dependencies:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"yarn                  # installs lerna for monorepo\nyarn lerna bootstrap  # bootstrap packages\n")),(0,i.kt)("p",null,"Change to the ",(0,i.kt)("inlineCode",{parentName:"p"},"demo")," directory:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"cd packages/demo\n")),(0,i.kt)("p",null,"Generate the protobuf TypeScript:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"yarn protoc --ts_out ./src/proto --proto_path ./src/proto ./src/proto/*\n")),(0,i.kt)("p",null,"Copy over the ",(0,i.kt)("inlineCode",{parentName:"p"},"typechain")," artifacts from the ",(0,i.kt)("inlineCode",{parentName:"p"},"videre-contracts")," repo:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"cp -pR path/to/videre-contracts/typechain .\n")),(0,i.kt)("p",null,"Configure the environment varibles (",(0,i.kt)("inlineCode",{parentName:"p"},".env"),") in the ",(0,i.kt)("inlineCode",{parentName:"p"},"demo")," directory to be similar to:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-raw",metastring:'title="packages/demo/.env"',title:'"packages/demo/.env"'},"MNEMONIC=<paste your mnemonic from before here with greater than/less than symbols>\nSERVER_KEY_INDEX=1\nCLIENT_KEY_INDEX=2\nRPC_URL=http://127.0.0.1:8545\nVIDERE_DAPP_NAME=videre-stays\nVIDERE_DAPP_VERSION=1\nREGISTRY_ADDRESS=<fill in with deployment address from videre-contracts>\nFACILITY_NAME=Testing Facility\nFACILITY_DATA_URI=http://testurl/\nFACILITY_LOCATION=u173z\n")),(0,i.kt)("p",null,"Now, you can start the ",(0,i.kt)("inlineCode",{parentName:"p"},"server"),", and this will simulate being a service provider:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"yarn ts-node ./src/server.ts\n")),(0,i.kt)("p",null,"At this point, you should see the following activity:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"The ",(0,i.kt)("inlineCode",{parentName:"li"},"server")," registers a test ",(0,i.kt)("inlineCode",{parentName:"li"},"facility"),"."),(0,i.kt)("li",{parentName:"ol"},"The ",(0,i.kt)("inlineCode",{parentName:"li"},"server")," registers 5 ",(0,i.kt)("inlineCode",{parentName:"li"},"space"),"s for the ",(0,i.kt)("inlineCode",{parentName:"li"},"facilityHash")," from (1)."),(0,i.kt)("li",{parentName:"ol"},"The ",(0,i.kt)("inlineCode",{parentName:"li"},"server")," connects to ",(0,i.kt)("inlineCode",{parentName:"li"},"Waku")," to monitor applicable ",(0,i.kt)("inlineCode",{parentName:"li"},"content-topic"),"s.")),(0,i.kt)("p",null,"This activity will be visible on the ",(0,i.kt)("a",{parentName:"p",href:"#hardhat-node"},"node")," as well as on the ",(0,i.kt)("inlineCode",{parentName:"p"},"server"),"."),(0,i.kt)("h2",{id:"client"},"Client"),(0,i.kt)("p",null,"Open another terminal window and change into the ",(0,i.kt)("inlineCode",{parentName:"p"},"demo")," package's directory:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"cd path/to/demo\n")),(0,i.kt)("p",null,"All the configuration for the ",(0,i.kt)("inlineCode",{parentName:"p"},"client")," has already been done from the previous steps, so we can now run the ",(0,i.kt)("inlineCode",{parentName:"p"},"client")," to make a query for accommodation:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"yarn ts-node ./src/client.ts\n")),(0,i.kt)("p",null,"At this point, you should see the following activity:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"The ",(0,i.kt)("inlineCode",{parentName:"li"},"client")," connects to ",(0,i.kt)("inlineCode",{parentName:"li"},"Waku")," and asks (ping) for all ",(0,i.kt)("inlineCode",{parentName:"li"},"facilityHash")," in a certain shard."),(0,i.kt)("li",{parentName:"ol"},"The ",(0,i.kt)("inlineCode",{parentName:"li"},"server")," responds (pong)with it's ",(0,i.kt)("inlineCode",{parentName:"li"},"facilityHash")," and some additional details."),(0,i.kt)("li",{parentName:"ol"},"The ",(0,i.kt)("inlineCode",{parentName:"li"},"client")," verifies the pong from the ",(0,i.kt)("inlineCode",{parentName:"li"},"server")," against the ",(0,i.kt)("inlineCode",{parentName:"li"},"StaysFacility")," contract."),(0,i.kt)("li",{parentName:"ol"},"The ",(0,i.kt)("inlineCode",{parentName:"li"},"client"),", knowing there is a legitimate ",(0,i.kt)("inlineCode",{parentName:"li"},"facility"),", asks for a stay with specific parameters (check-in, check-out, number of adults, number of children, number of spaces)."),(0,i.kt)("li",{parentName:"ol"},"The ",(0,i.kt)("inlineCode",{parentName:"li"},"server")," receives the query from (4) and dispatches this to an ",(0,i.kt)("inlineCode",{parentName:"li"},"auctioneer")," that takes the ",(0,i.kt)("inlineCode",{parentName:"li"},"ask")," parameters as input. It's then determined if the ",(0,i.kt)("inlineCode",{parentName:"li"},"facility")," wants to make a ",(0,i.kt)("inlineCode",{parentName:"li"},"bid")," for this business."),(0,i.kt)("li",{parentName:"ol"},"The ",(0,i.kt)("inlineCode",{parentName:"li"},"server")," crafts a ",(0,i.kt)("em",{parentName:"li"},"signed")," bid to ",(0,i.kt)("inlineCode",{parentName:"li"},"client"),"."),(0,i.kt)("li",{parentName:"ol"},"The ",(0,i.kt)("inlineCode",{parentName:"li"},"client")," verifies the ",(0,i.kt)("inlineCode",{parentName:"li"},"server"),"'s bid, and chooses one of the offers."),(0,i.kt)("li",{parentName:"ol"},"The ",(0,i.kt)("inlineCode",{parentName:"li"},"client")," uses the bid's ",(0,i.kt)("inlineCode",{parentName:"li"},"signature")," to make the deal on-chain."),(0,i.kt)("li",{parentName:"ol"},"The ",(0,i.kt)("inlineCode",{parentName:"li"},"server"),", through event monitoring, can see that the ",(0,i.kt)("inlineCode",{parentName:"li"},"client")," has made the deal. \ud83e\udd73")),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Sometimes there are connectivity issues to ",(0,i.kt)("inlineCode",{parentName:"p"},"Waku")," from the ",(0,i.kt)("inlineCode",{parentName:"p"},"client"),". Use ",(0,i.kt)("inlineCode",{parentName:"p"},"Ctrl + C")," to terminate the ",(0,i.kt)("inlineCode",{parentName:"p"},"client")," and start it again."))))}h.isMDXComponent=!0}}]);