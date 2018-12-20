import { Injectable, Optional, SkipSelf } from "@angular/core";
import { AuthUser, ICognitoCredentials, CognitoService, ICognitoSignUpCredentials, IAuthUser, ICognitoProfile } from "../aws/aws.module";
import { Storage } from '@ionic/storage';
import { ICognitoUserAttributeData } from "amazon-cognito-identity-js";

@Injectable()
export class BusinessService {
    authUser: IAuthUser;

    constructor(@Optional() @SkipSelf() prior: BusinessService, private cognitoService: CognitoService, 
                private storage:Storage) {
        if (prior) {
            return prior;
        }

        this.authUser = AuthUser.Factory();
    }

    changePassword(oldPassword:string, newPassword:string) {
        let self = this;

        return self.cognitoService.changePassword(oldPassword,newPassword);
    }

    async checkAuthorization() {
        let self = this;

        await self.refreshOrResetCreds();

        await self.storage.get('authUser')
        .then((result) => {
            (self.authUser as AuthUser).set(result);
        });
    }

    async getCognitoAttributesData(profile: ICognitoSignUpCredentials | ICognitoProfile, update?:boolean) {
        let self = this;

        return await self.cognitoService.getCognitoAttributesData(profile, update);
    }

    async updateCognitoProfile(attributes: ICognitoUserAttributeData[]){
        let self = this;

        return await self.cognitoService.updateCognitoProfile(attributes);

    }

    async refreshOrResetCreds() {
        let self = this;

        await self.cognitoService.refreshOrResetCreds();

        self.authUser.cognitoUser = self.cognitoService.cognitoUser;

    }

    async signIn(creds: ICognitoCredentials) {
        let self = this;

        return await self.cognitoService.signIn(creds)
        .then((resp) => {
            (self.authUser as AuthUser).set(resp);
            return resp;
        })
        .catch((error) => {
            console.log('an error occurred logging into the auth service.', error);
            throw error;
        });
    }

    async signOut() {
        let self = this;

        return await self.cognitoService.signOut()
        .then((resp) => {
            self.authUser = self.cognitoService.user;
        })
        .catch((error) => {
            console.log('an error occurred signing out of the auth service', error);
        });
    }

    async signUp(creds: ICognitoSignUpCredentials) {
        let self = this;

        return await self.cognitoService.signUp(creds)
        .then((resp) => {
            return resp;
        })
        .catch((error) => {
            console.log('an error occurred signing up through the auth service', error);
            throw error;
        });
    }
}