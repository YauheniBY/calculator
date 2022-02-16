console.log('hello');

let a = "0",
    b = "",
    sign = "",
    screen = "0",
    finish = false;

const number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."],
      dot = ".",
      action = ["/", "x", "-", "+"],
      minLengthScreen = 9,
      mediumLengthScreen = 12;
      maxLengthScreen = 15,

      out = document.querySelector(".calcscreen p"),
      changeDesignBtn = document.querySelector(".headline");

changeDesignBtn.addEventListener('click', toggleStylesFile);


document.querySelector(".buttons").addEventListener('click',function(event) {

   toggleFonts();

   if(event.target.textContent === "AC"){
      clearAll();
      return;
   }
   
   if(event.target.classList.contains("clear")) {
      clearLast();
   }



//проверка на клик по кнопке знака "="

   if (event.target.textContent === "=") { 
      result();
      finish = true;
      return;
   }
//проверка на клик по кнопке знака "+/-"

      if (event.target.textContent === "+/-") { 
         if((a != "") && ((+a) != 0) && (sign === "")) {

            if( a.includes("-")){

               a = a.slice(1);
               out.textContent = out.textContent.slice(1);

            } else {
               a = "-" + a;
            out.textContent = `${a}`;

            }
            
         }if((a != "") && ((+a) != 0) && (sign !== "")) {

            if( b.includes("-")){
               
               b = b.slice(1);
               out.textContent = out.textContent = `${(+(a)) + sign + b}`;

            } else {
               b = "-" + b;
               out.textContent = `${(+(a)) + sign + " " + b}`;

            }
         return;
         }
      }


//проверка на клик по кнопке цифра (первое число)
      if (event.target.classList.contains('btn')) {      


         if (( b === "") && ( sign === "") && number.includes(event.target.textContent) ){

// очистим значение, если был финиш 

            if(finish) {
               a = "";
               finish = false;
            }
// если вводим "."

            if((event.target.textContent === ".") && (a !== "")) {

               if(!a.includes('.')) {
                  a += event.target.textContent;
                  out.textContent = `${a}`;
               }
               return;

            } else if ( (event.target.textContent === ".") && ((+a) == 0) ){

               a += '0.';
               out.textContent = '0.';
               toggleFonts();
               return; 

            } else if ( a.includes('.')){

               a += event.target.textContent;
               out.textContent = `${a}`;

// ввод чисел для "А"

            } else if ((+(a)) === 0 ){

               a = event.target.textContent;
               out.textContent = `${a}`;

            }else{
               a += event.target.textContent;
               out.textContent = `${a}`;
            }
            
            

            document.querySelector(".calcscreen").classList.add("active");

//проверка на клик по кнопке знака (+ есть первое число)

         } else if (( a !== "") && ( b === "") && (!((out.textContent).includes(".."))) && action.includes(event.target.textContent )) {

            sign =  event.target.textContent;
            out.textContent = (+(a)) + sign;
         } else if(( a !== "") && ( b !== "") && action.includes(event.target.textContent )){

            if(result()){
               sign =  event.target.textContent;
            out.textContent = (+(a)) + sign;

            }


         

      //проверка на клик по кнопке цифры (+ есть первое число и знак)

         } else if ((a != "") && (sign != "") && number.includes(event.target.textContent)){

            if((event.target.textContent === ".") && (b !== "")) {

               if(!(b.includes('.'))) {
                  b += event.target.textContent;
                  out.textContent += '.';
               }
               return;

            } else if ( (event.target.textContent === ".") && (b === "") ){
               console.log('tam')

               b += '0.';
               out.textContent += b;
               return;
            } if ( b.includes('.')){

               b += event.target.textContent;
               out.textContent = `${(+(a)) + sign + b}`;

            } else if ((+(b)) === 0 ){
               b = event.target.textContent;
               out.textContent = `${(+(a)) + sign + b}`;

            }else{
               b += event.target.textContent;
               out.textContent = `${(+(a)) + sign + b}`;
            }
         }
      }  

 console.log(a, b, sign);
});



function clearAll() {
   out.textContent = a = "";
      b = "";
      sign = "";
      document.querySelector(".calcscreen").classList.remove("active");
      finish = false;
}

function clearLast() {

   if( b !== ""){
      b = b.slice(0, -1);
      out.textContent = out.textContent.slice(0, -1);
   } else if ( sign !== "" ) {
      sign = "";
      out.textContent = out.textContent.slice(0, -1);
   } else if ( a !== "" ) {
      a = a.slice(0, -1);
      out.textContent = out.textContent.slice(0, -1);

   } else {
      a = "";
   }
   if(a === "" || a === "-"){
      a = "";
      document.querySelector(".calcscreen").classList.remove("active");
      out.textContent = a;
   }

   
   toggleFonts();
}

// считаем результат

function result() {

   if ((a !== "") && (sign !== "")) {

      if (!b) { b = a; }

   // приводим А и В к числовому значению

      a = +(a);
      b = +(b);

   // Делаем расчёт, отфильтровав в If исключения

      if ((a === b && a !== 0.7 && a !== 0.2) || !numericValues(a, b, sign)){

         switch(sign){

            case '/':
   
               if(b === 0) {
                  out.textContent = "can't divide";
   
               } else {
   
                  out.textContent = a / b;
                  out.textContent = noLongResult(out.textContent, maxLengthScreen);
   
               }
               break;
   
            case 'x':
               out.textContent = a * b;
               break;
   
            case '-':
               out.textContent = a - b;
               break;
   
            case '+':               
               out.textContent = a + b;               
               
               break;
   
            default:
               alert('Ошибка вычисления');
         }

      }

      toggleFonts();

      if((b == 0) && (sign === "/")) {

         a = "";
         b = "";
         sign = "";
         return false;

        } else {
           a = `${out.textContent}`;
           b = "";
           sign = "";
           return true;
        }      

      
   }

}

// Для дробных чисел

function numericValues (a, b, sign){

   
   if((a.toString().includes('.')) || (b.toString().includes('.'))){

      let lengthA_AfterDot = ((a.toString()).length - 1) - (a.toString()).indexOf('.');
      let lengthB_AfterDot = ((b.toString()).length - 1) - (b.toString()).indexOf('.');

      let maxLengthAfterDot = (lengthA_AfterDot > lengthB_AfterDot)
                              ? lengthA_AfterDot
                              : lengthB_AfterDot;

      switch (sign){
         case '/': 
         
               if (b === 0){

                  out.textContent = "can't divide";

               } else {

                  out.textContent = `${(((a * Math.pow(10, maxLengthAfterDot)) / (b * Math.pow(10, maxLengthAfterDot))) )}`;

               }

               
           
            break;

         case 'x':            
               out.textContent = `${(((a * Math.pow(10,lengthA_AfterDot)) * (b * Math.pow(10, lengthB_AfterDot))) / Math.pow(10,(lengthA_AfterDot + lengthB_AfterDot)))}`;

            break;

         case '-':
            out.textContent = `${(((a * Math.pow(10,maxLengthAfterDot)) - (b * Math.pow(10, maxLengthAfterDot))) / Math.pow(10,maxLengthAfterDot))}`;

            break;

         case '+':
            out.textContent = `${(((a * Math.pow(10, maxLengthAfterDot)) + (b * Math.pow(10,maxLengthAfterDot))) / Math.pow(10,maxLengthAfterDot))}`;

            break;

         default:
               alert('Ошибка вычисления с дробями');

      }

      if((b == 0) && (sign === "/")) {

         a = "";
         b = "";
         sign = "";
         return false;

        } else {

      //если результат длиннее длинны экрана округляем его

      out.textContent = `${noLongResult(out.textContent, maxLengthScreen)}`;
      }

      toggleFonts();

      return true;

   }

   return false;
}

function noLongResult (str, maxLengthScreen){

   str = str.toString() ;

   if(str.includes('.')){

      let numbersBeforDot = (str.indexOf('.') + 1);
      if(maxLengthScreen > (numbersBeforDot + 1)) {

         return (str.length > maxLengthScreen)
            ? (+(str)).toFixed(maxLengthScreen - numbersBeforDot)
            : (+(str));

      } else {

         return str.slice(0,maxLengthScreen) + "..";

      }

   } else {

      return (str.length > maxLengthScreen)
         ? str.slice(0,maxLengthScreen) + ".."
         : (+(str));
   }
   
}

// меняем шрифты, если заполняют весь экран и наоборот

function toggleFonts() {
   const outText = document.querySelector(".calcscreen"); 


   if ((out.textContent.length) >= mediumLengthScreen ) {      

      outText.classList.add("microFontSize");        

   } else if ((out.textContent.length) >= minLengthScreen) {

      if(outText.classList.contains("microFontSize")){
         outText.classList.remove("microFontSize"); 
      }

      outText.classList.add("miniFontSize");

   } else {  
      
      outText.classList.remove("miniFontSize");
      outText.classList.remove("microFontSize"); 

   }

}
function toggleStylesFile() {

   const fileCss = document.getElementById('css');

   if(fileCss.href.includes("style.css")) {

      

      fileCss.href = fileCss.href.replace("style.css","main.css");

   } else {
      
      fileCss.href = fileCss.href.replace("main.css","style.css");

   }

}
