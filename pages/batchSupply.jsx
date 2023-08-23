import { useContractRead } from 'wagmi';
import { _abi } from './abiGet'; 

export function BatchSupply(batch) {
    const { data, isError, isLoading } = useContractRead({
        address: '0x60c3Fc3819d6b7c1096338Cf6149F1770B6Af161',
        abi: _abi,
        functionName: 'tokenNextToMintInBatch',
        args: [batch],
    });

    return data;
}