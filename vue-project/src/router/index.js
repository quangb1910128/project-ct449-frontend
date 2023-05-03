import { createWebHistory, createRouter } from "vue-router";
import Book from "@/views/Book.vue";
import Author from "@/views/Author.vue";
const routes = [
    {
        path: "/",
        component: Book,
    },
    {   
        path: "/author",
        component: Author,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {   
        name: "book.edit",
        path: "/books/:id",
        component: () => import("@/views/BookEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/addbook",
        name: "book.add",
        component: () => import("@/views/BookAdd.vue"),
    },

    {   
        name: "author.edit",
        path: "/authors/:id",
        component: () => import("@/views/AuthorEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },

    {
        path: "/addauthor",
        name: "author.add",
        component: () => import("@/views/AuthorAdd.vue"),
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;