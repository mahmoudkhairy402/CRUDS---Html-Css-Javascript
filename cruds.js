let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let searchtitle = document.getElementById("searchtitlebtn");
let creatmood = "create";

let temp;
function gettotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value; ///inputs valus is always string ..it must be turned to num by +
    total.innerHTML = result;
    total.style.background = "red";
  } else {
    total.innerHTML = "";
    total.style.background = "#337e11";
  }
}

let productsArr; /// الارراي بتاعتي
if (localStorage.data != null) {
  productsArr = JSON.parse(localStorage.getItem("data"));
} else {
  productsArr = [];
}

submit.onclick = function () {
  let product = {
    title: title.value.toLowerCase(), //عشان ال search
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(), //عشان ال search
  };

  if (title.value != "" && price.value != "" && count.value <= 100) {
    if (creatmood === "create") {
      if (product.count > 1) {
        for (let i = 0; i < product.count; i++) {
          productsArr.push(product);
        }
      } else {
        productsArr.push(product);
      }
    } else {
      productsArr[temp] = product;
      creatmood = "create";
      submit.innerText = "Creat";
      count.style.display = "block";
    }
    clearData();
  }

  localStorage.setItem("data", JSON.stringify(productsArr));
  showData();
};

function clearData() {
  //كنت عاملها بنفس الطريقه ومشتغلتش وحسبي الله ونعم الوكيل
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

function showData() {
  let row = "";
  for (let i = 0; i < productsArr.length; i++) {
    row += `
        <tr>
        <td>${i}</td>
        <td>${productsArr[i].title}</td>
        <td>${productsArr[i].price}</td>
        <td>${productsArr[i].taxes}</td>
        <td>${productsArr[i].ads}</td>
        <td>${productsArr[i].discount}</td>
        <td>${productsArr[i].total}</td>
        <td>${productsArr[i].category}</td>
        <td><button onclick="updateRow(${i})" id="update">update</button></td>
        <td><button onclick="deleteRow(${i})" id="delete">delete</button></td>
        </tr>
       `;
  }
  document.getElementById("tbody").innerHTML = row;
  let DeletAlleBtn = document.getElementById("deletallebtn");
  if (productsArr.length > 0) {
    DeletAlleBtn.innerHTML = `
       <button onclick="deleteAll()">Delete All (${productsArr.length})</button>
         `;
  } else {
    DeletAlleBtn.innerHTML = "";
  }
}

showData();

function deleteRow(i) {
  productsArr.splice(i, 1);
  localStorage.data = JSON.stringify(productsArr);
  showData();
}

function updateRow(i) {
  title.value = productsArr[i].title;
  price.value = productsArr[i].price;
  taxes.value = productsArr[i].taxes;
  ads.value = productsArr[i].ads;
  discount.value = productsArr[i].discount;
  gettotal();
  count.style.display = "none";
  category.value = productsArr[i].category;
  submit.innerHTML = "update";
  creatmood = "update";
  temp = i;
  scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

function deleteAll() {
  localStorage.clear();
  productsArr.splice(0);
  showData();
}

let searchmood = "title";

function getsearchmood(id) {
  if (id == "searchtitlebtn") {
    searchmood = "title";
  } else {
    searchmood = "category";
  }
  search.placeholder = "search by " + searchmood;
  search.focus();
}

function searchfun(value) {
  let row = "";
  for (let i = 0; i < productsArr.length; i++) {
    if (searchmood == "title") {
      if (productsArr[i].title.includes(value.toLowerCase())) {
        row += `
                <tr>
                <td>${i}</td>
                <td>${productsArr[i].title}</td>
                <td>${productsArr[i].price}</td>
                <td>${productsArr[i].taxes}</td>
                <td>${productsArr[i].ads}</td>
                <td>${productsArr[i].discount}</td>
                <td>${productsArr[i].total}</td>
                <td>${productsArr[i].category}</td>
                <td><button onclick="updateRow(${i})" id="update">update</button></td>
                <td><button onclick="deleteRow(${i})" id="delete">delete</button></td>
                </tr>
               `;
      }
    } else {
      if (productsArr[i].category.includes(value.toLowerCase())) {
        row += `
                <tr>
                <td>${i}</td>
                <td>${productsArr[i].title}</td>
                <td>${productsArr[i].price}</td>
                <td>${productsArr[i].taxes}</td>
                <td>${productsArr[i].ads}</td>
                <td>${productsArr[i].discount}</td>
                <td>${productsArr[i].total}</td>
                <td>${productsArr[i].category}</td>
                <td><button onclick="updateRow(${i})" id="update">update</button></td>
                <td><button onclick="deleteRow(${i})" id="delete">delete</button></td>
                </tr>
               `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = row;
}
