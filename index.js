document.body.innerHTML= `
        <div>
        <div class="Add-icon"> <button onClick="showAddUser()" ><i class="bi bi-plus-circle-fill"></i> </button></div>
        <div class="user-add-inputs" style="display:none;">
            <i class="bi bi-person-circle"></i>
            <p>ADD USER</p>
            <input  class="add-user-name"   placeholder="Enter Your Name" />
            <input  class="add-user-avatar"  placeholder="Enter Your Pic URL" />
            <button onClick="addUser()" ><i class="bi bi-person-plus-fill"></i>  Add User</button>
        </div>
        </div>
        <section class="user-list"></section>`;

async function getAllUsers()
{

    const data= await fetch("https://616d44bb37f997001745d948.mockapi.io/users/");
    const users =await data.json();

    

   const userContainer =  document.querySelector(".user-list");
    userContainer.innerHTML =""; //to refresh a list after deleting a user..so we wont dublicate it

    users.forEach((user) => {

    
    userContainer.innerHTML += `   
    <div class ="user-container">
        <img class="user-avatar" src="${user.avatar}" />
        <div style="margin-left:50px"> 
            <p class="user-name">${user.name}</p>
            <button class="btn btn-del" onClick="deleteUser(${user.id})" ><i class="bi bi-trash"></i>  Delete</button>
            <button class="btn btn-edit" onClick="editUser(${user.id})" ><i class="bi bi-pencil-square"></i>  Edit</button>

            <div class="user-${user.id} edit" style="display:none;" >
            <input  class="edit-user${user.id}-name" value="${user.name}"  placeholder="Enter Your Name" />
            <input  class="edit-user${user.id}-avatar" value="${user.avatar}"  placeholder="Enter Your Pic URL" />
            <button class=" btn btn-save" onClick="updateUser(${user.id})"> <i class="bi bi-save"></i> Save</button>
            </div>
        </div>
        
        
         
        
        
        
            

    </div> 
       

    `;
    });
    console.log(users);
}

getAllUsers();

//C- create -post
//R- read   -get
// U -update   -PUT/PATCh
// D - Delete  -Delete


async function deleteUser(userId){

    console.log("Deleting...",userId);
    const data = await fetch(
        "https://616d44bb37f997001745d948.mockapi.io/users/" + userId , {method : "DELETE"}
    );

    getAllUsers();

    //Delete -> refresh user list(getAllUsers)
}


async function showAddUser(){

    console.log("Show");
    const hidden = document.querySelector('.user-add-inputs');
    console.log(hidden );
    hidden.style.display=(hidden.style.display === "flex") ? "none" : "flex";

    //Delete -> refresh user list(getAllUsers)
}


async function addUser(){

    console.log("Adding...");
    const username = document.querySelector(".add-user-name").value;
    const userAvatar = document.querySelector(".add-user-avatar").value;
    
    const data =await fetch(
        
        "https://616d44bb37f997001745d948.mockapi.io/users/",
        {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body:JSON.stringify( {name:username, avatar: userAvatar} )
            //when u hv to create data send it to body
        }
    )
    console.log(username,userAvatar);
    getAllUsers();

    //Delete -> refresh user list(getAllUsers)
}

async function editUser(eUserId){

    console.log("edit", eUserId );
    const hidden = document.querySelector(`.user-${eUserId}`);
    console.log(hidden );
    hidden.style.display=(hidden.style.display === "block") ? "none" : "block";

    //Delete -> refresh user list(getAllUsers)
}


async function updateUser(userID){

    console.log("Saving...");
    const Eusername = document.querySelector(`.edit-user${userID}-name`).value;
    const EuserAvatar = document.querySelector(`.edit-user${userID}-avatar`).value;
    
    const Edata = await fetch( 
        "https://616d44bb37f997001745d948.mockapi.io/users/" + userID,
        {
            method: "PUT",
          //  headers:{"Content-Type": "application/json"},
          headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
           },
            body:JSON.stringify( {name:Eusername, avatar: EuserAvatar} )
            //when u hv to create data send it to body
        }
    );
    // const user = await data.json();
    // user.stringify( {name:username, avatar: userAvatar} )
    // console.log("User", await data.json());
    // console.log("name",Eusername,EuserAvatar);
    getAllUsers();

    //Delete -> refresh user list(getAllUsers)
}
