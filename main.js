function storeEmail() {
  let email = document.getElementById('mail').value
  let emailSavedOnLocalStorage = localStorage.getItem('userEmail')

  if (emailSavedOnLocalStorage === email) {
    alert('Email já cadastrado')
    return
  }

  localStorage.setItem('userEmail', email)
  alert('Email Cadastrado com Sucesso!')
}

function showCartItems() {
  $('#cart').removeClass('hide-cart-items')
  $('#cart').addClass('show-cart-items')
}
function hideCartItems() {
  $('#cart').removeClass('show-cart-items')
  $('#cart').addClass('hide-cart-items')
}
let carrinho = {}
function addToCart(id, name, price) {
  console.log(id)
  console.log(name)
  console.log(price)
  carrinho[id] = {
    name: name,
    value: price
  }
  console.log(Object.keys(carrinho).length)
  drawCart()
  checkDisabledItem()
}

function drawCart() {
  let carrinhoInArray = Object.entries(carrinho)
  $('.cart-item').remove()
  $('.items-count').remove()
  
  carrinhoInArray.map(item => {
    addItemToCart(item[1].name, item[1].value, item[0])
  })
  $('#carrinho').append(`<p style="font-size:14px; text-align: center; border-radius: 50%; color: white; background-color: #FB0B4A; padding: 1px 3px 0px 2px;" class="items-count">${Object.keys(carrinho).length || ''}</p>`)
}

function modalDrawItems(itemName, itemValue) {
  return `
  <div class="cart-item-purchase">
    <div class="cart-item-description">
      <div><strong>${itemName}</strong></div>
      <div style="margin-top: 12px">Valor do Item: R$ ${itemValue}</div>
    </div>
  </div>
  `
}

function drawCartItems() {
  // let carrinhoFromLocalStorage = localStorage.getItem('cart')
  let carrinhoInArray = Object.entries(carrinho)
  let totalPrice = 0
  carrinhoInArray.map(item => {
    console.log(item[1])
    totalPrice = Number(totalPrice) + Number(item[1].value);
    $('#modal-purchase-items').append(modalDrawItems(item[1].name, item[1].value))
  })
  $('#total-price').append('R$ ' + totalPrice)
}

function checkDisabledItem() {
  let carrinhoInArray = Object.entries(carrinho)
  carrinhoInArray.map(item => {
    console.log("XCXCXCXCXC",item[0])
    $('#' + item[0]).addClass('disable-item-button')
  })
}


function addItemToCart(itemName, itemValue, itemKey) {
  let element = `
  <div class="cart-item">
    <div class="cart-item-description">
      <div>${itemName}</div>
      <div style="margin-bottom: 12px">R$ ${itemValue}</div>
    </div>
    <div style="display: flex;">
      <div id="remove" onclick="removeItem('${itemKey}')" class="control-quantity">Remover</div>
    </div>
  </div>
  `
  $('#cart').append(element)
}

function removeItem(itemKey) {
  delete carrinho[itemKey]
  console.log("BLA BLA BLA", carrinho)
  drawCart()
  $('#' + itemKey).removeClass('disable-item-button')
}

// When the user clicks on <span> (x), close the modal
function closeModal() {
  modal.style.display = "none";
  $('.cart-item-purchase').remove()
  $('#total-price').text('')
}

// When the user clicks the button, open the modal 
function openModal() {
  modal.style.display = "block";
  drawCartItems()
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal()
  }
}