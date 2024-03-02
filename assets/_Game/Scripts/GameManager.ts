import { __private, _decorator, CCInteger, Component, Enum, EventKeyboard, EventTouch, input, Input, KeyCode, Quat, math, UITransform } from 'cc';
import FishHookState from './Enum/FishHookState'
const { ccclass, property } = _decorator;
const { Vec3, toRadian } = math;
let vec3Down = new Vec3(0, -1, 0);

@ccclass('GameManager')
export class GameManager extends Component {
    @property({ type: Enum(FishHookState), tooltip: "The current movement state of the character" })
    hookState: FishHookState = FishHookState.Rotation;
    @property({ type: CCInteger, tooltip: "Speed Rotation of Hook" })
    rotateSpeed: number = 20;
    @property({ type: CCInteger, tooltip: "Shoot Speed Of Hooks" })
    speed: number = 20;
    private angle: number = 0;
    private originalHookPos: number;
    @property({ type: UITransform, tooltip: "The line of hook" })
    line: UITransform;
    protected start(): void {
    }
    onLoad() {
        this.initListener();
        this.originalHookPos = this.line.height;
    }
    onDestroy() {
        this.removeListener();
    }
    initListener() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.on(Input.EventType.TOUCH_START, this.OnTouchStart, this)
    }
    removeListener() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.off(Input.EventType.TOUCH_START, this.OnTouchStart, this)

    }
    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.SPACE:
                this.hookState = FishHookState.Shoot;
                break;
        }
    }
    onRotateHook(deltaTime: number) {
        if (this.node.angle <= -70) {
            this.rotateSpeed = Math.abs(this.rotateSpeed)
        } else if (this.node.angle >= 70) {
            this.rotateSpeed = -Math.abs(this.rotateSpeed)
        }
        this.node.angle += this.rotateSpeed * deltaTime
    }
    onHookShot() {

    }
    OnTouchStart(event: EventTouch) {
        console.log("Screen Touched")
    }
    update(deltaTime: number) {
        let value = Math.abs(this.speed * deltaTime);

        switch (this.hookState) {
            case FishHookState.Rotation:
                this.onRotateHook(deltaTime);
                break;
            case FishHookState.Shoot:
                this.line.height += value;

                break;
            case FishHookState.Rewind:
                this.line.height -= Math.abs(this.speed * deltaTime);
                if (this.line.height <= this.originalHookPos) {

                } else {
                    this.line.height -= value;
                }
                break;
        }
    }
}


