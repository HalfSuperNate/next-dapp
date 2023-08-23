import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { useIsMounted } from './useIsMounted';
 
function Profile() {
    const mounted = useIsMounted();
    const { address, isConnected } = useAccount();
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    });
    const { disconnect } = useDisconnect();
 
    if (isConnected) {
        return (
            <div>
            {mounted ? address && <p>Connected to {address}</p> : null}
            <button onClick={() => disconnect()}>Disconnect</button>
            </div>
        )
    }
    
    return <button onClick={() => connect()}>Connect Wallet</button>
}

export default Profile;