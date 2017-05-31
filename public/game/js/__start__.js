(function () {
    var CONFIG_FILENAME = 'images/json/config.json';
    var CANVAS_ID = 'app-canvas';

    var canvas, devices, app;

    var createCanvas = function () {
        canvas = document.getElementById(CANVAS_ID);
        // canvas.setAttribute('id', CANVAS_ID);
        canvas.setAttribute('tabindex', 0);
        // canvas.style.zIndex = 2;
        // canvas.style.visibility = 'hidden';

        // Disable I-bar cursor on click+drag
        canvas.onselectstart = function () { return false; };

        /*阻止用户双击使屏幕上滑*/
        var agent = navigator.userAgent.toLowerCase();        //检测是否是ios
        var iLastTouch = null;                                //缓存上一次tap的时间
        if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0)
        {
            document.body.addEventListener('touchend', function(event)
            {
                var iNow = new Date().getTime();
                iLastTouch = iLastTouch || iNow + 1 /** 第一次时将iLastTouch设为当前时间+1 */ ;
                var delta = iNow - iLastTouch;
                if (delta < 500 && delta > 0)
                {
                    event.preventDefault();
                    return false;
                }
                iLastTouch = iNow;
            }, false);
        }

        // document.body.appendChild(canvas);

        return canvas;
    };

    var createInputDevices = function (canvas) {
        var devices = {
            keyboard: new pc.Keyboard(window),
            mouse: new pc.Mouse(canvas),
            gamepads: new pc.GamePads(),
        };
        if ('ontouchstart' in window) {

            devices.touch = new pc.TouchDevice(canvas);
        }

        return devices;
    };

    var configureCss = function (fillMode, width, height) {
        // Configure resolution and resize event
        if (canvas.classList) {
            canvas.classList.add('fill-mode-' + fillMode);
        }

        // css media query for aspect ratio changes
        var css  = "@media screen and (min-aspect-ratio: " + width + "/" + height + ") {";
            css += "    #application-canvas.fill-mode-KEEP_ASPECT {";
            css += "        width: auto;";
            css += "        height: 100%;";
            css += "        margin: 0 auto;";
            css += "    }";
            css += "}";

        // append css to style
        if (document.head.querySelector) {
            document.head.querySelector('style').innerHTML += css;
        }
    };

    var reflow = function () {
        var size = app.resizeCanvas(canvas.width, canvas.height);
        canvas.style.width = '';
        canvas.style.height = '';

        var fillMode = app._fillMode;

        if (fillMode == pc.FILLMODE_NONE || fillMode == pc.FILLMODE_KEEP_ASPECT) {
            if ((fillMode == pc.FILLMODE_NONE && canvas.clientHeight < window.innerHeight) || (canvas.clientWidth / canvas.clientHeight >= window.innerWidth / window.innerHeight)) {
                canvas.style.marginTop = Math.floor((window.innerHeight - canvas.clientHeight) / 2) + 'px';
            } else {
                canvas.style.marginTop = '';
            }
        }
    };

    var displayError = function (html) {
        var div = document.createElement('div');

        div.innerHTML  = [
            '<table style="background-color: #8CE; width: 100%; height: 100%;">',
            '  <tr>',
            '      <td align="center">',
            '          <div style="display: table-cell; vertical-align: middle;">',
            '              <div style="">' + html + '</div>',
            '          </div>',
            '      </td>',
            '  </tr>',
            '</table>'
        ].join('\n');

        document.body.appendChild(div);
    };

    canvas = createCanvas();
    devices = createInputDevices(canvas);

    try {
        app = new pc.Application(canvas, {
            keyboard: devices.keyboard,
            mouse: devices.mouse,
            gamepads: devices.gamepads,
            touch: devices.touch,
            graphicsDeviceOptions: CONTEXT_OPTIONS
        });
    } catch (e) {
        if (e instanceof pc.UnsupportedBrowserError) {
            displayError('This page requires a browser that supports WebGL.<br/>' +
                    '<a href="http://get.webgl.org">Click here to find out more.</a>');
        } else if (e instanceof pc.ContextCreationError) {
            displayError("It doesn't appear your computer can support WebGL.<br/>" +
                    '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>');
        } else {
            displayError('Could not initialize application. Error: ' + e);
        }

        return;
    }

    app.loader.getHandler("texture").crossOrigin = "anonymous";

    app.configure(CONFIG_FILENAME, function (err) {
        if (err) {
            console.error(err);
        }

        configureCss(app._fillMode, app._width, app._height);
        reflow();

        app.preload(function (err) {
            if (err) {
                console.error(err);
            }

            app.loadScene(SCENE_PATH, function (err, scene) {
                if (err) {
                    console.error(err);
                }

                app.start();
                // show guide.
                var manager = app.root.findByName("Manager");
                this.gamemanager = manager.script.GameStateManager;
                this.gamemanager.GameGuide();
            });
        });
    });


    var capture = function() {
        // 截图方法
        var base64,
            captureCanvas = document.createElement("canvas"),
            ctx = captureCanvas.getContext("2d"),
            cw = document.documentElement.clientWidth, //获取窗口高度和严格模式有关
            ch = document.documentElement.clientHeight,
            linearGradient = ctx.createLinearGradient(0, 0, cw, ch);

        captureCanvas.width = cw, 
        captureCanvas.height = ch,
        linearGradient.addColorStop(0, pc.sclr),
        linearGradient.addColorStop(1, pc.eclr),
        ctx.fillStyle = linearGradient,
        ctx.fillRect(0, 0, cw, ch);
        gridBg && ctx.drawImage(gridBg, 0, 0, cw, ch); // 网格
        spots && ctx.drawImage(spots, 0, 0, cw, ch); // spots

        console.log("high:" , ch);
        app.render(); // webgl 必需要保证缓存有图像
        ctx.drawImage(canvas, 0, 0, cw, ch);
        //印上文字
        fillText( {
            ctx: ctx,
            text: pc.captureInfo.title, 
            fontSize: 20,
            color: "#fff",
            top: 50,
            cw: cw,
            ch: ch
        } );

        fillText( {
            ctx: ctx,
            text: pc.captureInfo.score + "", 
            fontSize: 70,
            color: "#fff",
            top: 120,
            cw: cw,
            ch: ch
        } );

        fillText( {
            ctx: ctx,
            text: pc.captureInfo.subt1, 
            fontSize: 20,
            color: "#fff",
            top: 160,
            cw: cw,
            ch: ch
        } );

        fillText( {
            ctx: ctx,
            text: pc.captureInfo.subt2, 
            fontSize: 16,
            color: "#fff",
            top: 188,
            cw: cw,
            ch: ch
        } );

        // 打上二维码
        pc.captureInfo.env && qr[pc.captureInfo.env] && ctx.drawImage(qr[pc.captureInfo.env], 0, 0, 200, 200, cw - 90, ch - 90, 70, 70);

        base64 = captureCanvas.toDataURL();
        delete pc.captureInfo; // 删除信息对象
        return base64;
    },


    fillText = function(arg) {
        //绘制文字
        var ctx = arg.ctx;
        ctx.fillStyle = arg.color || "#ffffff";
        ctx.font = arg.fontSize + "px Arial";
        if(!arg.left) {
            //如果没有传入 left 默认居中 
            var textLength = getWordLeng(arg.text) * arg.fontSize;
            arg.left = (arg.cw - textLength) / 2;
        }
        ctx.fillText(arg.text, arg.left, arg.top || 0);
    },

    getWordLeng = function(text) {
        // 获取字长度，英文或数字和标点都表示半个字长
        var wordLen = 0;
        for(var i=0, len=text.length; i<len; ++i) {
            wordLen += (text.charCodeAt(i) > 256 ? 1 : .5)
        }
        return wordLen;
    },

    gridBg = function() {
        // 格子背景
        var img = new Image();
        img.onload = function() {
            gridBg = img;
        }
        img.crossOrigin = "*";
        img.src = "//wq.360buyimg.com/fd/h5/1612/store/images/grid_9b0f1b3b.png";
        return null;
    }(),

    spots = function() {
        var img = new Image();
        img.onload = function() {
            spots = img;
        }
        img.crossOrigin = "*";
        img.src = "//wq.360buyimg.com/fd/h5/1612/store/images/spots_e5a37132.png";
        return null;
    }(),

    qr = {};
    qr.wechat = function() {
        var img = new Image();
        img.onload = function() {
            qr.wechat = img;
        }
        img.crossOrigin = "*";
        img.src = "//wq.360buyimg.com/fd/h5/1612/store/images/wechat_qr_4469da0f.jpg";
    }(),

    qr.sq = function() {
        var img = new Image();
        img.onload = function() {
            qr.wechat = img;
        }
        img.crossOrigin = "*";
        img.src = "//wq.360buyimg.com/fd/h5/1612/store/images/sq_qr_d62021bf.jpg";
    }();

    pc.render = function(arg) {
        pc.captureInfo = arg;
        if(pc.canCapture) {
            arg.callback && arg.callback(capture());
        }  
    }

    pc.allowCapture =function() {
        // 收到可以截图
        pc.captureInfo && pc.captureInfo.callback && pc.captureInfo.callback(capture());
    }

    window.addEventListener('resize', reflow, false);
    window.addEventListener('orientationchange', reflow, false);
}());
