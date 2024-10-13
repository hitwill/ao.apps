import { message, result } from '@permaweb/aoconnect';
import { createDataItemSigner } from './signer';
import { appsProcess, unsecureWallet } from './constants';

export const callBlockchain = async (
    tags: { name: string; value: string }[],
    data = '',
    process = appsProcess,
    signerJWK = JSON.stringify(unsecureWallet)
): Promise<string> => {
    const jwk = JSON.parse(signerJWK);
    try {
        const messageId = await message({
            process,
            tags,
            signer: createDataItemSigner(jwk) as never,
            data,
        });

        const { Messages, Error } = await result({
            message: messageId,
            process,
        });

        if (Error) {
            throw new Error(Error);
        }

        const response = Messages[0].Data;
        return response ? JSON.parse(response) : null;
    } catch (error) {
        console.error('Error sending message:', error, {
            jwk,
            process,
            tags,
            data,
        });
        throw error;
    }
};
