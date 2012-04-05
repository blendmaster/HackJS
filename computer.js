(function(){
  this.hack = {
    timeout: void 8,
    clock: 100,
    get M(){
      return this.RAM[this.A];
    },
    set M(it){
      var offset, p, i, pixel, _ref, _to;
      if (16384 <= (_ref = this.A) && _ref <= 24575) {
        offset = (this.A - 16384) * 16 * 4;
        p = 0;
        for (i = offset, _to = offset + 64; i < _to; i += 4) {
          pixel = it >> p++ & 1 ? 0 : 255;
          this.screen.data[i] = pixel;
          this.screen.data[i + 1] = pixel;
          this.screen.data[i + 2] = pixel;
        }
        this.refresh();
      }
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
      this.canvas.fillStyle = 'white';
      this.canvas.fillRect(0, 0, 512, 256);
      this.screen = this.canvas.getImageData(0, 0, 512, 256);
      this.booted = true;
    },
    start: function(){
      console.log('starting...');
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
      console.log("PC: " + hack.PC);
      console.log(hack.ROM[hack.PC].toString());
      hack.ROM[hack.PC++]();
      if (hack.PC < hack.ROM.length) {
        hack.timeout = setTimeout(hack.exec, hack.clock);
      }
    },
    refresh: function(){
      this.canvas.putImageData(this.screen, 0, 0);
    }
  };
}).call(this);
