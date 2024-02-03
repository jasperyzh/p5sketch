let capture, aspectRatio;

function setupWebcam() {
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();

  // Use the onloadedmetadata event of the HTMLVideoElement
  capture.elt.onloadedmetadata = function () {
    console.log(capture.elt.videoWidth, capture.elt.videoHeight);
  };
}

function drawWebcam() {
  if (capture.elt.readyState >= 2) {
    if (capture.elt.videoWidth && capture.elt.videoHeight) {
      aspectRatio = capture.elt.videoWidth / capture.elt.videoHeight;
      let scaleFactor;
      if (aspectRatio > 1) {
        scaleFactor = 800 / capture.elt.videoWidth;
      } else {
        scaleFactor = 800 / capture.elt.videoHeight;
      }
      if (scaleFactor) {
        let newWidth = capture.elt.videoWidth * scaleFactor;
        let newHeight = capture.elt.videoHeight * scaleFactor;
        image(
          capture,
          (width - newWidth) / 2,
          (height - newHeight) / 2,
          newWidth,
          newHeight
        );
      }
    }
  }
}
