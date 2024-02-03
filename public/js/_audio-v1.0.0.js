// _BPM
var bpm; // Set the BPM
var beatDuration; // Duration of one beat in milliseconds
let lastBeatTime = 0; // Time when the last beat occurred
let colorIntensity = 0; // Intensity of the background color
var bpmCounter = 0;

function setup_music_bpm(_bpm = 120) {
  bpm = _bpm;
  beatDuration = (60 / bpm) * 1000;
}

function draw_music_bpm() {
  // _BPM
  let getCurrentTime = millis();
  if (getCurrentTime - lastBeatTime > beatDuration) {
    // Trigger an action on every beat
    bpmCounter++;    
    colorIntensity = 255; // Maximum intensity
    // Reset the last beat time
    lastBeatTime = getCurrentTime;
  }

  // Update background color
  background(colorIntensity, 0, 0); // Red color with varying intensity

  // Gradually decrease the color intensity
  colorIntensity -= 10;
  colorIntensity = max(colorIntensity, 0);
  
  add_debug('bpm',bpm)
  add_debug('beatDuration',beatDuration)
  add_debug('bpmCounter',bpmCounter)
}


/*
* webmidijs
* @link - https://webmidijs.org/docs/
* @desc - simplify midi interaction with the canvas
*
*/

let midiDataEntries = [];

function setup_webmidi() {
  WebMidi.enable()
    .then(onMidiEnabled)
    .catch((err) => console.error(err));
}

function onMidiEnabled() {
  let myInput = WebMidi.getInputByName("Elektron Digitakt");
  if (myInput) {
    myInput.addListener("noteon", "all", function (e) {
      let midiData = {
        name: e.note.name,
        octave: e.note.octave,
        velocity: e.rawVelocity,
        number: e.note.number,
      };
      midiDataEntries.unshift(midiData);
      if (midiDataEntries.length > 12) {
        midiDataEntries.length = 12;
      }
    });
  } else {
    console.error("MIDI Input not found.");
  }
}

// // webmidijs
// WebMidi.enable()
//   .then(onEnabled)
//   .catch((err) => alert(err));

// function onEnabled() {
//   // WebMidi.inputs.forEach((input) =>
//   //   console.log("inputs:", input.manufacturer, input.name)
//   // );
//   // WebMidi.outputs.forEach((output) =>
//   //   console.log("outputs:", output.manufacturer, output.name)
//   // );

//   const myInput = WebMidi.getInputByName("Elektron Digitakt");
//   // console.log(myInput);

//   // myInput.addListener("noteon", (e) => {
//   //   console.log(e.note);
//   // });

//   // Array to hold the latest MIDI data entries
//   let midiDataEntries = [];

//   // Variable to track new data entries since the last update; for highlighting the table_row
//   // let newEntriesCount = 0;

//   myInput.addListener("noteon", "all", function (e) {
//     // Get the MIDI data
//     let midiData = {
//       name: e.note.name,
//       octave: e.note.octave,
//       velocity: e.rawVelocity,
//       number: e.note.number
//     };
//     // Add the new data to the start of the array
//     midiDataEntries.unshift(midiData);

//     // Keep only the latest 10 entries
//     if (midiDataEntries.length > 12) {
//       midiDataEntries.length = 12;
//     }

//     // Update the table with the MIDI data
//     updateTable(midiDataEntries);

//     getMidiName(midiDataEntries);
//   });

//   function getMidiName(data){

//     // Add new rows from the data
//     data.forEach(function (item) {
//       row.insertCell(0).innerHTML = item.name;
//       row.insertCell(1).innerHTML = item.octave;
//       row.insertCell(2).innerHTML = item.velocity;
//       row.insertCell(3).innerHTML = item.number;
//     });

//     return data[0].name;
//   }

//   function updateTable(data) {
//     let tableBody = document
//       .getElementById("midiDataTable")
//       .getElementsByTagName("tbody")[0];
//     tableBody.innerHTML = ""; // Clear existing rows

//     // Add new rows from the data
//     data.forEach(function (item) {
//       let row = tableBody.insertRow();
//       row.classList.add("highlight"); // Apply highlight to all new rows

//       // Remove the highlight class after the animation duration (2 seconds)
//       setTimeout(function () {
//         row.classList.remove("highlight");
//       }, 2000);
//       row.insertCell(0).innerHTML = item.name;
//       row.insertCell(1).innerHTML = item.octave;
//       row.insertCell(2).innerHTML = item.velocity;
//       row.insertCell(3).innerHTML = item.number;
//     });
//   }
// }

//   // webmidi:output
//   let webmidi_output = WebMidi.outputs[0];
//   // let webmidi_channel = webmidi_output.channels[3];
//   // webmidi_channel.playNote(["C4", "D#3", "G3"]);
//   webmidi_output.playNote("C5", 3); // Note C4 on channel 1
//   webmidi_output.playNote("E4", 4); // Note E4 on channel 2
//   webmidi_output.playNote("G3", 5); // Note G4 on channel 3


// draw_webmidi()
  // Use MIDI data here
//   if (midiDataEntries.length > 0) {
//     let lastMidiData = midiDataEntries[0];
//     // Example: Change the fill color based on the MIDI note number
//     fill(lastMidiData.number * 2, 100, 100);
//     ellipse(0,0,50,50);
    
//     print(lastMidiData);
    
//   }
