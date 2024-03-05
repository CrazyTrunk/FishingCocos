import { _decorator, Component, Node, Button, __private, tween, Vec3, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MainMenu')
export class MainMenu extends Component {
    @property({ type: Button, tooltip: "Sound Button", })
    public soundButton: Button = null;
    @property({ type: Node, tooltip: "Sound On", })
    public soundOn: Node;
    @property({ type: Node, tooltip: "Sound Off", })
    public soundOff: Node = null;
    @property({ type: Button, tooltip: "Info Button", })
    public infoButton: Button = null;
    @property({ type: Button, tooltip: "Play Game", })
    public playGame: Button = null;
    @property({ type: Button, tooltip: "Shop Button", })
    public shopButton: Button = null;

    @property({ type: Node, tooltip: "Hint", })
    public hintNote: Node = null;


    private buttonStates = {
        soundButton: false,
        infoButton: false,
        playGame: false,
        shopButton: false
    };
    private data;
    protected onLoad(): void {
        this.data = {
            isSoundOn: true
        }
        this.soundButton.node.on(Button.EventType.CLICK, this.onSoundClick, this)
        this.infoButton.node.on(Button.EventType.CLICK, this.onInfoClick, this)
        this.playGame.node.on(Button.EventType.CLICK, this.onPlayGameClick, this)
        this.shopButton.node.on(Button.EventType.CLICK, this.onShopButtonClick, this)
        this.onOffSound();
    }
    onOffSound() {
        if (this.data.isSoundOn) {
            this.soundOn.active = true;
            this.soundOff.active = false;
        } else {
            this.soundOn.active = false;    
            this.soundOff.active = true;
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
        if (this.buttonStates.soundButton) return;
        this.buttonStates.soundButton = true;
        this.data.isSoundOn = !this.data.isSoundOn
        this.onOffSound();
        this.resetButtonStateAfterTween(this.soundButton.node, 'soundButton');
    }
    onInfoClick() {
        if (this.buttonStates.infoButton) return;
        this.hintNote.active = true;
        this.buttonStates.infoButton = true;
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


