import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import SelectCharacter from './Components/SelectCharacter';
import { CONTRACT_ADDRESS, transformCharacterData } from './constants';
import myEpicGame from './utils/MyEpicGame.json';
import Arena from './Components/Arena';
import LoadingIndicator from './Components/LoadingIndicator';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [characterNFT, setCharacterNFT] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if(!ethereum) {
        console.log('Make sure you have MetaMask!');
        setIsLoading(false);
        return;
      } else {
        console.log('We have the ethereum object', ethereum);
  
        const accounts = await ethereum.request({ method: 'eth_accounts' });
  
        if(accounts.length !== 0) {
          const account = accounts[0];
          console.log('Found an authorized account:', account);
          setCurrentAccount(account);
        } else {
          console.log('No authorized account found');
        }
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  }

  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;

      if(!ethereum) {
        alert('Get MetaMask!');
        return;
      }

        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });

        console.log('Connected', accounts[0]);
        setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  }

  const renderContent = () => {
    if(isLoading) {
      return <LoadingIndicator/>;
    }

    if (!currentAccount) {
      return (
        <div className="connect-wallet-container">
            <img
              src="https://c.tenor.com/ER8cMBxVBygAAAAM/venom-transform-gif-marvel-comics.gif"
              alt="Illiterato gif"
            />
            <button
              className="cta-button connect-wallet-button"
              onClick={connectWalletAction}
            >
              Connect Wallet To Get Started
            </button>
          </div>
      );
    } else if (currentAccount && !characterNFT) {
      return <SelectCharacter setCharacterNFT={setCharacterNFT} />;
    } else if (currentAccount && characterNFT) {
      return <Arena characterNFT={characterNFT} setCharacterNFT={setCharacterNFT} />;
    }
  };

  useEffect(() => {
    const checkNetwork = async () => {
      try {
        if(window.ethereum.networkVersion !== '4') {
          alert("Please connect to Rinkeby!");
        }
      } catch (error) {
        console.error(error);
      }
    }
    checkNetwork();
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    const fetchNFTMetadata = async () => {
      console.log('Checking for Character NFT on address:', currentAccount);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        myEpicGame.abi,
        signer
      );

      const txn = await gameContract.checkIfUserHasNFT();

      if(txn.name) {
        console.log("User has character NFT");
        setCharacterNFT(transformCharacterData(txn));
      } else {
        console.log("No character NFT found.");
      }

      setIsLoading(false);
    }

    if(currentAccount) {
      console.log("CurrentAccount:", currentAccount);
      fetchNFTMetadata();
    }
  }, [currentAccount]);
  
  

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">⚔️ Metaverse Slayer ⚔️</p>
          <p className="sub-text">Team up to protect the Metaverse!</p>
          {renderContent()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built with @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
