import { _decorator, Component, Node, CCInteger, Vec2, Vec3, CCFloat, CCBoolean } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FishMovevement')
export class FishMovevement extends Component {
    sinCenterY: number = 0;
    @property(CCFloat)
    amplitude: number = 2;
    @property(CCFloat)
    frequency: number = 0.5;
    @property(CCBoolean)
    inverted: boolean = false;
    @property(CCBoolean)
    isHooked: boolean = false;
    start() {
        this.sinCenterY = this.node.position.y
    }

    update(deltaTime: number) {
        if (!this.isHooked) {
            var pos: Vec3 = this.node.position;
            var sin = Math.sin(pos.x * this.frequency) * this.amplitude;
            if (this.inverted) {
                sin *= -1;
            }
            pos.y = this.sinCenterY + sin;
            this.node.setPosition(pos);
        }

    }
}


