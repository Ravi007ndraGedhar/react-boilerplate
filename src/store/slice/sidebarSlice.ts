import { createSlice } from "@reduxjs/toolkit"

type SidebarState = {
    isOpen: boolean
}

const initialState: SidebarState = {
    isOpen: false,
}

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        openSidebar: (state) => {
            state.isOpen = true
        },
        closeSidebar: (state) => {
            state.isOpen = false
        },
        toggleSidebar: (state) => {
            state.isOpen = !state.isOpen
            console.log(state.isOpen, 'state')
        },
    },
})

export const { openSidebar, closeSidebar, toggleSidebar } = sidebarSlice.actions
export default sidebarSlice.reducer
