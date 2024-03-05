import { _decorator, Component, Canvas, view , Node, PhysicsSystem ,screen, CCInteger, ResolutionPolicy} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Reponsive')
export class Reponsive extends Component {
    onLoad() {
        this.makeResponsive();
    }
    
    makeResponsive() {
        const canvasSize = view.getCanvasSize();
        console.log(canvasSize + "canvasSize")
        const frameSize = view.getFrameSize();
        console.log(frameSize + "frameSize")

        // Tính tỉ lệ mong muốn và tỉ lệ thiết bị
        let desiredRatio = canvasSize.width / canvasSize.height;
        let deviceRatio = frameSize.width / frameSize.height;

        // Thiết lập tỉ lệ canvas phù hợp với tỉ lệ thiết bị
        if (deviceRatio >= desiredRatio) {
            view.setResolutionPolicy(ResolutionPolicy.FIXED_WIDTH);
        } else {
            view.setResolutionPolicy( ResolutionPolicy.FIXED_HEIGHT);
        }
    }
}


