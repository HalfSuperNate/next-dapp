import React, { useState } from 'react';
import { useAccount, useContractWrite } from 'wagmi';
import { useIsMounted } from './useIsMounted';
import { BatchCost } from './readContract';
import { _abi } from './abiGet';
import styles from '../styles/Home.module.css';

function MintComponent() {
    const { address } = useAccount();
    const mounted = useIsMounted();
    const _bCost = BatchCost(0, address);
    const [quantity, setQuantity] = useState(1);
    const [walletAddress, setWalletAddress] = useState('');

    const { data, isLoading, isSuccess, write } = useContractWrite({
        address: '0x60c3Fc3819d6b7c1096338Cf6149F1770B6Af161',
        abi: _abi,
        functionName: '_mintInOrder',
        args: [walletAddress, quantity, 0, []],
        value: (parseInt(_bCost) * quantity).toString(),
    });

    const handleQuantityChange = (event) => {
        const newQuantity = Math.min(parseInt(event.target.value), 10);
        setQuantity(newQuantity);
    };

    const handleWalletChange = (event) => {
        setWalletAddress(event.target.value);
    };

    const handleMintClick = () => {
        // Perform minting logic here
        if (!address) {
            return;
        }
        if (walletAddress.length !== 42) {
            alert("The input value must be 42 characters long, inserting connected wallet by default");
            setWalletAddress(address);
        } else {
            try {
                write(); // Call the write function
            } catch (error) {
                console.error('Error while minting:', error);
                alert('An error occurred while minting. Please try again later.');
            }
        }
    };

    return (
        <div className={styles.mintContainer}>
            <h2>Mint NFTs</h2>
            <div>
                <label>Amount: </label>
                <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min={1}
                    max={10}
                />
            </div>
            <div>
                <label>Mint To Wallet: </label>
                <input
                    type="text"
                    value={walletAddress}
                    onChange={handleWalletChange}
                    placeholder="Wallet Address"
                />
            </div>
            <div className={styles.mintImage}>
                {isLoading ? (
                    <img src='/loading.gif' alt="Loading" /> // Show loading GIF
                ) : isSuccess ? (
                    <img src='/success.png' alt="Mint Success" /> // Show success image
                ) : null}
            </div>
            {mounted && _bCost ? (
                <p>Total: {((parseInt(_bCost) * quantity) / 10**18)} Matic</p>
            ) : null}
            <button className={styles.mintBtn} onClick={handleMintClick}>Mint</button>
        </div>
    );
}

export default MintComponent;