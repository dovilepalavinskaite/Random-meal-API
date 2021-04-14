// Variables from DOM:

const mealPlace = document.querySelector("#random-meal");
const mealName = document.querySelector(".meal-name");
const mealImg = document.querySelector(".meal-img");
const mealCat = document.querySelector(".meal-categ");
const mealInstucions = document.querySelector(".meal-instructions");
const btn = document.querySelector(".meal-btn");

const img = document.createElement('IMG');

const ingredients = [];

// Function that accepts Random meal API and generates response:

function generateMeal() {
	fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then((res) => res.json())
		.then((data) => {
			// Generates image from API:
			img.setAttribute("src", data.meals[0].strMealThumb);
			mealImg.appendChild(img);

			mealName.innerHTML = data.meals[0].strMeal
			mealCat.innerHTML = data.meals[0].strCategory
			mealInstucions.innerHTML = data.meals[0].strInstructions
		

		})
}



// Generates meal immediately:
generateMeal();

// Generates meal when the button is pressed:
btn.addEventListener('click', generateMeal);