const video = document.getElementById('video')
const selectBtn = document.getElementById('btn__select')
const shareBtn = document.getElementById('btn__share')

let mediaStream

function resetBtnState() {
    selectBtn.disabled = false
    shareBtn.disabled = true
}

function clearMediaStream(stream) {
    try {
        stream.getTracks().forEach((track) => track.stop())
    } catch (error) {
        console.error(`CloseAllStreamError: ${error}`)
    }
}

// select window, play video in picture in picture mode
async function startSelection() {
    try {
        if (mediaStream) {
            clearMediaStream(mediaStream)
        }
        mediaStream = await navigator.mediaDevices.getDisplayMedia()
        video.srcObject = mediaStream
    } catch (error) {
        console.error(`StartSelectionError: ${error}`)
    }
}

async function startPictureInPictureMode() {
    try {
        if (document.pictureInPictureEnabled) {
            selectBtn.disabled = true
            shareBtn.disabled = true
            await video.requestPictureInPicture()
        }
    } catch (error) {
        console.error(`RequestPictureInPictureMode: ${error}`)
        resetBtnState()
    }
}

// event listeners
document.addEventListener('leavepictureinpicture', () => {
    video.pause()
    clearMediaStream(mediaStream)
    resetBtnState()
})

video.addEventListener('loadedmetadata', () => {
    shareBtn.disabled = false
    video.play()
})

selectBtn.addEventListener('click', startSelection)

shareBtn.addEventListener('click', startPictureInPictureMode)

// on load
shareBtn.disabled = true
