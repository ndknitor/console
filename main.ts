import { execute } from "./execute";
import { program } from 'commander'
import { consola, createConsola } from "consola";

program
    .command("post")
    .requiredOption("-cp", "--control-planes")
    .requiredOption("-w", "--workers")
    .option("-e", "--etcds");

program.command("test");

program.command("up").action(args => {
    execute("ls",["-la"], "[process-1]", "blue");
}
);

program.parse();


// consola.info("Using consola 3.0.0");
// consola.start("Building project...");
// consola.warn("A new version of consola is available: 3.0.1");
// consola.success("Project built!");
// consola.error(new Error("This is an example error. Everything is fine!"));
// consola.box("I am a simple box");
// await consola.prompt("Deploy to the production?", {
//     type: "confirm",
// });

//execute("mkdir", ["sdfsdf/sdfsdfsdfsdf"], "[process-1]", "bgCyan");
//execute("ls", [], "[process-1]", "dim");

