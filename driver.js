(function(){
  document.getElementById('file').addEventListener('change', function(){
    var reader;
    reader = new FileReader;
    reader.onload = function(){
      assemble(this.result);
      return console.log(hack.ROM.map(function(it){
        return it.toString();
      }).join('\n'));
    };
    reader.readAsText(this.files[0]);
  });
  document.getElementById('start').addEventListener('click', function(){
    hack.boot();
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
}).call(this);
