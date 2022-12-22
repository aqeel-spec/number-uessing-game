#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

import validator from "./src/validator.js";

console.clear();
const sleep = () => {
  return new Promise((res) => {
    setTimeout(res, 2000);
  });
};
async function header() {
  const title = chalkAnimation.rainbow(
    `Welcome dear, in number guessing game!`
  );
  await sleep();
  title.stop();
}
// ---------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
interface UserGuess {
  userGuess: number;
}

let attempts: number = 3;
async function userInput() {
  let computerInput = Math.floor(Math.random() * 10 + 1);

  do {
    attempts--;
    console.log(`\nNo of attempts remaining ${attempts}`)
    var answer: UserGuess = await inquirer.prompt([
      {
        type: "input",
        name: "userGuess",
        message: chalk.yellow("🤔 Guess the number between 1 & 10 :"),
        validate: validator,
      },
    ]);
    if (Number(answer.userGuess) === computerInput) {
      console.log(
        chalk.rgb(
          255,
          100,
          255
        )(`💕💕💕 Bravo ${chalk.yellowBright("you win")}🎉🎉🎉 the game.`)
      );
    } else if (answer.userGuess > computerInput) {
      console.log(`Your guess  ${answer.userGuess} is greater 💻`);
    } else if (answer.userGuess < computerInput) {
      console.log(`Your guess ${answer.userGuess} is smaller 💻`);
    } else {
      console.log("Sorry try again");
    }
  } while (attempts > 0 && computerInput !== Number(answer.userGuess));
  if (attempts == 0) {
    console.log(chalk.blue("👽👽👽 Game Over"))
  }
}

async function playAgain() {
  do {
    await header();
    await userInput();
    console.log(attempts);
    var selection = await inquirer.prompt([
      {
        type: "confirm",
        name: "restart",
        message: "Do you want to play again ?: ",
        default: false,
      },
    ]);
  } while (selection.restart == true ? await userInput() : false);
}
playAgain();
