import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Storage} from '@ionic/storage';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import * as AWS from 'aws-sdk';
import * as moment from 'moment';

import { CognitoUser, CognitoUserPool, ICognitoUserAttributeData, CognitoUserAttribute, AuthenticationDetails , ICognitoUserPoolData , CognitoUserSession, ISignUpResult } from 'amazon-cognito-identity-js';
import { CognitoConfig } from './cognito.config';



export interface IAuthCredentials {
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken: string;
}

export interface IAuthUser {
    identityId: string;
    authenticated: boolean;
    authCredentials?: IAuthCredentials,
    cognitoProfile?: ICognitoProfile,
    cognitoUser?: CognitoUser,
}

export class AuthUser implements IAuthUser {
    identityId:string;
    authenticated: boolean;

    constructor() {
        this.identityId = '';
        this.authenticated = false;
    }

    static Factory() {
        return new AuthUser();
    }

    public set(values:Object = {}) {
        Object.assign(this, values);
    }
}

interface IAuthResponse {
    session_key: boolean;
    accessToken: string;
    expiresIn: number;
    sig: string;
    secret: string;
    userID: string;
};

export interface ICognitoAddress {
    fomatted?: string;
    street_address?: string;
    locality?: string;
    region?: string;
    postal_code?: string;
    country?: string;
  }
  
export interface ICognitoProfile {
    sub: string;
    name?: string;
    given_name?: string;
    family_name?: string;
    middle_name?: string;
    nickname?: string;
    preferred_username?: string;
    profile?: string;
    picture?: string;
    website?: string;
    email?: string;
    email_verified?: boolean;
    gender?: string;
    birthdate?: string;
    zoneinfo?: string;
    locale?: string;
    phone_number?: string;
    phone_number_verified?: boolean;
    address?: ICognitoAddress | string;
    updated_at?: number;
    mbr_since__c?: number | string;
    country_and_code__c?: number | string;
}

export interface ICognitoCredentials {
    email?: string;
    username: string;
    password: string;
}

export interface ICognitoChangePassword {
    oldPassword: string;
    newPassword: string;
}

export interface ICognitoSignUpCredentials extends ICognitoCredentials, ICognitoProfile {

}

export interface ICognitoException {
    code: string;
    columnNumber?: number;
    fileName?: string;
    lineNumber?: number;
    message: string;
    name?: string;
    originalError?: ICognitoException;
    requestId: string;
    retryDelay: number;
    retryable: boolean;
    statusCode: number;
    time: Date;
}

export class CognitoException implements ICognitoException {
    code: string;
    columnNumber?: number;
    fileName?: string;
    lineNumber?: number;
    message: string;
    name?: string;
    originalError?: ICognitoException;
    requestId: string;
    retryDelay: number;
    retryable: boolean;
    statusCode: number;
    time: Date;

    constructor(values:Object = {}){
        Object.assign(this, values);
    }
}

export class CognitoProfile implements ICognitoProfile {
    sub: string;
    name?: string;
    given_name?: string;
    family_name?: string;
    middle_name?: string;
    nickname?: string;
    preferred_username?: string;
    profile?: string;
    picture?: string;
    website?: string;
    email?: string;
    email_verified?: boolean;
    gender?: string;
    birthdate?: string;
    zoneinfo?: string;
    locale?: string;
    phone_number?: string;
    phone_number_verified?: boolean;
    address?: ICognitoAddress | string;
    updated_at?: number;
    mbr_since__c?: number | string;

    constructor(values:Object = {}){
        Object.assign(this, values);
    }

    static Factory() {
        let init:ICognitoProfile = {sub:''};
        return new CognitoProfile(init);
    }

}

@Injectable()
export class CognitoService {

    private config = CognitoConfig;
    private poolData: ICognitoUserPoolData;
    private userPool: CognitoUserPool;
    private unauthCreds: AWS.CognitoIdentityCredentials;
    public cognitoUser: CognitoUser;
    private session: CognitoUserSession;
    private signInSubject: Subject<string> = new Subject<string>();
    private signOutSubject: Subject<string> = new Subject<string>();

    public user: IAuthUser;

    constructor(@Optional() @SkipSelf() prior: CognitoService,
                private storage: Storage) {
        if (prior){
            return prior;
        }
        if (this.config.region === 'your-region') {
            throw new Error(`Cognito service has not been configured properly. Please refer to the README file for more details.`);
        }
        AWS.config.region = this.config.region;
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: this.config.identityPoolId
        });
        this.poolData = { UserPoolId: this.config.userPoolId, ClientId: this.config.appId };
        this.userPool = new CognitoUserPool(this.poolData);
        this.user = AuthUser.Factory();
    }

    private authDetails(creds: ICognitoCredentials): AuthenticationDetails {
        return new AuthenticationDetails({ Username: creds.username, Password: creds.password });
    }

    private buildCreds() {
        let self = this;
        let json = self.buildLogins(self.session.getIdToken().getJwtToken());
        return new AWS.CognitoIdentityCredentials(json);
    }

    private buildLogins(token) {
        let self = this;
        let key = `${self.config.idpUrl}/${self.config.userPoolId}`;
        let json = { IdentityPoolId: self.config.identityPoolId, Logins: {}};
        json.Logins[key] = token;
        return json;
    }

    private buildSocialLogins(key:string, authResult) {
        let self = this;
        let json = { IdentityPoolId: self.config.identityPoolId, Logins: {}};
        if (key === 'graph.facebook.com') {
            json.Logins[key] = (authResult as IAuthResponse).accessToken;
        }
        return json;
    }

    private buildLinkedLogins(identityId:string,token:string) {
        let self = this;
        let json = { IdentityPoolId: self.config.identityPoolId, IdentityId: identityId,
            Logins: {}};
        let key = 'cognito-identity.amazonaws.com';
        json.Logins[key] = token;
        return json;
    }

    async changePassword(oldPassword:string, newPassword:string) {
        let self = this;

        return new Promise((resolve, reject) => {
            try {
                if (self.cognitoUser != null) {
                    try {
                        self.cognitoUser.changePassword(oldPassword, newPassword, (err, result) => {
                            if (err) {
                                reject(self.handleError(err,'changePassword'));
                            } else {
                                resolve(result);
                            }
                        });
                    } catch (error) {
                        reject(self.handleError(error,'try/catch changePassword'));
                    }           
                }
                else {
                    reject(self.handleError(new Error('cognitoUser was null'),'deleteUser'));
                }
            }
            catch (error) {
                reject(self.handleError(error,'try/catch changePassword'));
            }
        });
    }

    confirmPassword(username:string, verificationCode:string, password:string) {
        let self = this;

        let userData = {
            Username: username,
            Pool: self.userPool
        };

        let cognitoUser = new CognitoUser(userData);

        return new Promise((resolve, reject) => {
            try {
                cognitoUser.confirmPassword(verificationCode, password, {
                    onFailure: (err) => {
                        reject(self.handleError(err, 'confirmPassword'));
                    },
                    onSuccess: () => {
                        resolve('Confirm Password SUCCESS');
                    }
                })
            } catch (error) {
                reject(self.handleError(error,'try/catch confirmPassword'));
            }
        });
    }

    confirmRegistration(code:string) {
        let self = this;

        let userData = {
            Username: self.cognitoUser.getUsername(),
            Pool: self.userPool
        };

        let cognitoUser = new CognitoUser(userData);

        return new Promise((resolve,reject) => {
            try {       
                cognitoUser.confirmRegistration(code,true,(err,result) => {
                    if (err) {
                        let exception: ICognitoException = self.handleError(err,'confirmRegistration');// new CognitoException(err);
                        reject(exception);
                    } else {
                        console.log('confirm registration successful', result);
                        resolve(result);
                    }
                });
            } catch (error) {
                let exception: ICognitoException = this.handleError(error,'try/catch confirmRegistration');//new CognitoException(error);
                reject(exception);
            }
        });
    }

    private deleteUser() {
        let self = this;

        return new Promise((resolve,reject) => {

            if (self.cognitoUser != null) {
                try {
                    self.cognitoUser.deleteUser((err:Error, result) => {
                        if (err) {
                            // let exception: ICognitoException = this.handleError(err,'deleteUser');//new CognitoException(err);
                            // console.log('Error deleting Cognito User', exception);
                            reject(self.handleError(err,'deleteUser'));
                        }
                        // console.log('Cognito User deletion result', result);
                        resolve(result);
                    });
                } catch (error) {
                    // let exception: ICognitoException = this.handleError(error,'try/catch deleteUser');//new CognitoException(error);
                    reject(self.handleError(error,'try/catch deleteUser'));
                }           
            }
            else {
                reject(self.handleError(new Error('cognitoUser was null'),'deleteUser'));
            }
        });
    }

    public forgotPassword(username: string) {
        let self = this;
        
        let userData = {
            Username: username,
            Pool: self.userPool
        };

        let cognitoUser = new CognitoUser(userData);
        return new Promise((resolve,reject) => {
            try {       
                cognitoUser.forgotPassword({
                    onFailure: (err) => {
                        // let exception: ICognitoException = self.handleError(err,'forgotPassword');//new CognitoException(err);
                        reject(self.handleError(err,'forgotPassword'));
        
                    },
                    onSuccess: () => {
                        resolve('Verification Code Sent');
                     },
                    inputVerificationCode() {
                        resolve('Verification Code Sent');
                    }
                });
            } catch (error) {
                // let exception: ICognitoException = self.handleError(error,'try/catch forgotPassword');//new CognitoException(error);
                reject(self.handleError(error,'try/catch forgotPassword'));
            }
        });
    }

    private getAWSCredentials(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                (AWS.config.credentials as AWS.Credentials).get((err) => {
                    if (err) {
                        return reject(err);
                    }
                    // console.log({'aws_credentials': AWS.config.credentials});
                    resolve(AWS.config.credentials)
                })
            } catch (error) {
                let exception: ICognitoException = this.handleError(error,'try/catch getAWSCredentials');//new CognitoException(error);
                reject(exception);
            }
        })
    }

    getCredentials(): Observable<any> {
        let result = null;
        if (this.cognitoUser === null) {
            result = this.getAWSCredentials();
        } else if (this.session && this.session.isValid()){
            result = this.getAWSCredentials();
        } else {
            result = this.refreshSession().
                then(this.getAWSCredentials)
        }
        //return Observable.from(result);
        return Observable.fromPromise(result);
    }

    private getCognitoUser(creds: ICognitoCredentials): CognitoUser {
        let self = this;
        let _cognitoUser: CognitoUser = new CognitoUser({ Username: creds.username, Pool: self.userPool });
        return _cognitoUser;
    }

    public getCognitoAttributes(profile: ICognitoSignUpCredentials | ICognitoProfile ) {
        let cognitoAttributes: CognitoUserAttribute[] = [];
        for (let key in profile) {
          if (!key.includes('password') && !key.includes('confirmPassword')) {
            let attribute: CognitoUserAttribute;
            if (key.includes('username')){
                attribute = new CognitoUserAttribute({ Name: 'preferred_username', Value: profile[key]});
            } else if (key.endsWith('__c')) { 
                let k = key.substring(0,key.length - 3);
                let name = `custom:${k}`;
                attribute = new CognitoUserAttribute({ Name: name, Value: profile[key] });
            } else {
                attribute = new CognitoUserAttribute({ Name: key, Value: profile[key] });
            }
            cognitoAttributes.push(attribute);  
          }    
        }
        return cognitoAttributes;
    }

    public getCognitoAttributesData(profile: ICognitoSignUpCredentials | ICognitoProfile, update?:boolean) {
        let cognitoUserAttributeData: ICognitoUserAttributeData[] = [];

        for (let key in profile) {
            if (!key.includes('password') && !key.includes('confirmPassword')) {
                let attribute: ICognitoUserAttributeData;
                if (update) {
                    if (key.includes('email')) continue;
                }
                if (key.includes('username')) {
                    attribute = ({Name: 'preferred_username', Value: profile[key]});
                } else if (key.endsWith('__c')) { 
                    let k = key.substring(0,key.length - 3);
                    // console.log(k);
                    let name = `custom:${k}`;
                    // console.log(name);
                    attribute = ({ Name: name, Value: profile[key] });
                } else {
                    attribute = ({Name: key, Value: profile[key]});
                }
                cognitoUserAttributeData.push(attribute);
            }
        }

        return cognitoUserAttributeData;
    }

    public getCognitoProfile(attributes: CognitoUserAttribute[]) {
        let values:any;
        values = attributes;

        let dynObj:ICognitoProfile = { 
            sub:'', email:'', email_verified:false,preferred_username:'' };
        (values as ICognitoUserAttributeData[]).forEach(attr => {
            if (attr.Name.startsWith('custom:')) {
                let attributeName = attr.Name.substring(7);
                // console.log('custom attribute',attributeName);
                dynObj[attributeName] = attr.Value;
            } else {
                dynObj[attr.Name] = attr.Value;
            }   
        });
        // console.log('dynObj', dynObj);
        let result = new CognitoProfile(dynObj);
        return result;
    }

    private handleError(error: any, caller:string) {
        let exception: ICognitoException = new CognitoException(error);
        console.error(`AWS Cognito Service::handleError callerMethod::${caller}`, exception);
        // this.loggerService.error(`AWS Cognito Service::handleError callerMethod::${caller}`, exception);
        
        return exception;
    }

    isAuthenticated() {
        let self = this;
        if (self.session) {
            return self.session.isValid();
        }
    }

    resendConfirmationCode() {
        let self = this;
        
        let userData = {
            Username: self.cognitoUser.getUsername(),
            Pool: self.userPool
        };

        let cognitoUser = new CognitoUser(userData);

        return new Promise((resolve,reject) => {
            try {       
                cognitoUser.resendConfirmationCode((err,result) => {
                    if (err) {
                        // let exception: ICognitoException = self.handleError(err,'resendConfirmationCode');
                        // console.log('error occurred while confirming registration code', exception);
                        reject(self.handleError(err,'resendConfirmationCode'));
                    } else {
                        console.log('confirm registration successful', result);
                        resolve(result);
                    }
                });
            } catch (error) {
                // let exception: ICognitoException = self.handleError(error,'try/catch resendConfirmationCode');//new CognitoException(error);
                reject(self.handleError(error,'try/catch resendConfirmationCode'));
            }
        });
    }

    private refreshCreds(creds:AWS.CognitoIdentityCredentials) {
        let self = this;
        return new Promise((resolve,reject)=> {
            creds.refresh((error) => {
                if (error) {
                    // let exception: ICognitoException = new CognitoException(error);
                    reject(self.handleError(error, 'refreshCreds'));
                } else {
                    // console.log('this is working ok');
                    resolve('creds refresh successful');
                }
            });
        });
    }

    async refreshOrResetCreds() {
        let self = this;
        self.cognitoUser = self.userPool.getCurrentUser();

        if (self.cognitoUser !== null) {
            self.refreshSession();
        } else {
            self.resetCreds();
        }
    }

    private refreshSession(): Promise<CognitoUserSession> {
        let self = this;
        return new Promise((resolve, reject) => {
            self.cognitoUser.getSession((err, session:CognitoUserSession)=> {
                if (err) {
                    // let exception: ICognitoException = self.handleError(err,'refreshSession');//new CognitoException(err);
                    // console.log('error refreshing user session', err);
                    // reject(exception);
                    reject(self.handleError(err, 'refreshSession'));
                }
                // console.log(session);
                // console.log(self.buildLogins(session.getIdToken().getJwtToken()));
                self.storage.set('idToken', session.getIdToken().getJwtToken());
                // Link user pool identity to federated pool identity //
                AWS.config.credentials = new AWS.CognitoIdentityCredentials(self.buildLogins(session.getIdToken().getJwtToken()));
                // console.log(`${new Date()} - refreshed session for ${self.cognitoUser.getUsername()}. Valid?: `, session.isValid());
                self.saveCreds(session);
                // console.log(AWS.config.credentials);
                // console.log(self.saveCreds(session));
                resolve(session);
            });
        });
    }

    private resetCreds(clearCache:boolean = false) {
        let self = this;
        self.cognitoUser = null;
        self.unauthCreds = self.unauthCreds || new AWS.CognitoIdentityCredentials({ IdentityPoolId: self.config.identityPoolId });

        if (clearCache) {
            self.unauthCreds.clearCachedId();
        }
        // this.setCredentials(this.unauthCreds);
    }

    private saveCreds(session: CognitoUserSession, cognitoUser?: CognitoUser){
        let self = this;
        
        if (session != null) {
            self.session = session;
            
            self.user.authenticated = session.isValid();
        }
        if (cognitoUser) {
            self.cognitoUser = cognitoUser;
            self.user.cognitoUser = cognitoUser;
        }
        return self.setCredentials(self.buildCreds());
    }

    private setCognitoProfile(cognitoUser:CognitoUser) : Promise<ICognitoProfile> {
        let self = this;
        return new Promise((resolve, reject) => {
            if(cognitoUser === null) {
                reject(null);
            } else {
                cognitoUser.getUserAttributes((err:Error, result: CognitoUserAttribute[]) => {
                    if (err) {
                        let exception: ICognitoException = self.handleError(err,'setCognitoProfile');
                        reject(exception);
                    }
                    let dynObj: ICognitoProfile = self.getCognitoProfile(result);
                    self.user.cognitoProfile = dynObj;
                    resolve(dynObj);
                });
            }

        });
    }

    private setCredentials(creds:AWS.CognitoIdentityCredentials): Promise<IAuthUser> {
        let self = this;
        AWS.config.credentials = creds;
        return new Promise((resolve,reject) => {
            creds.get((err) => {
                if(err) {
                    reject(err);
                } else {
                    self.user.identityId = creds.identityId;
                    self.user.authCredentials = { 
                        accessKeyId: creds.accessKeyId,
                        secretAccessKey: creds.secretAccessKey,
                        sessionToken: creds.sessionToken
                    };
                    AWS.config.update({
                        accessKeyId: creds.accessKeyId,
                        secretAccessKey: creds.secretAccessKey,
                        sessionToken: creds.sessionToken
                    });
                    resolve(self.user);
                }
            });
        });

    }

    signInWithCredentials(authResult:IAuthResponse){
        let self = this;
        let token: any;
        let identityId: any;
        let key = 'graph.facebook.com';

        return new Promise((resolve,reject) => {
            let creds: AWS.CognitoIdentityCredentials;
            creds = new AWS.CognitoIdentityCredentials(this.buildSocialLogins(key, authResult));
            
            self.setCredentials(creds)
            .then((user) => {
                creds = new AWS.CognitoIdentityCredentials(this.buildLinkedLogins(user.identityId, user.authCredentials.sessionToken));
                
                resolve(user);
            })
            .catch((error) => {
                reject(self.handleError(error, 'error setCredentials'));
            });
        });
    }

    signIn(creds:ICognitoCredentials): Promise<CognitoUser> {
        let self = this;

        self.cognitoUser = self.getCognitoUser(creds);
        
        return new Promise((resolve, reject) => {
            try {

                self.cognitoUser.authenticateUser(self.authDetails(creds), {
                    newPasswordRequired: (userAttributes,requiredAttributes) => {

                        self.cognitoUser.completeNewPasswordChallenge(creds.password,requiredAttributes, {
                            onSuccess: (session: CognitoUserSession) => {

                                let creds: AWS.CognitoIdentityCredentials;
                                creds = new AWS.CognitoIdentityCredentials(self.buildLogins(session.getIdToken().getJwtToken()));

                                let sc = self.saveCreds(session);
                                let scp = self.setCognitoProfile(self.cognitoUser);
                                Promise.all([sc,scp])
                                    .then((result:any[]) => {
                                        self.storage.set('authUser', self.user)
                                        .then((oResult) => {
                                            resolve(result[0]);
                                        })
                                        .catch((err) => {
                                            reject(self.handleError(err,'storage.set'));
                                        });
                                    })
                                    .catch((error) => {
                                        reject(self.handleError(error, 'promises.all saveCreds/setCognitoProfile'));
                                    });

                            }, onFailure: (err:any) => {
                                reject(self.handleError(err,'completeNewPasswordChallenge'));
                            }
                        });
                    },
                    mfaRequired: (challangeName, challengeParameters) => {},
                    customChallenge: (challangeParameters) => {},
                    onSuccess: (session: CognitoUserSession) => {

                        let creds: AWS.CognitoIdentityCredentials;
                        creds = new AWS.CognitoIdentityCredentials(self.buildLogins(session.getIdToken().getJwtToken()));

                        let sc = self.saveCreds(session);
                        let scp = self.setCognitoProfile(self.cognitoUser);
                        Promise.all([sc,scp])
                            .then((result:any[]) => {
                                self.storage.set('authUser', self.user)
                                .then((oResult) => {
                                    resolve(result[0]);
                                })
                                .catch((err) => {
                                    reject(self.handleError(err,'storage.set'));
                                });
                            })
                            .catch((error) => {
                                reject(self.handleError(error, 'promises.all saveCreds/setCognitoProfile'));
                            });
                    },
                    onFailure: (err: any) => {
                        reject(self.handleError(err,'signIn'));
                    },
                })
                
            } catch (error) {
                reject(self.handleError(error,'catch/try authenticateUser'));
            }
        });
    }

    signOut() {
        let self = this;
        // console.log(self.cognitoUser);
        if (self.cognitoUser) {
            let _username = self.cognitoUser.getUsername();
            // console.log('_username', _username);

            return new Promise((resolve, reject) => {
                try {
                    // self.deleteUser();
                    self.cognitoUser.signOut();
                    self.resetCreds(true);
                    self.user = AuthUser.Factory();
                    self.storage.ready().then(() => {
                        self.storage.remove('authUser');
                    });
                    self.signOutSubject.next(_username);
                    resolve('cognito service log out successful');

                } catch (error) {
                    reject(self.handleError(error, 'try/catch signOut'));
                }
            });
        }
    }

    signUp(creds:ICognitoSignUpCredentials):Promise<ISignUpResult> {
        let self = this;
        creds.mbr_since__c = moment().year().toString();
        return new Promise((resolve, reject) => {
            try {
                let attributes:CognitoUserAttribute[] = [];
                attributes = self.getCognitoAttributes(creds);
                return self.userPool.signUp(creds.username,creds.password,attributes,null,(err:Error,result) => {
                    if (err){ 
                        reject(self.handleError(err,'signUp'));
                    } else {
                        // self.loggerService.info('aws registration successful', result);
                        console.log('aws registration successful', result);
                        resolve(result);
                    }
                });
            } catch (error) {
                reject(self.handleError(error,'catch/try signUp'));
            }
        });
    }

    updateCognitoProfile(attributes: ICognitoUserAttributeData[]): Promise<ICognitoProfile> {
        let self = this;
        return new Promise(async (resolve, reject) => {
            try {
        
                await self.cognitoUser.updateAttributes(attributes, async (err, result) => {
                    if (err) {
                        reject(self.handleError(err,'updateAttributes'));
                    }
                    await self.setCognitoProfile(self.cognitoUser)
                        .then((profile) => {
                            self.user.cognitoProfile = profile;
                            self.storage.set('authUser', self.user);
                            resolve(profile);
                        })
                        .catch((error) => {
                            reject(self.handleError(error,'setCognitoProfile'));
                        });
                });
                
            } catch (error) {
                reject(self.handleError(error,'catch/try updateCognitoProfile'));
            }
        });
    }
}