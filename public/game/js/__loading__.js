pc.script.createLoadingScreen(function (app) {
    
    var hideSplash = function () {
        $('.load').remove();
        
        loadedHandle && loadedHandle();
    };

    var setProgress = function (value) {
        var bar = document.getElementById('progress-bar');
        var pnum = document.getElementById('progress-num');
        value = Math.floor(Math.min(1, Math.max(0, value)) * 100);
        if(bar) {
            bar.style.width = value + '%';
        }

        if (pnum) {
            pnum.innerHTML = value + '%';
        }
    };

    app.on('preload:end', function () {
        app.off('preload:progress');
    });
    app.on('preload:progress', setProgress);
    app.on('start', hideSplash);
});
