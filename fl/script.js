document.addEventListener('DOMContentLoaded', function() {
    const cartItemsList = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    const emptyCartBtn = document.getElementById('emptyCartBtn');
    const clearSelectedBtn = document.getElementById('clearSelected');
    const cartSection = document.getElementById('cartSection');
    const emptyCartOption = document.getElementById('emptyCartOption');
    const cartCountElement = document.getElementById('cartCount');
  
    let cart = [];
  
    // Function to update cart count
    function updateCartCount() {
      cartCountElement.textContent = cart.length;
    }
  
    // Function to calculate total price
    function calculateTotalPrice() {
      let totalPrice = 0;
      cart.forEach(item => {
        totalPrice += item.price * item.quantity;
      });
      totalPriceElement.textContent = totalPrice.toFixed(2);
    }
  
    // Function to update cart display
    function updateCart() {
      cartItemsList.innerHTML = '';
  
      cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('cart-item');
  
        const itemName = document.createElement('span');
        itemName.textContent = item.title;
        listItem.appendChild(itemName);
  
        const itemQuantity = document.createElement('span');
        itemQuantity.textContent = `Quantity: ${item.quantity}`;
        listItem.appendChild(itemQuantity);
  
        const itemPrice = document.createElement('span');
        itemPrice.textContent = `Price: $${(item.price * item.quantity).toFixed(2)}`;
        listItem.appendChild(itemPrice);
  
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function() {
          const index = cart.indexOf(item);
          if (index > -1) {
            cart.splice(index, 1);
          }
          updateCart();
          updateCartCount();
        });
        listItem.appendChild(removeButton);
  
        cartItemsList.appendChild(listItem);
      });
  
      calculateTotalPrice();
  
      if (cart.length > 0) {
        cartSection.style.display = 'block';
        emptyCartOption.style.display = 'block';
      } else {
        cartSection.style.display = 'none';
        emptyCartOption.style.display = 'none';
      }
    }
  
    // Add to Cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        const card = button.closest('.card');
        const title = card.querySelector('.card-title').textContent;
        const price = parseFloat(card.querySelector('.card-text').textContent.replace('$', ''));
        const existingItem = cart.find(item => item.title === title);
  
        if (existingItem) {
          existingItem.quantity++;
        } else {
          cart.push({ title: title, price: price, quantity: 1 });
        }
  
        updateCart();
        updateCartCount();
      });
    });
  
    // Empty Cart functionality
    emptyCartBtn.addEventListener('click', function() {
      cart = [];
      updateCart();
      updateCartCount();
    });
  
    // Clear Selected functionality
    clearSelectedBtn.addEventListener('click', function() {
      // TO DO: implement clear selected functionality
    });
  });