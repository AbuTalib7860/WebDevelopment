
let string="";
let memory = 0;
let buttons=document.querySelectorAll('.button');
Array.from(buttons).forEach((button)=>{
    button.addEventListener('click',(e)=>{
        if (e.target.innerHTML== '=') {
            string=eval(string);
            document.querySelector('input').value=string;
        }
        else if (e.target.innerHTML== 'C') {
            string="";
            document.querySelector('input').value=string;
        }
        else if (e.target.innerHTML== '%') {
            string = eval(string);
            string = (string / 100).toString();
            document.querySelector('input').value=string;
        }
        else if (e.target.innerHTML== 'M+') {
            memory += eval(string);
            document.querySelector('input').value = memory;
            // document.querySelector('input').value=string;
        }
        else if (e.target.innerHTML== 'M-') {
            memory -= eval(string);
            document.querySelector('input').value = memory;
        }else{
        string=string + e.target.innerHTML;
        document.querySelector('input').value=string;
        }
        
    })
})


