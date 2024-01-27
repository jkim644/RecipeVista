//buttons
const lock1Btn = document.getElementById('btn-1');
const lock2Btn = document.getElementById('btn-2');
const lock3Btn = document.getElementById('btn-3');
const spinBtn= document.querySelector('.btn-spin');
const allergyBtn= document.querySelector('.btn-allergy');
const veganBtn = document.querySelector('.btn-vegan');
const vegetarianBtn = document.querySelector('.btn-vegetarian');
const noDietBtn = document.querySelector('.btn-none');
const recipeContentBox = document.querySelector('.recipe-content');


//allows users to lock in their desired item so not lost in respin
let item1Lock= false;
let item2Lock= false;
let item3Lock= false;

//possible variables for diet/allergies (user selection options):
let isVegetarian = false;
let isVegan = false;
let noDiet = false;
let hasAllergy= false;
let allergy =[];

//locks in the option
function lockEntree(){
    item1Lock = true;
}
function lockSide(){
    item2Lock = true;
}
function lockSide2(){
    item3Lock=true;
}
lock1Btn.addEventListener('click', lockEntree);
lock2Btn.addEventListener('click', lockSide);
lock3Btn.addEventListener('click', lockSide2);

//adds allergy to list --> changes hasAllergy to true
function enterAllergy(){
    let allergen = document.querySelector('.allergy-txt').value;
    let allergyBox= document.querySelector('.allergy-txt')

    if (allergen.trim() !== ''){
        allergyBox.value=''; //clears input box
        addToAllergyList(allergen);
        alert("Allergy Added");
        console.log("Allergen: " + allergy);
        hasAllergy = true;
    }
    else{ //doesn't type anything, but hits button
        hasAllergy =false;
    }  
}
function addToAllergyList(allergen){
    allergy.push(allergen);
}

function selectedVegan(){
    isVegan= true;
    isVegetarian = false;
    noDiet = false;
    veganBtn.style.backgroundColor= "green";
    vegetarianBtn.style.backgroundColor="rgb(65, 216, 65)";
    noDietBtn.style.backgroundColor = "rgb(65, 216, 65)";
    console.log("I've selected Vegan: " + isVegan);
}
function selectedVegetarian(){
    isVegetarian = true;
    isVegan = false;
    noDiet = false;
    veganBtn.style.backgroundColor = "rgb(65, 216, 65)";
    noDietBtn.style.backgroundColor = "rgb(65, 216, 65)";
    vegetarianBtn.style.backgroundColor= "green";
    console.log("I've selected Vegetarian: " + isVegetarian);
}
function selectedNone(){
    isVegetarian = false;
    isVegan = false;
    noDiet = true;
    veganBtn.style.backgroundColor = "rgb(65, 216, 65)";
    vegetarianBtn.style.backgroundColor = "rgb(65, 216, 65)";
    noDietBtn.style.backgroundColor= "green";
    console.log("I've selected No Dietary Restrictions: " + noDiet);
    
}


allergyBtn.addEventListener('click', enterAllergy);
veganBtn.addEventListener('click', selectedVegan);
vegetarianBtn.addEventListener('click', selectedVegetarian);
noDietBtn.addEventListener('click', selectedNone);

//shopping list:
const shoppingList= [];

let validEntrees= ["Beef", "Chicken", "Goat", "Lamb", "Pasta", "Pork", "Seafood"]; //will not include vegan/vegetarian options. only if selected
let invalidEntries= [];

let containsAllergen= false;
let hasInvalidIngredient = false;
async function getEntree(item1Lock){
    if (item1Lock){
        return;
    }
    while(true){
        let containsAllergen= false; //reset
        try{
            const response= await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const data= await response.json(); //an object that has our meal data from api

            const category= data.meals[0].strCategory;  //access the category type
            const youtube = data.meals[0].strYoutube; //gives youtube link
            const recipeName= data.meals[0].strMeal;
            const previewImgSrc = data.meals[0].strMealThumb; //gives us img link
            const instructions= data.meals[0].strInstructions; //instructions
            const recipeLinkSrc= data.meals[0].strSource; //view original recipe link
            let ingredientsList= []; //to add all ingredients to check for allergen
            
            //add all of the recipe's ingredients to ingredients list (don't add empty entries!)
            for (let i = 1; i <= 20; i++) {
                const ingredient = data.meals[0][`strIngredient${i}`];
                if (ingredient !== null && ingredient !== '' && !invalidEntries.includes(ingredient) ) {
                    ingredientsList.push(ingredient);
                } else {
                    // Break the loop if there are no more ingredients
                    break;
                }
            
            }
            
            
            

            //check if ingredient is an allergen (entered by user)
            if (ingredientsList.includes(allergy)){
                containsAllergen= true;
            }

            //to provide valid recipes that follow the category and do not include allergens:
            if (validEntrees.includes(category) && containsAllergen === false && hasInvalidIngredient == false){
                //change recipe name:
                document.getElementById('row-1-title').textContent = recipeName;

                //change recipe picture:
                document.querySelector('.img-preview img').src= previewImgSrc;
                
                //add ingredients to li: (with add button)
                console.log(ingredientsList);
                const ulElement = document.querySelector('ul'); // Assuming you have a <ul> element in your HTML
                ulElement.innerHTML = ''; //clear previous ingredients
                
                //cycle through each ingredient and add to unordered list (with added classes to get proper formatting)
                ingredientsList.forEach(ingredient => {
                    const liElement = document.createElement('li');
                    liElement.textContent = ingredient;

                    // Apply styles to make li look like a button
                    liElement.classList.add('btn-ingredient', 'recipe-category');

                    // Add click event listener --> user wants to add to shopping cart
                    liElement.addEventListener('click', () => {
                        addToShoppingList(ingredient);
                        alert(`Added ${ingredient} to your shopping list!`);
                    });

                    // Append the li element to your existing ul element
                
                    ulElement.appendChild(liElement);
                });
                

                break;
            }
            
    
    
        }catch(error){
            console.error('Error fetching random meal: ', error);
        }
    }
}

let validSides = ["Side"];

async function getSide(item2Lock) {
    if (item2Lock) {
        return;
    }

    while (true) {
        let containsAllergen = false; // reset
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const data = await response.json(); // an object that has our meal data from api

            const category = data.meals[0].strCategory;  // access the category type
            const youtube = data.meals[0].strYoutube; // gives youtube link
            const recipeName = data.meals[0].strMeal;
            const previewImgSrc = data.meals[0].strMealThumb; // gives us img link
            const instructions = data.meals[0].strInstructions; // instructions
            const recipeLinkSrc = data.meals[0].strSource; // view original recipe link
            let ingredientsList = []; // to add all ingredients to check for allergen

            // add all of the recipe's ingredients to ingredients list (don't add empty entries!)
            for (let i = 1; i <= 20; i++) {
                const ingredient = data.meals[0][`strIngredient${i}`];
                if (ingredient !== null && ingredient !== '' && !invalidEntries.includes(ingredient)) {
                    ingredientsList.push(ingredient);
                } else {
                    // Break the loop if there are no more ingredients
                    break;
                }
            }

            // check if ingredient is an allergen (entered by user)
            if (ingredientsList.includes(allergy)) {
                containsAllergen = true;
            }

            // to provide valid recipes that follow the category and do not include allergens:
            if (validSides.includes(category) && containsAllergen === false && hasInvalidIngredient == false) {
                // change recipe name:
                document.getElementById('row-2-title').textContent = recipeName;

                // change recipe picture:
                const sideImgPreview = document.querySelector('.row-2 .img-preview img');
                sideImgPreview.src= previewImgSrc;

                // add ingredients to li: (with add button)
                console.log(ingredientsList);
                const ulElement = document.querySelector('.row-2 ul'); // Assuming you have a <ul> element in your HTML for row-2
                ulElement.innerHTML = ''; // clear previous ingredients

                // cycle through each ingredient and add to unordered list (with added classes to get proper formatting)
                ingredientsList.forEach(ingredient => {
                    const liElement = document.createElement('li');
                    liElement.textContent = ingredient;

                    // Apply styles to make li look like a button
                    liElement.classList.add('btn-ingredient', 'recipe-category');

                    // Add click event listener --> user wants to add to shopping cart
                    liElement.addEventListener('click', () => {
                        addToShoppingList(ingredient);
                        alert(`Added ${ingredient} to your shopping list!`);
                    });

                    // Append the li element to your existing ul element
                    ulElement.appendChild(liElement);
                });

                break;
            }

        } catch (error) {
            console.error('Error fetching random meal: ', error);
        }
    }
}

let validSides2 = ["Dessert"];

async function getSide2(item3Lock) {
    if (item3Lock) {
        return;
    }

    while (true) {
        let containsAllergen = false; // reset
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const data = await response.json(); // an object that has our meal data from api

            const category = data.meals[0].strCategory;  // access the category type
            const youtube = data.meals[0].strYoutube; // gives youtube link
            const recipeName = data.meals[0].strMeal;
            const previewImgSrc = data.meals[0].strMealThumb; // gives us img link
            const instructions = data.meals[0].strInstructions; // instructions
            const recipeLinkSrc = data.meals[0].strSource; // view original recipe link
            let ingredientsList = []; // to add all ingredients to check for allergen

            // add all of the recipe's ingredients to ingredients list (don't add empty entries!)
            for (let i = 1; i <= 20; i++) {
                const ingredient = data.meals[0][`strIngredient${i}`];
                if (ingredient !== null && ingredient !== '' && !invalidEntries.includes(ingredient)) {
                    ingredientsList.push(ingredient);
                } else {
                    // Break the loop if there are no more ingredients
                    break;
                }
            }

            // check if ingredient is an allergen (entered by user)
            if (ingredientsList.includes(allergy)) {
                containsAllergen = true;
            }

            // to provide valid recipes that follow the category and do not include allergens:
            if (validSides2.includes(category) && containsAllergen === false && hasInvalidIngredient == false) {
                // change recipe name:
                document.getElementById('row-3-title').textContent = recipeName;

                // change recipe picture:
                const sideImgPreview = document.querySelector('.row-3 .img-preview img');
                sideImgPreview.src= previewImgSrc;

                // add ingredients to li: (with add button)
                console.log(ingredientsList);
                const ulElement = document.querySelector('.row-3 ul'); // Assuming you have a <ul> element in your HTML for row-2
                ulElement.innerHTML = ''; // clear previous ingredients

                // cycle through each ingredient and add to unordered list (with added classes to get proper formatting)
                ingredientsList.forEach(ingredient => {
                    const liElement = document.createElement('li');
                    liElement.textContent = ingredient;

                    // Apply styles to make li look like a button
                    liElement.classList.add('btn-ingredient', 'recipe-category');

                    // Add click event listener --> user wants to add to shopping cart
                    liElement.addEventListener('click', () => {
                        addToShoppingList(ingredient);
                        alert(`Added ${ingredient} to your shopping list!`);
                    });

                    // Append the li element to your existing ul element
                    ulElement.appendChild(liElement);
                });

                break;
            }

        } catch (error) {
            console.error('Error fetching random meal: ', error);
        }
    }
}


spinBtn.addEventListener('click', selectMenu);

function selectMenu(){
    getEntree(item1Lock);
    getSide(item2Lock);
    getSide2(item3Lock);
}
function addToShoppingList(ingredient){
    shoppingList.push(ingredient);
}


const recipeBtn= document.querySelector('.btn-recipe');
recipeBtn.addEventListener('click', showDirections);

const closeBtn = document.getElementById('btn-close');
closeBtn.addEventListener('click', hideDirections);

function showDirections(){
    document.querySelector('.recipe-details').style.display="block";  
}

function hideDirections(){
    document.querySelector('.recipe-details').style.display="none";
}
