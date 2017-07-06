var address = '东莞';
const fn = () => console.log('success');
class Ts {
  constructor(name){
    this.name = name;
  }

  call(){
    console.log(this.name);
  }
}
function sayHello(){
  alert('hello');
}

console.log(address);
fn();
var ts = new Ts('chen');
ts.call();
console.log(ts.name);
