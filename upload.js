const dotenv = require('dotenv');
const fs = require('fs');
const {
    Aborter,
    BlobURL,
    BlockBlobURL,
    ContainerURL,
    ServiceURL,
    StorageURL,
    SharedKeyCredential,
} = require("@azure/storage-blob");

dotenv.load();

const account = process.env.AZURE_STORAGE_ACCOUNT;
const accountKey = process.env.AZURE_STORAGE_ACCESS_KEY;

const sharedCredential = new SharedKeyCredential(account, accountKey);

const pipeline = StorageURL.newPipeline(sharedCredential);
const serviceURL = new ServiceURL(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `https://${account}.blob.core.windows.net`,
    pipeline
);

const containerURL = ContainerURL.fromServiceURL(serviceURL, 'staging/Scripts/build/js/GraphExplorer');

const productionBuild = fs.readFileSync('dist/explorer.js');
const blobName = 'explorer.js';

const blobURL = BlobURL.fromContainerURL(containerURL, blobName);
const blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);

async function upload() {
    try {
        await blockBlobURL.upload(
            Aborter.none,
            productionBuild,
            productionBuild.length,
        );
        console.log('Staged changes')

    } catch (e) {
        console.log(e)
    }

}

upload();