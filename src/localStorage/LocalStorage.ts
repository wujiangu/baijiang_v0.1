/**
 * localStorage方法
 */
class LocalStorage {
    public constructor(userAccount?:string, userPwd?:string) {
        if (userAccount) {

        }
    }

    private init(user:user){

    }

    public setItem(key:string, value:any) {
        NativeAPI.setLocalData(key, JSON.stringify(value))
    }

    private _storage:any = window.localStorage;
    private _user:user;
}

interface user {
    userAccount:string;
    userPwd:string;
}