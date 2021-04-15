
// Variables from DOM:
const mealName = document.querySelector(".meal-name");
const mealImg = document.querySelector(".meal-img");
const mealCat = document.querySelector(".meal-categ");
const mealCuisine = document.querySelector(".meal-cuisine");
const mealIngred = document.querySelector(".meal-ingred");
const mealInstucions = document.querySelector(".meal-instructions");
const mealProportions = document.querySelector(".meal-proportions");
const btn = document.querySelector(".meal-btn");

const img = document.createElement('IMG');

// Empty array for ingredients:
let ingredients = [];
let proportions = [];

// Function that accepts Random meal API and generates meal, ingredients, description and
// cooking steps:
async function generateMeal(){
	const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		const data = await res.json()

		// Generates ingredients:
		let vals = Object.values(data.meals[0]);
		Object.keys(data.meals[0]).forEach ((key, i) => {
			if (key.startsWith("strIngred")) {
				ingredients.push(vals[i]);
			}
		});

		// Generates proportions for each ingredient:
		Object.keys(data.meals[0]).forEach ((key, i) => {
			if (key.startsWith("strMeas")) {
				proportions.push(vals[i]);
			}
		});
		printIngredients(ingredients);
		printProportions(proportions);
		img.setAttribute("src", data.meals[0].strMealThumb);
		mealImg.appendChild(img);

		// Inserts data into HTML:
		mealName.innerHTML = data.meals[0].strMeal;
		mealCat.innerHTML += data.meals[0].strCategory;
		mealCuisine.innerHTML += data.meals[0].strArea;
		mealInstucions.innerHTML = data.meals[0].strInstructions;
	
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

function printProportions(arr) {
	//Creating list element:
	let list = document.createElement('ul');

	for (let i = 0; i < arr.length; i++) {
		if(arr[i]){
			let item = document.createElement('li');
			item.appendChild(document.createTextNode(arr[i]));
			list.appendChild(item);
		}
	}
	mealProportions.appendChild(list);
}


// Generates meal and ingredients immediately:
generateMeal();
printIngredients(ingredients);
printProportions(proportions);

// Generates meal when the button is pressed:
btn.addEventListener('click', function() {
	generateMeal();
	ingredients = [];
	mealIngred.innerHTML = "";
	printIngredients(ingredients);
	proportions = [];
	mealProportions.innerHTML = "";
	printProportions(proportions);
});

