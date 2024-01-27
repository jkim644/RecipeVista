//buttons
const lock1Btn = document.getElementById('btn-1');
const lock2Btn = document.getElementById('btn-2');
const lock3Btn = document.getElementById('btn-3');

const spinBtn= document.querySelector('.btn-spin');

const allergyBtn= document.querySelector('.btn-allergy');
const veganBtn = document.querySelector('.btn-vegan');
const vegetarianBtn = document.querySelector('.btn-vegetarian');
const noDietBtn = document.querySelector('.btn-none');

let item1Lock= false;
let item2Lock= false;
let item3Lock= false;

//possible variables:
let isVegetarian = false;
let isVegan = false;
let noDiet = false;
let hasAllergy= false;
let allergy =[];
const validAllergies = ['milk', 'eggs', 'fish', 'shellfish', 'crab', 'lobster', 'shrimp', 'citrus', 'lemon', 'lime', 'orange', 'almond', 'walnuts', 'pecans', 'nuts', 'tree nuts', 'peanuts', 'wheat', 'soybeans', 'sesame'];

//get information from allergy text box

//will select the new entree/side dish/drink option
function spin(){};

//randomly select a

//function that will change the images to simulate a spin
function randomizeImg(){};

//locks in the option
function lockIn(){};

//adds ingredients to shopping list
function addToShoppingList(){};

//remove ingredients from shopping list
function removeFromList(){};

//shows recipe
function showRecipe(){};

//adds allergy to list --> changes hasAllergy to true
function enterAllergy(){
    let allergen = document.querySelector('.allergy-txt').value;
    let allergyBox= document.querySelector('.allergy-txt')

    if (allergen.trim() !== ''){
        allergyBox.value=''; //clears input box
        for (let i=0;i<validAllergies.length;i++){
            if (validAllergies[i] === allergen.trim()){
                addToAllergyList(allergen);
                alert("Allergy Added");
                hasAllergy = true;
                break;
            }
        }
        if (hasAllergy === false){
            alert('Allergy not found in allergens list. Please try again');
        }
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
}
function selectedVegetarian(){
    isVegetarian = true;
    isVegan = false;
    noDiet = false;
    veganBtn.style.backgroundColor = "rgb(65, 216, 65)";
    noDietBtn.style.backgroundColor = "rgb(65, 216, 65)";
    vegetarianBtn.style.backgroundColor= "green";
}
function selectedNone(){
    isVegetarian = false;
    isVegan = false;
    noDiet = true;
    veganBtn.style.backgroundColor = "rgb(65, 216, 65)";
    vegetarianBtn.style.backgroundColor = "rgb(65, 216, 65)";
    noDietBtn.style.backgroundColor= "green";
}


allergyBtn.addEventListener('click', enterAllergy);
veganBtn.addEventListener('click', selectedVegan);
vegetarianBtn.addEventListener('click', selectedVegetarian);
noDietBtn.addEventListener('click', selectedNone);
