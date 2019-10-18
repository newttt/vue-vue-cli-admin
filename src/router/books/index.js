
export default {
    path: "/books",
    name: "Books",
    redirect:"/books/booksList",
    component: () => import("@pages/books"),
    children:[
        {
            path: "/books/booksList",
            name:"BooksList",
            component:()=>import("@pages/books/booksList")
        },
        {
            path: "/books/booksInfo",
            name:"BooksInfo",
            component:()=>import("@pages/books/booksInfo")
        },
    ]
}