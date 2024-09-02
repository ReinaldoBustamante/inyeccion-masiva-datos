import 'dotenv/config';
import { get } from 'env-var';


export class Envs {
    public static getEnvs(){
        const rootAPIUrl = get('ROOTAPI_URL').required().asString()
        const rootAPIToken = get('ROOTAPI_TOKEN').required().asString()
        const enterpriseId = get('ENTERPRISE_ID').required().asInt()
        const outAPIUrl = get('OUTAPI_URL').required().asString()
        const outAPIToken = get('OUTAPI_TOKEN').required().asString()

        return {
            rootAPIUrl,
            rootAPIToken,
            enterpriseId,
            outAPIUrl,
            outAPIToken
        }
    }
    
}
