const list = document.getElementById("list");
const description = document.getElementById("description");

const api = "https://pokeapi.co/api/v2/pokemon?limit=150";


/**
 * Try to parse a response as JSON data
 */
function transformToJson (response) {
    if (response.ok) {
        return response.json();
    }

    throw Error("Content not loaded");
}

/**
 * Clear the list of all its items
 */
function emptyList () {
    const   fields = description.querySelectorAll("dd");
    fields.forEach((dd) => {
        dd.textContent = "";
    });
    if(document.contains(document.querySelector("img"))){
        document.querySelector("img").textContent = "";
    }

}

function    createLi (loc, data) {
    var name = document.querySelector("dd." + loc);
    var dd = document.createElement("dd");
   
    switch (loc) {
        case 'types':
            dd.appendChild(document.createTextNode(data.types[0].type.name));
            break;
        default :
            dd.appendChild(document.createTextNode(data[loc]));
            break;
    }
    name.appendChild(dd);
}

/**
 * Create an item, fetch its data and setup event listener
 */
function createItem (pokemon) {
    // Create a li tag
    const item = document.createElement("li");
    
    item.textContent = pokemon.name;
    item.setAttribute("id", pokemon.name);
    list.appendChild(item);
    // ...
    // fetch(pokemon.url).then(transformToJson).then((data) => {        
    // });
    item.addEventListener('click', event => {
        emptyList();
        showDescription(pokemon);
    })

    document.querySelector(".close").addEventListener('click', event => {
        hideDescription();
    })
}

/**
 * fill the item list with values
 */
function fillList (json) {
    emptyList();
    json.results.forEach(createItem);
}

/**
 * Fill and display the description
 */
function showDescription (pokemon) {
    description.classList.add("show");

    const   fields = description.querySelectorAll("dd");
    const   img = document.createElement("img");
    
    //img.src = pokemon.

    fetch(pokemon.url).then(transformToJson).then((data) => {
        console.log(data);
        createLi("name", data);
        createLi("id", data);
        createLi("weight", data);
        createLi("height", data);
        //TODO create function of types
        createLi("types", data);
        img.src = data.sprites.front_default;
        description.appendChild(img);
    });
}

/**
 * Hide the description
 */
function hideDescription () {
    description.classList.remove("show");
    
}

// Fetch the API end-point and fill the list
fetch(api).then(transformToJson).then(fillList);
