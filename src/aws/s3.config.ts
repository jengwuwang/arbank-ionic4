export interface IS3Config {
    bucketName: string;
    bucketRegion: string;
    s3_endpoint?: string;
    folderLevel?: string;
    publicLevel?: string;
}

export let S3Config: IS3Config = {
    bucketName: 'arbanks3',
    bucketRegion: 'us-east-2',
    s3_endpoint: 's3.us-east-2.amazonaws.com',
    folderLevel: 'protected',
    publicLevel: 'public'
}
