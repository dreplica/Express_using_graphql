export const DELETE_USER:string = 'delete_user'
export const UPDATE_USER:string = 'update_user'
export const UPDATE_CONTACT:string = 'update_contact'
export const GET_USER:string = 'get_user'
export const VIEW_CONTACT:string = 'get_contact'
export const VIEW_CONTACTS:string = 'get_contact'
export const ADD_CONTACT:string = 'get_contact'
export const LOADING_CONTACTS:string = 'loading_contacts'
export const LOADING_CONTACT:string = 'loading_contact'
export const DELETING_CONTACT:string = 'delete_contact'
export const ERROR:string = 'ERROR'


interface type_profile {
    type: string;
    payload?: string;//not all actioncreators would need payload
}



//USER ACTIONS
const profile_view =():type_profile => ({
    type:GET_USER
})
const delete_user =():type_profile => ({
    type:DELETE_USER
})
const update_user =():type_profile => ({
    type:UPDATE_USER
})

//CONTACT ACTIONS
const mounting_contacts = (): type_profile => ({
    type:LOADING_CONTACTS
})
const mounting_contact = (): type_profile => ({
    type:LOADING_CONTACT
})

const isError = (): type_profile => ({
    type:ERROR
})
const all_contacts = (): type_profile => ({
    type:VIEW_CONTACTS
})

const contact_view =(payload:string):type_profile => ({
    type: VIEW_CONTACT,
    payload
})
const deleting_contact = (payload:string): type_profile => ({
    type: DELETING_CONTACT,
    payload
})
const update_contact = (payload:string): type_profile => ({
    type: UPDATE_CONTACT,
    payload
})

