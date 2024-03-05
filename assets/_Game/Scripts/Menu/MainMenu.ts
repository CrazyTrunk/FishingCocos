import { _decorator, Component, Node, Button, __private, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MainMenu')
export class MainMenu extends Component {
    @property({ type: Button, tooltip: "Sound Button", })
    public soundButton: Button = null;
    @property({ type: Button, tooltip: "Info Button", })
    public infoButton: Button = null;
    @property({ type: Button, tooltip: "Play Game", })
    public playGame: Button = null;
    @property({ type: Button, tooltip: "Shop Button", })
    public shopButton: Button = null;

    private buttonStates = {
        soundButton: false,
        infoButton: false,
        playGame: false,
        shopButton: false
    };
    private data;
    protected onLoad(): void {
        this.soundButton.node.on(Button.EventType.CLICK, this.onSoundClick, this)
        this.infoButton.node.on(Button.EventType.CLICK, this.onInfoClick, this)
        this.playGame.node.on(Button.EventType.CLICK, this.onPlayGameClick, this)
        this.shopButton.node.on(Button.EventType.CLICK, this.onShopButtonClick, this)

        this.data = {
            isSoundOn: true
        }
    }

    resetButtonStateAfterTween(currentNode: Node, buttonKey: string) {
        tween(currentNode).stop();
        tween(currentNode)
            .to(0.5, { scale: new Vec3(1.2, 1.2, 1.2) }) // Chỉ số scale thay đổi tùy theo nhu cầu
            .to(0.5, { scale: new Vec3(1, 1, 1) })
            .call(() => {
                this.buttonStates[buttonKey] = false;
            })
            .start();
    }
    onSoundClick(): void {
        if (this.buttonStates.infoButton) return;
        this.buttonStates.infoButton = true;
        this.resetButtonStateAfterTween(this.soundButton.node, 'soundButton');
    }
    onInfoClick() {
        if (this.buttonStates.soundButton) return;
        this.buttonStates.soundButton = true;
        this.resetButtonStateAfterTween(this.infoButton.node, 'infoButton');

    }
    onPlayGameClick() {
        if (this.buttonStates.playGame) return;
        this.buttonStates.playGame = true;
        this.resetButtonStateAfterTween(this.playGame.node, 'playGame');

    }
    onShopButtonClick() {
        if (this.buttonStates.shopButton) return;
        this.buttonStates.shopButton = true;
        this.resetButtonStateAfterTween(this.shopButton.node, 'shopButton');

    }
    update(deltaTime: number) {

    }
}


