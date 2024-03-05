import { _decorator, Prefab, Component, Node, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HintMenu')
export class HintMenu extends Component {
    @property(Node)
    hintNodes: Node[] = []; // Thay thế các Node bằng Prefab

    private currentIndex: number = 0; // Index hiện tại của hint
    start() {
        // Khởi tạo hint đầu tiên
        this.showHint(null, this.currentIndex);
    }
    private showHint(e: EventTouch, index: number) {
        this.hideAllHint();
        this.hintNodes[index].active = true;
    }
    hideAllHint(){
        this.hintNodes.forEach(hint => {
            hint.active = false;
        });
    }
}


