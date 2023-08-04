const cartBtn=document.getElementById('cart-icon');
const cart=document.querySelector('.cart');
const closeCartBtn=document.getElementById('close-cart');
const placeOrder=document.querySelector('.place-order');

let productList=[];

cartBtn.addEventListener('click',()=>{
    cart.classList.add('cart-active');
})

closeCartBtn.addEventListener('click',()=>{
    cart.classList.remove('cart-active');
})

let addToCartBtn=document.querySelectorAll('.add-cart');
    addToCartBtn.forEach((btn)=>{
        btn.addEventListener('click',addProduct);
    })
document.addEventListener('DOMContentLoaded',showProduct)

function showProduct(){
    showContent();
}

function showContent(){
    
    //delete
    let removeBtn=document.querySelectorAll('.remove');
    removeBtn.forEach((btn)=>{
        btn.addEventListener('click',removeProduct);
    })

    //quantity
    let productQty=document.querySelectorAll('.product-qty');
    productQty.forEach((qty)=>{
        qty.addEventListener('change',productQuantity);
    })
    

    updateTotal();
    

}

function removeProduct(){
    let productTitle=this.parentElement.querySelector('.product-title').innerHTML;
    productList=productList.filter((data)=> data.productTitle != productTitle);
    this.parentElement.remove();
    showContent();
}

function productQuantity(){
    if(isNaN(this.value) || this.value<1){
        this.value=1;
    }
    showContent();
}

function addProduct(){
    let productToy=this.parentElement;
    let productTitle=productToy.querySelector('.card-title').innerHTML;
    let productPrice=productToy.querySelector('.card-text').innerHTML;
    let productImg=productToy.querySelector('.card-img-top').src;

    let newProduct={productTitle,productPrice,productImg};

    if(productList.find((data)=>data.productTitle==newProduct.productTitle)){
     alert("Product already added");
     return;
    }else{
     productList.push(newProduct);
    }
    let addNewProductToCart=newProductToCart(productTitle,productPrice,productImg);
    let newElement=document.createElement('div')
    newElement.className='cartProducts'
    newElement.innerHTML=addNewProductToCart;
    let cartContent=document.querySelector('.cart-content');
    cartContent.appendChild(newElement);
    showContent();
    
    

}

function newProductToCart(title,price,image){
    return `<div class="product-box">
            <img src="${image}" class="cart-img">
            <div class="product-detail">
                <div class="product-title fw-bold">${title}</div>
                <div class="price-box d-flex justify-content-between">
                    <div class="product-price">${price}</div>
                    <div class="price-total">${price}</div>
                </div>                            
            <input type="number" id="product-qty" class="product-qty" value="1">
            </div>
             <i class='remove bx bxs-trash'></i>
            </div>`
}


function updateTotal(){
    let cartBox=document.querySelectorAll('.product-box');
    let totalPrice=document.querySelector('.total-price-amount');
    let total=0;
    cartBox.forEach(product=>{
        let productPrice=product.querySelector('.product-price');
        let price=parseFloat(productPrice.innerHTML.replace('₹',""));
        let qty=product.querySelector('.product-qty').value;
        total+=(price*qty);
        product.querySelector('.price-total').innerText='₹' + price*qty;
    });
    totalPrice.innerText='₹'+total;
}



placeOrder.addEventListener('click',()=>{
    alert("Order Placed");
    let cartContent=document.querySelector('.cart-content');
   
    let cartProducts=cartContent.querySelectorAll('.cartProducts');
    cartProducts.forEach(element=>{ 
        cartContent.removeChild(element);
    })
   
    productList.splice(0,productList.length);
    updateTotal();
})








