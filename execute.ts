import chalk from 'chalk';
import { spawn } from 'child_process';

type Color = 
"bgBlack" | 
"bgBlackBright" |
"bgBlue" | 
"bgBlueBright" | 
"bgCyan" | 
"bgCyanBright" | 
"bgGray" | 
"bgGreen" |
"bgGreenBright" |
"bgGrey" |
"bgMagenta" | 
"bgMagentaBright" |
"bgRed" | 
"bgRedBright" | 
"bgWhite"|
"bgWhiteBright"| 
"bgYellow"| 
"bgYellowBright" |
"black" |
"blackBright" |
"blue" |
"blueBright" |
"bold" |
"cyan" |
"cyanBright" |
"dim" |
"gray" |
"green" |
"greenBright" |
"grey" |
"magenta" |
"magentaBright" |
"red" |
"redBright" |
"strikethrough" |
"white" |
"whiteBright" |
"yellow" |
"yellowBright";
export function execute(command: string, args?: string[], prefix?: string, color?: Color) {
    const child = spawn(command, args);

    // Color the prefix using chalk
    const chalkColor = color && (chalk as any)[color] || chalk.white;
    const coloredPrefix = chalkColor(prefix || "");

    // Handle stdout data
    child.stdout.on('data', (data) => {
        processStreamData(data, coloredPrefix);
    });

    // Handle stderr data
    child.stderr.on('data', (data) => {
        processStreamData(data, chalk.red(`${coloredPrefix} (error)`));
    });

    // Handle error
    child.on('error', (error) => {
        console.error(`${coloredPrefix}: Error: ${error.message}`);
    });
    return child;
}

// Function to process stream data and add a prefix to each line
function processStreamData(data: Buffer, coloredPrefix: string): void {
    const lines = data.toString().split('\n');
    lines.forEach(line => {
        if (line.trim().length > 0) {
            console.log(`${coloredPrefix} ${line}`);
        }
    });
}
