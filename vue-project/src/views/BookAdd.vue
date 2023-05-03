<template>
    <div  class="page">
        <h4>Thêm sách mới</h4>
        <BookForm
            :book="book"
            @submit:book="add"
        />
        <p>{{ message }}</p>
    </div>
    </template>
<script>
    import BookForm from "@/components/BookForm2.vue";
    import BookService from "@/services/book.service";
    export default {
    components: {
        BookForm,
    },
    data() {
        return {
            book: null,
            message: "",
        };
    },
    methods: {
        async add(data) {
            try {
                await BookService.addBook(data);
                this.message = "Liên hệ được thêm thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.message = "";
        },
    };
</script>