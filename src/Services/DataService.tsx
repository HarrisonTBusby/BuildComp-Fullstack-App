
let userData = {};

const GetRandomUserData = async () => {
    const response = await fetch('https://randomuser.me/api/?results=50')
    const data = response.json();
    return data;
}

const createAccount = async (createdUser: any) => {
    const response = await fetch('https://buildcomp.azurewebsites.net/User/AddUser/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(createdUser)
    });
    if(!response.ok){
        const message = `An Error has Occured ${response.status}`;
        throw new Error(message)
    }
    const data = await response.json();
    console.log(data);
}

const login = async (loginUser: any) => {
    const response = await fetch('https://buildcomp.azurewebsites.net/User/Login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginUser)
    });

    if(!response.ok){
        const message = `An Error has Occured ${response.status}`;
        throw new Error(message)
    }
    const data = await response.json();
    console.log(data);
    return data;
}

const GetLoggedInUserData = async (username: any) => {
    const response = await fetch(`https://buildcomp.database.windows.net/User/Userbyusername/${username}`)
    const data = await response.json();
    userData = data;
    console.log(userData)
    return data;
}

export { GetRandomUserData, createAccount, login, GetLoggedInUserData };