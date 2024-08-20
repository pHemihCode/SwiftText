import Home from "../assets/home.svg"
import posts from "../assets/posts.svg"
import people from "../assets/people.svg"
import saved from "../assets/saved.svg"
import create from "../assets/gallery-add.svg"

export const sideLinks=[
    {
        imgURL:Home,
        route:"/",
        label:"Home"
    },
    {
        imgURL:posts,
        route:"/explore",
        label:"Explore"
    },
    {
        imgURL:people,
        route:"/people",
        label:"People"
    },
    {
        imgURL:saved,
        route:"/saved",
        label:"Saved"
    },
    {
        imgURL:create,
        route:"/create-post",
        label:"Create Post"
    }
]

export const bottomLinks = [
    {
        imgURL:Home,
        route:"/",
        label:"Home"
    },
    {
        imgURL:posts,
        route:"/explore",
        label:"Explore"
    },
    {
        imgURL:saved,
        route:"/saved",
        label:"Saved"
    },
    {
        imgURL:create,
        route:"/create-post",
        label:"Create"
    }
]
