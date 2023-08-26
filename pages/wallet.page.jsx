import { useAccount,useBalance } from 'wagmi';
import { useIsMounted } from './useIsMounted';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BatchSupply, BatchCost } from './readContract';
import MintComponent from './mintCtrl.page';
import SwapComponent from './swapCtrl.page';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
 
function Wallet() {
    const mounted = useIsMounted();
    const { address} = useAccount();
    const { data } = useBalance({
        address: address,
    })
    const bSupply = BatchSupply(0);
    const bCost = BatchCost(0, address);

    return (
        <div>
            <div className={styles.rainbowContainer}>
                <ConnectButton />
            </div>
            <div className={styles.detailsContainer}>
                <Link href="https://polygonscan.com/address/0x60c3fc3819d6b7c1096338cf6149f1770b6af161" rel="noopener noreferrer" target="_blank">Contract: 0x60c3Fc3819d6b7c1096338Cf6149F1770B6Af161</Link>
                <Link href="https://opensea.io/assets/matic/0x60c3fc3819d6b7c1096338cf6149f1770b6af161/" rel="noopener noreferrer" target="_blank">View Collection On OpenSea</Link>
                {mounted ? address && <p>Wallet: {address}</p> : null}
                {mounted ? data && <p>Balance: {data?.formatted} {data?.symbol}</p> : null}
                {mounted ? bSupply && <p>Supply: {(parseInt(bSupply) - 1)} / 3333</p> : null}
                {mounted ? bCost >= 0 && <p>Cost Per Token: {parseInt(bCost) / 10**18} Matic</p> : null}
            </div>
            <MintComponent />
            <SwapComponent />
        </div>
    );
  
}

export default Wallet;