pc.script.create('GameStateManager', function (app) {
   // Creates a new GameStateManager instance
   var GameStateManager = function (entity) {
       this.entity = entity;
   };
   GameStateManager.prototype = {

       initialize: function ()
       {
          //needInit
          var manager = app.root.findByName("Manager");
          this.playercontrol = manager.script.PlayerControl;
          var curcamera = app.root.findByName("Camera");
          this.camerafollow = curcamera.script.CameraFollow;
          this.reset(); // 重置状态

          // 引导相关
          this.scoreEl = document.getElementById("score");
          this.guide = false;
          this.guideStep = 0;
          this.guideDistance = [0.7, 0.7, 0.7];
          var that = this;
          // 暴露个接口
          pc._gameRestart = function () {
            that.restart();
          };
       },

      reset: function() {
        this.start = false;
        this.lose = false;
        this.startgame = false;
        this.playtimer = 0;
        pc.score = this.score = this.playercontrol.score = 0;
        this.combo = 0;

        delete this.resume; // 删除这个属性

      },


      restart: function() {
        //重新开始
        this.reset();
        this.startgame = this.start = true; // 开始游戏
        restartHandle && restartHandle();
        var children = app.root._children;
        var i = children.length - 1;
        while(i >= 1) {
          children[i].destroy();
          i--;
        }
        this.scoreEl.innerHTML = "0";
        this.camerafollow.Init();
        this.playercontrol.Init();
        this.playercontrol.CreateCube();
      },

       // Called every frame, dt is time in seconds since last update
       update: function (dt)
       {
           if(!this.startgame || this.lose)
           {
               return;
           }

           this.playtimer += dt;
       },

       GameStartGame:function()
       {

           console.log('PlayGame');
           // startHandle();
       },

       GameStart:function()
       {
           console.log("press start btn");
           // beginHandle();

           // start game .
           this.playercontrol.showGuide();

           startHandle && startHandle();
       },

       GetScore: function(){
           this.score++;
           this.scoreEl.innerHTML = this.score.toString();
           scoreUpdateHandle(this.score);
       },

       GameCombo: function(data) {
           this.combo++;
           comboHandle(data);
       },

       GameEnd:function()
       {
           var scoreinfo={
               "score": this.score,
               'usertime': parseInt(this.playtimer).toString(),
           };
           gameoverHandle && gameoverHandle(scoreinfo);
       },
       GameResume: function()
       {
          var that = this;
          gameResumeHandle(function(status) {
            // status 表示是要继续还是直接结束 true 继续,false 直接结束游戏
            that.lose = !status;
            if(!that.lose){ // 有机会续命
              that.resume = 1; // 通知状态
              status && that.playercontrol.CreateCube();
            }
          });
       },
       GameGuide: function() {
          this.start = true;
          this.guide = true;

          var score = document.getElementById("score");
          score.style.display = "block";
          
          this.camerafollow.showGuide();
          this.playercontrol.showGuide();

          guideStartHandle && guideStartHandle();
       },

       GuideStepPause: function() {
        this.guidePausing = true;
        guideStepPauseHandle && guideStepPauseHandle(this.guideStep);
        var self = this;
        this.sto = setTimeout(function(){
          self.playercontrol.SpanCube();
        }, 1000);
       },

       GuideStepPlay: function() {
        this.guidePausing = false;
        guideStepPlayHandle && guideStepPlayHandle(this.guideStep);
       },

       GuideOver: function() {
        this.guide = false;
        this.start = false;
        this.guidePausing = false;
        this.sto && clearTimeout(this.sto);
        this.camerafollow.Init();
        this.playercontrol.Init();

        var score = document.getElementById("score");
        score.style.display = "none";
        score.innerHTML = '0';

        this.Init();

        // app.root.children
        var children = app.root._children;
        var i = children.length - 1;
        while(i >= 1) {
          children[i].destroy();
          i--;
        }

        guideOverHandle && guideOverHandle();
       },

       Init:function()
       {

           this.lose = false;
           this.startgame = false;
           this.playtimer = 0;
           this.score = 0;
           this.combo = 0;
           // resetHandle();
       }

   };

   return GameStateManager;
});
