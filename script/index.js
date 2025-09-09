
const categoryContainer = document.getElementById('categories-container')
const cardContainer = document.getElementById('card-container')

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('card-container').classList.add('hidden')
  }
  else{
     document.getElementById('card-container').classList.remove('hidden');
    document.getElementById('spinner').classList.add('hidden');
  }
}


const loadCategory = () => {
   
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then(data => {
      const categories = data.categories
      console.log(categories)
      categories.forEach(cat => {
        categoryContainer.innerHTML += `<li id="${cat.category_name}" class="pl-2 py-1 hover:bg-green-400 rounded-lg">${cat.category_name}</li>
               `});
      categoryContainer.addEventListener('click', (e) => {
        const allLi = categoryContainer.querySelectorAll('li');
        allLi.forEach(li => li.classList.remove('bg-green-700', 'text-white'));
        if (e.target.localName === 'li') {
          e.target.classList.add('bg-green-700', 'text-white');
          loadTreesByCategory(e.target.id)
        }
      });
    })
    .catch(err => {
      console.log(err)
    })
}

const loadTreesDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`

  const res = await fetch(url);
  const details = await res.json();
  displayTreeDetails(details.plants);
};
const loadTreesDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const spinner = document.getElementById("spinner");
  const detailsBox = document.getElementById("details-container");

  detailsBox.innerHTML = "";
  spinner.classList.remove("hidden");

  try {
    const res = await fetch(url);
    const details = await res.json();
    spinner.classList.add("hidden");
    displayTreeDetails(details.plants);
  } catch (error) {
    spinner.classList.add("hidden");
    detailsBox.innerHTML = `<p class="text-red-500">Failed to load details. Please try again.</p>`;
  }
};
const displayTreeDetails = (plants) => {
 
  console.log(plants);
  const detailsBox = document.getElementById('details-container');
  detailsBox.innerHTML = ` <div class="card bg-base-100 w-[380px] md:w-160  shadow-sm p-6">
            <h2 class="card-title mb-3 font-bold text-2xl">${plants.name}</h2>
            <figure>
              <img
                src="${plants.image}"
                alt=""
                class="w-[380px] h-[254px] md:max-h-100 md:w-160 rounded-lg"
              />
            </figure>
            <h1 class="my-2 font-bold">Category:<span>${plants.category}</span></h1>
            <h1><span class="mb-2 font-bold">Price:</span> ৳${plants.price}</h1>
            <p>
              <span class="font-bold">Description:</span>
             ${plants.description}
            </p>
            <div class="modal-action">
            <form method="dialog">
              <button class="btn">Close</button>
            </form>
          </div>
          </div>
          `;
  document.getElementById("Tree_modal").showModal();
};



let prevData;
const loadAddCard = async (id) => {

  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayCard(details.plants);
};

let grandTotal = 0;

const displayCard = (plant) => {
  alert(`${plant.name} added to cart!`)
  const cardBox = document.getElementById('card-aside-container');
  const total = document.getElementById('total');
  const cardDiv = document.createElement("div");

  grandTotal += plant.price;
  total.innerText = grandTotal;

  cardDiv.innerHTML += ` 
    <div class="flex items-center justify-between bg-[#f0fdf4] rounded-md p-2 mb-2">
        <div>
          <h1 class="mb-2">${plant.name}</h1>
          <p class="ml-1">৳${plant.price}</p>
        </div>
        <div>
          <span><i class="fa-solid fa-x"></i></span>
        </div>
    </div>`;
  cardDiv.dataset.price = plant.price;
  cardDiv.querySelector("span").addEventListener("click", () => {
    const price = parseInt(cardDiv.dataset.price);
    grandTotal -= price;
    total.innerText = grandTotal;
    cardDiv.remove();
  });



  cardBox.appendChild(cardDiv);
};







const loadTreesByCategory = (categoryId) => {
  manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/plants`)
    .then((res) => res.json())
    .then(data => {
      const allData = data.plants;

      cardContainer.innerHTML = "";

      const filterData = categoryId ? allData.filter(plant => plant.category === categoryId) : allData;

      filterData.forEach(plant => {
        cardContainer.innerHTML += `<div class="card h-fit bg-base-100 p-4">
                  <div>
                    <img
                      src="${plant.image}"
                      alt=""
                      class="rounded-xl w-[380px] md:w-[300px] h-[254px] md:h-[300px]"
                    />
                  </div>
                  <div class="card-body p-2">
                    <h2 onclick="loadTreesDetail(${plant.id})" class="font-semibold text-[14px] mt-2">${plant.name}</h2>
                    <p class="font-normal text-[12px] text-[#4c545f]">
                      ${plant.description}
                    </p>
                    <div class="flex justify-between items-center">
                      <button
                        class="text-[#15803d] bg-[#dcfce7] p-2 rounded-3xl w-fit"
                      >
                        ${plant.category}
                      </button>
                      <h1 class="font-semibold text-[14px]">৳<span>${plant.price}</span></h1>
                    </div>
                    <div class="card-actions">
                      <button onclick="loadAddCard(${plant.id})" 
                        class="btn bg-[#15803d] text-white w-full rounded-3xl"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>`;
      });
      manageSpinner(false);

    });
};




loadTreesByCategory();

loadCategory();








