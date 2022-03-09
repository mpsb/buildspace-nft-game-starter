const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.attach("0x6d540478de34057062dBF9421C4Fd22fF9Bb9aA3");

    let txn;
    txn = await gameContract.attackBoss();
    await txn.wait();

    console.log("Done attacking!");
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