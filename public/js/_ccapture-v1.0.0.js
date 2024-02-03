var fps = 60;
var capturer = new CCapture({ format: "png", framerate: fps });
var startMillis; // needed to subtract initial millis before first draw to begin at t=0.
// go to unzipped folder: ffmpeg -r 60 -f image2 -s 512x512 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4

/**
 * The command you've provided is for FFmpeg, which is a powerful multimedia framework that can process video, audio, and other multimedia files and streams. The command specifies the parameters for converting a sequence of images named with seven digits (like 0000001.png, 0000002.png, etc.) into a video file.

Here's the breakdown of the command:

-r 30: Set the framerate of the output video to 30 frames per second.
-f image2: Use the image file demuxer, whi                                                                                                                                ch reads from a list of image files.
-s 512x512: Set the size of the output video to 512x512 pixels.
-i "%07d.png": Specifies the input file pattern; FFmpeg will look for files that match this pattern.
-vcodec libx264: Use the H.264 video codec for the output video.
-crf 17: Set the Constant Rate Factor (CRF) to 17, which controls the quality (lower values mean better quality).
-pix_fmt yuv420p: Set the pixel format to 'yuv420p', which is widely supported, including by web browsers.
output.mp4: The name of the output file.
To modify the command for a resolution of 512x512 and 60 frames per second, you just need to change the -r flag from 30 to 60:
 */                                             

function draw_ccapture() {
  if (frameCount === 1) {
    // start the recording on the first frame
    // this avoids the code freeze which occurs if capturer.start is called
    // in the setup, since v0.9 of p5.js
    capturer.start();
  }

  if (startMillis == null) {
    startMillis = millis();
  }

  // duration in milliseconds
  var duration = 3000;

  // compute how far we are through the animation as a value between 0 and 1.
  var elapsed = millis() - startMillis;
  var t = map(elapsed, 0, duration, 0, 1);

  // if we have passed t=1 then end the animation.
  if (t > 1) {
    noLoop();
    console.log("finished recording.");
    capturer.stop();
    capturer.save();
    return;
  }

  // handle saving the frame
  console.log("capturing frame");
  capturer.capture(document.getElementById("defaultCnpanvas0"));
  // return;
}

let mic, recorder, soundFile;

let state = 0; // mousePress will increment from Record, to Stop, to Play

function draw_record_mic() {
  // create an audio in
  mic = new p5.AudioIn();

  // users must manually enable their browser microphone for recording to work properly!
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // create an empty sound file that we will use to playback the recording
  soundFile = new p5.SoundFile();
}



// function mousePressed() {
//   mousePressed_record_mic();
// }
function mousePressed_record_mic() {
  // use the '.enabled' boolean to make sure user enabled the mic (otherwise we'd record silence)
  if (state === 0 && mic.enabled) {
    // Tell recorder to record to a p5.SoundFile which we will use for playback
    recorder.record(soundFile);

    background(255, 0, 0);
    text("Recording now! Click to stop.", 20, 20);
    state++;
  } else if (state === 1) {
    recorder.stop(); // stop recorder, and send the result to soundFile

    background(0, 255, 0);
    text("Recording stopped. Click to play & save", 20, 20);
    state++;
  } else if (state === 2) {
    soundFile.play(); // play the result!
    saveSound(soundFile, "mySound.wav"); // save file
    state++;
  }
}
