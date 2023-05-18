function saveToSessionStorageByName(name:any){
    let favorites = getSessionStorage();
    favorites.push(name);
    sessionStorage.setItem('Favorites', JSON.stringify(favorites));
}

function getSessionStorage(){
    let sessionStorageData = sessionStorage.getItem('Favorites');
    if(sessionStorageData == null){
       return []; 
    }
    return JSON.parse(sessionStorageData);
}

function removeFromSessionStorage(name :any){
    let favorites = getSessionStorage();
    let nameIndex = favorites.indexOf(name);
    favorites.splice(nameIndex,1);
    sessionStorage.setItem('Favorites', JSON.stringify(favorites));
}

export { getSessionStorage, saveToSessionStorageByName, removeFromSessionStorage }


