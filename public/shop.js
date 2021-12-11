let shopGrid = document.getElementById('shop_grid'); 
 
let xhr = new XMLHttpRequest(); 
 
xhr.open('GET','/product'); 
xhr.responseType = 'json'; 
 
xhr.onload = () => { 
    shopGrid.innerHTML = ''; 
    xhr.response.forEach((product)=>{ 
        shopGrid.innerHTML += ` 
            <div class="product"> 
                <h2>${product.name}</h2> 
                <img width="200px" src="${product.img}"> 
                <p>Description: ${product.description}</p> 
                <p><b>Price: ${product.price}</b></p> 
            </div> 
        ` 
    });  
} 
 
xhr.send();