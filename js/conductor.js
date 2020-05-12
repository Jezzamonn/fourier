export default class Conductor {

    constructor(controllers) {
        this.lastTime = Date.now();
        this.mousePosition = null;
        this.controllers = controllers.slice();
        this.updatingControllers = [];

        // We can handle these all the same really.
        document.addEventListener('mousemove', (evt) => this.updateMousePosition(evt));
        document.addEventListener('mousedown', (evt) => this.updateMousePosition(evt));
        document.addEventListener('mouseup',   (evt) => this.updateMousePosition(evt));

        document.addEventListener('touchmove',  (evt) => this.updateTouchPosition(evt));
        document.addEventListener('touchstart', (evt) => this.updateTouchPosition(evt));
        document.addEventListener('touchend',   (evt) => this.updateTouchPosition(evt));

        window.addEventListener('resize', (evt) => this.onResize(evt));
    }

    start() {
        // Kick off the update loop
        window.requestAnimationFrame(() => this.everyFrame());
    }

    onResize(evt) {
        this.controllers.forEach(controller => {
            if (typeof controller.onResize === 'function') {
                controller.onResize();
            }
        })
    }

    everyFrame() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.everyFrame());
    }

    update() {
        let curTime = Date.now();
        let dt = (curTime - this.lastTime) / 1000;

        this.updatingControllers = [];

        this.controllers.forEach(controller => {
            if (controller.isOnScreen()) {
                controller.update(dt, this.mousePosition);
                this.updatingControllers.push(controller);
            }
        });

        this.lastTime = curTime;

        const debug = document.getElementById('debug-content');
        if (debug) {
            debug.innerHTML = this.updatingControllers.map(c => c.id).join('<br>') + '<br>';
        }
    }

    render() {
        this.controllers.forEach(controller => {
            if (controller.isOnScreen()) {
                controller.render();
            }
        });
    }

    updateMousePosition(evt) {
        this.mousePosition = { x: evt.clientX, y: evt.clientY };
    }

    updateTouchPosition(evt) {
        if (evt.touches.length > 0) {
            this.mousePosition = { x: evt.touches[0].clientX, y: evt.touches[0].clientY };
        }
    }

}