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
    if (
        // path.node contains the AST node, 
        // path.parent is the parent, 
        // path.key the name of the attribute (left, right, 0, etc.)
        path.node.type === "Identifier" &&
        path.node.name === "n"
      ) {
        //console.log(Object.keys(path));
        //console.log(Object.keys(path.scope));
        //console.log(path.scope.inited);

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
