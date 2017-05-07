class View {
  constructor(){
    
  }

skip(index){
  console.log(`Question Number ${index} SKIPPED!\n`);
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

answered(guess,input){
  if(guess === 1){
  console.log(`Wrong Answer: 1`)
  }
  else if (guess > 1){
    console.log(`Wrong Answers: ${guess}`)
  }  

}
  
start(){
  console.log('Please select a flashcard of your choice')
  console.log('Type the following command:')
  console.log("babel-node flashcards.js social ---- Difficulity = Easy")
  console.log("babel-node flashcards.js anti-social ---- Difficulity = Medium")
  console.log("babel-node flashcards social-anti-social ---- Difficulity = Hard")
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