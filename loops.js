var shoppingCart = (function() {
    cart = [];
    
   
    function Item(name, price, count) {
      this.name = name;
      this.price = price;
      this.count = count;
    }
    
  
    function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    
    
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
    
    var obj = {};
    
   
    obj.addItemToCart = function(name, price, count) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count ++;
          saveCart();
          return;
        }
      }
      var item = new Item(name, price, count);
      cart.push(item);
      saveCart();
    }
  
    obj.setCountForItem = function(name, count) {
      for(var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
  
    obj.removeItemFromCart = function(name) {
        for(var item in cart) {
          if(cart[item].name === name) {
            cart[item].count --;
            if(cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    
    obj.removeItemFromCartAll = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    
    obj.clearCart = function() {
      cart = [];
      saveCart();
    }
  
    let click = document.getElementById('click');
    let result = document.getElementById('result');
    
    click.onclick = ()=>{
        Swal.fire({
            title: 'GRACIAS POR TU COMPRA!',
            text: 'En breve nos pondremos en contacto para coordinar metodo de pago y envio!',
            icon: 'success',
            confirmButtonText: 'Ok',
            position: 'center',
    })
    
    }
  
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
  
    
    obj.totalCart = function() {
      var totalCart = 0;
      for(var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }
  
 
    obj.listCart = function() {
      var cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
  
    return obj;
  })();
  

  $('.add-to-cart').click(function(event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });
  
  $('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
  });
  
  
  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for(var i in cartArray) {
      output += "<tr>"
        + "<td>" + cartArray[i].name + "</td>" 
        + "<td>(" + cartArray[i].price + ")</td>"
        + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
        + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
        + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
        + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
        + " = " 
        + "<td>" + cartArray[i].total + "</td>" 
        +  "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
  }
  
  $('.show-cart').on("click", ".delete-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })
  
  
  $('.show-cart').on("click", ".minus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
  })
  
  $('.show-cart').on("click", ".plus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
  })
  
 
  $('.show-cart').on("change", ".item-count", function(event) {
     var name = $(this).data('name');
     var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
  
  displayCart();
  

const userInput = document.querySelector(".user-input");
const userMsg = document.querySelector(".user-msg");

const passInput = document.querySelector(".pass-input");
const passMsg = document.querySelector(".pass-msg");

const loginBtn = document.querySelector(".login-btn");
const loginMsg = document.querySelector(".login-msg");


loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  
  const userValue = userInput.value;
  const passValue = passInput.value;
  let ifSendData = true;
  
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i.test(userValue)) {
    userMsg.innerText = "Porfavor ingresa un email valido";
    userMsg.classList.add("invalid");
    ifSendData = false;
  } else {
    userMsg.innerText = "";
    userMsg.classList.remove("invalid");
    ifSendData = true;
  }
  
  if (passValue.length === 0) {
    passMsg.innerText = "Porfavor ingresa una contraseña";
    passMsg.classList.add("invalid");
    ifSendData = false;
  } else if (passValue.startsWith(" ")) {
    passMsg.innerText = "Password cant start with space !";
    passMsg.classList.add("invalid");
    ifSendData = false;
  } else if (passValue.length < 6) {
    passMsg.innerText = "La contraseña es muy corta";
    passMsg.classList.add("invalid");
    ifSendData = false;
  } else {
    passMsg.innerText = "";
    passMsg.classList.remove("invalid");
  }
  
  if (userValue == passValue) {
    alert("Email y contraseñ no pueden ser iguales");
    ifSendData = false;
  }
 
  if (ifSendData) {
    const body = JSON.stringify({
      Username: userValue,
      Password: passValue,
    });
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
    };
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "Post",
      body: body,
      headers: headers,
    }).then((response) => {
      if (response.ok) {
        loginMsg.innerText = "You Signed in successfully";
        loginMsg.classList.add("valid");
      }
    });
  }
});

