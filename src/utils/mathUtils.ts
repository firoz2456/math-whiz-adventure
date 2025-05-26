import { Problem, Operation } from '../types';

// Generate a random math problem appropriate for a 6-year-old
export function generateProblem(operation?: Operation): Problem {
  // For 6-year-olds, we'll keep the problems simple
  const operator = operation === 'subtraction' ? '-' : '+';
  
  let num1, num2;
  
  if (operator === '+') {
    // For addition, use numbers 0-5 to keep sums <= 10
    num1 = Math.floor(Math.random() * 6);
    num2 = Math.floor(Math.random() * (10 - num1 + 1));
  } else {
    // For subtraction, ensure positive results
    num1 = Math.floor(Math.random() * 10); // 0-9
    num2 = Math.floor(Math.random() * (num1 + 1)); // 0 to num1
  }
  
  // Calculate the answer
  const answer = operator === '+' ? num1 + num2 : num1 - num2;
  
  return {
    num1,
    num2,
    operator,
    answer
  };
}

// Function to determine if the answer is correct
export function checkAnswer(problem: Problem, userAnswer: number): boolean {
  return userAnswer === problem.answer;
}