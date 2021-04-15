// Variables from DOM:

const mealPlace = document.querySelector("#random-meal");
const mealName = document.querySelector(".meal-name");
const mealImg = document.querySelector(".meal-img");
const mealCat = document.querySelector(".meal-categ");
const mealCuisine = document.querySelector(".meal-cuisine");
const mealIngred = document.querySelector(".meal-ingred");
const mealInstucions = document.querySelector(".meal-instructions");
const btn = document.querySelector(".meal-btn");

const img = document.createElement('IMG');

let ingredients = [];

// Function that accepts Random meal API and generates response:

function generateMeal() {
	fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then((res) => res.json())
		.then((data) => {
			// Generates image from API:
			img.setAttribute("src", data.meals[0].strMealThumb);
			mealImg.appendChild(img);

			mealName.innerHTML = data.meals[0].strMeal
			mealCat.innerHTML += data.meals[0].strCategory
			mealCuisine.innerHTML += data.meals[0].strArea;
			mealInstucions.innerHTML = data.meals[0].strInstructions
		})
}

// Generates ingredients from the Object to the new array:

function generateIngredients(){
	fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then((res) => res.json())
		.then((data) => {
			let vals = Object.values(data.meals[0]);
			Object.keys(data.meals[0]).forEach ((key, i) => {
				if (key.startsWith("strIngred")) {
					ingredients.push(vals[i]);
				};
			})
			printIngredients(ingredients);
			console.log(data)
		})
}

// Creating ingredients list to HTML:

function printIngredients(arr) {
	//Creating list element:
	let list = document.createElement('ul');

	for (let i = 0; i < arr.length; i++) {
		if(arr[i]){
			let item = document.createElement('li');
			item.appendChild(document.createTextNode(arr[i]));
			list.appendChild(item);
		}
	}
	mealIngred.appendChild(list);
}


// Generates meal and ingredients immediately:
generateMeal();
generateIngredients();
printIngredients(ingredients);

// Generates meal when the button is pressed:
btn.addEventListener('click', function() {
	generateMeal();
	ingredients = [];
	mealIngred.innerHTML = "";
	generateIngredients();
	printIngredients(ingredients);
});

