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
}).call(this);
