const songs = [
    {title: "Song 1", path: "assets/music/song1.mp3"},
    {title: "Song 2", path: "assets/music/song2.mp3"},
    {title: "Song 3", path: "assets/music/song3.mp3"}
];

let currentSongIndex = 0; // Start with the first song
const audioPlayer = document.getElementById("audio-player");
const audioSource = document.getElementById("audio-source");
const trackInfo = document.getElementById("current-track");

// Function to load and play a song
function playSong(index) {
    currentSongIndex = index;
    audioSource.src = songs[index].path;
    trackInfo.textContent = `Now Playing: ${songs[index].title}`;
    audioPlayer.load();
    audioPlayer.play();
}

// Automatically go to the next song when the current one ends
audioPlayer.addEventListener("ended", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length; // Loop to first song after last
    playSong(currentSongIndex);
});

// Start the first song when page loads
window.onload = () => {
    playSong(0);
};