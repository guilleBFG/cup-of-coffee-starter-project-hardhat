const main = async () =>{

    const [owner, randomPerson] = await hre.ethers.getSigners();
    const coffeContractFactory = await hre.ethers.getContractFactory("CupOfCoffeePortal");
    const cupOfCoffeeContract = await coffeContractFactory.deploy({ value: hre.ethers.utils.parseEther("0.1"), });

    await cupOfCoffeeContract.deployed();

    console.log("Contract deployed to: ", cupOfCoffeeContract.address );
    console.log("Contract deployed by: ", owner.address);

    /*
    * get contract balance of ethers
    */
    let constractBalance = await hre.ethers.provider.getBalance(cupOfCoffeeContract.address);

    console.log("Balance of ethers on contract: ", hre.ethers.utils.formatEther(constractBalance));
     

    let cupsBought;

    cupsBought = await cupOfCoffeeContract.getTotalCupsOfCoffees();
    
    let buyCupTxn = await cupOfCoffeeContract.buyCoffee("Hi nice idea to have a capuchino");

    await buyCupTxn.wait();

    cupsBought;

    cupsBought = await cupOfCoffeeContract.getTotalCupsOfCoffees();
    
    buyCupTxn = await cupOfCoffeeContract.buyCoffee("Hi nice idea to have a capuchino");

    await buyCupTxn.wait();
    /*
    * get contract balance of ethers
    */
    constractBalance = await hre.ethers.provider.getBalance(cupOfCoffeeContract.address);

    console.log("Balance of ethers on contract: ", hre.ethers.utils.formatEther(constractBalance));
 
    cupsBought = await cupOfCoffeeContract.getTotalCupsOfCoffees();

    buyCupTxn = await cupOfCoffeeContract.connect(randomPerson).buyCoffee("I would like a large coffe please");

    await buyCupTxn.wait();
    
    cupsBought = await cupOfCoffeeContract.getTotalCupsOfCoffees();


    let allSmallTalks = await cupOfCoffeeContract.getAllCoffeeTalks();

    console.log(allSmallTalks);

    console.log("constract addy:", cupOfCoffeeContract.address);


    /*
    * get contract balance of ethers
    */
    constractBalance = await hre.ethers.provider.getBalance(cupOfCoffeeContract.address);

    console.log("Balance of ethers on contract: ", hre.ethers.utils.formatEther(constractBalance));
    
};

const runMain = async () =>{

    try {
        await main();
        process.exit(0); // exit node process without errors
    } catch (error) {
        console.log(error);
        process.exit(1);// exit node with error fatal exeption
    }
     // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948

};


runMain();