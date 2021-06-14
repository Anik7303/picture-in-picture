const video = document.getElementById('video')
const selectBtn = document.getElementById('btn__select')
const shareBtn = document.getElementById('btn__share')

// select window, play video in picture in picture mode
async function startSelection() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia()
        video.srcObject = mediaStream
    } catch (error) {
        console.error(`StartSelectionError: ${error}`)
    }
}

async function startPictureInPictureMode() {
    try {
        if (document.pictureInPictureEnabled) {
            video.requestPictureInPicture()
        }
    } catch (error) {
        console.error(`RequestPictureInPictureMode: ${error}`)
    }
}

// event listeners
document.addEventListener('leavepictureinpicture', () => {
    video.stop()
})

video.addEventListener('loadedmetadata', () => {
    shareBtn.disabled = false
    video.play()
})

selectBtn.addEventListener('click', startSelection)

shareBtn.addEventListener('click', startPictureInPictureMode)

// on load
shareBtn.disabled = true
