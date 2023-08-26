import React, { useState, useEffect } from 'react';
import { useAccount, useContractWrite } from 'wagmi';
import { useIsMounted } from './useIsMounted';
import { SwapCost, IsHolder, GetRoll, Exists } from './readContract';
import { _abi } from './abiGet';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

function SwapComponent() {
    const { address } = useAccount();
    const mounted = useIsMounted();
    const _bSwapCost = SwapCost(0, address);
    const [tokenID, setTokenID] = useState(1);
    const roll = GetRoll(tokenID);
    const [rollNext, setRollNext] = useState('1');
    const baseURI = 'https://ipfs.io/ipfs/QmexYLUit3WDwvafrnELwmbVF3KhYyuyErWZ1H7voePFGV/';
    const [img1, setImg1] = useState('https://ipfs.io/ipfs/QmexYLUit3WDwvafrnELwmbVF3KhYyuyErWZ1H7voePFGV/VoodooQueens/1.png');
    const [img2, setImg2] = useState('https://ipfs.io/ipfs/QmexYLUit3WDwvafrnELwmbVF3KhYyuyErWZ1H7voePFGV/WitchDoctors/1.png');
    const [img1Loading, setImg1Loading] = useState(false);
    const [img2Loading, setImg2Loading] = useState(false);
    const isHolder = IsHolder(address, tokenID);
    const _exists = Exists(tokenID);
    const oSeaBase = 'https://opensea.io/assets/matic/0x60c3fc3819d6b7c1096338cf6149f1770b6af161/';

    const { data, isLoading, isSuccess, write } = useContractWrite({
        address: '0x60c3Fc3819d6b7c1096338Cf6149F1770B6Af161',
        abi: _abi,
        functionName: 'rollSet',
        args: [tokenID, rollNext, 0],
        account: address,
        value: (parseInt(_bSwapCost) * tokenID).toString(),
    });

    useEffect(() => {
        // This code runs whenever tokenID or roll changes
        setImg1Loading(true);
        setImg2Loading(true);

        if (!_exists) {
            setImg1('/success.png');
            setImg2('/success.png');
            setImg1Loading(false);
            setImg2Loading(false);
            return;
        }

        switch (roll) {
            case "VoodooQueens":
                setImg1(baseURI + 'VoodooQueens/' + tokenID + '.png');
                setImg2('/success.png');
                setRollNext('1');
                break;
            case "WitchDoctor":
                setImg1(baseURI + 'WitchDoctors/' + tokenID + '.png');
                setImg2('/success.png');
                setRollNext('2');
                break;
            case "1":
                setImg1(baseURI + 'WitchDoctors/' + tokenID + '.png');
                setImg2(baseURI + 'VoodooQueens/' + tokenID + '.png');
                setRollNext('2');
                break;
            case "2":
                setImg1(baseURI + 'VoodooQueens/' + tokenID + '.png');
                setImg2(baseURI + 'WitchDoctors/' + tokenID + '.png');
                setRollNext('1');
                break;
            default:
                setImg1('/loading.gif');
                setImg2('/loading.gif');
                break;
        }

        setImg1Loading(false);
        setImg2Loading(false);

    }, [tokenID, roll, _exists]);

    const handleTokenIdChange = (event) => {
        const newTokenID = Math.min(parseInt(event.target.value), 3333);
        setTokenID(newTokenID);
    };

    const handleSwapClick = () => {
        // Perform minting logic here
        if (!address || !tokenID) {
            return;
        }

        var _heldTokens = parseInt(isHolder);
        if (_heldTokens === 0) {
            alert("You must own the token ID in order to swap it.");
            return;
        } else {
            try {
                write(); // Call the write function
            } catch (error) {
                console.error('Error while swapping:', error);
                alert('An error occurred while swapping. Please try again later.');
            }
        }
    };

    return (
        <div className={styles.swapContainer}>
            <h2>Role Swapper</h2>
            <div>
                <label>Token ID: </label>
                <input
                    type="number"
                    value={tokenID}
                    onChange={handleTokenIdChange}
                    min={1}
                    max={3333}
                />
            </div>
            <Link href={oSeaBase + tokenID} target="_blank" rel="noopener noreferrer">
                <div className={styles.swapImage}>
                    <div className={styles.imageContainer}>
                        {img1Loading ? (
                            <img src='/loading.gif' alt="Loading" />
                        ) : (
                            <img src={img1} alt="Slot 1" />
                        )}
                    </div>
                    <div className={styles.imageContainer}>
                        {img2Loading ? (
                            <img src='/loading.gif' alt="Loading" />
                        ) : (
                            <img src={img2} alt="Slot 2" />
                        )}
                    </div>
                </div>
            </Link>
            {mounted && _bSwapCost >= 0 ? (
                <p>Swap Cost: {(parseInt(_bSwapCost) / 10**18)} Matic</p>
            ) : null}
            <button className={styles.swapBtn} onClick={handleSwapClick}>Swap</button>
        </div>
    );
}

export default SwapComponent;