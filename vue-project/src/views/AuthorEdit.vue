<template>
    <div v-if="author" class="page">
        <h4>Hiệu chỉnh tác giả</h4>
        <AuthorForm
            :author="author"
            @submit:author="updateAuthor"
            @delete:author="deleteAuthor"
        />
        <p>{{ message }}</p>
    </div>
    </template>
<script>
    import AuthorForm from "@/components/AuthorForm.vue";
    import AuthorService from "@/services/author.service";
    export default {
    components: {
        AuthorForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            author: null,
            message: "",
        };
    },
    methods: {
        async getAuthor(id) {
            try {
                this.author = await AuthorService.getAnAuthor(id);
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
        async updateAuthor(data) {
            try {
                await AuthorService.updateAuthor(this.author._id, data);
                this.message = "Liên hệ được cập nhật thành công.";
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        },
        async deleteAuthor() {
            if (confirm("Bạn muốn xóa Liên hệ này?")) {
                try {
                    await AuthorService.deleteAuthor(this.author._id);
                    this.message = "Xóa thành công.";
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getAuthor(this.id);
        this.message = "";
        },
    };
</script>