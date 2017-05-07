class View {
  constructor(){
    
  }

skip(index){
  console.log(`Question Number ${index} SKIPPED!\n`);
}

 back(){
   console.log('press ctrl C to exit');
 }
 
choice(choice){
  switch(choice){
    case 'social': console.log(`You are choosing ${choice} Quiz, Difficulity: Easy`);break
    case 'antisocial': console.log(`You are choosing ${choice} Quiz, Difficulity: Medium`);break
    case 'socialantisocial': console.log(`You are choosing ${choice} Quiz, Difficulity: Hard`);break
    default: console.log('Please input a valid quiz name!');break
  }
}

judgement(input,answer){
  console.log(`\nGuess: '${input}'`)
  if(answer === true){
    console.log(`Correct!!`)
  }
  if (answer === false){
    console.log(`Incorrect! Try Again!`)
  }
}

answered(guess,input,hint){
  if(guess === 1){
  console.log(`\nWrong Answer: 1`)
  }
  if (guess > 1){
    console.log(`\nWrong Answers: ${guess}`)
  }
  if(guess > 10){
    console.log(`You are so awful! the answer is: ${hint}!`)
  }  

}
  
start(){
  console.log('Please select a flashcard of your choice')
  console.log('Type the following command:')
  console.log("babel-node flashcards.js social ---- Difficulity = Easy")
  console.log("babel-node flashcards.js antisocial ---- Difficulity = Medium")
  console.log("babel-node flashcards socialantisocial ---- Difficulity = Hard")
  }  
  
wrongchoice(){
  console.log('Wrong Quiz Name!')  
  }
  
displayQuestion(quiz){
    console.log('\n'+quiz)
  }
  
  win(){
    console.log(`Congratulation You Win!`)
  }
}

export default View