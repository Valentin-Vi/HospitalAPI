export class User {
    private user_id: number | undefined;
    private email: string | undefined;
    private password: string | undefined;
    private name: string | undefined;
    private lastname: string | undefined;
    private authority: number = 0;

    constructor(
        user_id: number | undefined,
        email: string | undefined,
        hashedPassword: string | undefined,
        name: string | undefined,
        lastname: string | undefined,
        authority: number = 0
    ) {
        this.user_id = user_id;
        this.email = email;
        this.password = hashedPassword;
        this.name = name;
        this.lastname = lastname;
        this.authority = authority;
    }

    public getUser_id(): number | undefined {
        return this.user_id;
    }

    public setUser_id(user_id: number): void {
        this.user_id = user_id;
    }

    public getEmail(): string | undefined {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getPassword(): string | undefined {
        return this.password;
    }

    public setPassword(hashedPassword: string): void {
        this.password = hashedPassword;
    }

    public getName(): string | undefined {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getLastname(): string | undefined {
        return this.lastname;
    }

    public setLastname(lastname: string): void {
        this.lastname = lastname;
    }

    public getAuthority(): number | undefined {
        return this.authority;
    }

    public setAuthority(authority: number): void {
        this.authority = authority;
    }
}