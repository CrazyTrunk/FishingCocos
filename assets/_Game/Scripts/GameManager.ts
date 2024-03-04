import { __private, _decorator, CCInteger, Component, Enum, EventKeyboard, EventTouch, input, Input, KeyCode, Node, math, UITransform, resources, JsonAsset } from 'cc';
import FishHookState from './Enum/FishHookState'
import { Fish } from './Fish';
const { ccclass, property } = _decorator;
const { Vec3, toRadian } = math;

@ccclass('GameManager')
export class GameManager extends Component {
    @property({ type: Enum(FishHookState), tooltip: "The current movement state of the character" })
    hookState: FishHookState = FishHookState.Rotation;
    @property({ type: CCInteger, tooltip: "Speed Rotation of Hook" })
    rotateSpeed: number = 50;
    @property({ type: CCInteger, tooltip: "Shoot Speed Of Hooks" })
    speed: number = 200;
    private originalHookPos: number;
    @property({ type: UITransform, tooltip: "The line of hook(UI Transform)" })
    line: UITransform;
    @property({ type: Node, tooltip: "The Fish Hook" })
    fishHook: Node;
    @property({ type: Node, tooltip: "The Fish Hook" })
    hookChild: Node;
    private data;
    private originalSpeed: number;
    private canShoot: boolean;
    protected start(): void {
        resources.load("data/fishinfo", JsonAsset, (err, res) => {
            this.data = res.json
        });
        this.originalSpeed = this.speed;
        this.canShoot = true;
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
                if (this.canShoot) {
                    this.hookState = FishHookState.Shoot;
                    this.canShoot = false;
                }
                break;
        }
    }
    onRotateHook(deltaTime: number) {
        if (this.fishHook.angle <= -70) {
            this.rotateSpeed = Math.abs(this.rotateSpeed)
        } else if (this.fishHook.angle >= 70) {
            this.rotateSpeed = -Math.abs(this.rotateSpeed)
        }
        this.fishHook.angle += this.rotateSpeed * deltaTime
    }
    onHookShot() {

    }

    OnTouchStart(event: EventTouch) {
        console.log("Screen Touched")
    }
    update(deltaTime: number) {
        let value = Math.abs(this.speed * deltaTime * 2);
        switch (this.hookState) {
            case FishHookState.Rotation:
                this.speed = this.originalSpeed;
                this.canShoot = true;
                this.onRotateHook(deltaTime);
                break;
            case FishHookState.Shoot:
                this.line.height += value;

                break;
            case FishHookState.Rewind:
                this.line.height -= Math.abs(value);
                if (this.line.height <= this.originalHookPos) {
                    this.hookState = FishHookState.Rotation;
                } else {
                    this.line.height -= value;
                }
                break;
        }
    }

    public setHook(state: FishHookState) {
        this.hookState = state;
    }
    public catchItem(item: Node) {
        //change state to rewind
        item.setPosition(new Vec3(0, 0, 0));
        item.setParent(this.hookChild);
        item.angle = -this.fishHook.angle;
        item.getComponent(UITransform).anchorY = 0;
        //speed se phai tru di theo kich thuoc cua ca'
        this.speed = this.speed - this.getFishById(item.getComponent(Fish).id).weight;
        this.hookState = FishHookState.Rewind;
        //parent set ve se la thang hook
    }
    getFishById(id: number) {
        return this.data.fishType.find(fish => fish.id === id);
    }
}


