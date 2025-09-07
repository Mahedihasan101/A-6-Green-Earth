
const categoryContainer = document.getElementById('categories-container')


const loadCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then(data => {
            console.log(data.categories
            )
            const categories = data.categories
            categories.forEach(cat => {
               categoryContainer.innerHTML += `<li class="pl-2 py-1 hover:bg-green-500 rounded-lg">${cat.category_name}</li>
               `
            });

        })
        .catch(err => {

        })
}
loadCategory()
