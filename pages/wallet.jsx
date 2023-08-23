import { useAccount,useBalance,useBlockNumber } from 'wagmi';
import { useIsMounted } from './useIsMounted';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BatchSupply } from './batchSupply';
 
function Wallet() {
  const mounted = useIsMounted();
  const { address} = useAccount();
  const { data } = useBalance({
    address: address,
  })
  const { data: blockNumberData } = useBlockNumber({
    watch: true,
  });
  const bSupply = BatchSupply(0);

  return (
    <div>
    <ConnectButton />
    {mounted ? address && <p>Address {address}</p> : null}
    {mounted ? data && <p>Balance: {data?.formatted} {data?.symbol}</p> : null}
    {mounted && typeof blockNumberData !== 'undefined' && (
        <p>Blocknumber: {String(blockNumberData)}</p>
    )}
    {mounted ? bSupply && <p>Supply: {parseInt(bSupply) - 1} / 3333</p> : null}
    
    </div>
  );
  
}

export default Wallet;