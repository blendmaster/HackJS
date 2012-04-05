(function(){
  document.getElementById('file').addEventListener('change', function(){
    var reader;
    reader = new FileReader;
    reader.onload = function(){
      assemble(this.result);
      if (hack.ROM.length > 32768) {
        alert("Sorry, your program is too big to fit in 32K of ROM instruction memory!");
      }
      return hack.reset();
    };
    reader.readAsText(this.files[0]);
  });
  document.getElementById('start').addEventListener('click', function(){
    hack.start();
  });
  document.getElementById('stop').addEventListener('click', function(){
    hack.stop();
  });
  document.getElementById('reset').addEventListener('click', function(){
    hack.reset();
  });
  document.getElementById('step').addEventListener('click', function(){
    hack.step();
  });
  hack.canvas = document.getElementById('canvas').getContext('2d');
  document.addEventListener('keydown', hack.keyboard);
  document.addEventListener('keyup', hack.clearkeyboard);
  hack.status = document.getElementById('status');
}).call(this);
