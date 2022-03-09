const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(
        ["LA Vine", "Stevzie", "Kale"],
        ["https://i.imgur.com/SCnQOdR.gif", "https://i.imgur.com/AkDTJCf.gif", "https://i.imgur.com/NphmvkH.gif"],
        [300, 200, 100],
        [25, 50, 100],
        "Illiterato",
        "https://c.tenor.com/ER8cMBxVBygAAAAM/venom-transform-gif-marvel-comics.gif",
        10000,
        50
    );
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();