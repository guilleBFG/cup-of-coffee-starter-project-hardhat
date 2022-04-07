const main = async () =>{

    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log("Deploying contract with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());

    const cupOfCoffeeFactory = await hre.ethers.getContractFactory("CupOfCoffeePortal");

    const cupOfCoffeeContract = await cupOfCoffeeFactory.deploy({ value: hre.ethers.utils.parseEther("0.001")});

    await cupOfCoffeeContract.deployed();

    console.log("Cup of Coffee address: ", cupOfCoffeeContract.address);

}


const runMain = async () =>{
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


runMain();