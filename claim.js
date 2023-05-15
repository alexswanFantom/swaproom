const axios = require("axios");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const color = {
  BLACK: "\u001b[30m",
  RED: "\u001b[31m",
  GREEN: "\u001b[32m",
  YELLOW: "\u001b[33m",
  BLUE: "\u001b[34m",
  MAGENTA: "\u001b[35m",
  CYAN: "\u001b[36m",
  WHITE: "\u001b[37m",
  RESET: "\u001b[0m",
};
number = 0;

async function claimARB(address) {
  status = false;
  try {
    const res = await axios.get(
      "https://swaprum.finance/server/claim-free?address=" + address
    );
    if ("error" in res.data) {
      console.log(
        "[" +
          address.substring(0, 5) +
          "]." +
          color.RED +
          " Wait for one hours!!" +
          color.RESET
      );
      await sleep(250000);
      await claimARB(address);
    } else {
      console.log(
        "[" +
          address.substring(0, 5) +
          "]." +
          color.GREEN +
          " Succes claim!!" +
          color.RESET
      );
      status = true;
      await sleep(600000);
      await claimARB(address);
    }
    return status;
  } catch (err) {
    console.error(err.message);
  }
}

const address = [
  "0xDf53e6707BEE9A30193AdE11505838D57f4A0fdf",
  "0x02F0e960b81BB152163E75230d4b0596c09d0DEb",
  "0xB16d034DFCc29FFd2Fc1552a77dBcc790e06E406",
  "0x936E3bf1E11A75B5172e4208375688600422d345",
];

async function main() {
  for (let i = 0; i < address.length; i++) {
    claimARB(address[i]);
  }
}

main();
