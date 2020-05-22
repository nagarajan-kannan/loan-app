import { USER_ROLE } from '../constants/user-role.constant';

export class UserModel {
    username: string;
    password: string;
    role?: USER_ROLE;

    constructor(obj: Partial<UserModel> = {}) {
        Object.assign(this, obj);
    }
}
