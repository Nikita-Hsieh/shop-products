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

//cart
const cartIcon = document.querySelector('#cart-icon')
const cart = document.querySelector('.cart')
const cartClose = document.querySelector('#cart-close')

cartIcon.addEventListener('click', () => cart.classList.add('active'))
cartClose.addEventListener('click', () => cart.classList.remove('active'))

const addCartButtons = document.querySelectorAll('.add-cart')
addCartButtons.forEach((button) => {
	button.addEventListener('click', (event) => {
		const productBox = event.target.closest('.product-box')
		addToCart(productBox)
	})
})

const cartContent = document.querySelector('.cart-content')

const addToCart = (productBox) => {
	const productImgSrc = productBox.querySelector('img').src
	const productTitle = productBox.querySelector('.product-title').textContent
	const productPrice = productBox.querySelector('.price').textContent

	const cartItems = cartContent.querySelectorAll('.cart-product-title')
	for (let item of cartItems) {
		if (item.textContent === productTitle) {
			alert('This item is already in the cart')
			return
		}
	}

	const cartBox = document.createElement('div')
	cartBox.classList.add('cart-box')
	cartBox.innerHTML = `
	<img src="${productImgSrc}" alt="cart image" />
				<div class="cart-detail">
					<h2 class="cart-product-title">${productTitle}</h2>
					<span class="cart-price">${productPrice}</span>
					<div class="cart-quantity">
						<button id="decrement">-</button>
						<span class="number">1</span>
						<button id="increment">+</button>
					</div>
				</div>
				<i class="ri-delete-bin-line cart-remove"></i>
	`

	cartContent.appendChild(cartBox)

	cartBox.querySelector('.cart-remove').addEventListener('click', () => {
		cartBox.remove()
		updateCartItemCount(-1)
		updateTotalPrice()
	})

	cartBox.querySelector('.cart-quantity').addEventListener('click', (event) => {
		const numberElement = cartBox.querySelector('.number')
		const decrementButton = cartBox.querySelector('#decrement')
		let quantity = numberElement.textContent

		if (event.target.id === 'decrement' && quantity > 1) {
			quantity--
			if (quantity === 1) {
				decrementButton.style.color = '#999'
			}
		} else if (event.target.id === 'increment') {
			quantity++
			decrementButton.style.color = '#333'
		}
		numberElement.textContent = quantity
		updateTotalPrice()
	})

	updateCartItemCount(1)
	updateTotalPrice()
}

// Cart Price
const updateTotalPrice = () => {
	const totalPriceElement = document.querySelector('.total-price')
	const cartBoxs = cartContent.querySelectorAll('.cart-box')
	let totalPrice = 0
	cartBoxs.forEach((cartBox) => {
		const priceElement = cartBox.querySelector('.cart-price')
		const quantityElement = cartBox.querySelector('.number')
		const price = priceElement.textContent.replace('$', '')
		const quantity = quantityElement.textContent
		totalPrice += price * quantity
	})
	totalPriceElement.textContent = `$${totalPrice}`
}

// CartIcon Badge Number
let cartItemCount = 0
const updateCartItemCount = (change) => {
	cartItemCount += change
	const cartItemCountBadge = document.querySelector('.cart-item-count')
	if (cartItemCount > 0) {
		cartItemCountBadge.style.visibility = 'visible'
		cartItemCountBadge.textContent = cartItemCount
	} else {
		cartItemCountBadge.style.visibility = 'hidden'
		cartItemCountBadge.textContent = ''
	}
}

//Buy
const buyNowButton = document.querySelector('.btn-buy')
buyNowButton.addEventListener('click', () => {
	const cartBoxs = cartContent.querySelectorAll('.cart-box')
	if (cartBoxs.length === 0) {
		alert('No item in the cart')
		return
	}
	cartBoxs.forEach((cartBox) => {
		cartBox.remove()
	})
	cartItemCount = 0
	updateCartItemCount(0)
	updateTotalPrice()
	alert('Thank you for your purchase')
})
