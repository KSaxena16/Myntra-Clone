fetch("https://run.mocky.io/v3/bf175661-5e9f-4112-8580-d587759ff72e")
  .then((response) => response.json())
  .then((data) => data.products)
  .then((data) => {
    productDetails(data);
    filterData(data);
    CategoryData(data);
    radioFilter(data);
    saveGlobalData(data);
  });
  var globalData = [];
  const saveGlobalData = (data) => {
    globalData = data;
  };


const productDetails = (data) => {
  // console.log(data)
  var row = document.getElementById("productRow");
  row.innerHTML = "";
  data.forEach((element) => {
    //console.log(element);
    var newDiv = document.createElement("div");
    newDiv.classList.add("col-md-3", "col-6", "mb-3");
    var thumbnailDiv = document.createElement("div");
    thumbnailDiv.classList.add("thumbnail");
    var img = document.createElement("img");
    img.src = `${element.searchImage}`;
    var productMetaInfo = document.createElement("div");
    img.classList.add("w-100");
    productMetaInfo.classList.add("productMetaData");
    var heading = document.createElement("h6");
    heading.classList.add("mb-0");
    var content = document.createTextNode(`${element.brand}`);
    var paragraph = document.createElement("p");
    var paragraphContent = document.createTextNode(`${element.additionalInfo}`);
    paragraph.classList.add("mb-0");
    var span = document.createElement("span");
    var ProductPriceInfo = document.createTextNode(`${element.mrp}`);
    span.classList.add("font-weight-bold");
    //  <img src="images/image1.jpg" alt="Lights" class="rounded" style="width:100%">
    row.appendChild(newDiv);
    newDiv.appendChild(thumbnailDiv);
    thumbnailDiv.appendChild(img);
    thumbnailDiv.appendChild(productMetaInfo);
    productMetaInfo.appendChild(heading);
    heading.appendChild(content);
    productMetaInfo.appendChild(paragraph);
    paragraph.appendChild(paragraphContent);
    productMetaInfo.appendChild(span);
    span.appendChild(ProductPriceInfo);
  });
};

const filterData = (data) => {
  let myarray = [];
  var container = document.getElementById("mainFilter");
  container.classList.add("ml-4");
  data.forEach((element) => {
    myarray.push(`${element.gender}`);
  });
  var arr = new Set(myarray);

  arr.forEach((element) => {
    var div = document.createElement("div");
    var input = document.createElement("input");
    var label = document.createElement("label");
    var labelData = document.createTextNode(`${element}`);
    //label.classList.add("ml-4");
    div.setAttribute("class", "form-check-label");
    input.setAttribute("type", "radio");
    input.setAttribute("class", "form-check-input");
    input.setAttribute("name", "optradio");
    input.setAttribute("onclick", "radioFilter()");
    input.setAttribute("value", `${element}`);
    input.setAttribute("id", `${element}`);
    label.setAttribute("for", `${element}`);
    container.appendChild(div);
    div.appendChild(input);
    div.appendChild(label);
    label.appendChild(labelData);
  });
};

const radioFilter = () => {
  var radioFilter2 = globalData;
  var elements = document.getElementsByName("optradio");
  //console.log(elements);
  var checkedButton;
  elements.forEach((e) => {
    if (e.checked) {
      //if radio button is checked, set sort style
      checkedButton = e.value;
      var data = radioFilter2.filter(
        (filterData) => filterData.gender === checkedButton
      );
      console.log(data);
      productDetails(data);
    }
  });
};

const CategoryData = (data) => {
  let categoryArray = [];
  var categoryContainer = document.getElementById("category");
  data.forEach((element) => {
    categoryArray.push(`${element.category}`);
  });

  var newArray = new Set(categoryArray);
  newArray.forEach((element) => {
    var categorydiv = document.createElement("div");
    var categoryinput = document.createElement("input");
    var categorylabel = document.createElement("label");
    var categorylabeldata = document.createTextNode(`${element}`);
    categorylabel.classList.add("ml-2");
    categorydiv.setAttribute("class", "form-check-label");
    categoryinput.setAttribute("type", "checkbox");
    categoryinput.setAttribute("name", "checkcat");
    categoryinput.setAttribute("onclick", "checkBoxFilter()");
    categoryinput.setAttribute("class", "form-check-label");
    categoryinput.setAttribute("id", `${element}`);
    categoryinput.setAttribute("value", `${element}`);
    categorylabel.setAttribute("for", `${element}`);

    categoryContainer.appendChild(categorydiv);
    categorydiv.appendChild(categoryinput);
    categorydiv.appendChild(categorylabel);
    categorylabel.appendChild(categorylabeldata);
  });
};

const checkBoxFilter = () => {
  var checkboxData = globalData;

  var myArr = new Array();
  var inputChk = document.querySelectorAll('input[name="checkcat"]');
  for (var i = 0; i < inputChk.length; i++) {
    if (inputChk[i].checked) {
      myArr.push(inputChk[i].value);
    }
  }

  var filterCategory = [];
  myArr.forEach((val) => {
    filterCategory = filterCategory.concat(
      checkboxData.filter((checkData) => checkData.category === val)
    );
  });
  productDetails(filterCategory);
};

const searchProduct = () => {
  let input = document.getElementById("search").value;
  var searchArr = [];

  searchArr = globalData.filter(
    (searchdata) =>
      searchdata.category.toLowerCase().includes(input.toLowerCase()) ||
      searchdata.gender.toLowerCase().includes(input.toLowerCase()) ||
      searchdata.brand.toLowerCase().includes(input.toLowerCase())
  );
  productDetails(searchArr);
};
