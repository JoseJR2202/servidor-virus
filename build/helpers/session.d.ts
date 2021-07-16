import { Usuario } from '@interfaces/usuario';
export declare const signUpUser: (nombre: string) => Promise<Usuario>;
export declare const comparePassword: (candidate: any, hash: any) => Promise<unknown>;
export declare const getUserByEmail: (nombre: string) => Promise<Usuario>;
//# sourceMappingURL=session.d.ts.map