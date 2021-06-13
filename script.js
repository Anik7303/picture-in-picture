const videoElement = document.getElementById('video')
const button = document.getElementById('button')
const shareBtn = document.getElementById('share-btn')

// promt to select a media stream, pass to video element, then play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia()
        videoElement.srcObject = mediaStream
        videoElement.onloadedmetadata = function () {
            videoElement.play()
        }
    } catch (error) {
        console.error(`SelectMediaStreamError: ${error.message}`)
    }
}

// Event Listeners
shareBtn.addEventListener('click', selectMediaStream)
button.addEventListener('click', async () => {
    // disable button
    button.disabled = true
    // start picture in picture
    try {
        await videoElement.requestPictureInPicture()
        button.disabled = false
    } catch (error) {
        console.error(`RequestPictureInPictureError: ${error.message}`)
    }
})
// on load
// selectMediaStream()
