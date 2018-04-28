
  
  var config = {
    apiKey: "AIzaSyDjr1sXSaGt0hq2KOqPLMCt5XsMHvDGJTg",
    authDomain: "train-schedule-921f7.firebaseapp.com",
    databaseURL: "https://train-schedule-921f7.firebaseio.com",
    projectId: "train-schedule-921f7",
    storageBucket: "train-schedule-921f7.appspot.com",
    messagingSenderId: "540335081830"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event){
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destinationName = $("#destination-input").val().trim();
    var startTime = moment($("#startTime-input").val().trim(), "HH:mm").format("HH:mm");
    var frequency = $("#frequency-input").val().trim();

    var newTrain = {
      name: trainName,
      destination: destinationName,
      time: startTime,
      interval: frequency,
    };

    database.ref().push(newTrain);

    alert("Train added to schedule");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#startTime-input").val("");
    $("#frequency-input").val("");

    
  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey){
    console.log(prevChildKey);
    console.log(childSnapshot.val());
    var trainName = childSnapshot.val().name;
    var destinationName = childSnapshot.val().destination;
    var startTime = childSnapshot.val().time;
    var frequency = childSnapshot.val().interval;

    var firstTimeConverted = moment(startTime, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var minutesAway = frequency - tRemainder;
    var nextTrain = moment().add(minutesAway, "minutes");
    var nextTrainConverted = moment(nextTrain).format("HH:mm");

    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destinationName + "</td><td>" +
  frequency + "</td><td>" + nextTrainConverted + "</td><td>" + minutesAway + "</td><td>");
  

  });


