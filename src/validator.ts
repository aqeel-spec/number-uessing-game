import chalk from "chalk";

function validator (input : number) {
    if (isNaN(input)) {
        return `🚫 ${chalk.red("Warning!")}, ${chalk.greenBright("Please enter a valid number")}`
        //chalk.red("Please enter a valid number")
    }
    return true
};
export default validator;
