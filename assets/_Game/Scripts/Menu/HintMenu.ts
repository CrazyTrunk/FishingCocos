import { _decorator, Prefab, Component, Node, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HintMenu')
export class HintMenu extends Component {
    @property(Node)
    hintNodes: Node[] = []; // Thay thế các Node bằng Prefab

    @property(Node)
    xMark: Node; // Thay thế các Node bằng Prefab
    protected onEnable(): void {
        console.log("onenable")
        this.showHint(null, 0);
        this.xMark.active = true;
    }
    private showHint(e: EventTouch, index: number) {
        this.hideAllHint();
        this.hintNodes[index].active = true;
    }
    hideAllHint() {
        console.log('wtf')
        this.hintNodes.forEach(hint => {
            hint.active = false;
        });
    }
    hideAll(){
        this.hideAllHint();
        this.xMark.active = false;
        this.node.active = false;
    }
}


