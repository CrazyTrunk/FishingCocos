import { _decorator, CCInteger, Component, instantiate, NodePool, Prefab, Node, Vec3 } from 'cc';
import { GameManager } from '../GameManager';
import { Fish } from '../Fish';
import { MoveLeftRightScript } from '../MoveLeftRightScript';
const { ccclass, property } = _decorator;

@ccclass('FishPool')
export class FishPool extends Component {
    @property({ type: [Prefab], tooltip: 'Prefab Pipes' })
    public prefabPipes: Prefab[] = [];
    @property({ type: [Node], tooltip: 'Spawn Points' })
    public spawnPoints: Node[] = [];
    @property({ type: Node, tooltip: 'Where the new pipes go' })
    public pipePoolHome;
    gameManager: GameManager;
    public pool = new NodePool();
    public createPipe: Node = null;
    protected onLoad(): void {
        this.gameManager = this.node.getComponent(GameManager)
    }
    initPool() {
        //build the amount of nodes needed at a time
        let initCount = 10;
        //fill up the node pool
        for (let i = 0; i < initCount; i++) {
            // Chọn một vị trí spawn ngẫu nhiên
            let spawnIndex = Math.floor(Math.random() * this.spawnPoints.length);
            let spawnPos = this.spawnPoints[spawnIndex];
            let isRightSpawn = spawnIndex > 2;
            // Chọn một prefab cá ngẫu nhiên
            let prefabIndex = Math.floor(Math.random() * this.prefabPipes.length);
            let selectedPrefab = this.prefabPipes[prefabIndex];
            let createPipe = instantiate(selectedPrefab);
            if (isRightSpawn) {
                createPipe.scale.multiply3f(-1, 1, 1);
                createPipe.getComponent(MoveLeftRightScript).isLeft = true;
            }
            createPipe.getComponent(MoveLeftRightScript).speed = this.gameManager.getFishById(createPipe.getComponent(Fish).id).swimSpeed;
            createPipe.position = spawnPos.position;
            this.pipePoolHome.addChild(createPipe);
        }
    }
    addPool() {
        //if the pool is not full add a new one, else get the first one in the pool
        if (this.pool.size() > 0) {
            //get from the pool
            this.createPipe = this.pool.get();
        } else {
            //build a new one
            this.createPipe = instantiate(this.prefabPipes[Math.floor(Math.random() * this.prefabPipes.length)]);
        }
        //add pipe to game as a node
        this.pipePoolHome.addChild(this.createPipe);
    }

    reset() {
        //clear pool and reinitialize
        this.pipePoolHome.removeAllChildren();
        this.pool.clear();
        this.initPool();
    }
}


