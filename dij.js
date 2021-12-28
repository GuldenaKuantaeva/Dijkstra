let fs = require('fs');
let arg = process.argv;
let input = fs.readFileSync(arg[2], 'utf8');
input = input.toString();
let out = '';
let stack = new Array();

function Priority(exp) {
    if (exp =='+') return 0;
    if (exp =='-') return 0;
    if (exp =='*') return 1;
    if (exp =='/') return 1;
    if (exp =='^') return 2;
    return -1;
}


for (let i = 0; i < input.length; i++){
    if (input[i] != ' ') {
		if (input[i] == parseInt(input[i])){
            while (input[i] == parseInt(input[i])){
				out += input[i];
                i++;
            }
			i--;
			out += '$'; 
			continue;
		}
		switch (input[i]){
			case '(':
				stack.push('(');
				continue;
			case ')':
				if (stack.length == 0)
					console.log('error');
				while (stack[stack.length - 1] != '(')
                    out += stack.pop();
				stack.pop();
				continue;
		}
		if (Priority(input[i]) > Priority(stack[stack.length - 1]))
			stack.push(input[i]);
		else {
			while (Priority(input[i]) <= Priority(stack[stack.length - 1]))
                out += stack.pop();
            stack.push(input[i]);
		}
	}
}

while (stack.length != 0) 
	out += stack.pop();

for (let i = 0; i < out.length; i++){
	if (out[i] == parseInt(out[i])){
		let n = '';
		while (out[i] == parseInt(out[i])){
			n += out[i];
			i++;
		}
		stack.push(parseInt(n));
	}
	else{
		let first = parseInt(stack.pop());
        let second = parseInt(stack.pop());
		

		switch (out[i]) {
			case '+':
				stack.push(second + first);
				continue;
			case '-':
				stack.push(second - first);
				continue;
			case '*':
				stack.push(second * first);
				continue;
			case '/':
				if (first == 0)
					console.log('error')
				else{
					stack.push(second / first);
					continue;
				}
			case '^':
				stack.push((Math.pow(second, first)));
				continue;
		}
	}
}
for (let i = 0; i < input.length; i++)
	input = input.replace('^','**');

let ans = eval(input)
let result = stack.pop()

console.log("eval: " + ans +  (" dij: " + result));
