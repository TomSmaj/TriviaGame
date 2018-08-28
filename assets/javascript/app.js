$(document).ready(function(){
    let timerRunning = false;
    let time = 0;
    timeLimit = 15;
    let intervalID;

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

    let currentChar;

    let charArr = [];

    function populateCharArr(){
        for(i = 0; i < characters.length; i++){
            charArr.push(characters[i].name);
        }
    }

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
        console.log("current char: " + currentChar);
        console.log(currentChar.image);
        $(".characterImage").html("<img src = \"" + currentChar.image + "\"/>");
        //let choiceArr = randomize(currentCharr.choices);
        
    }

    function gameOver(){
        $(".info").html("info: <strong>Time's up. You lose :(</strong>");
    }

    function startTimer(){
        intervalID = setInterval(incrementTime, 1000);
        return;
    }

    function incrementTime(){
        time += 1;
        $(".timer").html("time: <strong>" + timeConverter(time) + "</strong>");
        if(time === timeLimit){
            clearInterval(intervalID);
            gameOver();
        }
    }

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

    $(".next-start").on("click", function(){
        if(!timerRunning){
            console.log("clicked");
            setUp();
            startTimer();
            timerRunning = true;
        }
    })
})