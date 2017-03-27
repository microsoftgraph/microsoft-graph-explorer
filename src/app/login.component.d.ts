import { AuthenticationStatus } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
export declare class AuthenticationComponent extends GraphExplorerComponent {
    title: string;
    getAuthenticationStatus: () => AuthenticationStatus;
    login: () => void;
}
