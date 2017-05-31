pc.script.create('CameraFollow', function (app) {
    // Creates a new CameraFollow instance
    var CameraFollow = function (entity) {
        this.entity = entity;
    };

    CameraFollow.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {

            var manager = app.root.findByName('Manager');
            this.playercontrol = manager.script.PlayerControl;
            this.gamemanager = manager.script.GameStateManager;

            this.initHeight = 11.5;
            this.step = 0.3;
            var pos = this.entity.getPosition();
            this.InitPos = new pc.Vec3(pos.x,pos.y,pos.z);
            this.InitorthoHeight = this.entity.camera.orthoHeight;

            this.nextColor = new pc.Color(1,1,1,1);
            this.timer = 16;
            this.entity.camera.clearColor = new pc.Color(0, 0, 0, 0); // 透明底
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {

            if(!this.gamemanager.start)
            {
                return;
            }
            if(this.gamemanager.lose)
            {// 游戏结束 -- 视图收缩
                var orthoheight = this.entity.camera.orthoHeight,
                    _orthoheight = this.InitorthoHeight + this.playercontrol.score*this.step;
                this.entity.camera.orthoHeight = pc.math.lerp(orthoheight, _orthoheight, dt);

                var vec3Pos = this.entity.getPosition();
                var _y = this.initHeight+this.playercontrol.score*this.step,
                    y = pc.math.lerp(vec3Pos.y, _y, dt);
                this.entity.setPosition(vec3Pos.x,y,vec3Pos.z);
                // 监听是否可以截取完整图片
                if(!pc.canCapture && orthoheight + .5 >= _orthoheight && y + .5 >= _y) {
                    // 通知截图
                    pc.canCapture = 1;
                    pc.allowCapture && pc.allowCapture();
                }
                return;
            }
            else if(this.gamemanager.resume) {
                // 复活 -- 视图展开
                var orthoheight = this.entity.camera.orthoHeight,
                    _orthoheight = this.InitorthoHeight;
                this.entity.camera.orthoHeight = pc.math.lerp(orthoheight, _orthoheight, dt * 10);

                if(orthoheight - .05 <= _orthoheight) {
                    // 恢复原状了 删除resume
                    delete this.gamemanager.resume;
                }
                return;
            }

            var pos0 = this.entity.getPosition();
            var  y1 = this.initHeight + this.playercontrol.score*this.step;

            var y0 = pc.math.lerp(pos0.y, y1, dt);
            this.entity.setPosition(pos0.x, y0, pos0.z);
            this.timer += dt;

        },

        Init: function()
        {
            console.log(this.playercontrol.score, this.step);
            this.timer = 16;
            this.entity.camera.clearColor = new pc.Color(0, 0, 0, 0);
            this.entity.setPosition(this.InitPos.x,this.InitPos.y,this.InitPos.z);
            this.entity.camera.orthoHeight = this.InitorthoHeight;
        },

        showGuide: function()
        {
            var pos0 = this.entity.getPosition();
            var  y1 = this.initHeight + this.playercontrol.score*this.step;
            this.entity.setPosition(pos0.x,y1,pos0.z);
        },

        worldToScreen: function(worldCoord) {
            return this.entity.camera.worldToScreen(worldCoord);
        }



    };

    return CameraFollow;
});
