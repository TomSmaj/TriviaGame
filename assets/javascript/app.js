$(document).ready(function(){
    let timerRunning = false;
    let time = 0;
    timeLimit = 15;
    let intervalID;
    let currentChar;
    let wins = 0;
    gameGoing = false;

    let charArr = [];

    //character object array
    let characters = [
        {
            name:"Moe Szyslak",
            image:"assets/images/moe.png",
            choices:["Moe Szyslak", "Barney Gumble", "Lenny Leonard", "Kearney Zickowitz"]
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
        },
        {
            name:"Ned Flanders",
            image:"assets/images/ned-flanders.png",
            choices:["Ned Flanders", "Waylon Smithers", "Herbert Powell", "Troy McClure"]
        },
        {
            name:"Edna Krabappel",
            image:"assets/images/edna-krabappel.png",
            choices:["Edna Krabappel", "Marge Simpson", "Helen Lovejoy", "Selma Bouvier"]
        },
        {
            name:"Ralph Wiggum",
            image:"assets/images/ralph-wiggum.png",
            choices:["Ralph Wiggum", "Jimbo Jones", "Wendell Borton", "Artie Ziff"]
        },
        {
            name:"Mr. Burns",
            image:"assets/images/mr-burns.jpg",
            choices:["Mr. Burns", "Mr. Grimes", "Mr. Smithers", "Mr. Szyslak"]
        },
        {
            name:"Maude Flanders",
            image:"assets/images/maude.png",
            choices:["Maude Flanders", "Elizabeth Hoover", "Patty Bouvier", "Emily Winthrop"]
        },
        {
            name:"Sideshow Mel",
            image:"assets/images/sideshow-mel.png",
            choices:["Sideshow Mel", "Sideshow Bob", "Krusty the Clown", "Gabbo the Clown"]
        },
        {
            name:"Selma Bouvier",
            image:"assets/images/selma.png",
            choices:["Selma Bouvier", "Lunchlady Doris", "Luann Van Houten", "Agnes Skinner"]
        }
    ];

   

    //writes the image to the screen
    function setUp(){
        if(charArr.length === 0 && gameGoing){
            populateCharArr();
        }
        let rando = Math.floor(Math.random() * charArr.length);
        currentChar = charArr[rando];
        charArr.splice(rando, 1);
        console.log("charArr: " + charArr);
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
        $(".timer").html("info: <strong>Game Over</strong>");
        $(".info").html("final score: <strong> " + wins + "/" + characters.length + " </strong>");
        $(".characterImage").html("<img src = \"assets/images/end-game.jpg\">");
        $("img").css("width", "540px");
        $("img").css("height", "300px");
        $("img").css("margin-left", "100px");
        $("img").css("margin-right", "auto");
        $("img").css("margin-top", "150px");
        $("img").css("margin-bottom", "auto");
        
        
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
            wins += 1;
             if(charArr.length === 0){
                 gameGoing = false;
                 $(".info").html("info: <strong>Correct!</strong>");
                resetVariables(true);
                }
             else{
                $(".info").html("info: <strong>Correct!</strong>");
                resetVariables(true);
             }
        }
        //if the answer is not correct, then the player loses
        else{
            if(charArr.length === 0){gameGoing = false;}
            clearInterval(intervalID);
            timerRunning = false;
            $(".info").html("info: <strong>Incorect! Answer: "+ currentChar.name + "</strong>");
            resetVariables(false);
        }

    }

    /*function timeUp(){
        $(".info").html("info: <strong>You ran out of time! Correct Answer: "+ currentChar.name + "</strong>");
        resetVariables(false);
    }*/

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
            if(charArr.length === 0){gameGoing = false;}
            clearInterval(intervalID);
            timerRunning = false;
            $(".info").html("info: <strong>You ran out of time! Answer: "+ currentChar.name + "</strong>");
            resetVariables(false);
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

    function resetVariables(inp){
        if(inp){waitTime = 1500;}
        else{waitTime = 3000;}
        setTimeout(function(){
            if(!gameGoing){playerWins();}
            else{
                time = timeLimit;
                $(".info").html("info: ");
                $(".timer").html("time: <strong>"+ timeConverter(timeLimit) +"</strong>");
                setUp();
                startTimer();
                timerRunning = true;
            }
        }, waitTime);
    }
    //when the start button is pressed, and the timer is not running, the game/next round is set into motion.
    $(".next-start").on("click", function(){
        if(!timerRunning && !gameGoing){
            wins = 0;
            gameGoing = true;
            time = timeLimit;
            $(".info").html("info: ");
            $(".timer").html("time: <strong>"+ timeConverter(timeLimit) +"</strong>");
            setUp();
            startTimer();
            timerRunning = true;  
        }
    })
})