import { _decorator, Component, instantiate, NodePool, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FishPool')
export class FishPool extends Component {
    @property({ type: Prefab, tooltip: 'Prefab Pipes' })
    public prefabPipes = null;

    start() {

    }

    update(deltaTime: number) {

    }
}


