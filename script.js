const audioSource = document.querySelector("#audio-source")
const playButton = document.querySelector("#play-button")
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
		path: "/music/A Chance of Rain.mp3",
		artPath: "/images/bedouin-soundclash-light-the-horizon.jpg",
	},
	{
		title: "Maverick",
		artist: "FM-84",
		album: "Maverick",
		path: "/music/Maverick.mp3",
		artPath: "/fm-84-maverick.jpg",
	},
	{
		title: "Aphelion",
		artist: "Scandroid",
		album: "Scandroid",
		path: "/music/Aphelion.mp3",
		artPath: "/images/scandroid-scandroid.jpg",
	},
]

// Store initial song data in localstorage
localStorage.setItem("currentSong", JSON.stringify(songList[0]))
localStorage.setItem("currentSongIndex", 0)

// Load stored song from localStorage
function loadFromLocalStorage() {
	const currentSong = JSON.parse(localStorage.getItem("currentSong"))
	// console.log(currentSong)
	loadSong(currentSong)
}

// Initial load
loadFromLocalStorage()

// Takes a song object and updates DOM nodes
function loadSong(song) {
	audioSource.src = song.path
	musicTitle.innerText = song.title
	musicArtist.innerText = song.artist
	musicAlbum.innerText = song.album
}

const handlePlayClick = (event) => {
	// If audio is not paused, pause it and revert to play button
	if (!audioSource.paused) {
		audioSource.pause()
		playButtonImage.src = "/images/icons/play.svg"
		playButton.classList.remove("pause-button")
		playButton.classList.add("play-button")
		return
	}

	// Default behavior: play and replace pause play button with pause
	audioSource.play()
	playButton.classList.remove("play-button")
	playButton.classList.add("pause-button")
	playButtonImage.src = "/images/icons/pause.svg"
}

playButton.addEventListener("click", handlePlayClick)

/* On next button click, check current song index in localStorage
update accordingly
*/
const handleNextButtonClick = (event) => {
	// Get current song index from localstorage
	const currentSongIndex = localStorage.getItem("currentSongIndex")

	// If we're at the end of the song list, loop back to index 0
	const nextSongIndex =
		songList.length - 1 != parseInt(currentSongIndex)
			? parseInt(currentSongIndex) + 1
			: 0

	// Load the song from the database
	loadSong(songList[nextSongIndex])

	// Update currentsong state
	localStorage.setItem("currentSongIndex", nextSongIndex)
}

nextButton.addEventListener("click", handleNextButtonClick)
