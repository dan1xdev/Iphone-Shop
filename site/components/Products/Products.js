correctPrice = (price) =>{
    let result = new String
    let priceLength = price.length
    let count = 0
    while (priceLength>0){
        priceLength-=1
        result= `${price[priceLength]}${result}`
        count+=1
        if (count === 3){
            result=` ${result}`
        }
    }
    return result
}

procentDiscount=(oldprice,price)=>{
    return Math.ceil(100-(price/oldprice)*100)
}

checkDiscount = (oldprice,price) =>{
        if (oldprice>price){
            return `<span class="products-element__discount">${correctPrice(String(oldprice))} ₽</span>`}
        else{
            return `<span class="products-element__nodiscount">     </span>`
    }
}

class Products{
    constructor(){
        this.classNameActive = 'products-element__btn_active';
        this.labelAdd = 'Добавить в корзину'
        this.labelRemove = 'Удалить из корзины'
    }

    handleSetLocationStorage(element,id){
        const {pushProduct,products} = localStorageUtil.putProducts(id)

        if (pushProduct){
            element.classList.add(this.classNameActive)
            element.innerHTML = this.labelRemove
        } else{
            element.classList.remove(this.classNameActive)
            element.innerHTML = this.labelAdd
        }

        headerPage.render(products.length);
    }

    render(){
        const productsStore = localStorageUtil.getProducts() 
        let htmlCatalog ='';
        CATALOG.forEach(({id,name,price,img,oldprice})=>{
            let activeClass ='';
            let activeText = ''

            if (productsStore.indexOf(id)===-1){
                activeText = this.labelAdd
            } else{
                activeClass=' '+ this.classNameActive
                activeText= this.labelRemove
            }

            htmlCatalog += `
                <li class="products-element">    
                    <span class="products-element__name">${name}</span>
                    <img class="products-element__img" src="${img}"/>
                    ${checkDiscount(parseInt(oldprice),parseInt(price))}
                    <span class="products-element__price">${correctPrice(price)} ₽</span>
                    <button class="products-element__btn${activeClass}" onclick="productsPage.handleSetLocationStorage(this, '${id}')">${activeText}</button>
                </li>
            `;
        })

        const html = `
        <ul class = "products-container">
            ${htmlCatalog}
        </ul>
        `;

        ROOT_CATALOG.innerHTML = html;
    }
}

const productsPage = new Products();
productsPage.render()