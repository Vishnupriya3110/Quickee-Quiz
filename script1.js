const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

const quiz = [
    
        {
            question: "Q. Who is known as the 'God of Thunder' in the Marvel Universe?",
            choices: ["Iron Man", "Captain America", "Thor", "Hulk"],
            answer: "Thor"
        },
        {
            question: "Q. What is the real name of the superhero 'Black Widow'?",
            choices: ["Natasha Romanoff", "Wanda Maximoff", "Carol Danvers", "Jessica Jones"],
            answer: "Natasha Romanoff"
        },
        {
            question: "Q. Which Marvel character possesses the ability to change his size at will?",
            choices: ["Ant-Man", "Spider-Man", "Doctor Strange", "Black Panther"],
            answer: "Ant-Man"
        },
        {
            question: "Q. What is the name of Tony Stark's AI assistant in his Iron Man suit?",
            choices: ["J.A.R.V.I.S.", "C.O.L.O.S.S.U.S.", "S.H.I.E.L.D.", "H.A.L. 9000"],
            answer: "J.A.R.V.I.S."
        },
       {
        
            question: "Q. What is the real name of the mutant superhero 'Wolverine'?",
            choices: ["Bruce Banner", "Peter Parker", "Logan", "Scott Summers"],
             answer: "Logan"

       },

       {
        question: "Q. Which Marvel character is known as the 'Merc with a Mouth'?",
        choices: ["Captain America", "Deadpool", "Black Panther", "Green Goblin"],
        answer: "Deadpool"
     },
       {
        question: "Q. What is the name of the mystical artifact that Doctor Strange uses to manipulate time?",
        choices: ["The Tesseract", "The Eye of Agamotto", "The Cosmic Cube", "The Infinity Gauntlet"],
        answer: "The Eye of Agamotto"
       },

       {
        question: "Q. Which superhero is also a brilliant scientist and inventor known for creating advanced suits of armor?",
        choices: ["Hawkeye", "Spider-Man", "Iron Man", "Black Widow"],
        answer: "Iron Man"
     },
       {
        question: "Q. What is the name of the alien race that invaded Earth in the first 'Avengers' film?",
        choices: ["The Kree", "The Skrulls", "The Chitauri", "The Shi'ar"],
        answer: "The Chitauri"
       },
       {
        question: "Q. Which Marvel superhero is the king of the African nation of Wakanda?",
        choices: ["Black Bolt", "Falcon", "Black Panther", "Blade"],
        answer: "Black Panther"


       },

        
    
    
];

let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}


const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
        displayAlert("Correct Answer!");
        score++;
    }
    else {
        // alert("Wrong answer");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}


const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}


const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}


const startTimer = () => {
    clearInterval(timerID); 
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}


const stopTimer = () =>{
    clearInterval(timerID);
}


const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});