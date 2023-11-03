// var region = "us-east-1";
// var accessKeyId = "AKIA5JJEG33UHL2T5BSJ";
// var secretAccessKey = "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";

// AWS.config.update({
//   region: region,
//   credentials: new AWS.Credentials(accessKeyId, secretAccessKey),
// });

// var s3 = new AWS.S3();

// function refreshList(bucketname) {
//   s3.listObjectsV2({ Bucket: bucketname }, (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//     }
//   });
// }

// refreshList("mynewbucket2711");
asset_img_url = "https://storage.googleapis.com/assets-organica/";
btn = document.getElementById("register-button");

async function getSlider() {
  var res = await fetch("http://127.0.0.1:3000/api/slider");
  var data = await res.json();
  const carousel = document.getElementById("slider-carousel");
  data.forEach((item) => {
    var string =
      `<li>
      <div
        class="slide-contain slider-opt03__layout02 slide_animation type_02"
      >
        <div
          class="media background-geen-01"
          style="
            background-image: url('` +
      asset_img_url +
      item.slider_img +
      `');
          "
        ></div>
        <div class="text-content">
          <i class="first-line">` +
      item.first_line +
      `</i>
          <h3 class="second-line">` +
      item.second_line +
      `</h3>
          <p class="third-line">
          ` +
      item.third_line +
      `
          </p>
          <p class="buttons">
            <a href="" class="btn btn-bold"
              >` +
      item.btn_left +
      `</a
            >
            <a href="#" class="btn btn-thin">` +
      item.btn_right +
      `</a>
          </p>
        </div>
      </div></li>`;
    carousel.innerHTML = string;
  });
}

async function getBanner() {
  var res = await fetch("http://127.0.0.1:3000/api/banner");
  var data = await res.json();
  const carousel = document.getElementById("banner-carousel");

  var string = `<ul
  class="biolife-carousel dots_ring_style"
  data-slick='{"arrows": false, "dots": true, "slidesMargin": 30, "slidesToShow": 1, "infinite": true, "speed": 800, "responsive":[{"breakpoint":1200, "settings":{ "slidesToShow": 1}},{"breakpoint":768, "settings":{ "slidesToShow": 2, "slidesMargin":20, "dots": false}},{"breakpoint":480, "settings":{ "slidesToShow": 1}}]}'>`;

  data.forEach((item) => {
    string +=
      `<li>
      <div class="slide-contain biolife-banner__special">
        <div class="banner-contain">
          <div class="media">
            <a
              href=""
              class="bn-link"
            >
              <figure>
                <img
                id="img-tag"
                  src="` +
      asset_img_url +
      item.pdt_img +
      `"
                  width="616"
                  height="483"
                  alt=""
                />
              </figure>
            </a>
          </div>
          <a href="">
            <div class="text-content">
              <b class="first-line">Special Items</b>
              <span class="second-line">` +
      item.pdt_name +
      `</span>

              <div class="product-detail">
                <div class="price price-contain">
                  <ins
                    ><span class="price-amount"
                      ><span class="currencySymbol">TK. </span
                      >` +
      item.pdt_price +
      `</span
                    ></ins
                  >
                </div>

                <h4 class="product-name">
                ` +
      item.pdt_des +
      `
                </h4>
              </div>
            </div>
          </a>
        </div>
      </div>
    </li>`;
    // console.log(string);
    // carousel.insertAdjacentHTML('afterbegin', string);
  });
  string += `</ul>`;
  carousel.innerHTML += string;
}

async function getApple() {
  var res = await fetch("http://127.0.0.1:3000/api/products/1");
  var data = await res.json();
  const apple = document.getElementById("tab01_1st");

  var string = `<ul
  class="products-list biolife-carousel nav-center-02 nav-none-on-mobile eq-height-contain"
  data-slick='{"rows":2 ,"arrows":true,"dots":false,"infinite":true,"speed":400,"slidesMargin":10,"slidesToShow":4, "responsive":[{"breakpoint":1200, "settings":{ "slidesToShow": 4}},{"breakpoint":992, "settings":{ "slidesToShow": 3, "slidesMargin":20}},{"breakpoint":768, "settings":{ "slidesToShow": 2, "slidesMargin":15}}]}'>`;

  data.forEach((item) => {
    string +=
      `<li class="product-item">
      <div class="contain-product layout-default">
        <div class="product-thumb">
          <a
            href="single_product.php?status=singleproduct&&id=1"
            class="link-to-product"
          >
            <img
              src="` +
      asset_img_url +
      item.pdt_img +
      `"
              alt="Vegetables"
              width="270"
              height="270"
              class="product-thumnail"
            />
          </a>
          <a class="lookup btn_call_quickview" href="#"
            ><i class="biolife-icon icon-search"></i
          ></a>
        </div>
        <div class="info">
          <b class="categories">Apple</b>
          <h4 class="product-title">
            <a
              href="single_product.php?status=singleproduct&&id=1"
              class="pr-name"
              >` +
      item.pdt_name +
      `</a
            >
          </h4>
          <div class="price">
            <ins
              ><span class="price-amount"
                ><span class="currencySymbol">TK. </span
                >` +
      item.pdt_price +
      `</span
              ></ins
            >
          </div>
          <div class="slide-down-box">
            <p class="message">
              All products are carefully selected to ensure food
              safety.
            </p>
          </div>
        </div>
      </div>
    </li>`;
    // console.log(string);
    carousel.insertAdjacentHTML("afterbegin", string);
  });
  string += `</ul>`;
  // console.log(string);
  apple.insertAdjacentHTML("afterbegin", string);
}

async function getAllProducts() {
  var res = await fetch("http://127.0.0.1:3000/api/products");
  var data = await res.json();
  // console.log(data);
  var p = document.getElementsByClassName("products-list");
  data.forEach((item) => {
    var cat;
    if(item.pdt_ctg==1){
      cat = "Apple"
    }
    else if(item.pdt_ctg==2){
      cat = "Banana"
    }
    else if(item.pdt_ctg==3){
      cat = "Grapes"
    }
    else if(item.pdt_ctg==4){
      cat = "Oranges"
    }
    else{
      cat = "Coconut"
    }
    var string = `<li class="product-item col-lg-3 col-md-3 col-sm-4 col-xs-6">
      <div class="contain-product layout-default">
        <div class="product-thumb">
          <a
            href="single_product.php?status=singleproduct&&id=`+item.pdt_id+`"
            class="link-to-product"
          >
            <img
              src="`+asset_img_url+item.pdt_img+`"
              alt="dd"
              width="270"
              height="270"
              class="product-thumnail"
            />
          </a>
        </div>
        <div class="info">
          <b class="categories">
          `+cat+`
          </b>

          <h4 class="product-title">
            <a
              href="single_product.php?status=singleproduct&&id=1"
              class="pr-name"
              >`+item.pdt_name+`</a
            >
          </h4>
          <div class="price">
            <ins
              ><span class="price-amount"
                ><span class="currencySymbol">Tk. </span
                >`+item.pdt_price+`</span
              ></ins
            >
          </div>
          <div class="shipping-info">
            <p class="shipping-day">3-Day Shipping</p>
            <p class="for-today">Pree Pickup Today</p>
          </div>
          <div class="slide-down-box">
            <p class="message">
              All products are carefully selected to ensure food
              safety.
            </p>
          </div>
        </div>
      </div>
    </li>`;
    p[0].innerHTML += string;
  });
}

function changeImage() {
  var img = document.getElementById("img-tag");
  img.src = "https://storage.googleapis.com/assets-organica/apple1.jpg"; // Set the new image URL
  img.alt = "New description"; // Optionally, you can update the alt attribute as well
}

function clearInputFields(formId) {
  const form = document.getElementById(formId);
  const inputFields = form.querySelectorAll("input");

  inputFields.forEach((input) => {
    if (input.type !== "checkbox") {
      input.value = ""; // Set the value to an empty string for text input fields
    } else {
      input.checked = false; // Uncheck checkboxes
    }
  });
}

async function addUser() {
  const url = "http://127.0.0.1:3000/api/post";
  let data = document.querySelectorAll(".form-control");
  // console.log(uname);
  var uname = data[0].value;
  var fname = data[1].value;
  var lname = data[2].value;
  var email = data[3].value;
  var password = data[4].value;
  var pnum = data[5].value;
  var address = data[6].value;

  const postData = {
    uname: uname,
    fname: fname,
    lname: lname,
    email: email,
    password: password,
    pnum: pnum,
    address: address,
  };
  const requestOptions = {
    method: "POST", // HTTP method
    headers: {
      "Content-Type": "application/json", // Content type for JSON data
    },
    body: JSON.stringify(postData), // Convert the data to JSON format
  };
  var res = await fetch(url, requestOptions);
  var result = await res.json();
  // console.log(result);
  if (result.message == "success") {
    toastr.success("Registered successfully!");
  } else toastr.error("Some error occurred, please try again!");

  clearInputFields("form-register");
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function login() {
  const url = "http://127.0.0.1:3000/api/login";
  let data = document.querySelectorAll(".form-control");
  var email = data[0].value;
  var password = data[1].value;

  const postData = {
    email: email,
  };
  const requestOptions = {
    method: "POST", // HTTP method
    headers: {
      "Content-Type": "application/json", // Content type for JSON data
    },
    body: JSON.stringify(postData), // Convert the data to JSON format
  };
  var res = await fetch(url, requestOptions);
  var result = await res.json();
  if (result.message == "success") {
    if (password == result.password) {
      toastr.success("Logged in successfully!");
      clearInputFields("form-login");
      await delay(2000);
      window.location.href = "/index1.html";
    } else {
      toastr.error("Incorrect Password!");
    }
  } else {
    toastr.error("Email is not registered!");
  }
}

getAllProducts();
// getBanner();
// getApple();
// const btn = document.querySelector("#register-button");
// btn.addEventListener("click", async () => {
//   // console.log("hello");
//   addUser();
// });
