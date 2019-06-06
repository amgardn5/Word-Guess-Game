/* global variables section */

const words = [
    "expectation", "account", "exotic", "lighter", "conspiracy", "glide", "proof", "benefit", "trench", "see", "make", "office", "race", "shell", "job", "grass", "limit", "censorship", "bride", "desire", "panic", "experience", "sink", "exception", "chemistry", "concession", "treasurer", "computing", "dribble", "fruit", "cheat", "fragrant", "bread", "generate", "opera", "hospital", "shy", "doctor", "solution", "quote", "beef", "seller", "maid", "rally", "mine", "marriage", "jail", "nominate", "horseshoe", "prize", "looting", "sentence", "south", "mask", "have", "influence", "lot", "robot", "economist", "rich", "thick", "cheap", "throat", "mess", "pen", "preference", "singer", "kidney", "combination", "mutter", "deter", "vessel", "progress", "care", "ton", "reproduction", "rack", "plain", "shadow", "feminine", "test"
  ];
  var start = "Press any key to get started!";
  var secret = "hello";
  var game_started = false;
  var index = 0;
  var incorrects = [];
  var corrects = [];
  var wins = 0;
  var guesses = 10;
  
  // show "Press any key to get started" and the counters wins and guesses before the game starts
  $("#word").text(start); //referencing "word" in html displaying text with the start variable
  $("#counter").text(guesses); //referencing "counter" in html displaying text with the guesses variable
  $("#wins").text(wins); //referencing "wins" in html displaying text with the wins variable
  
  // this method will detect all the key press
  $(document).keypress(function (e){
    // check if the game already started
    if (game_started === false){
      // then generate the _ _ _ for the word and show that to the player
      generateinitialword();
      var word = generateword(corrects);
      $("#word").text(word);
      game_started = true;
  
    } else {
      // check if the key pressed is correct or incorrect
      check(e.key);
      // need to re-generate the word to see if the key was correct or not
      word = generateword(corrects);
      $("#word").text(word);
      // check if the user guessed all the letters
      var win = checkwin();
      if (win === true && guesses > 0){
        wins++;
        $("#wins").text(wins);
        reset_variables();
      } else if (guesses === 0) {
        alert("Game Over");
        wins = 0;
        reset_variables();
  
      }
    }
  });
  
  function reset_variables() {
    // random number to choose a different word and keep playing
    corrects = [];
    incorrects = [];
    guesses = 10;
    win = false;
    let random_number = Math.floor((Math.random() * words.length));
    secret = words[random_number];
    generateinitialword();
    var word = generateword(corrects);
  
    $("#word").text(word);
    $("#wins").fadeOut(400).text(wins).fadeIn( 400 );;
    $("#incorrects").text(" ");
    $("#counter").text(guesses);
  
  }
  
  function generateinitialword(){
    // function creates the _ _ _ of the length of the word
    var i;
    for ( i = 0; i < secret.length; i++){
      corrects.push("_");
    };
  }
  
  function check(key){
    // check if the key pressed is correct or incorrect
    var i;
    let incorrect = true; // assume that its incorrect
    for (i = 0; i < secret.length; i++){
        if (secret[i] === key){
          corrects[i] = key;
          incorrect = false; // its correct so change value
        }
    }
    if (incorrect === true){
      // check if the key was already pressed
      var already_exists = false;
      for (i = 0; i < incorrects.length; i++){
        if (incorrects[i] === key){
            already_exists = true;
        }
      }
      if (already_exists === false){ // check if its a new key
        // decrease the guesses and add the letter to the list of incorrects
        guesses--;
        incorrects.push(key);
        var incorrect_letters = generateword(incorrects);
        // show the list of incorrect and the remaining number of letters
        $("#incorrects").text(incorrect_letters);
        $("#counter").text(guesses);
      }
    }
  };
  
  function generateword(array){
    // this function changes _ _ _  with the correct letters
    var result = " ";
    var i;
    for (i =0; i < array.length; i++){
      result += array[i] + " ";
    }
    return result;
  }
  
  function checkwin(){
    // if no more _ _ _ in the corrects array means that the user won
    var i;
    for (i = 0; i < corrects.length; i++){
      if (corrects[i] === "_"){
        return false;
      }
    }
    return true;
  }
