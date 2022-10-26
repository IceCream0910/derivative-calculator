function derive(input) {
    var result = '';
    var hang = input.replace('+', ',+').replace('-', ',-').split(',');
    for(var i=0; i<hang.length; i++) {
      var data = hang[i].split('x^');
      console.log(data[0], data[1])
      if(data[0]>=0) { //양수이면 + 부호 붙이기
        result = result + '+'+ calculate(data[0], data[1]).toString();
      } else { 
        result = result + calculate(data[0], data[1]).toString();
      }
    }
    console.log(result);
}

function calculate(a, b) { //ax^b
    return (a*b)+'x^'+(b-1);
}

derive('2x^3-3x^2+4x^1');