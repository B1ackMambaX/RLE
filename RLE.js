let arg = process.argv;
let fs = require("fs");


if (arg[2] == "encode") {
	console.log ('Encoding...');
    let str = fs.readFileSync(arg[3])+ ' ';
    let encodedStr = "";
    let n = 1;
	let m = str.charAt(0);
    
	for (let i = 1; i < str.length; i++) {
        if (str.charAt(i) == m) { //проверяем на количество символов большее чем 255
            if (n + 1 == 256) {
                encodedStr += "#" + String.fromCharCode(255) + m;
                n = 1;
            }
            else {n++;}
        }
        else {
            if (m == '#' || n > 3 ) { //если символов больше 3 и меньше 256, то кодируем
                encodedStr += "#" + String.fromCharCode(n) + m;
                m = str.charAt(i);
				n =  1;
            }
            else {
                encodedStr += m.repeat(n); // если символов меньше трех оставляем как есть
                m = str.charAt(i);
				n =  1;
            }
        }
    }
	
console.log ('Done!');
    fs.writeFileSync(arg[4], encodedStr);
}


if (arg[2] == "decode") {
	console.log ('Decoding...');
    let str = fs.readFileSync(arg[3], "utf8");
    let decodedStr = "";
    
	for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) == "#") {
            decodedStr += str.charAt(i+2).repeat(str.charAt(i+1).charCodeAt(0));
            i += 2;
        }
        else {
            decodedStr += str.charAt(i);
        } 
    }
    
	fs.writeFileSync(arg[4], decodedStr);
	console.log ('Done!');
}