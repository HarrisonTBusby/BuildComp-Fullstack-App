function saveToLocalStorageByName(name:string){
    //get current values that are saved into local storage
    //create an array of values to store into local storage
    let favorites = getLocalStorage();

    //add new name to our favorites array
    favorites.push(name);

    //save updated array to local storage
    localStorage.setItem('Favorites', JSON.stringify(favorites));

}

function getLocalStorage(){
    // get all of the values that are stored in Favorites in local storage
    let localStorageData = localStorage.getItem('Favorites');

    if(localStorageData == null){
       return []; 
    }


    return JSON.parse(localStorageData);
}


function removeFromLocalStorage(name :any){
    let favorites = getLocalStorage();
    
    //find the index of the name in local storage
    let nameIndex = favorites.indexOf(name);

    //remove the name from the array using the splice method
    favorites.splice(nameIndex,1);

    //save updated array to local storage
    localStorage.setItem('Favorites', JSON.stringify(favorites));
    
}

export {getLocalStorage, saveToLocalStorageByName, removeFromLocalStorage}


