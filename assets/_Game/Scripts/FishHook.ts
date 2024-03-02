import { _decorator, Component, RigidBody2D, Collider2D, IPhysics2DContact, Contact2DType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FishHook')
export class FishHook extends Component {
    @property({ type: Collider2D, tooltip: "collider of hook" })
    collider: Collider2D = null;
    onLoad() {
        const collider = this.getComponent(Collider2D);
        if (collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onCollisionEnter2D, this);
            // this.collider.on(Contact2DType.END_CONTACT, this.onCollisionExit2D, this);
        }
    }
    onCollisionEnter2D(selfCollider: Collider2D , otherCollider: Collider2D , contact: IPhysics2DContact | null) {
       console.log('debug')
    }
    // onCollisionEnter2D(contact: IPhysics2DContact, selfCollider: Collider2D, otherCollider: Collider2D) {
    //     // Xử lý khi bắt đầu va chạm
    //     console.log("Va chạm bắt đầu với", otherCollider.node.name);
    // }
    // onCollisionExit2D(contact: IPhysics2DContact, selfCollider: Collider2D, otherCollider: Collider2D) {
    //     // Xử lý khi kết thúc va chạm
    //     console.log("Va chạm kết thúc với", otherCollider.node.name);
    // }
    start() {

    }

    update(deltaTime: number) {
        
    }
    
}


