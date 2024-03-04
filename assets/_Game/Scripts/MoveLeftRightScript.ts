import { _decorator, CCBoolean, CCInteger, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MoveLeftRightScript')
export class MoveLeftRightScript extends Component {
    @property(CCInteger)
    speed: number = 20;
    @property(CCBoolean)
    isLeft: boolean;
    start() {

    }

    update(deltaTime: number) {
        var pos = this.node.position.clone();
        if (!this.isLeft) {
            pos.x -= this.speed * deltaTime;
        } else {
            pos.x += this.speed * deltaTime;
        }
        this.node.setPosition(pos);
    }
}


