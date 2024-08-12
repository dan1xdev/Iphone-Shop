procentDiscount=(oldprice,price)=>{
    return Math.ceil(100-(price/oldprice)*100)
}
console.log(procentDiscount(100,70))