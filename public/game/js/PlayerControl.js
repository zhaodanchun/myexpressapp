pc.script.attribute("PerfectEffect", "entity", null);

pc.script.attribute("box1Mat", "asset", null, {
  type: 'material',
  max: 1
});

pc.script.attribute("box2Mat", "asset", null, {
  type: 'material',
  max: 1
});

pc.script.create('PlayerControl', function(app) {
  // Creates a new PlayerControl instance
  var PlayerControl = function(entity) {
    this.entity = entity;
  };

  var pallet = [//调色板 231 色
    {"r":255,"g":175,"b":177},
    {"r":255,"g":131,"b":133},
    {"r":255,"g":89,"b":93},
    {"r":255,"g":49,"b":56},
    {"r":255,"g":0,"b":19},
    {"r":255,"g":0,"b":0},
    {"r":208,"g":0,"b":0},
    {"r":163,"g":0,"b":0},
    {"r":163,"g":27,"b":0},
    {"r":208,"g":31,"b":0},
    {"r":255,"g":37,"b":0},
    {"r":255,"g":67,"b":16},
    {"r":255,"g":99,"b":54},
    {"r":255,"g":129,"b":92},
    {"r":255,"g":163,"b":133},
    {"r":255,"g":196,"b":176},
    {"r":255,"g":216,"b":175},
    {"r":255,"g":194,"b":132},
    {"r":255,"g":172,"b":90},
    {"r":255,"g":150,"b":52},
    {"r":255,"g":128,"b":8},
    {"r":255,"g":107,"b":0},
    {"r":208,"g":88,"b":0},
    {"r":163,"g":70,"b":0},
    {"r":163,"g":116,"b":0},
    {"r":208,"g":149,"b":0},
    {"r":255,"g":181,"b":0},
    {"r":255,"g":193,"b":0},
    {"r":255,"g":204,"b":48},
    {"r":255,"g":216,"b":88},
    {"r":255,"g":226,"b":130},
    {"r":255,"g":237,"b":175},
    {"r":255,"g":255,"b":174},
    {"r":255,"g":255,"b":129},
    {"r":255,"g":255,"b":86},
    {"r":255,"g":255,"b":42},
    {"r":255,"g":255,"b":0},
    {"r":255,"g":255,"b":0},
    {"r":209,"g":214,"b":0},
    {"r":163,"g":168,"b":0},
    {"r":115,"g":169,"b":0},
    {"r":147,"g":216,"b":0},
    {"r":179,"g":255,"b":0},
    {"r":190,"g":255,"b":0},
    {"r":201,"g":255,"b":44},
    {"r":212,"g":255,"b":86},
    {"r":223,"g":255,"b":129},
    {"r":235,"g":255,"b":174},
    {"r":216,"g":255,"b":175},
    {"r":193,"g":255,"b":130},
    {"r":171,"g":255,"b":87},
    {"r":150,"g":255,"b":46},
    {"r":130,"g":255,"b":0},
    {"r":110,"g":255,"b":0},
    {"r":91,"g":217,"b":0},
    {"r":72,"g":169,"b":0},
    {"r":35,"g":170,"b":0},
    {"r":43,"g":217,"b":0},
    {"r":52,"g":255,"b":0},
    {"r":76,"g":255,"b":0},
    {"r":104,"g":255,"b":47},
    {"r":133,"g":255,"b":88},
    {"r":164,"g":255,"b":130},
    {"r":197,"g":255,"b":175},
    {"r":178,"g":255,"b":175},
    {"r":136,"g":255,"b":131},
    {"r":97,"g":255,"b":88},
    {"r":62,"g":255,"b":48},
    {"r":32,"g":255,"b":0},
    {"r":14,"g":255,"b":0},
    {"r":11,"g":217,"b":0},
    {"r":9,"g":170,"b":0},
    {"r":9,"g":169,"b":24},
    {"r":11,"g":217,"b":28},
    {"r":13,"g":255,"b":33},
    {"r":32,"g":255,"b":64},
    {"r":62,"g":255,"b":96},
    {"r":97,"g":255,"b":127},
    {"r":136,"g":255,"b":161},
    {"r":178,"g":255,"b":195},
    {"r":178,"g":255,"b":214},
    {"r":135,"g":255,"b":191},
    {"r":96,"g":255,"b":168},
    {"r":61,"g":255,"b":146},
    {"r":31,"g":255,"b":124},
    {"r":12,"g":255,"b":103},
    {"r":10,"g":216,"b":85},
    {"r":7,"g":169,"b":67},
    {"r":4,"g":167,"b":113},
    {"r":6,"g":214,"b":145},
    {"r":9,"g":255,"b":176},
    {"r":30,"g":255,"b":188},
    {"r":61,"g":255,"b":199},
    {"r":96,"g":255,"b":211},
    {"r":135,"g":255,"b":222},
    {"r":178,"g":255,"b":235},
    {"r":177,"g":255,"b":255},
    {"r":135,"g":255,"b":255},
    {"r":96,"g":255,"b":255},
    {"r":60,"g":255,"b":255},
    {"r":28,"g":255,"b":255},
    {"r":0,"g":255,"b":255},
    {"r":0,"g":211,"b":209},
    {"r":0,"g":165,"b":164},
    {"r":0,"g":112,"b":165},
    {"r":0,"g":144,"b":211},
    {"r":0,"g":175,"b":255},
    {"r":26,"g":188,"b":255},
    {"r":59,"g":199,"b":255},
    {"r":95,"g":211,"b":255},
    {"r":135,"g":223,"b":255},
    {"r":177,"g":235,"b":255},
    {"r":177,"g":214,"b":255},
    {"r":134,"g":190,"b":255},
    {"r":95,"g":167,"b":255},
    {"r":58,"g":143,"b":255},
    {"r":25,"g":120,"b":255},
    {"r":0,"g":98,"b":255},
    {"r":0,"g":81,"b":212},
    {"r":0,"g":64,"b":165},
    {"r":0,"g":11,"b":166},
    {"r":0,"g":6,"b":212},
    {"r":0,"g":1,"b":255},
    {"r":24,"g":53,"b":255},
    {"r":58,"g":90,"b":255},
    {"r":94,"g":123,"b":255},
    {"r":134,"g":158,"b":255},
    {"r":177,"g":193,"b":255},
    {"r":177,"g":172,"b":255},
    {"r":134,"g":126,"b":255},
    {"r":94,"g":81,"b":255},
    {"r":58,"g":32,"b":255},
    {"r":23,"g":0,"b":255},
    {"r":0,"g":0,"b":255},
    {"r":0,"g":0,"b":212},
    {"r":0,"g":0,"b":166},
    {"r":32,"g":0,"b":166},
    {"r":38,"g":0,"b":212},
    {"r":46,"g":0,"b":255},
    {"r":71,"g":0,"b":255},
    {"r":101,"g":29,"b":255},
    {"r":131,"g":79,"b":255},
    {"r":163,"g":125,"b":255},
    {"r":196,"g":172,"b":255},
    {"r":215,"g":171,"b":255},
    {"r":192,"g":124,"b":255},
    {"r":170,"g":78,"b":255},
    {"r":148,"g":25,"b":255},
    {"r":127,"g":0,"b":255},
    {"r":107,"g":0,"b":255},
    {"r":89,"g":0,"b":212},
    {"r":70,"g":0,"b":166},
    {"r":113,"g":0,"b":166},
    {"r":145,"g":0,"b":212},
    {"r":176,"g":0,"b":255},
    {"r":188,"g":0,"b":255},
    {"r":199,"g":19,"b":255},
    {"r":211,"g":76,"b":255},
    {"r":222,"g":123,"b":255},
    {"r":235,"g":171,"b":255},
    {"r":255,"g":170,"b":255},
    {"r":255,"g":122,"b":255},
    {"r":254,"g":73,"b":255},
    {"r":254,"g":2,"b":255},
    {"r":254,"g":0,"b":255},
    {"r":254,"g":0,"b":255},
    {"r":207,"g":0,"b":211},
    {"r":162,"g":0,"b":165}
  ],
  palletIndex = _palletIndex = pc.math.random(32, 96)>>0, // 默认使用暖色系
  makePalletIndex = function() {
    if(++palletIndex >= 168) {
      // 超过范围了
      palletIndex = (palletIndex % 168) +11; // 防止颜色跳跃
    }
  },
  bgEl = document.getElementById("app-canvas-bg");


  makeLinearGradient = function() {
    var endPalletIndex = (palletIndex + 84) % 168, 
        eclr = "rgba(" + pallet[palletIndex].r + "," + pallet[palletIndex].g + "," + pallet[palletIndex].b + ", .6)",
        sclr = "rgba(" + pallet[endPalletIndex].r + "," + pallet[endPalletIndex].g + "," + pallet[endPalletIndex].b + ", 1)";
    bgEl.style.cssText = "background: " + sclr + " -webkit-gradient(linear, 0 0, 0 100%, from(" + sclr + "), to(" + eclr + "))";
    pc.sclr = sclr, pc.eclr =eclr;
  };

  PlayerControl.prototype = {
    // Called once after all resources are loaded and before the first update
    initialize: function() {

      var manager = app.root.findByName('Manager');
      this.gamemanger = manager.script.GameStateManager;

      this.prefab1 = app.root.findByName('prefab1');
      this.prefab2 = app.root.findByName('prefab2');

      this.needdestroyobjs = [];
      this.newEntity = null;
      this.score = 0;
      pc.score = 0;
      this.step = 0.3;
      this.lastScale = new pc.Vec3(2, 0.3, 2);
      this.newScale = new pc.Vec3(2, 0.3, 2);
      this.newPosition = new pc.Vec3(0, 0, 0);
      this.anotherPosition = new pc.Vec3(0, 0, 0);
      this.newYaw = true;
      this.moveSpeed = 1;
      this.NewScript = null;
      this.Color = new pc.Color(0, 0, 0, 1);
      this.lastColor = new pc.Color(0, 0, 0, 1);
      this.Perfect = 0;
      this.Count = 0;
      this.PerfectAnim = false;

      // this.Color.fromString("#4367c3");
      // this.r = this.Color.r;
      // this.g = this.Color.g;
      // this.b = this.Color.b;
      this.index = 0;
      // 生成色块
      makePalletIndex();
      this.Color.set(pallet[palletIndex].r / 255, pallet[palletIndex].g / 255, pallet[palletIndex].b / 255, 1);
      // this.Color.set(1,1,1,1);
      this.baseboxmat = app.assets.get(this.box1Mat).resource;
      this.baseboxmat.diffuse = this.Color;
      this.baseboxmat.update();

      this.perfectmat = app.assets.get(this.box2Mat).resource;

      var self = this;
      if (app.touch) {
        app.touch.on(pc.EVENT_TOUCHSTART, function(event){if(this.gamemanger.guide){return;}self.SpanCube(event);}, this);
      } else {
        app.mouse.on(pc.EVENT_MOUSEDOWN, function(event){if(this.gamemanger.guide){return;}self.SpanCube(event);}, this);
      }

      //this.playsound(-2);
    },

    skipGuide: function() {
      if(!pc.skipGuide) return;
      var that =  this;
      // 当前初始化是作为引导层
      // pc.skipGuide && that.gamemanger.GuideOver();
      if(pc.skipGuide) {
        pc.skipGuide = 0;// 重置回去
        setTimeout(function() {
          // 跳过引导层
          that.gamemanger.GuideOver(); // 跳过引导
        }, 100);
      }
    },

    // Called every frame, dt is time in seconds since last update
    update: function(dt) {
      this.skipGuide();
      if (this.gamemanger.lose) {
        return;
      }

      if (!this.gamemanger.start) {
        return;
      }

      if (!this.gamemanger.startgame) {
        return;
      }

      if (!pc.skipGuide && this.gamemanger.guide && !this.gamemanger.guidePausing) {
        this.checkGuide();
      }

      if (this.PerfectAnim) {

        var a = this.perfectmat.opacity;
        a -= 2 * dt;
        if (a <= 0) {

          this.PerfectAnim = false;
        }
        this.perfectmat.opacity = a;
        this.perfectmat.update();
      }

    },
    CreateCube: function() {
      var entity = this.prefab1.clone();
      entity.setLocalScale(this.newScale.x, this.newScale.y, this.newScale.z);
      this.newYaw = !this.newYaw;
      entity.setPosition(this.newYaw ? this.newPosition.x : -3.1, (this.score + 1) * this.step, this.newYaw ? -3.1 : this.newPosition.z);
      var material = new pc.PhongMaterial();
      material.shadingModel = pc.SPECULAR_BLINN;
      material.diffuse = this.Color;
      material.update();
      entity.model.model.meshInstances[0].material = material;

      makeLinearGradient(); // 渐变背景
      makePalletIndex();
      this.Color.set(pallet[palletIndex].r / 255, pallet[palletIndex].g / 255, pallet[palletIndex].b / 255, 1);

      app.root.addChild(entity);
      this.newEntity = entity;
      this.NewScript = this.newEntity.script.NewEntityMove;
      if (this.Perfect > 0) {
        this.NewScript.MoveSpeed += this.Perfect * 0.25;
      }
      this.NewScript.MoveSpeed += Math.round(this.score / 50) * 0.5;

    },

    CreateStaticRigibodyCube: function(entity) {
      entity.setLocalScale(this.newScale.x, this.newScale.y, this.newScale.z);
      entity.setPosition(this.newPosition.x, (this.score + 1) * this.step, this.newPosition.z);
      entity.removeComponent("script");
      entity.enabled = true;
      this.needdestroyobjs.push(entity);
    },

    CreateDynamicRigibodyCube: function() {

      var entity = this.prefab2.clone();
      entity.setLocalScale((this.newYaw ? this.newScale.x : (this.lastScale.x - this.newScale.x)), this.newScale.y, (this.newYaw ? (this.lastScale.z - this.newScale.z) : this.newScale.z));
      entity.setPosition(this.anotherPosition.x, (this.score + 1) * this.step, this.anotherPosition.z);
      var material = new pc.PhongMaterial();
      material.shadingModel = pc.SPECULAR_BLINN;
      material.diffuse = this.lastColor;
      material.update();
      entity.model.model.meshInstances[0].material = material;
      entity.script.ApplyGravity.canMove = true;
      app.root.addChild(entity);

    },




    SpanCube: function(event) {
      if (!this.gamemanger.start) {
        return;
      }
      if (this.gamemanger.lose) {
        return;

      }
      // tap to start game
      if (!this.gamemanger.startgame) {
        this.gamemanger.startgame = true;
        this.CreateCube();
        this.gamemanger.GameStartGame();
        return;
      }


      this.NewScript.Move = false;
      this.lastScale.x = this.newScale.x;
      this.lastScale.y = this.newScale.y;
      this.lastScale.z = this.newScale.z;
      this.anotherPosition.x = this.newPosition.x;
      this.anotherPosition.y = this.newPosition.y;
      this.anotherPosition.z = this.newPosition.z;
      if (!this.newYaw) {
        var x = this.newEntity.getPosition().x - this.newPosition.x;
        if (Math.abs(x) >= this.newScale.x) {
          this.gamemanger.lose = true;
        } else {
          var newscaleX = this.newScale.x - Math.abs(x);
          if (newscaleX >= 0.925 * this.newScale.x) {

          } else {
            if (x > 0) {
              this.newPosition.x = this.newPosition.x + (this.newScale.x - newscaleX) / 2.0;
              this.anotherPosition.x = this.newPosition.x + (this.newScale.x - newscaleX / 2.0);
            } else {
              this.newPosition.x = this.newPosition.x - (this.newScale.x - newscaleX) / 2.0;
              this.anotherPosition.x = this.newPosition.x - (this.newScale.x - newscaleX / 2.0);
            }
            this.newScale.x = newscaleX;
          }


        }
      } else {
        var z = this.newEntity.getPosition().z - this.newPosition.z;

        if (Math.abs(z) >= this.newScale.z) {
          this.gamemanger.lose = true;
        } else {
          var newscaleZ = this.newScale.z - Math.abs(z);
          if (newscaleZ >= this.newScale.z * 0.925) {

          } else {
            if (z > 0) {
              this.newPosition.z = this.newPosition.z + (this.newScale.z - newscaleZ) / 2.0;
              this.anotherPosition.z = this.newPosition.z + (this.newScale.z - newscaleZ / 2.0);
            } else {
              this.newPosition.z = this.newPosition.z - (this.newScale.z - newscaleZ) / 2.0;
              this.anotherPosition.z = this.newPosition.z - (this.newScale.z - newscaleZ / 2.0);
            }
            this.newScale.z = newscaleZ;
          }

        }
      }

      if (this.gamemanger.lose) {

        if (!this.NewScript.applyGravity) {

          this.NewScript.applyGravity = true;
          this.playsound(-3);
        }



      } else {
        this.newEntity.enabled = false;
        var color0 = this.newEntity.model.model.meshInstances[0].material.diffuse;
        this.lastColor.set(color0.r, color0.g, color0.b, color0.a);

        if (this.anotherPosition.x != this.newPosition.x || this.anotherPosition.z != this.newPosition.z) {
          this.CreateDynamicRigibodyCube();
          this.Perfect = 0;
          this.Count = 0;
          this.playsound(this.Perfect);
        } else {
          // perfect
          this.Perfect++;
          this.Count++;
          // Combo
          if(this.Count % 2 == 0){
              var curcamera = app.root.findByName("Camera");
              var camerafollow = curcamera.script.CameraFollow;
              var sp = camerafollow.worldToScreen(this.newPosition);
              this.gamemanger.GameCombo({'x': sp.x, 'y':sp.y, 'scaleX': this.newScale.x, 'scaleZ': this.newScale.z});
              this.Count == 0;
          }

          this.playsound(this.Perfect);
          this.PerfectEffect.setPosition(this.newPosition.x, (this.score + 0.5) * this.step, this.newPosition.z);
          this.PerfectEffect.setLocalScale(this.newScale.x + 0.15, 1, this.newScale.z + 0.15);
          this.PerfectEffect.enabled = true;
          this.PerfectAnim = true;

          this.perfectmat.opacity = 1;
          this.perfectmat.update();
          // perfection static cube
          // 连击变大只需要改下面的数字即可
          if (this.Perfect >= 4 && this.Perfect != this.score + 1) {

            if (!this.newYaw) {
              if (this.newScale.x < 2) {

                var disX1 = -1 - this.newPosition.x + this.newScale.x / 2;

                if (Math.abs(disX1) > 0.01) {
                  if (-disX1 > 0.1 * this.newScale.x) {
                    this.newPosition.x -= 0.05 * this.newScale.x;
                    this.newScale.x *= 1.1;
                  } else {
                    this.newPosition.x -= -disX1 / 2;
                    this.newScale.x += -disX1;
                  }

                } else {
                  var disX2 = 1 - this.newPosition.x - this.newScale.x / 2;

                  if (Math.abs(disX2) > 0.01) {
                    if (disX2 > 0.1 * this.newScale.x) {
                      this.newPosition.x += 0.05 * this.newScale.x;
                      this.newScale.x *= 1.1;
                    } else {
                      this.newPosition.x += disX2 / 2;
                      this.newScale.x += disX2;
                    }
                  }

                }

              }

            } else {
              if (this.newScale.z < 2) {


                var disX3 = -1 - this.newPosition.z + this.newScale.z / 2;

                if (Math.abs(disX3) > 0.01) {
                  if (-disX3 > 0.1 * this.newScale.z) {
                    this.newPosition.z -= 0.05 * this.newScale.z;
                    this.newScale.z *= 1.1;
                  } else {
                    this.newPosition.z -= -disX3 / 2;
                    this.newScale.z += -disX3;
                  }
                } else {
                  var disX4 = 1 - this.newPosition.z - this.newScale.z / 2;

                  if (Math.abs(disX4) > 0.01) {
                    if (disX4 > 0.1 * this.newScale.z) {
                      this.newPosition.z += 0.05 * this.newScale.z;
                      this.newScale.z *= 1.1;
                    } else {
                      this.newPosition.z += disX4 / 2;
                      this.newScale.z += disX4;
                    }
                  }

                }


              }
            }
          }
        }
        this.CreateStaticRigibodyCube(this.newEntity);
        this.score++;
        pc.score = this.score; // 向外暴露一个分数接口

        this.gamemanger.GetScore();

        this.CreateCube();
      }

      if (this.gamemanger.guide) {
        this.gamemanger.GuideStepPlay();
        this.gamemanger.guideStep += 1;
        if (this.gamemanger.guideStep >= 5) {
          var self = this;
          setTimeout(function(){
            self.gamemanger.GuideOver();
          }, 500);
        }
      }

    },


    playsound: function(num) {

      var name;
      switch (num) {
        case -3:
          name = "K";
          break;
        case -2:
          name = "J";
          break;
        case -1:
          name = "I";
          break;
        case 0:
          name = "H";
          break;
        case 1:
          name = "A";
          break;
        case 2:
          name = "B";
          break;
        case 3:
          name = "C";
          break;
        case 4:
          name = "D";
          break;
        case 5:
          name = "E";
          break;
        case 6:
          name = "F";
          break;
        case 7:
          name = "G";
          break;
        default:
          break;
      }
      if (num > 7) {
        name = "G";
      }
      this.entity.sound.slot(name).play();
    },

    Init: function() {
      var length = this.needdestroyobjs.length;
      for (var i = 0; i < length; i++) {
        var obj = this.needdestroyobjs.pop();
        obj.destroy();
      }

      this.newEntity = null;
      this.score = 0;
      pc.score = 0;
      this.step = 0.3;
      this.lastScale.set(2, 0.3, 2);
      this.newScale.set(2, 0.3, 2);
      this.newPosition.set(0, 0, 0);
      this.anotherPosition.set(0, 0, 0);
      this.newYaw = true;
      this.moveSpeed = 1;
      this.NewScript = null;
      this.Color = new pc.Color(0, 0, 0, 1);
      this.lastColor = new pc.Color(0, 0, 0, 1);
      this.Perfect = 0;
      this.Count = 0;
      this.PerfectAnim = false;

      // 随机颜色
      makeLinearGradient(); // 渐变背景
      makePalletIndex();
      this.Color.set(pallet[palletIndex].r / 255, pallet[palletIndex].g / 255, pallet[palletIndex].b / 255, 1);

      this.baseboxmat = app.assets.get(this.box1Mat).resource;
      this.baseboxmat.diffuse = this.Color;
      this.baseboxmat.update();

    },

    showGuide: function() {
      if (!this.gamemanger.startgame) {
        this.gamemanger.startgame = true;
        this.CreateCube();
        this.gamemanger.GameStartGame();
        return;
      }
    },

    checkGuide: function() {
      if (!this.gamemanger.start) {
        return;
      }
      if (this.gamemanger.lose) {
        return;
      }
      // console.log(Math.abs(this.newEntity.getPosition().x), Math.abs(this.newEntity.getPosition().z));
      // var _distance = this.gamemanger.guideDistance[this.gamemanger.guideStep];
      // _distance = _distance ? _distance : 0.1;
      var _distance = 0.1;
      if (Math.abs(this.newEntity.getPosition().x) <= _distance && Math.abs(this.newEntity.getPosition().z) <= 0.1) {
        this.NewScript.Move = false;
        this.gamemanger.GuideStepPause();
      }
    }



  };

  return PlayerControl;
});
