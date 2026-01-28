import { Entity } from '@shared/kernel/entity.base';

export interface UserProps {
    email: string;
    name: string;
    token?: string; // JWT token returned by API
}

export class User extends Entity<UserProps> {
    get email(): string {
        return this.props.email;
    }

    get name(): string {
        return this.props.name;
    }

    get token(): string | undefined {
        return this.props.token;
    }

    static create(props: UserProps, id?: string, createdAt?: Date, updatedAt?: Date): User {
        return new User(props, id, createdAt, updatedAt);
    }

    toJSON() {
        return {
            id: this.id,
            ...this.props,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
