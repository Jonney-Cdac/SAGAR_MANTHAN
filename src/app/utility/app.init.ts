
import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(keycloak: KeycloakService):() => Promise<boolean>
{
    return () =>
     keycloak.init(
                    {
                        config:{
                            url: 'http://10.210.12.20:8080/auth',
                            realm: 'front-office',
                            clientId: 'angular-keycloak'  // 12.50
                            //clientId: 'angular-keycloak-fo'  // 6.81
                            
                        },
                        loadUserProfileAtStartUp: false,
                        initOptions:{
                            onLoad: "login-required",
                            flow: "standard"
                        }
                    });
                }