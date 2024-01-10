
import { getAllCategory } from "./servic.js";
import { getSingleCategory } from "./servic.js";

let content_tab = document.querySelector(".content-tab");
let main_box = document.querySelector(".main-box");
let input = document.querySelector(".input");
let search_products = document.querySelector(".search_products");

let arrData = [];

const renderProduct = async (id) => {
    
  const buttons = document.querySelectorAll(".content_tab > button");
  for (let i of buttons) {
    i.classList.remove("active_tab");
  }
  buttons.forEach((item) => {
    if (item.dataset.id == id) {
      item.classList.add("active_tab");
    }
  });
  const data = await getSingleCategory(id);
  console.log(data);
  arrData = [...data.products];
  main_box.innerHTML = data?.products
    ?.map((item) => {
      return `
        <div id='center' class="bg-[#1F1D2B] w-[192px] h-[250px] relative mt-20 ml-24 rounded-lg">
            <img class="w-[149px] absolute -top-14 left-3" src=${item.img} alt="image">
            <h2 class="text-base text-white font-medium leading-[18px] pt-24 text-center p-4">Spicy seasoned seafood noodles</h2>
            <p class="text-center text-base text-white font-medium leading-[18px]">$2.29</p>
            <p class="text-center text-base text-white font-medium leading-[18px] mt-6">20 Bowls available</p>
        </div>
    `;
    })
    .join("");
};

(async () => {
  const data = await getAllCategory();
  content_tab.innerHTML += data
  .map(item =>   
    `
    <button class="text-white" data-id ="${item.id}">${item.category}</button> 
    `
    ).join("");
  renderProduct(data[0]?.id);
})();

content_tab.addEventListener("click", (e) => {
  if (e.target.dataset.id) {
    renderProduct(e.target.dataset.id);
  }
});

// input.addEventListener("keydown", (e) => {
//   search_products.innerHTML = arrData
//     ?.filter((item) =>
//       item.title.toLowerCase().include(e.target.value.toLowerCase())
//     )
//     ?.map(
//       (item) => `<li>
//     <div>
//     <img width ="100" src = "${item.img}" alt = "" />
//     </div>
//     <p>${item.price}</p>
//     </li>`
//     )
//     .join("");
// });
