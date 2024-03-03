import { _decorator, Component, RigidBody2D, Collider2D, IPhysics2DContact, Contact2DType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FishHook')
export class FishHook extends Component {
    private collider2d: Collider2D = null;
    @property({ type: RigidBody2D, tooltip: "RB of hook" })
    rb: RigidBody2D;
    start() {
        this.collider2d = this.getComponent(Collider2D);
        if (this.collider2d) {
            this.collider2d.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            // this.collider.on(Contact2DType.END_CONTACT, this.onCollisionExit2D, this);
        }
    }
    onBeginContact(selfCollider: Collider2D , otherCollider: Collider2D , contact: IPhysics2DContact | null) {
        console.log(otherCollider.group);
    }

    update(deltaTime: number) {
        
    }
    
}


