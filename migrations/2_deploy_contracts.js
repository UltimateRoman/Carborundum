const Carborundum = artifacts.require("Carborundum");

module.exports = async function(deployer) {
    await deployer.deploy(Carborundum);
}