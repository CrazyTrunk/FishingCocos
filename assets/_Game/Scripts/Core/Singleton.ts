import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Singleton')
export class Singleton extends Component{

    private static _instance: any = null;

    public static get Instance() {
        if (!this._instance) {
            this._instance = new this();
            
        }
        return this._instance;
    }

    public init() {}

    public clear() {
        Singleton._instance = null;
    }

}

