const products = [
	{ name: 'Véda', price: 100, image: 'images/jewelry_1.jpg' },
	{ name: 'Emberlyn', price: 180, image: 'images/jewelry_2.jpg' },
	{ name: 'Dewdrop', price: 200, image: 'images/jewelry_3.jpg' },
	{ name: 'Aurumé', price: 300, image: 'images/jewelry_4.jpg' },
	{ name: 'Celestia', price: 170, image: 'images/jewelry_5.jpg' },
	{ name: 'Lustrella', price: 210, image: 'images/jewelry_6.jpg' },
	{ name: 'Solstice', price: 430, image: 'images/jewelry_7.jpg' },
	{ name: 'Eterna', price: 190, image: 'images/jewelry_8.jpg' },
]

const productContainer = document.querySelector('.product-content')

products.forEach((product) => {
	const productBox = document.createElement('div')
	productBox.classList.add('product-box')

	productBox.innerHTML = `
            <div class="img-box">
                <img src="${product.image}" alt="product image" />
            </div>
            <h2 class="product-title">${product.name}</h2>
            <div class="price-cart">
                <span class="price">$${product.price}</span>
                <i class="ri-shopping-bag-line add-cart"></i>
            </div>
        `

	productContainer.appendChild(productBox)
})
