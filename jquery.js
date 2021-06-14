var playing = false;
var score;
var trialsLeft;
var fruits = ['apple',  'banana', 'cherries', 'grapes', 'mango',  'orange', 'peach',  'pear', 'watermelon'];
var step;
var action; //used for setInterval

$(function () {
  //Click on start reset button
  $("#startreset").click(function () {

    //are we playing? 
    if (playing == true) {

      //yes, reload page
      location.reload();

    }else{  
      //show difficulty
      $("#Difficulty").show("fade",500);

      //hide startreset button
      $("#startreset").hide();

      //hide game over box
      $("#gameover").hide();

      $("#instruction").html("Select Your Level")

      //select a level
      $("#slow").click(function () {
      playing = true; //game intiated
      
      $("#instruction").html("Slide Fruit")

      $("#Difficulty").hide();

      //show startreset button
      $("#startreset").show("fade",500)

      //set score to 0
      score = 0;
      $("#scoreValue").html(score);

      //show trials left
      $("#trialsLeft").show();
      trialsLeft = 3;

      addHearts();

       //change button to "reset game"
      $("#startreset").html("Reset Game");

      //sart sending random fruits
      setTimeout(startAction, 500);
      })

    }
  });

  $("#fruit1").mouseover(function () {
    score ++;
    $("#scoreValue").html(score);
    // document.getElementById("slicesound").play();

     //play sound
    $("#slicesound")[0].play();

    //stop fruit
    clearInterval(action);

    //hide fruit with animation
    $("#fruit1").hide("explode",  400);//slicing the new fruit

    //send a new fruit
    setTimeout(startAction, 500);
  });

//Functions
  //Creating Trail-Left Function
function addHearts() {
  $("#trialsLeft").empty();
  for (i = 0; i < trialsLeft; i++){
    $("#trialsLeft").append('<img src="images/hearts.png" class="life">');
  }
}

  //start sending fruits
function startAction() {
  $("#fruit1").show();
  chooseFruit();  //choose a random fruit
  $("#fruit1").css({'left' : Math.round(550*Math.random()),  'top' : -50}); //random position

  //generate a random step
  step = 1 + Math.round(6*Math.random());

  //Move fruit down by one step every 10ms
  action = setInterval(function () {
    $("#fruit1").css('top', $("#fruit1").position().top + step)

    //check if the fruit is too low
    if ($("#fruit1").position().top > $("#fruitsContainer").height()) {

      //check if we have trailsLeft
      if (trialsLeft > 1) {
        $("#fruit1").show();
        chooseFruit();  //choose a random fruit
        $("#fruit1").css({'left' : Math.round(550*Math.random()),  'top' : -50}); //random position

        //generate a random step
        step = 1 + Math.round(6*Math.random());

        //reduce trialsLeft Box
        trialsLeft  --;

        //populate trialLeft box
        addHearts();

      } else {//game over
        playing = false;
        $("#startreset").html("Start Game");
        $("#gameover").show();
        $("#gameover").html('<p>Game Over!</p><p>Your score is ' + score + '</p>');
        $("#trialsLeft").hide();
        stopAction();
      }
    }
  },  10);
}

    //generate a random fruit
function chooseFruit() {
  $("#fruit1").attr('src' , 'images/fruits/'  +  fruits[Math.floor(8*Math.random())]  + '.png');
}

//stop dropping fruits
function stopAction() {
  clearInterval(action);
  $("#fruit1").hide();
}

});