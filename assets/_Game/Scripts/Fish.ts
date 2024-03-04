import { _decorator, Component, Animation, Node, CCInteger } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Fish')

export class Fish extends Component {
    @property({ type: CCInteger, tooltip: "Id Of Fish" })
    id: number;
}


