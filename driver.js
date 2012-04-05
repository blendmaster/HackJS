(function(){
  document.getElementById('file').addEventListener('change', function(){
    var reader;
    reader = new FileReader;
    reader.onload = function(){
      assemble(this.result);
      console.log('assembled!');
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
}).call(this);
