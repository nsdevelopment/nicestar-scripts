$(function () {
    const unbuckleAudio = new Audio("./sounds/unbuckle.ogg");
    unbuckleAudio.volume = 0.6;
    const buckleAudio = new Audio("./sounds/buckle.ogg");
    buckleAudio.volume = 0.6;
    const chimeAudio = new Audio("./sounds/chime.ogg");

    var blinkTimeout,
        reminderTimeout,
        cleanupTimeout,
        forceShowTimeout = null;
    var oldbelt,
        shouldClear,
        shouldChime = false;

    window.addEventListener("message", (e) => {
        var item = e.data;

        if (item.hasOwnProperty("shouldChime")) {
            shouldChime = item.shouldChime;
            chimeAudio.volume = shouldChime ? 0.8 : 0.0;
            return;
        }

        if (item.hud === false) {
            $("#content").fadeOut();
            return;
        } else if (item.hud === true) {
            $("#content").fadeIn();
            return;
        }

        if (item.car === false) {
            oldbelt = false;
            shouldClear = true;
            shouldChime = false;
            clearInterval(reminderTimeout);
            clearInterval(blinkTimeout);
            clearTimeout(cleanupTimeout);
            clearTimeout(forceShowTimeout);
            $(".blink-image").fadeOut();
            if (chimeAudio !== undefined) chimeAudio.pause();
            if (buckleAudio !== undefined) buckleAudio.pause();
            if (unbuckleAudio !== undefined) unbuckleAudio.pause();
            return;
            setTimeout(() => {
                clearInterval(reminderTimeout);
                clearInterval(blinkTimeout);
                clearTimeout(cleanupTimeout);
                clearTimeout(forceShowTimeout);
                $(".blink-image").fadeOut();
            }, 500);
        }
        if (item.belt === false) {
            if (oldbelt) unbuckleAudio.play();
            oldbelt = false;
            chimeAudio.play();
            $(".blink-image").fadeIn();
            blinkTimeout = setInterval(() => {
                $(".blink-image").toggle();
            }, 500);
            cleanupTimeout = setTimeout(() => {
                clearInterval(blinkTimeout);
                if (!oldbelt && !shouldClear) {
                    $(".blink-image").fadeIn();
                }
            }, 6000);

            if (!shouldClear) {
                reminderTimeout = setInterval(() => reminder(), 15 * 1000);
            }
            shouldClear = false;
            cleanupTimeout = setTimeout(() => {
                clearInterval(reminderTimeout);
            }, 60 * 1000);
        } else {
            clearInterval(reminderTimeout);
            clearInterval(blinkTimeout);
            clearTimeout(cleanupTimeout);
            clearTimeout(forceShowTimeout);
            if (buckleAudio !== undefined) buckleAudio.pause();
            if (unbuckleAudio !== undefined) unbuckleAudio.pause();
            buckleAudio.play();
            oldbelt = true;
            setTimeout(() => {
                if (chimeAudio !== undefined) chimeAudio.pause();
            }, 2500);
            $(".blink-image").fadeOut();
        }
    });

    function reminder() {
        chimeAudio.play();
        $(".blink-image").fadeOut();
        blinkTimeout = setInterval(() => {
            $(".blink-image").toggle();
        }, 500);
        forceShowTimeout = setTimeout(() => {
            clearInterval(blinkTimeout);
            $(".blink-image").fadeIn();
        }, 6500);
    }
});
