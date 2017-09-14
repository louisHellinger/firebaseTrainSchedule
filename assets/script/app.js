$(document).ready(function(){

//INITIALIZE Firebase

  var config = {
    apiKey: "AIzaSyARhak_EXphrgvED2BpapqEvemFCP0171Q",
    authDomain: "trainschedule-b9d74.firebaseapp.com",
    databaseURL: "https://trainschedule-b9d74.firebaseio.com",
    projectId: "trainschedule-b9d74",
    storageBucket: "",
    messagingSenderId: "711799850917"
  };

  firebase.initializeApp(config);


var trainData = firebase.database();

var trainName;
var destination;
var firstTrain;
var frequency;



$("#add-train").on("click", function(event) {
      event.preventDefault();

    // Grabbed values from text boxes
	var trainName = $("#train-name-input").val().trim();
	var destination = $("#destination-input").val().trim();
	var firstTrain = $("#firstTrain-input").val().trim();
	var frequency = $("#frequency-input").val().trim();

	
	//creates temporary object from inputs
	var newTrain = {

	  name: trainName,
	  destination: destination,
	  firstTrain: firstTrain,
	  frequency: frequency
	  };

	//pushes contents to firebase
	trainData.ref().push(newTrain);

	//clears inputs
	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#firstTrain-input").val("");
	$("#frequency-input").val("");

    });

trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;


  var tFrequency = frequency;
  //console.log("this is the frequency " + frequency);

  var firstTime = firstTrain;

  //console.log("this is the first Time " + firstTrain);

	var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

	var currentTime = moment();
    //console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    //console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % tFrequency;
    //console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    //console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    //console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));




  //Add each train's data into the table

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td class='centerData'>" +
  frequency + "</td><td class='centerData'>" + nextTrain + "</td><td class='centerData'>" + tMinutesTillTrain + "</td><td>" + "</td></tr>");
});



// var convertFirstTrain = firstTrain;
// console.log("this is the converted first Train" + convertFirstTrain);


// var currentTime = moment().format('h:mm:ss a');
// console.log(currentTime);

// //var firstTrainFormat = moment(firstTrain, h:mm).format('h:mm:ss a');

// firstTrainFormat = moment(parseInt(firstTrain), "h:mm").format("HH:mm");
// console.log(firstTrainFormat);

// // var elapsedTime = currentTime - firstTrain;

// // console.log(elapsedTime);

}); // close doc Ready



