var config = {
  apiKey: "AIzaSyDRKRM2yrBguUWn7iVTL617hsRbg6Fc70k",
  authDomain: "train-scheduler-19d47.firebaseapp.com",
  databaseURL: "https://train-scheduler-19d47.firebaseio.com",
  projectId: "train-scheduler-19d47",
  storageBucket: "",
  messagingSenderId: "642614616650",
  appId: "1:642614616650:web:5bff839f29150c98"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var name;
var destination;
var firstTrain;
var frequency = 0;

$("#add-train").on("click", function() {
  event.preventDefault();
  name = $("#train-name")
    .val()
    .trim();
  destination = $("#destination")
    .val()
    .trim();
  firstTrain = $("#first-train")
    .val()
    .trim();
  frequency = $("#frequency")
    .val()
    .trim();

  database.ref().push({
    name: name,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
  $("form")[0].reset();
});

database.ref().on(
  "child_added",
  function(childSnapshot) {
    var nextArr;
    var minAway;
    var firstTrainNew = moment(
      childSnapshot.val().firstTrain,
      "hh:mm"
    ).subtract(1, "years");
    var diffTime = moment().diff(moment(firstTrainNew), "minutes");
    var remainder = diffTime % childSnapshot.val().frequency;
    var minAway = childSnapshot.val().frequency - remainder;
    var nextTrain = moment().add(minAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");

    $("#add-row").append(
      "<tr><td>" +
        childSnapshot.val().name +
        "</td><td>" +
        childSnapshot.val().destination +
        "</td><td>" +
        childSnapshot.val().frequency +
        "</td><td>" +
        nextTrain +
        "</td><td>" +
        minAway +
        "</td></tr>"
    );
  },
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);

database
  .ref()
  .orderByChild("dateAdded")
  .limitToLast(1)
  .on("child_added", function(snapshot) {
    $("#name-display").html(snapshot.val().name);
    $("#email-display").html(snapshot.val().email);
    $("#age-display").html(snapshot.val().age);
    $("#comment-display").html(snapshot.val().comment);
  });
