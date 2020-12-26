// Muestra la tabla de multiplicar de un numero

let num = prompt('Ingrese un numero para mostrar su tabla de multiplicacion');

for (x = 1; x <= 10; x = x + 1) {
    console.log(num + ' x ' + x + ' = ' + num * x);
}

// Comprueba si un numero es primo

let primo = prompt('Ingrese un numero para saber si es un numero primo');
let np = 0;

for (i = primo - 1; i > 1; i = i - 1) {
    if (primo % i == 0) {
        np = np + 1;
    }
}
if (np > 0) {
    console.log(primo + ' No es un numero primo');
}
else {
    console.log(primo + ' Es un numero primo');
}

// Muestra los numeros primos que existen en el intervalo de 1 al 100

console.log('Los numeros primos que existen en el intervalo de 1 al 100 son:');

let restoCeroo = 0;

for (i = 2; i < 101; i++) {
    for (h = i - 1; h > 1; h--) {
        if (i % h == 0) {
        restoCeroo ++;
        }
    }
    if (restoCeroo == 0) {
        console.log(i);
    }
    restoCeroo = 0;
}

// Muestra los primeros 100 numeros primos
console.log('Los primeros 100 numeros primos son:');

let restoCero = 0;
let cantPrimos = 0;

for (i = 2; true; i++) {
    for (h = i - 1; h > 1; h--) {
        if (i % h == 0) {
        restoCero ++;
        }
    }
    if (restoCero == 0) {
        console.log(i);
        cantPrimos ++;
    }
    restoCero = 0;
    if (cantPrimos == 100) {
        break;
    }
}

// Funcion para calcular el promedio

function promedio(n1, n2) {
    let prom = (n1 + n2) / 2;
    alert('El promedio de ' + n1 + ' y ' + n2 + ' es ' + prom);
}