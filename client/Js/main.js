
import { getAllCategory } from "./servic.js";
import { getSingleCategory } from "./servic.js";

let content_tab = document.querySelector(".content-tab");
let main_box = document.querySelector(".main-box");
let main_korzina = document.querySelector(".main-korzina");

let input = document.querySelector("input");
let search_products = document.querySelector(".search_products");

let arrData = [];

const renderProduct = async (id) => {
    
  const buttons = document.querySelectorAll(".content-tab > button");
  for (let i of buttons) {
    i.classList.remove("active_Button");
  }
  buttons.forEach((item) => {
    if (item.dataset.id == id) {
      item.classList.add("active_Button");
    }
  });
  const data = await getSingleCategory(id);

  arrData = [...data.products];
  main_box.innerHTML = data?.products
    ?.map((item) => {
      return `
        <div id=${item.id} class="bg-[#1F1D2B] w-[192px] h-[250px] relative mt-20 ml-24 rounded-lg">
            <img class="w-[149px] absolute -top-14 left-3" src=${item.img} alt="image">
            <h2 class="text-base text-white font-medium leading-[18px] pt-24 text-center p-4">${item.title}</h2>
            <p class="text-center text-base text-white font-medium leading-[18px]">$${item.price}</p>
            <p class="text-center text-base text-white font-medium leading-[18px] mt-6">${item.nimasidir}</p>
        </div>
    `;
    })
    .join("");  
};

(async () => {
  const data = await getAllCategory();
  content_tab.innerHTML += data
    .map(
      (item) =>
        `
    <button class="px-3 focus:border-b-4 focus:border-orange-500" data-id ="${item.id}">${item.category}</button> 
    `
    )
    .join("");
  renderProduct(data[0]?.id);
})();

content_tab.addEventListener("click", (e) => {
  if (e.target.dataset.id) {
    renderProduct(e.target.dataset.id);
  }
});

 main_box.addEventListener("click", (e) => {
    if (e.target.id) {
        const clickedItemId = e.target.id;
        const clickedItemData = arrData.find(item => item.id === clickedItemId);
        if (clickedItemData) {
            main_korzina.innerHTML += `<div class="flex justify-evenly items-center mt-9">
                <div>
                    <img class="w-[50px]" src=${clickedItemData.img} alt="image">
                </div>
                <div class="-ml-20">
                    <p>${clickedItemData.title}</p>
                    <p>${clickedItemData.price}</p>
                </div>
                <div class="-mr-11">
                    <span class="px-2 bg-orange-600 rounded">-</span><button class="p-1">son</button><span class="px-2 bg-orange-600 rounded">+</span>
                </div>
                <div>
                    <p>umumiy narx</p>
                </div>
            </div>`;
        }
    }
  
 });



input.addEventListener("keydown", (e) => {

  main_box.innerHTML = arrData
    ?.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    )
    ?.map(
      (item) => `
     <div id='center' class="bg-[#1F1D2B] w-[192px] h-[250px] relative mt-20 ml-24 rounded-lg">
            <img class="w-[149px] absolute -top-14 left-3" src=${item.img} alt="image">
            <h2 class="text-base text-white font-medium leading-[18px] pt-24 text-center p-4">${item.title}</h2>
            <p class="text-center text-base text-white font-medium leading-[18px]">$${item.price}</p>
            <p class="text-center text-base text-white font-medium leading-[18px] mt-6">${item.nimasidir}</p>
        </div>`
    )
    .join("");
});


