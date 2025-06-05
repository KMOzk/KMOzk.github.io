const songs = [
    {title: "Acceptance", path: "assets/css/audio/acceptance.wav"},
    {title: "Playec", path: "assets/css/audio/playstatinon.wav"},
    {title: "Bowler", path: "assets/css/audio/BowlerStart.wav"}
];

let currentSongIndex = 0;
const audioPlayer = document.getElementById("audio-player");
const audioSource = document.getElementById("audio-source");
const trackInfo = document.getElementById("current-track");
audioPlayer.volume = 0.1;

function playSong(index) {
    currentSongIndex = index;
    audioSource.src = songs[index].path;
    trackInfo.textContent = `Now Playing: ${songs[index].title}`;
    audioPlayer.load();
    audioPlayer.play();

    // Highlight active playlist item
    document.querySelectorAll('.playlist li').forEach((li, i) => {
        li.classList.toggle('active', i === index);
    });
}


audioPlayer.addEventListener("ended", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
});

window.onload = () => {
    playSong(0);
};
(function () {
    const player = document.getElementById('draggable-player');
    const handle = document.getElementById('player-handle');
    let offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;
    let dragging = false;

    if (player && handle) { // Prevents errors if element not found
        handle.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('mouseup', dragEnd);

        // Touch support for mobile
        handle.addEventListener('touchstart', dragStart, {passive: false});
        document.addEventListener('touchmove', dragMove, {passive: false});
        document.addEventListener('touchend', dragEnd);
    }

    function dragStart(e) {
        e.preventDefault();
        dragging = true;
        player.classList.add('dragging');
        if (e.touches) e = e.touches[0];
        mouseX = e.clientX;
        mouseY = e.clientY;
        const rect = player.getBoundingClientRect();
        offsetX = mouseX - rect.left;
        offsetY = mouseY - rect.top;
        player.style.transform = 'none';
        player.style.left = rect.left + 'px';
        player.style.top = rect.top + 'px';
        player.style.bottom = 'auto';
    }

    function dragMove(e) {
        if (!dragging) return;
        if (e.touches) e = e.touches[0];
        let x = e.clientX - offsetX;
        let y = e.clientY - offsetY;
        x = Math.max(0, Math.min(window.innerWidth - player.offsetWidth, x));
        y = Math.max(0, Math.min(window.innerHeight - player.offsetHeight, y));
        player.style.left = x + 'px';
        player.style.top = y + 'px';
    }

    function dragEnd(e) {
        if (dragging) {
            dragging = false;
            player.classList.remove('dragging');
        }
    }
})();