export interface ICognitoConfig {
    region: string;
    userPoolId: string;
    appId: string;
    idpUrl?: string;
    identityPoolId?: string;
}

export let CognitoConfig: ICognitoConfig = {
    region: 'us-east-2',
    userPoolId: 'us-east-2_cnFTtVsgG',
    appId: '6l9nigfaldbn7sj7thib12r4p',
    idpUrl: 'cognito-idp.us-east-2.amazonaws.com',
    identityPoolId: 'us-east-2:f8c7a28b-ab09-42c6-942f-e3eb99e78509'
}
