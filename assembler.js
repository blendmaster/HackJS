(function(){
  var jumps, regex;
  jumps = {
    JGT: 'result > 0',
    JEQ: 'result === 0',
    JGE: 'result >= 0',
    JLT: 'result < 0',
    JNE: 'result !== 0',
    JLE: 'result <= 0',
    JMP: 'true'
  };
  regex = {
    label: /\(([A-Za-z\._$:][\w\.$:\-_]*)\)$/,
    A: /^@(.+)$/,
    C: /^(?:(?=[AMD])(A?M?D?)=)?([AMD][+\-&|][AMD1]|[\-!]?[AMD01])(?:;(J(?:[GL][ET]|EQ|NE|MP)))?$/
  };
  this.assemble = function(input){
    var len, variables, loc, symbols, i;
    if (input === '') {
      return;
    }
    len = 0;
    variables = {};
    loc = 16;
    symbols = {
      SP: 0,
      LCL: 1,
      ARG: 2,
      THIS: 3,
      THAT: 4,
      SCREEN: 16384,
      KBD: 24576
    };
    for (i = 0; i <= 15; ++i) {
      symbols["R" + i] = i;
    }
    return hack.ROM = input.replace(/\/\/.*/gm, '').trim().split(/\s+/).filter(function(it, i){
      var that;
      if (that = regex.label.exec(it)) {
        symbols[that[1]] = i - len++;
        return false;
      }
      return true;
    }).map(function(it){
      var symbol, that, int, num, dest, comp, jump, _ref;
      if (symbol = (_ref = regex.A.exec(it)) != null ? _ref[1] : void 8) {
        if ((that = symbols[symbol]) != null) {
          int = that;
        } else if (!isNaN(num = parseInt(symbol, 10))) {
          int = num;
        } else {
          int = (_ref = variables[symbol]) != null
            ? _ref
            : variables[symbol] = loc++;
        }
        return new Function("hack.A = " + int + ";");
      } else if (that = regex.C.exec(it)) {
        dest = that[1], comp = that[2], jump = that[3];
        return new Function("var result = " + (dest ? dest.replace(/[AMD]/g, 'hack.$& = ') + "" : '') + comp.replace(/[AMD]/g, 'hack.$&').replace(/!/, '~') + ";" + (jump ? "if(" + jumps[jump] + "){hack.PC=hack.A;}" : ''));
      } else {
        throw "invalid instruction: \"" + it + "\"";
      }
    });
  };
}).call(this);
