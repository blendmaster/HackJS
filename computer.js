(function(){
  this.hack = {
    timeout: void 8,
    clock: 0,
    get M(){
      return hack.RAM[hack.A];
    },
    set M(it){
      hack.RAM[hack.A] = it;
    },
    boot: function(){
      hack.RAMbuffer = new ArrayBuffer(24576 * 2);
      hack.RAM = new Int16Array(RAMBuffer);
      hack.A = 0;
      hack.D = 0;
      hack.PC = 0;
      return hack.timeout = setTimeout(hack.exec, 0);
    },
    exec: function(){
      hack.ROM[++hack.PC]();
      return hack.timeout = setTimeout(hack.exec(0));
    }
  };
}).call(this);
