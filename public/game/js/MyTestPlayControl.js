
PlayControl.prototype = {


    CreateCube:function(){
        var entity = this.prefab1.clone();
        entity.setLocalScale(this.newScale.x, this.newScale.y, this.newScale.z);

        //yaw：偏航
        this.newYaw = !this.newYaw;
        entity.setPosition(this.newYaw ? this.newPosition.x: -3.1, (this.score + 1)*this.step, this.newYaw ? -3.1 : this.newPosition.z);

        var material = new pc.PhongMaterial();
        material.shadingModel = pc.SPECULAR_BLINN;
        material.diffuse = this.color;
        material.update();
        entity.model.model.meshInstances[0].material = material;

        makeLinearGradient();
        makePalletIndex();
        this.Color.set(pallet[palletIndex].r / 255, pallet[palletIndex].g / 255, pallet[palletIndex].b/ 255, 1);

        app.root.addChild(entity);
        this.newEntity = entity;
        this.NewScript = this.newEntity.script.NewEntityMove;

        if(this.Perfect > 0){
            this.NewScript.MoveSpeed += this.Perfect * 0.25;
        }
        this.NewScript.MoveSpeed += Math.round(this.score / 50)* 0.5
    },


    CreateStaticRigibodyCube: function(entity){
        entity.setLocalScale(this.newScale.x, this.newScale.y, this.newScale.z);
        entity.setPosition(this.newPosition.x, (this.score + 1)*this.step, this.newPosition.z);
        entity.removeConponent("script");
        entity.enabled = true;
        this.needdestroyobjs.push(entity);
    },

    CreateDynamicRigibodyCube: function(){
        var entity = this.prefab2.clone();
        //todo 理解不了啦。。。
        entity.setLocalScale((this.newYaw ? this.newScale.x : (this.lastScale.x -this.newScale.x )))
    }

}
