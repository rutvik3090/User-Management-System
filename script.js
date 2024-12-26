const items = document.getElementById('use');
const userdata = document.getElementById("username");
const record = document.getElementById("records");

let userArray = [];
let edit_id = null;

let obj = localStorage.getItem("users");

if (obj !== null) {
    userArray = JSON.parse(obj);
}

displayinfo();

items.addEventListener("click", function () {
    // Get the value from the username input
    const Name = userdata.value;

    if (edit_id === null) {
        userArray.push({
            name: Name,
        });
    } else {
        userArray.splice(edit_id, 1, {
            name: Name,
        });
        edit_id = null;
        items.innerText = "Add";
    }
    info(userArray);
    userdata.value = ""; // Clear the input field after adding/updating
});

function info(userArray) {
    let str = JSON.stringify(userArray);
    localStorage.setItem('users', str);
    displayinfo();
}

function displayinfo() {
    let statement = "";
    userArray.forEach((user, i) => {
        statement += `<tr>
                    <td scope="row">${i + 1}</td>
                    <td>${user.name}</td>
                    <td><button class="btn btn-danger" onclick="deleteuser(${i})">Delete</button></td>
                    <td><button class="btn btn-warning" onclick="edituser(${i})">Edit</button></td>
                </tr>`;
    });
    record.innerHTML = statement;
}

function edituser(id) {
    edit_id = id;
    userdata.value = userArray[id].name;
    items.innerText = "Save Changes";
}

function deleteuser(id) {
    userArray.splice(id, 1);
    info(userArray);
}