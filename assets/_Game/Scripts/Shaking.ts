import { _decorator, Component, Node,CCInteger } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Shaking')

export class Shaking extends Component {
    @property(CCInteger)
    timeInterval: number = 1;
    start() {
        this.schedule(function() {
        }, this.timeInterval);
    }

    update(deltaTime: number) {
        
    }
}


