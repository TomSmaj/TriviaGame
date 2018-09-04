$(document).ready(function(){
    let timerRunning = false;
    let time = 0;
    timeLimit = 20;
    let intervalID;
    let currentChar;

    let charArr = [];

    //character object array
    let characters = [
        {
            name:"Milhouse Vanhouten",
            image:"assets/images/milhouse.png",
            choices:["Ralph Wiggum", "Milhouse Vanhouten", "Nelson Muntz", "Martin Prince"]
        },
        {
            name:"Principal Skinner",
            image:"assets/images/principal-skinner.png",
            choices:["Superintendent Chalmers", "Principal Skinner", "Mayor Quimby", "Mr. Burns"]
        },
        {
            name:"Lionel Hutz",
            image:"assets/images/lionel-hutz.png",
            choices:["Lionel Hutz", "Kent Brockman", "Abe Simpson", "Carl Carlson"]
        }
    ];

   

    //writes the image to the screen
    function setUp(){
        if(charArr.length === 0){
            populateCharArr();
        }
        let rando = Math.floor(Math.random() * charArr.length);
        currentChar = charArr[rando];
        charArr.splice(rando, 1);
        for(key in characters){
            if(characters[key].name === currentChar){
                currentChar = characters[key];
            }
        }
        $(".characterImage").html("<img src = \"" + currentChar.image + "\"/>");
        let choiceArr = randomize(currentChar.choices);
        printChoices(choiceArr);   
    }

    //sent here when the player guesses the last character correctly
    //when the player pushes start at this point, the game restarts
    function playerWins(){
        $(".info").html("info: <strong>You win! Press 'Start' to play again!</strong>");
    }

    //called when the game starts, takes each character name from the object array
    function populateCharArr(){
        for(i = 0; i < characters.length; i++){
            charArr.push(characters[i].name);
        }
    }

    //is handed the array of guess choices from the current character object, put in a random order, and returned
    function randomize(arr){
        s = "";
        let nuArr = [];
        //random numbers between 0 and 3 are added to the string s
        //if a number has already been added it can't be added again, to prevent duplicates
        while(s.length < 4){
            let temp = Math.floor(Math.random() * 4);
            if(!s.includes(temp)){
                s += temp;
                nuArr.push(arr[temp]);
            }
        }
        return nuArr;
    }

    //handed the array containing choices and then sets each to the text of each button
    function printChoices(arr){
        for(i = 0; i < 4; i++){
            $(".choiceBtn" + (i+1)).text(arr[i]);
        }   
    }

    $(".choice").on("click", function (){
        if(timerRunning){
            let q = $(this).text();
            checkAnswer(q);
        }
    })

    //this is where the program goes when a user makes a their answer selection
    function checkAnswer(answer){
        if(answer === currentChar.name){
            clearInterval(intervalID);
            timerRunning = false;
             if(charArr.length === 0){
                 playerWins();
                }
             else{
                resetVariables();
             }
        }
        //if the answer is not correct, then the player loses
        else{
            clearInterval(intervalID);
            timerRunning = false;
            $(".info").html("info: <strong>Incorect! You lose :(</strong>");
        }

    }

    function timeUp(){
        $(".info").html("info: <strong>Time's up. You lose :(</strong>");
    }

    //sets a time interval in which incrementTime is visited every 1 second
    function startTimer(){
        intervalID = setInterval(incrementTime, 1000);
        return;
    }

    //increments time variable, updates timer on screen, checks if the time limit has been reached
    function incrementTime(){
        time -= 1;
        $(".timer").html("time: <strong>" + timeConverter(time) + "</strong>");
        //if the time limits has been reached then the player loses
        if(time === 0){
            clearInterval(intervalID);
            timerRunning = false;
            timeUp();
        }
    }

    //converts the time variable to a 00:00 format, though the time never reaches the minute mark 
    function timeConverter(t) {
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
    
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
    
        if (minutes === 0) {
          minutes = "00";
        }
    
        else if (minutes < 10) {
          minutes = "0" + minutes;
        }
    
        return minutes + ":" + seconds;
    }

    function resetVariables(){
        time = timeLimit;
        $(".info").html("info: ");
        $(".timer").html("time: <strong>"+ timeConverter(timeLimit) +"</strong>");
        setUp();
        startTimer();
        timerRunning = true;
    }
    //when the start button is pressed, and the timer is not running, the game/next round is set into motion.
    $(".next-start").on("click", function(){
        if(!timerRunning){
            cameFrom = "start";
            resetVariables();    
        }
    })
})