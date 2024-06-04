#notes

para rodar:

yarn
tsc -init
[
{
"compilerOptions": {
"target": "ESNext", /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
"module": "NodeNext", /* Specify what module code is generated. */
"rootDir": "./src", /* Specify the root folder within your source files. */
"outDir": "./dist", /* Specify an output folder for all emitted files. */
"esModuleInterop": true, /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
"forceConsistentCasingInFileNames": true, /* Ensure that casing is correct in imports. */
"strict": true, /* Enable all strict type-checking options. */
"skipLibCheck": true /* Skip type checking all .d.ts files. */
},
}
]
1º terminal
tsc -w

2º terminal
yarn start
