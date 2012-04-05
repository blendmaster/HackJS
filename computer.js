(function(){
  this.hack = {
    timeout: void 8,
    clock: 100,
    get M(){
      return this.RAM[this.A];
    },
    set M(it){
      this.RAM[this.A] = it;
    },
    booted: false,
    stop: function(){
      clearTimeout(this.timeout);
    },
    reset: function(){
      this.stop();
      this.boot();
    },
    boot: function(){
      this.RAMBuffer = new ArrayBuffer(24576 * 2);
      this.RAM = new Int16Array(this.RAMBuffer);
      this.A = 0;
      this.D = 0;
      this.PC = 0;
      this.booted = true;
    },
    start: function(){
      this.timeout = setTimeout(this.exec, this.clock);
    },
    step: function(){
      if (!this.booted) {
        this.boot();
      }
      console.log("next instruction " + this.ROM[this.PC].toString());
      if (this.PC < this.ROM.length) {
        this.ROM[this.PC++]();
      }
      console.log("after A: " + this.A + " D: " + this.D + " M: " + this.M + " PC: " + this.PC);
    },
    exec: function(){
      hack.ROM[hack.PC++]();
      if (hack.PC < hack.ROM.length) {
        hack.timeout = setTimeout(hack.exec, hack.clock);
      }
    }
  };
}).call(this);
