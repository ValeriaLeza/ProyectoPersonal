let btnQuote = document.getElementById("btnQuote");
let btnPrint = document.getElementById("btnPrint");
let btnSubmit = document.getElementById("btnSubmit");

btnSubmit.addEventListener("click", function(e){ 
    e.preventDefault();
let nombre = document.getElementById("inputName");
let campoTelefono = document.getElementById("inputPhone");
let correoe = document.getElementById("inputEmail");
let valorcorreo = document.getElementById("inputEmail").value;


nombre.classList.remove("is-invalid");
nombre.classList.add("is-valid");

if ( nombre.value.length > 3 && nombre.value.length < 20) {
    nombre.classList.add("is-valid"); 
}
else{  
    nombre.classList.add("is-invalid");
}

for (let i = 0; i < nombre.value.length; i++) {
    console.log(nombre.value.charAt(i));

            console.log(nombre.value.charAt(i));
            console.log(nombre.value.charCodeAt(i));
            if((
            
                (nombre.value.toUpperCase().charCodeAt(i)<65)
                || //condición or
                (nombre.value.toUpperCase().charCodeAt(i)>90)
            ) && ((nombre.value.toUpperCase().charCodeAt(i)!=32)) //espacio
            &&((nombre.value.toUpperCase().charCodeAt(i)!=193)) //Á el to uper fue para comparar tambien con las mayuculas
            &&((nombre.value.toUpperCase().charCodeAt(i)!=201)) //É
            &&((nombre.value.toUpperCase().charCodeAt(i)!=205)) //Í
            &&((nombre.value.toUpperCase().charCodeAt(i)!=211)) //Ó
            &&((nombre.value.toUpperCase().charCodeAt(i)!=218)) //Ú
            &&((nombre.value.toUpperCase().charCodeAt(i)!=209)) //Ñ

            ) {
                    nombre.classList.remove("is-valid");
                    nombre.classList.add("is-invalid");
                    break;
            } //if
        }//for
   

if((campoTelefono.value.length == 10) && (!isNaN(campoTelefono.value))) {
    campoTelefono.classList.remove("is-invalid");
    campoTelefono.classList.add("is-valid");
} else {
    campoTelefono.classList.remove("is-valid");
    campoTelefono.classList.add("is-invalid");
}

function validarCorreo (correo) {
    let expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let verificar = expReg.test(correo);
    console.log(verificar)
    if(verificar){
        correoe.classList.remove("is-invalid");
        correoe.classList.add("is-valid");
    } else {
        correoe.classList.remove("is-valid");
        correoe.classList.add("is-invalid");
    }
}
validarCorreo(valorcorreo);

});


btnQuote.addEventListener("click", function(e){
    e.preventDefault();
    let hours = parseInt(document.getElementById("inputHours").value);
    let rate = parseFloat(document.getElementById("inputRate").value);
    let iva = document.getElementById("checkIVA").checked;
    let extras = document.getElementById("inputExtras");
    let changes = parseInt(document.getElementById("inputChanges").value);
    let email = document.getElementById("inputEmail").value;
    let name = document.getElementById("inputName").value;
    changes = (isNaN(changes) ? 0 : changes);
    let fixedcost = parseFloat(document.getElementById("inputFCost").value);
    fixedcost = (isNaN(fixedcost)?0: fixedcost);
   
    let cardText = document.getElementById("cardText");
    let cardCost = document.getElementById('cardCost');
    let flag = true;
    if (isNaN(hours)){
        document.getElementById("inputHours").style.borderColor = "#ed3b3b";
        flag = false;
    } else {
        document.getElementById("inputHours").value=hours;
        document.getElementById("inputHours").style.borderColor = "#00FF00";
    }
    if (isNaN(rate)){
        console.log("Rate Not a Number")
        document.getElementById("inputRate").style.borderColor = "#FF0000";
        flag = false;
    } else {
        document.getElementById("inputRate").value;
        document.getElementById("inputRate").style.borderColor = "#00FF00";
     }
    //cardText.innerHTML = quote(hours,rate,iva,extras.selectedIndex).toFixed(2);
    if (flag){
        cardText.innerHTML = `Nombre: ${name}<br/>Correo Electrónico: ${email}<br/>
            Te podemos hacer una cotización de acuerdo a tus requerimientos: <br/> ${getRequierements(extras)} 
            `;
       cardCost.innerHTML ="<strong>$" + quote(hours,rate,iva,extras,changes,fixedcost).toFixed(2);
    } //if flag
});

btnPrint.addEventListener("click", function(e){
    e.preventDefault();
    window.print();
});

const getRequierements = (ex) => {
    let str = `<br/><ul class="list-group">`;
    for (let i = 0; i <ex.options.length; i++) {
        console.log(ex.options[i].selected);
        if (ex.options[i].selected) {
            str +=`<li class="list-group-item list-group-item-action"> ${ex.options[i].text}  </li>`;
        }
}
str+= `</ul>`;
return str;
}
//funcion para cotizar con un do while
function quote (h,r,vat,ex,p,fc) {
    p/=100; //p = p/100; //Change Management
    let result = (h*r)*(1+p);
    //for (inicio;   condicion;   incremento/decremento)
    let i = 0; //inicio
    do { //condicion
        console.log(ex.options[i].selected);
        if (ex.options[i].selected) {
            result += parseFloat(ex.options[i].value);
        }
        i++;
    } while(i <ex.options.length) ;
        result+= fc; // Fixed costs
    if (vat){
        result *= 1.16;
    } //if vat
    return result;
}//cotiza

// switch (index) {
//     case 1:
//         result += 7000;            
//         break;
//     case 2:
//         result += 1500;
//         break;
//     case 3:
//         result+=12000;
//         break;
//     default:
//         break;
// }

// function quote (h,r,vat,index) {
//     let result = h*r;
//     if (index==1) { //Graphic Desing
//         result += 7000;
//     } else if (index ==2) { // Hosting
//         result += 1500;
//     } else if (index==3) { // Sopport
//         result += 12000;
//     } // else if
//     if (vat){
//         result *= 1.16;
//     } //if vat
//     return result;
// }//cotiza

// function quote (h,r,vat,ex) {
//     let result = h*r;
//     //for (inicio;   condicion;   incremento/decremento)
//     for (let i = 0; i <ex.options.length; i++) {
//         console.log(ex.options[i].selected);
//         if (ex.options[i].selected) {
//             result += parseFloat(ex.options[i].value);
//         }
//     } // for i

// if (vat){
//     result *= 1.16;
// } //if vat
// return result;
// }//cotiza

// function quote (h,r,vat,ex) {
//     let result = h*r;
//     //for (inicio;   condicion;   incremento/decremento)
//     let i = 0; //inicio
//     while(i <ex.options.length) { //condicion
//         console.log(ex.options[i].selected);
//         if (ex.options[i].selected) {
//             result += parseFloat(ex.options[i].value);
//         }
//         i++;
//     } // for i


//     if (vat){
//         result *= 1.16;
//     } //if vat
//     return result;
// }//cotiza