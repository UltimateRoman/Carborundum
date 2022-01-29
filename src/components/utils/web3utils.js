import Web3 from "web3";
import Carborundum from "../../abis/Carborundum.json";

let web3, account, cm;

export const loadWeb3 = async () => {
    try {
        if (typeof window.ethereum !== 'undefined') {
            web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
                return true;
            } catch (err) {
                console.log('Transaction rejected by user:', err);
                return false;
            };
        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
            return true;
        } else {
            window.alert('Wallet not connected. Please install the Metamask plugin');
            return false;
        };
    } catch (err) {
        console.log('Error: ', err);
        return false;
    };
};

export const connectAccount = async () => {
    window.ethereum.on('accountsChanged', function (accounts) {
        window.location.reload();
    });
    if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        account = accounts[0];
    } else {
        window.alert("Please install the Metamask plugin");
    }
    return account;
};

export const loadBlockchainData = async () => {
    const networkId = await web3.eth.net.getId();    
    const carborundum = await Carborundum.networks[networkId];
    if (carborundum) {
        cm = new web3.eth.Contract(Carborundum.abi, carborundum.address);
        return true;
    } else {
        window.alert("Unidentified network");
        return false;
    }
};

export const getMemberList = async() => {
    const memberCount = await cm.methods.memberCount().call();
    let members = [];
    for(let i = 0; i < memberCount; ++i) {
        const member = await cm.methods.members(i).call();
        members.push(member);
    }
    return members;
};

export const getMemberScore = async (member) => {
    const score = await cm.methods.memberScores(member).call();
    return score;
};