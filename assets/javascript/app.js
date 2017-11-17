$(document).ready(function(){

	// var Qs = [
	// {
	// 	prompt: "Who am i",
	// 	answers: 
	// }]
	var questions = ["What is Darth Vader's real name?",
						  "Who created C-3PO?",
						  "What is the model number of the Millenium Falcon?",
						  "What color is Luke's lightsaber in Return of the Jedi",
						  "What is the name of Chewbacca's home planet?",
						  "Who is the other astromech droid beside R2-D2 the Jawa's try to sell Luke?",
						  "By what other name is Count Dooku known?",
						  "What is Owen Lars' occupation?",
						  "Who does Leia impersonate to try and free Han?",
						  "Who is Boba Fett's mother?"];

	var answers = [];
	answers[0] = {
		a: 'A) Owen Lars',
		b: 'B) Firmus Piett',
		c: 'C) Anakin Skywalker',
		d: 'D) Cornelius Evazan'
	}
	answers[1] = {
		a: 'A) Watto',
		b: 'B) Anakin Skywalker',
		c: 'C) Arakyd Industries',
		d: 'D) Obi Wan Kenobi'
	}
	answers[2] = {
		a: 'A) YG-4210',
		b: 'B) YL-2200',
		c: 'C) YT-1200',
		d: 'D) YT-1300'
	}
	answers[3] = {
		a: 'A) Blue',
		b: 'B) Green',
		c: 'C) Red',
		d: 'D) Yellow'
	}
	answers[4] = {
		a: 'A) Kashyyyk',
		b: 'B) Chandrilla',
		c: 'C) Malastare',
		d: 'D) Dathomir'
	}
	answers[5] = {
		a: 'A) W4-K2',
		b: 'B) D5-2D',
		c: 'C) R5-D4',
		d: 'D) E2-M3'
	}
	answers[6] = {
		a: 'A) Darth Sidious',
		b: 'B) Darth Tyranus',
		c: 'C) Darth Plagueis',
		d: 'D) Darth Bane'
	}
	answers[7] = {
		a: 'A) Nerf Herder',
		b: 'B) Droid Mechanic',
		c: 'C) Bartender',
		d: 'D) Moisture Farmer'
	}
	answers[8] = {
		a: 'A) Boushh',
		b: 'B) Zuckuss',
		c: 'C) Zam Wessell',
		d: 'D) Dengar'
	}
	answers[9] = {
		a: 'A) Arla Fett',
		b: 'B) Mara Jade',
		c: 'C) Satine Kryze',
		d: 'D) None of the above'
	}

	var answerKey = ['c', 'b', 'd', 'b', 'a', 'c', 'b', 'd', 'a', 'd'];
	var message = "";
	var counter = 10;
	var intervalId;
	var correct = 0;
	var incorrect = 0;
	var unanswered = 0;
	var isUnanswered = false;
	var questionIndexer = 0;
	var guess;
	var active = false;

	console.log(questions);
	console.log(answers);

	function slideTimer() {
		if (!intervalId){
			intervalId = setInterval(decrement, 1000);
		}
   }

   function decrement() {
    	counter--;
    	$(".time-left").html("Time left = " + counter);
      if (counter === 0) {
      	isUnanswered = true;
      	stop();
      	console.log("Time's Up!");
      	wrong();
      }
      // counter--;
    }

   function stop() {
   	clearInterval(intervalId);
   	intervalId = null;
   }

   function nextQuestion() {
   	
 //  		//  TODO: Increment the count by 1.
  		questionIndexer++;

 //  		// TODO: Show the loading gif in the "image-holder" div.
 //  		// if question is correct show yoda-calm.jpg
 //  		// else show yoda-angry.jpg

 //  		// TODO: Use a setTimeout to run displayImage after 1 second.
  		if (questionIndexer <= questions.length) setTimeout(displayQuestion, 3000);

 //  		// TODO: If the count is the same as the length of the image array, reset the count to 0.
  		// if (questionIndexer === questions.length) {
  		// 	// stop();
    // 		gameOver();
  		// }
	}

	function displayQuestion() {
		active = true;
		$('.time-left').css('background', '');
		$('.question-content').css('background', '');
		$('.question-div').css('text-align', '');
		$('#answer-content').css('text-align', '');
		makeClickable();
		if (questionIndexer === questions.length){
			stop();
			gameOver();
		} else {
			slideTimer();
			$('.time-left').html('Time left = 10');
			$('.pic').empty();
	  		$('.question-content').html(questions[questionIndexer]);
	  		$('#a').html(answers[questionIndexer].a);
	  		$('#b').html(answers[questionIndexer].b);
	  		$('#c').html(answers[questionIndexer].c);
	  		$('#d').html(answers[questionIndexer].d);
	  		$('.message-div').css('text-align', '');
			$('.message-1').html('Click the text to select an answer.');
			$('.message-2').empty();
		}
	}

	function answersEmpty(){
		$('#a').empty();
		$('#b').empty();
		$('#c').empty();
		$('#d').empty();
	}

	function reset(){
		$('.question-content').css('text-align', '');
		$('#answer-content').css('text-align', '');
		message = "";
		counter = 10;
		intervalId;
		correct = 0;
		incorrect = 0;
		unanswered = 0;
		questionIndexer = 0;
		active = false;
		displayQuestion();
	}

	function start(){
		$('.time-left').css('background', 'none');
		$('.time-left').html('<button id="start" class="button sw-font spaced-out">Start</button>');
		$('.question-div').css('text-align', 'center');
		$('.question-content').html("Click on the 'Start' button to begin the game.");
		$('#start').click(function(){
			$('.time-left').empty();
			displayQuestion();
		});
	}

	function right(){
		$('.question-content').css('background', 'none');
		active = false;
		makeUnclickable();
		stop();
		correct++;
		counter = 10;
		answersEmpty();
		$('.time-left').html("Correct you are!");
		$('.question-content').empty();
		$('.pic').html('<img src="assets/images/yoda-calm.jpg">');
		$('#answer-content').css('text-align', 'center');
		$('#a').html("Correct: " + correct);
		$('#b').html("Incorrect: " + incorrect);
		$('#c').html("Unanswered: " + unanswered);
		$('.message-1').empty();
		$('.message-2').empty();
		nextQuestion();
	}

	function wrong(){
		$('.question-content').css('background', 'none');
		active = false;
		makeUnclickable();
		stop();
		if (isUnanswered) {
			unanswered++;
			$('.question-div').css('text-align', 'center');
			$('.question-content').css('background', '');
			$('.question-content').html("Not fast enough were you!");
		} else {
			$('.question-content').empty();
			incorrect++;
		}
		isUnanswered = false;
		counter = 10;
		answersEmpty();
		$('.time-left').html("Wrong you are!");
		$('.pic').html('<img src="assets/images/yoda-angry.jpg">');
		$('#answer-content').css('text-align', 'center');
		$('#a').html("Correct: " + correct);
		$('#b').html("Incorrect: " + incorrect);
		$('#c').html("Unanswered: " + unanswered);
		$('.message-div').css('text-align', 'center');
		$('.message-1').html('The correct answer is:');
		var answerKeyIndex = answerKey[questionIndexer];
		$('.message-2').html(answers[questionIndexer][answerKeyIndex]);
		nextQuestion();
	}

	function gameOver(){
		makeUnclickable();
		$('.time-left').html("Game Over!");
		$('.question-div').css('text-align', 'center');
		$('.question-content').css('background', '');
		if (correct >= 9) {
			$('.question-content').html("Jedi Master you are!");
		} else if (correct >= 7) {
			$('.question-content').html("Jedi Knight you are!");
		} else if (correct >= 5) {
			$('.question-content').html("More training you need, Padawan!");
		} else if (correct < 5) {
			$('.question-content').html("Fan-boy you are not!");
		}
		if (correct >= incorrect + unanswered){
			$('.pic').html('<img src="assets/images/yoda-calm.jpg">');
		} else {
			$('.pic').html('<img src="assets/images/yoda-angry.jpg">');
		}
		$('#answer-content').css('text-align', 'center');
		$('#d').html('Want to play again?');
		$('.message-div').css('text-align', 'center');
		$('.message-1').html('<button id="play-again" class="button sw-font spaced-out">Play Again</button>');
		$('.message-2').empty();
		$('#play-again').click(function(){
			reset();
		});
	}

	function makeClickable(){
		console.log('Clickable!');
		$('#a').addClass('clickable');
		$('#b').addClass('clickable');
		$('#c').addClass('clickable');
		$('#d').addClass('clickable');
	}

	function makeUnclickable(){
		console.log('Unclickable!');
		$('#a').removeClass('clickable');
		$('#b').removeClass('clickable');
		$('#c').removeClass('clickable');
		$('#d').removeClass('clickable');
	}

   start();

   	$('.answer').click(function(){
   		console.log(active);
   		if (active) {
   			guess = $(this).attr('id');
				console.log(guess);
				console.log(answerKey[questionIndexer]);
				if (guess === answerKey[questionIndexer]){
					right();
				} else {
					wrong();
				}
   		} else {
   			return;
   		}
			// console.log("correct = " + correct);
			// console.log("incorrect = " + incorrect);
			// console.log("index = " + questionIndexer);
		});   

});