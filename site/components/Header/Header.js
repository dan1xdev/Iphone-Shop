class Header{
    handlerOpenShoppingPage(){
        shoppingPage.render();
    }

    render(count){
        const html = `
            <div class="header-container">
                <div class = "basket">
                    <div class = "basket-image"><img src="img/123.png" width=35 height=35 onclick="headerPage.handlerOpenShoppingPage();"></div>
                    <div class = "header-counter" onclick="headerPage.handlerOpenShoppingPage();">${count}</div>
                </div>
            </div>
        
        `
        ROOT_HEADER.innerHTML = html
    }
}
const headerPage = new Header

const productsStore = localStorageUtil.getProducts();


headerPage.render(productsStore.length)