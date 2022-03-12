const audioContainer = document.querySelector("#audio-player-container")
const audioSource = document.querySelector("#audio-source")
const playButton = document.querySelector("#play-button")
const imageContainer = document.querySelector("#image-container")
const coverImage = document.querySelector("#cover-image")
const playButtonImage = document.querySelector("#play-button-image")
const nextButton = document.querySelector("#next-button")
const previousButton = document.querySelector("#previous-button")

const musicTitle = document.querySelector("#music-title")
const musicArtist = document.querySelector("#music-artist")
const musicAlbum = document.querySelector("#music-album")

// Mimic very basic NoSQL database
const songList = [
	{
		title: "A Chance of Rain",
		artist: "Bedouin Soundclash",
		album: "Light the Horizon",
		path: "/vanilla-audio-player/music/A Chance of Rain.mp3",
		artPath:
			"/vanilla-audio-player/images/bedouin-soundclash-light-the-horizon.jpg",
	},
	{
		title: "Maverick",
		artist: "FM-84",
		album: "Maverick",
		path: "/vanilla-audio-player/music/Maverick.mp3",
		artPath: "/vanilla-audio-player/images/fm-84-maverick.jpg",
	},
	{
		title: "Aphelion",
		artist: "Scandroid",
		album: "Scandroid",
		path: "/vanilla-audio-player/music/Aphelion.mp3",
		artPath: "/vanilla-audio-player/images/scandroid-scandroid.jpg",
	},
]

// Set initial localstorage
if (!localStorage.getItem("currentSongIndex")) {
	localStorage.setItem("currentSongIndex", 0)
}

// Load stored song from localStorage
function loadFromLocalStorage() {
	const currentSongIndex = parseInt(localStorage.getItem("currentSongIndex"))
		? parseInt(localStorage.getItem("currentSongIndex"))
		: 0
	loadSong(songList[currentSongIndex])
}

// Initial load
loadFromaocalStorage()

// Takes a song object and updates DOM nodes
function loadSong(song) {
	audioSource.src = song.path
	musicTitle.innerText = song.title
	musicArtist.innerText = song.artist
	musicAlbum.innerText = song.album
	coverImage.src = song.artPath
}

const handlePlayClick = (event) => {
	// If audio is not paused, pause it and revert to play button
	if (!audioSource.paused) {
		audioSource.pause()
		audioContainer.classList.remove("play")
		playButtonImage.src = "/vanilla-audio-player/images/icons/play.svg"
		playButton.classList.remove("pause-button")
		playButton.classList.add("play-button")
		return
	}

	// Default behavior: play and replace pause play button with pause
	audioSource.play()
	audioContainer.classList.add("play")
	playButton.classList.remove("play-button")
	playButton.classList.add("pause-button")
	playButtonImage.src = "/images/icons/pause.svg"
}

playButton.addEventListener("click", handlePlayClick)

/* On next button click, check current song index in localStorage
update accordingly
*/
const handleNextButtonClick = (event) => {
	// Get current song index from localStorage
	const currentSongIndex = localStorage.getItem("currentSongIndex")

	// If we're at the end of the song list, loop back to index 0
	const nextSongIndex =
		songList.length - 1 != parseInt(currentSongIndex)
			? parseInt(currentSongIndex) + 1
			: 0

	// Load the song from the database
	loadSong(songList[nextSongIndex])

	audioSource.play()
	// Update currentsong state
	localStorage.setItem("currentSongIndex", nextSongIndex)
}

nextButton.addEventListener("click", handleNextButtonClick)

const handlePreviousButtonClick = (event) => {
	// Get current song index from localStorage
	const currentSongIndex = localStorage.getItem("currentSongIndex")

	// If we're at the beginning of the song list, loop back to index -1
	const previousSongIndex =
		parseInt(currentSongIndex) != 0
			? parseInt(currentSongIndex) - 1
			: songList.length - 1

	// Load the song from the database
	loadSong(songList[previousSongIndex])

	audioSource.play()

	// Update currentsong state
	localStorage.setItem("currentSongIndex", previousSongIndex)
}

previousButton.addEventListener("click", handlePreviousButtonClick)
