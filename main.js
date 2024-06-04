//// selectors
let container = document.querySelector('.container');
let row = document.querySelector('.randerData');

let cartShopping = document.querySelector('#cartShopping');
let dynamic_count = cartShopping.appendChild(document.createElement('span'));

let sideCartTotal = document.querySelector('.sideCartTotal');
let sideCartTotalPrice = document.querySelector('.sideCartTotalPrice');
sideCartTotalPrice.innerHTML = "Empty cart";
let cartTotalPriceGet = document.querySelector('.cartTotalPriceGet');

//// for count total price
let myTotal = 0;

//// main function to get all Data
async function getData() {

    //// fetch fake api's from internet
    let raw = await fetch('https://fakestoreapi.com/products');
    let data = await raw.json();

    //// map loop for whole data
    data.map((ele) => {
        let col = row.appendChild(document.createElement('div'));
        let cardEle = col.appendChild(document.createElement('div'));
        
        //// div for images
        let cardBody1 = cardEle.appendChild(document.createElement('div'));
        let cardImg = cardBody1.appendChild(document.createElement('img'));
        
        //// div for title and price --- etc
        let cardBody2 = cardEle.appendChild(document.createElement('div'));
        let cardHeading = cardBody2.appendChild(document.createElement('h5'));
        let cardPara = cardBody2.appendChild(document.createElement('p'));
        cardHeading.appendChild(document.createTextNode(`${ele.title.slice(0, 16)}...`));
        cardPara.appendChild(document.createTextNode(`Price: $${ele.price}`));
        
        let cardFooter = cardEle.appendChild(document.createElement('div'));
        let cardBtn = cardFooter.appendChild(document.createElement('button'));
        cardBtn.appendChild(document.createTextNode('ADD TO CART'));
        
        //// set class to elements
        col.classList = 'col-xl-3 col-lg-4 col-md-6 col';
        cardEle.classList = 'card main-card';

        cardBody1.classList = 'card-body';
        cardImg.classList = 'image card-img-top';

        cardBody2.classList = 'card-body text-center';
        cardHeading.classList = 'card-title';
        cardPara.classList = 'card-text';
        cardFooter.classList = 'card-footer w-100 text-center';
        cardBtn.classList = 'addCart btn';

        //// set attributes to elements
        cardImg.setAttribute('src', `${ele.image}`);
        cardImg.setAttribute('alt', `${ele.title}`);
        cardImg.setAttribute('title', `${ele.title}`);

        //// Add-to-cart function
        function addToCart(img, id, title, price) {
            // alert('Product Added To Cart!!');

            dynamic_count.id = 'dynamic-count';
            dynamic_count.classList = 'cart-span';
            

            let addCartBody = document.querySelector('#addCartBody');

            let sideCartEli = addCartBody.appendChild(document.createElement('div'));
            let sideCartRow = sideCartEli.appendChild(document.createElement('div'));

            let sideCartCol4 = sideCartRow.appendChild(document.createElement('div'));
            let sideCartImg = sideCartCol4.appendChild(document.createElement('img'));

            let sideCartCol8 = sideCartRow.appendChild(document.createElement('div'));
            let sideCartBody = sideCartCol8.appendChild(document.createElement('div'));
            let sideCartTitle = sideCartBody.appendChild(document.createElement('h5'));
            let sideCartPriceDiv = sideCartBody.appendChild(document.createElement('div'));
            let sideCartPrice = sideCartPriceDiv.appendChild(document.createElement('p'));
            
            //// Remove button from cart 
            let sideCartQnt = sideCartPriceDiv.appendChild(document.createElement('div'));
            let sideCartRemove = sideCartQnt.appendChild(document.createElement('button'));
            

            
            dynamic_count.innerHTML++;
            
            //// set class lists for elements
            sideCartEli.classList = 'card mb-3';
            sideCartRow.classList = 'row g-0';

            sideCartCol4.classList = 'col-4 sideCartCol4';
            sideCartImg.classList = 'img-fluid rounded-start';
            
            sideCartCol8.classList = 'col-8';
            sideCartBody.classList = 'card-body';
            sideCartTitle.classList = 'card-title sideCartTitle';
            sideCartPriceDiv.classList = 'sideCartPriceDiv';
            sideCartPrice.classList = 'card-text cartPrice';

            sideCartQnt.classList = 'quantaty';
            sideCartRemove.classList = 'addQnt btn';

            
            //// set attributes for elements
            sideCartImg.setAttribute('src', `${img}`)
            sideCartTitle.innerHTML = title;
            sideCartPrice.innerHTML = `<span class="dollor">$</span>${price}`;
            sideCartRemove.innerHTML = 'REMOVE';
            
            //// stleing for elements
            sideCartEli.style.maxWidth = '540px';

            sideCartTotal.style.textAlign = 'center';
            cartTotalPriceGet.style.display = 'inline';
            
            //// find total price 
            myTotal = myTotal + ele.price;
            sideCartTotalPrice.innerHTML = `Total Price: <span class="dollor"> $</span>${myTotal}`;

            //// remove one by one items, for remove button from cart -- on click event
            sideCartRemove.addEventListener('click', () => {
                //// remove one by one items on click to check-out button
                sideCartEli.remove();
                dynamic_count.innerHTML--;
                myTotal -= ele.price;
                sideCartTotalPrice.innerHTML = `Total Price: <span class="dollor"> $</span>${myTotal}`;
            });
            
            //// set value for check-out button
            cartTotalPriceGet.innerHTML = 'CHECK OUT';
            
            //// remove all items, for check-out button from cart -- on click event
            cartTotalPriceGet.addEventListener('click', () => {
                //// check condition for dynamic-count to see alert
                if (dynamic_count.innerHTML != 0) {
                    alert(`Your Products has been placed successfully! :) Total Price: $${myTotal}`);
                }

                //// remove all items on click to check-out button
                sideCartEli.remove();
                dynamic_count.innerHTML = 0;
                cartTotalPriceGet.style.display = 'none';
                sideCartTotalPrice.innerHTML = "Empty cart";
            })
        };
        //// call the ---> addToCart() function on click to add-to-cart button 
        cardBtn.addEventListener('click', () => addToCart(ele.image, ele.id, ele.title, ele.price));
    });

}
//// call the main ---> getData() function
getData();
