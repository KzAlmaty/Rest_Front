import {
    fillUsersTable, getRolesForNewUser, createNewUser,
    fillUserForm, updateCurrentUser, deleteCurrentUser,
    fullCurrentUserTable
} from "./functions.js";

window.onload = () => {
    fillUsersTable()
    fullCurrentUserTable()
}

$(document).ready(() => {
    $('.nav-tabs a[href="#NewUser"]').on('show.bs.tab', () => {
        getRolesForNewUser()
        document.getElementById('createNewUser').addEventListener('click', createNewUser)
    })
    $('.nav-tabs a[href="#UserTable"]').on('show.bs.tab', () => {
        document.getElementById('createUserForm').reset()
    })
    $('#modalEdit').off().on('show.bs.modal', event => {
        let id = $(event.relatedTarget).attr("data-index")
        fillUserForm(id, document.forms['editUserModalForm'], 'Edit')
        document.getElementById('updateUser').addEventListener('click', updateCurrentUser)

    })
    $('#modalDelete').on('show.bs.modal', event => {
        let id = $(event.relatedTarget).attr("data-index")
        fillUserForm(id, document.forms['modalDeleteForm'], 'Delete')
        document.getElementById('deleteUser').addEventListener('click', (event) => {
            deleteCurrentUser(id)
        })
    })
})












