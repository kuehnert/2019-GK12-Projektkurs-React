function addiere(x, y) {
  return x + y;
}

function sub(x, y) {
  return x - y;
}

let x = 5; // Konstante, deren Wert sich nicht ändert
let meineFunktion;// Variable, deren Wert sich ändert

x = addiere(1, 3);
meineFunktion = addiere;

console.log(addiere(1, 2)); // => 3
console.log(meineFunktion(3, 5));

meineFunktion = sub;
console.log(meineFunktion(3, 5));
