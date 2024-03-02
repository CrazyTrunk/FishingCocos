import { __private, _decorator, Component, Enum, EventKeyboard, EventTouch, input, Input, KeyCode } from 'cc';
import HookState from './Enum/HookState'
const { ccclass, property } = _decorator;

@ccclass('Hook')
export class Hook extends Component {
    @property({ type: Enum(HookState), tooltip: "The current movement state of the character" })
    hookState: HookState = HookState.Rotation;
    onLoad() {
        this.initListener();
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
                // if()
                break;
        }
    }
    OnTouchStart(event: EventTouch) {
        console.log("Screen Touched")
    }
    update(deltaTime: number) {
        console.log(this.hookState)
        switch (this.hookState) {

            case HookState.Rotation:
                // if()
                break;
            case HookState.Shoot:
                break;
            case HookState.Rewind:
                break;
        }
    }
}


