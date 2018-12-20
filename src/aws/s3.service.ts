import { Injectable, Optional, SkipSelf } from '@angular/core';

import * as AWS from 'aws-sdk';
import * as S3 from 'aws-sdk/clients/s3';
import * as moment from 'moment';

import { S3Config } from './s3.config';
import { ICognitoException, CognitoException, CognitoService } from './cognito.service';

interface IParam {
    Bucket: string;
}
interface IClientParams {
    region: string;
    apiVersion?: string;
    params?: IParam;
    endpoint?: string;
}
@Injectable()
export class S3Service {
    private S3: AWS.S3;
    private config = S3Config;

    constructor(@Optional() @SkipSelf() prior: S3Service,
                private cognitoService: CognitoService) {
        if (prior){
            return prior;
        }
        this.S3 = this.getS3();
    }

    getS3() {
        return new S3({
            params: {
                'Bucket': this.config.bucketName
            },
            region: S3Config.bucketRegion
        });
    }

    isExpired(url:string) {

        let result:boolean;
        let _url = new URL(url);

        if (_url.search === ''){
            result = true;
        } else {
            let param: string = _url.searchParams.get('Expires');
            if (param) {
                result = moment().isAfter(moment.unix(parseInt(param)));
            } else {
                result = false;
            }
        }

        return result;
    }

    private handleError(error: any, caller:string) {
        let exception: ICognitoException = new CognitoException(error);
        console.error(`AWS Cognito Service::handleError callerMethod::${caller}`, exception);
        return exception;
    }

    getFileByUrl(url:string) {
        let self = this;
        let baseurl = `https://${self.config.bucketName}.s3.amazonaws.com/`;
        let fileKey = url.replace(baseurl,'');

        let _url = new URL(url);

        return new Promise((resolve, reject) => {
            try {
                if (fileKey === '') {
                    resolve(url);
                }
                else if (self.isExpired(url)) {
                    self.S3.getSignedUrl('getObject',{ Key: fileKey}, (err,url) => {
                        if (err) {
                            reject(self.handleError(err,'getSignedUrl'));
                        } else {
                            resolve(url);
                        }
                    });
                } else {
                    resolve(url);
                }
            } catch (error) {
                reject(self.handleError(error,'try/catch getSignedUrl'));
            }
        });
    }

    getFile(filename:string, folder?:string):Promise<string> {
        let self = this;

        let directory = `${self.config.folderLevel}/`;
        if (folder) {
            directory += `${folder}/`;
        }
        let fileKey = `${directory}${filename}`;

        return new Promise((resolve, reject) => {
            try {
                self.S3.getSignedUrl('getObject',{ Key: fileKey}, (err,url) => {
                    if (err) {
                        reject(self.handleError(err,'getSignedUrl'));
                    } else {
                    // self.cognitoService.user.cognitoProfile.picture = url;
                        resolve(url);
                    }
                });
            } catch (error) {
                reject(self.handleError(error,'try/catch getSignedUrl'));
            }
        });
    }

    uploadFile(file:Blob, filename:string, folder?:string) {
        let self = this;

        // self.config.folderLevel = "protected" - this prevents unautheticated access to the file.
        let directory = `${self.config.publicLevel}/`;
        if (folder) {
            directory += `${folder}/`;
        }
        // console.log({'directory': directory});
        // console.log({'filename':filename});
        // console.log({'filetype':file.type});
        // filename = filename.toLowerCase().replace(' ','-');
        filename = filename.toLowerCase().replace(/\s+/g, "-")
        if (file.type === 'image/jpeg') {
            filename += '.jpg';
        }
        if (file.type === 'image/png'){
            filename += '.png';
        }
        
        let fileKey = `${directory}${filename}`;

        return new Promise((resolve, reject) => {
            try {
                self.S3.upload({
                    Bucket: self.config.bucketName,
                    Key: fileKey,
                    ContentType: file.type,
                    ContentEncoding: 'base64',
                    Body: file,
                    StorageClass: 'STANDARD',
                }, (err,data) => {
                    if (err) {
                        self.handleError(err,'uploadFile');
                        reject(err);
                    } else {
                        console.log('successful uploadFile.');
                        resolve(data);
                    }   
                });
            } catch (error) {
                reject(self.handleError(error,'try/catch upload'));
            }
        });

    }

    upload(file:Blob, type:string) {
        let self = this;
        //the s3 upload method requires
        // let fileName = name;
        let directory = `${self.config.folderLevel}/${self.cognitoService.user.identityId}/`;
        let fileKey = `${directory}avatar`;

        return new Promise((resolve, reject) => {
            try {
                self.S3.upload({
                    Bucket: self.config.bucketName,
                    Key: fileKey,
                    ContentType: type,
                    Body: file,
                    StorageClass: 'STANDARD',
                }, (err,data) => {
                    if (err) {
                        self.handleError(err,'there was an error uploading your photo:');
                        resolve(false);
                    } else {
                        console.log('successfully uploaded photo.');
                        console.log(data);
                        resolve(true);
                    }
                });
            } catch (error) {
                reject(self.handleError(error,'try/catch upload'));
            }
        });
    }

    public getAvatar(fileName:string) {
        let self = this;
        let result:string = '';
        let directory = `${self.config.folderLevel}/${self.cognitoService.user.identityId}/`;
        let fileKey = `${directory}avatar`;
        console.log('fileKey',fileKey);
        return new Promise((resolve, reject) => {
            try {
                self.S3.getSignedUrl('getObject',{ Key: fileKey}, (err,url) => {
                    if (err) {
                        reject(self.handleError(err,'getSignedUrl'));
                    }
                    result = url;
                    self.cognitoService.user.cognitoProfile.picture = url;
                    resolve(url);
                });
            } catch (error) {
                reject(self.handleError(error,'try/catch getSignedUrl'));
            }
        });
    }

    public static dataURItoBlob(dataURI, type:string) {
        let binary = atob(dataURI.split(',')[1]);
        let array = [];
        for (let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        let blob = new Blob([new Uint8Array(array)], { type: type });
        return blob;
    }
}