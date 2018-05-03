// Sticky hover fix for iOS
(function (l) {
    var i, s = {
        touchend: function () {
        }
    };
    for (i in s)l.addEventListener(i, s)
})(document);

$(function () {
    var audio = new Audio('audio/bncc.ogg', 'audio/bncc.mp3'),
        $play = $('#play'),
        $pause = $('#pause'),
        $seek = $('#seek'),
        $currentTime = $('#current-time'),
        $endTime = $('#end-time');

    if (audio.canPlayType('audio/mpeg;')) {
        audio.type = 'audio/mpeg';
        audio.src = 'audio/bncc.mp3';
    } else {
        audio.type = 'audio/ogg';
        audio.src = 'audio/bncc.ogg';
    }
    $play.on('click', function (e) {
        e.preventDefault();
        $(this).hide();
        $pause.show();
        $seek.attr('max', audio.duration);
        audio.play();
    });

    $pause.on('click', function (e) {
        e.preventDefault();
        $(this).hide();
        $play.show();
        $seek.attr('max', audio.duration);
        audio.pause();
    });

    $seek.on('click', function (event) {
        var percent = event.offsetX / this.offsetWidth;
        audio.currentTime = percent * audio.duration;
        $(this).attr('value', (percent / 100));
    });

    setTimeout(function () {
        $seek.attr('max', audio.duration);
        $endTime.text(getDurationString(audio.duration));
    }, 500);

    $(audio).on('timeupdate', function () {
        if (!audio.ended) {
            $seek.attr('value', audio.currentTime);
            $currentTime.text(getCurrentTimeString(audio.currentTime))
        } else {
            $seek.attr("value", 0);
            $currentTime.text('0:00');
            $play.show();
            $pause.hide();
        }
    });

    function getDurationString(length) {
        var minutes = Math.floor(length / 60),
            secondsInt = length - minutes * 60,
            secondsStr = secondsInt.toString(),
            seconds = secondsStr.substr(0, 2);

        return minutes + ':' + seconds;
    }

    function getCurrentTimeString(currentTime) {
        var currentMinute = parseInt(currentTime / 60) % 60,
            currentSecondsLong = currentTime % 60,
            currentSeconds = currentSecondsLong.toFixed();
        return currentMinute + ":" + (currentSeconds < 10 ? "0" + currentSeconds : currentSeconds);

    }

    $('.tabs a').on("click", function (event) {
        // Pega o elemento com jQuery
        var $this = $(this),
            hash = $this.attr('href');

        // Remove o class de ativo de todos <li>
        $('.tab.active').removeClass('active');

        // Adiciona o class de ativo no <li> atual
        $this.parent().addClass('active');

        // Esconde todos conteúdos
        $('.tabcontent').fadeOut();

        setTimeout(function () {
            // Mostra o conteúdo atual
            $(hash).fadeIn();
        }, 500)
    });
});