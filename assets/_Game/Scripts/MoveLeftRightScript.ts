import { _decorator, CCInteger, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MoveLeftRightScript')
export class MoveLeftRightScript extends Component {
    @property(CCInteger)
    speed: number = 20;
    start() {

    }

    update(deltaTime: number) {
        var pos = this.node.position.clone();
        pos.x -= this.speed * deltaTime;
        this.node.setPosition(pos);
    }
}


