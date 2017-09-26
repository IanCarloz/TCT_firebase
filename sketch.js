var canvas;
var score;
var button;
var initialInput;
var submitButton;
var database;

function setup(){
  canvas = createCanvas(100, 100);
  score = 0;
  createP('Click the button to get points and the canvas to reset the score.');
  button = createButton('click');
  button.mousePressed(increaseScore);
  // canvas.mousePressed(resetScore);
  initialInput = createInput('initials');
  submitButton = createButton('submit');
  submitButton.mousePressed(submitScore);

  var config = {
    apiKey: "AIzaSyDy6ZiYnMxyAvGWcYtlCcy9keLehD083c4",
    authDomain: "my-not-awesome-proyect.firebaseapp.com",
    databaseURL: "https://my-not-awesome-proyect.firebaseio.com",
    projectId: "my-not-awesome-proyect",
    storageBucket: "my-not-awesome-proyect.appspot.com",
    messagingSenderId: "467515733643"
  };
  firebase.initializeApp(config);
  database = firebase.database();
  // console.log(firebase);
  // var data = {
  //   name: "DTS",
  //   score: 123
  // }
  var ref = database.ref('scores');
  ref.on('value', gotData, errData);
}

function gotData(data) {
  // console.log(data.val());
  var scores = data.val();
  var keys = Object.keys(scores);

  // console.log(keys);

  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var initials = scores[k].initials;
    var score = scores[k].score;
    // console.log('initials: '+initials+', score: '+ score);
    // console.log(initials, score);
    var li = createElement('li',  initials+": "+score);
    li.parent('scorelist');  
  }

}

function errData(err) {
  console.log('Error!');
  console.log(err);
}

function submitScore() {
  var data = {
    initials: initialInput.value(),
    score: score,
  }
  console.log(data);
  var ref = database.ref('scores');
  ref.push(data);
}

function increaseScore() {
  score++;
}

// function resetScore() {
//   score = 0;
// }

function draw() {
  background(0);
  textAlign(CENTER);
  textSize(32);
  fill(255);
  text(score, width/2, height/2);
}
