const urlParams = new URLSearchParams(window.location.search);
asset_img_url = "https://storage.googleapis.com/assets-organica/";

// Access individual parameters
const id = urlParams.get("id");

async function getProduct() {
  var res = await fetch("http://127.0.0.1:3000/api/product/" + id);
  var data = await res.json();
  var product = data[0];
//   console.log(product);
  var hero = document.getElementsByClassName("page-title");
  hero[0].innerHTML = product.pdt_name;

  var cat;
  if (product.pdt_ctg == 1) {
    cat = "Apple";
  } else if (product.pdt_ctg == 2) {
    cat = "Banana";
  } else if (product.pdt_ctg == 3) {
    cat = "Grapes";
  } else if (product.pdt_ctg == 4) {
    cat = "Oranges";
  } else {
    cat = "Coconut";
  }

  var nav = document.getElementsByClassName("current-page");
  nav[0].innerHTML = cat;
  nav[1].innerHTML = product.pdt_name;

  var img = document.getElementById("img-single");
  img.src = asset_img_url + product.pdt_img;

  var title = document.getElementById("title");
  title.innerHTML = product.pdt_name;

  var cat_name = document.getElementsByClassName("category");
  cat_name[0].innerHTML = cat;

  var sku = document.getElementById("sku");
  sku.innerHTML = "SKU: " + product.pdt_id;

  var stock = document.getElementsByClassName("stock");
  stock[0].innerHTML = "Stock : " + product.product_stock;

  var excerpt = document.getElementsByClassName("excerpt");
  excerpt[0].innerHTML = product.pdt_des;

  var price = document.getElementsByClassName("price-amount");
  price[0].innerHTML =
    '<span class="currencySymbol">Tk. </span>' + product.pdt_price;

  var price2 = document.getElementById("checkout-price");
  price2.innerHTML = "Tk. " + product.pdt_price;

  var btn_id = document.getElementsByName("pdt_id");
  btn_id[0].value = product.pdt_id;

  var btn_name = document.getElementsByName("pdt_name");
  btn_name[0].value = product.pdt_name;

  var btn_price = document.getElementsByName("pdt_price");
  btn_price[0].value = product.pdt_price;

  var btn_img = document.getElementsByName("pdt_img");
  btn_img[0].value = product.pdt_img;
  //   console.log(data);
}
getProduct();
