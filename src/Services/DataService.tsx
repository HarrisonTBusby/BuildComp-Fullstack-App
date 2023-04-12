
let userData = {};

interface PeopleData {
    picture: {
      medium: string
    }
    name: {
      first: string,
      last: string
    }
    cell: string,
    email: string,
    gender: string,
    location: {
      country: string
    }
  }

  interface PeopleAPIResponse {
    data: PeopleData[];
  }

const GetRandomUserData = async () => {
    const response = await fetch('https://randomuser.me/api/?results=50')
    const jsonData = await response.json();
    const parsedJsonData = jsonData.results;
    const parsedData: PeopleAPIResponse = {
        data: parsedJsonData.map((userData: any) => ({
            picture: {
                medium: userData.picture.medium
              },
              name: {
                first: userData.name.first,
                last: userData.name.last
              },
              cell: userData.cell,
              email: userData.email,
              gender: userData.gender,
              location: {
                country: userData.location.country
              }
        }))
    }
    return parsedData;
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

export { GetRandomUserData, createAccount, login, GetLoggedInUserData, PeopleAPIResponse, PeopleData };