(function(){
  this.hack = {
    timeout: void 8,
    clock: 0,
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
    running: false,
    stop: function(){
      this.running = false;
      clearTimeout(this.timeout);
    },
    reset: function(){
      this.stop();
      this.boot();
    },
    boot: function(){
      this.RAMBuffer = new ArrayBuffer(24577 * 2);
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
      if (!this.booted) {
        this.boot();
      }
      this.running = true;
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
      } else {
        hack.running = false;
      }
    },
    refresh: function(){
      this.canvas.putImageData(this.screen, 0, 0);
    },
    keys: {
      13: 128,
      8: 129,
      37: 130,
      38: 131,
      39: 132,
      40: 133,
      36: 134,
      35: 135,
      33: 136,
      34: 137,
      46: 139,
      27: 140,
      112: 141,
      113: 142,
      114: 143,
      115: 144,
      116: 145,
      117: 146,
      118: 147,
      119: 148,
      120: 149,
      121: 150,
      122: 151,
      123: 152,
      186: 59,
      187: 61,
      188: 44,
      189: 45,
      190: 46,
      191: 47,
      192: 96,
      219: 91,
      220: 92,
      221: 93,
      222: 39,
      107: 61,
      109: 45
    },
    keyboard: function(e){
      var key;
      key = e.keyCode;
      if (hack.booted) {
        hack.RAM[24576] = hack.keys[key] || key;
      }
      if (hack.running) {
        return e.preventDefault();
      }
    },
    clearkeyboard: function(){
      if (hack.booted) {
        return hack.RAM[24576] = 0;
      }
    }
  };
}).call(this);
