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

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;
var currentTime = moment();
var index = 0;
var trainIDs = [];

var datetime = null,
  date = null;

var update = function() {
  date = moment(new Date());
  datetime.html(date.format("dddd, MMMM Do YYYY, h:mm:ss a"));
};

$(document).ready(function() {
  datetime = $("#current-status");
  update();
  setInterval(update, 1000);
});


