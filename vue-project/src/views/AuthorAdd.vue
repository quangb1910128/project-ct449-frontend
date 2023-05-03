<template>
    <div  class="page">
        <h4>Thêm tác giả</h4>
        <AuthorForm
            :author="author"
            @submit:author="add"
        />
        <p>{{ message }}</p>
    </div>
    </template>
<script>
    import AuthorForm from "@/components/AuthorForm2.vue";
    import AuthorService from "@/services/author.service";
    export default {
    components: {
        AuthorForm,
    },
    data() {
        return {
            author: null,
            message: "",
        };
    },
    methods: {
        async add(data) {
            try {
                await AuthorService.addAuthor(data);
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