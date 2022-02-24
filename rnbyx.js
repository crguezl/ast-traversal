import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";

const code = `
function square(n) { /* a comment */
  return n * n;
}
`;

const ast = parser.parse(code);

traverse(ast, {
  enter(path) {
    if (path.isIdentifier({ name: "n" })) {
      path.node.name = "x";
    }
  },
});

//console.log(JSON.stringify(ast,null,2));

const output = generate(
    ast,
    {
      /* options */
      comments: false
    },
    code
);

console.log(output.code);
