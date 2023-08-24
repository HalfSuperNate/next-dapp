import { useAccount,useBalance,useBlockNumber } from 'wagmi';
import { useIsMounted } from './useIsMounted';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BatchSupply, BatchCost } from './readContract';
import MintComponent from './mintCtrl';
import styles from '../styles/Home.module.css';
 
function Wallet() {
    const mounted = useIsMounted();
    const { address} = useAccount();
    const { data } = useBalance({
        address: address,
    })
    // const { data: blockNumberData } = useBlockNumber({
    //     watch: true,
    // });
    const bSupply = BatchSupply(0);
    const bCost = BatchCost(0, address);

    return (
        <div>
            <div className={styles.rainbowContainer}>
                <ConnectButton />
            </div>
            <div className={styles.detailsContainer}>
                {mounted ? address && <p>Address {address}</p> : null}
                {mounted ? data && <p>Balance: {data?.formatted} {data?.symbol}</p> : null}
                {/* {mounted && typeof blockNumberData !== 'undefined' && (
                    <p>Blocknumber: {String(blockNumberData)}</p>
                )} */}
                {mounted ? bSupply && <p>Supply: {(parseInt(bSupply) - 1)} / 3333</p> : null}
                {mounted ? bCost >= 0 && <p>Cost Per Token: {parseInt(bCost) / 10**18} Matic</p> : null}
            </div>
            <MintComponent />
        </div>
    );
  
}

export default Wallet;