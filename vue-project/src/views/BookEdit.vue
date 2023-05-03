<template>
    <div v-if="book" class="page">
        <h4>Hiệu chỉnh Liên hệ</h4>
        <BookForm
            :book="book"
            @submit:book="updateBook"
            @delete:book="deleteBook"
        />
        <p>{{ message }}</p>
    </div>
    </template>
<script>
    import BookForm from "@/components/BookForm.vue";
    import BookService from "@/services/book.service";
    export default {
    components: {
        BookForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            book: null,
            message: "",
        };
    },
    methods: {
        async getBook(id) {
            try {
                this.book = await BookService.getABook(id);
            } catch (error) {
                console.log(error);
                console.log(id);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                    pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateBook(data) {
            try {
                await BookService.updateBook(this.book._id, data);
                this.message = "Liên hệ được cập nhật thành công.";
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        },
        async deleteBook() {
            if (confirm("Bạn muốn xóa Liên hệ này?")) {
                try {
                    await BookService.deleteBook(this.book._id);
                    this.message = "Xóa thành công.";
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getBook(this.id);
        this.message = "";
        },
    };
</script>