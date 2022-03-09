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

    let txn;

    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();

    txn = await gameContract.attackBoss();
    await txn.wait();

    txn = await gameContract.attackBoss();
    await txn.wait();


    let returnedTokenUri = await gameContract.tokenURI(1);
    console.log("Token URI:", returnedTokenUri);
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