// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import * as WarpArBundles from 'warp-arbundles';
/**
 * hack to get module resolution working on node jfc
 */
const pkg = WarpArBundles.default ? WarpArBundles.default : WarpArBundles;
const { createData, ArweaveSigner } = pkg;

export function createDataItemSigner(wallet) {
    const signer = async ({ data, tags, target, anchor }) => {
        const signer = new ArweaveSigner(wallet);
        const dataItem = createData(data, signer, { tags, target, anchor });
        return dataItem.sign(signer).then(async () => ({
            id: await dataItem.id,
            raw: await dataItem.getRaw(),
        }));
    };

    return signer;
}
