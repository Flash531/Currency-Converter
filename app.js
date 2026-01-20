const URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
 
const btn = document.querySelector("form button");

const fromCurr =  document.querySelector(".from select");
const toCurr= document.querySelector(".to select");
const mesg = document.querySelector(".msg")

document.addEventListener("load",()=>{
    updateExchangeRate();
})



const dropdowns = document.querySelectorAll(".dropdown select");

for ( select of dropdowns){
    for(currcode in countryList){
        let newoption = document.createElement("option") ;
        newoption.innerText= currcode;
        newoption.value=currcode;
        if(select.name === "from" && currcode ==="USD"){
            newoption.selected="selected"
        }else if(select.name === "to" && currcode ==="INR"){
            newoption.selected="selected"
        } 
        select.append(newoption);
    }

    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element)=> {
    let currcode  = element.value
    let countryCode = countryList[currcode];
    let newSrc = ` https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}  

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();


})

const updateExchangeRate = async () => {

    let amount = document.querySelector("form input") // .form input
    let amtVal = amount.value;
    console.log(amtVal);
    if(amtVal === "" || amtVal < 1){
        amtVal=1;
    }

    console.log(fromCurr.value, toCurr.value);
    let BaseUrl = `${URL}/${fromCurr.value.toLowerCase()}.json`
    console.log(BaseUrl);
    let res =  await fetch (BaseUrl);
    let data = await res.json();    
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);
    let finalAmt = (amtVal * rate);
    finalAmt = finalAmt.toFixed(3);
    mesg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`

}