import { utils } from "ethers";

console.log(utils.verifyTypedData(
  {
    name: "asdf",
    version: "1"
  },
  {
    Test: [
      {name: "test", type: "string"}
    ]
  },
  {
    test: "asdf"
  },
  "asdf"
))
