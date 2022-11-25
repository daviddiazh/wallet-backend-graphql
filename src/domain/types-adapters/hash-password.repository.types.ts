
export abstract class IHashTypesRepository {
    abstract hash(password: string): Promise<string> | string;
    abstract compare(password: string, encryptedPassword: string): Promise<boolean> | boolean;
}