const url = 'http://localhost:8080/api/'

export function fillUsersTable() {
    const allUsersTableBody = document.getElementById('allUsersTableBody')


    $('#allUsersTableBody').empty()
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let columnContent = ''
            data.forEach(element => {
                columnContent += `<tr>
                    <td>${element.id}</td>
                    <td>${element.name}</td>
                    <td>${element.lastName}</td>
                    <td>${element.email}</td>
                    <td>${element.age}</td>
                    <td>${element.roles.map(role => role.roleName.substring(5))}</td>
                    <td>
                    <button type="button" class="btn btn-danger delete" id="buttonDelete"
                    data-index="${element.id}" data-bs-target="#modalDelete" data-bs-toggle="modal">
                    Delete
                    </button>
                    </td>
                    <td>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" id="buttonEdit"
                    data-index="${element.id}" data-bs-target="#modalEdit">
                    Edit
                    </button>
                    </td>
                    <td>
                    </td>
                </tr>
                `
            })
            allUsersTableBody.innerHTML = columnContent

        })
}
export function fullCurrentUserTable() {
    const currentUserTableBody = document.getElementById('currentUserTableBody')
    const currentUserEmail = document.getElementById('currentUserEmail')
    const currentUserRoles = document.getElementById('currentUserRoles')
    fetch(url + 'currentUser')
        .then(response => response.json())
        .then(data => {
            let userRoles = data.roles.map(role => role.roleName.substring(5))
            let columnContent = ''
            columnContent += `<tr>
                    <td>${data.id}</td>
                    <td>${data.name}</td>
                    <td>${data.lastName}</td>
                    <td>${data.email}</td>
                    <td>${data.age}</td>
                    <td>${userRoles}</td>
                </tr>
                `
            currentUserTableBody.innerHTML = columnContent
            currentUserEmail.innerText = data.email
            currentUserRoles.innerText = userRoles
        })
}
export function getRolesForNewUser() {
    const selectRolesForNewUser = document.getElementById('selectRolesForNewUser')
    fetch('http://localhost:8080/api/roles')
        .then(response => response.json())
        .then(data => {
            let resRoles = ''
            data.forEach(element => {
                if (element.id === 2) {
                    resRoles +=
                        `
                    <option value='${element.id}' selected>
                    ${element.roleName.substring(5)}
                    </option>
                    `
                } else {
                    resRoles +=
                        `
                    <option value='${element.id}' >
                    ${element.roleName.substring(5)}
                    </option>
                    `
                }
            })
            selectRolesForNewUser.innerHTML = resRoles
        })
}
export function createNewUser(e) {
    e.preventDefault()
    const newUserForm = document.forms['createUserForm']
    let newUserRoles = []
    for (let option of document.getElementById('selectRolesForNewUser').options) {
        if (option.selected) {
            newUserRoles.push({
                id: option.value,
                roleName: 'ROLE_' + option.innerText
            })
        }
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newUserForm.name.value,
            lastName: newUserForm.lastName.value,
            email: newUserForm.email.value,
            age: newUserForm.age.value,
            password: newUserForm.password.value,
            roles: newUserRoles
        })
    }).then((response) => {
            if (response.ok) {
                newUserForm.reset()
                fillUsersTable()
                $('.nav-tabs a[href="#UserTable"]').tab('show')
            } else {
                response.json()
                    .then((res) => {
                        getErrorMessage(res, newUserForm)
                    })
            }
        }
    )
}
export function fillUserForm(id, formName, method) {
    fetch(url + id)
        .then(response => response.json())
        .then(data => {
            formName.id.value = data.id
            formName.name.value = data.name
            formName.lastName.value = data.lastName
            formName.email.value = data.email
            formName.age.value = data.age
            let rolesForEditedUser = document.getElementById('roles' + method)
            let userRolesId = []
            data.roles.forEach(role => {
                userRolesId.push(role.id)
            })
            fetch('http://localhost:8080/api/roles')
                .then(response => response.json())
                .then(data => {
                    let resRoles = ''
                    data.forEach(element => {
                        if (userRolesId.includes(element.id)) {
                            resRoles +=
                                `
                    <option value='${element.id}' selected>
                    ${element.roleName.substring(5)}
                    </option>
                    `
                        } else {
                            resRoles +=
                                `
                    <option value='${element.id}' >
                    ${element.roleName.substring(5)}
                    </option>
                    `
                        }
                    })
                    rolesForEditedUser.innerHTML = resRoles
                })
        })
}
export function updateCurrentUser(e) {
    e.preventDefault()
    let editUserRoles = []
    for (let option of document.getElementById('rolesEdit').options) {
        if (option.selected) {
            editUserRoles.push({
                id: option.value,
                roleName: 'ROLE_' + option.innerText
            })
        }
    }
    let userEditForm = document.forms['editUserModalForm']
    fetch(url + 'patch', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: userEditForm.id.value,
            name: userEditForm.name.value,
            lastName: userEditForm.lastName.value,
            email: userEditForm.email.value,
            age: userEditForm.age.value,
            password: userEditForm.password.value,
            roles: editUserRoles
        })
    }).then((response) => {
            if (response.ok) {
                fillUsersTable()
                userEditForm.password.value = ''
                document.getElementById('closeEditModalWindow').click()
                getSuccessMessage('User has been updated!')
                $('.nav-tabs a[href="#UserTable"]').tab('show')
            } else {
                response.json()
                    .then((res) => {
                        getErrorMessage(res, userEditForm)
                    })
            }
        }
    )
}
export function deleteCurrentUser(id) {
    fetch(url + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
        fillUsersTable()
        document.getElementById('closeDeleteModal').click()
        getSuccessMessage('User has been deleted!')
        $('.nav-tabs a[href="#UserTable"]').tab('show')
    })
}
function getErrorMessage(errorJSON, form) {
    let errorBody = document.getElementById('errorBody')
    let errorBodyText = ''
    for (let line of errorJSON.message.split(';')) {
        errorBodyText +=
            `
             <a>${line}</a>
             <br>
             `
    }
    console.log(errorJSON.message)
    errorBody.innerHTML = errorBodyText
    form.password.value = ''
    $('#errorModal').modal('toggle')
}
function getSuccessMessage(message) {
    $('#successModal').modal('toggle')
    document.getElementById('successBody').innerHTML =
        `
        <a>${message}</a>
        `
}
