<template>
    <Form
    @submit="submitAuthor"
    :validation-schema="authorFormSchema"
    >
    <div class="form-group">
    <label for="name">Tên tác giả</label>
    <Field
    name="name"
    type="text"
    class="form-control"
    v-model="authorLocal.name"
    />
    <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group">
    <label for="year">Năm sinh</label>
    <Field
    name="year"
    type="number"
    class="form-control"
    v-model="authorLocal.year"
    />
    <ErrorMessage name="year" class="error-feedback" />
    </div>
    <div class="form-group">
    <button class="btn btn-primary" @click="submitAuthor">Lưu</button>
    <button
    v-if="authorLocal._id"
    type="button"
    class="ml-2 btn btn-danger"
    @click="deleteAuthor"
    >
    Xóa
    </button>
    </div>
    </Form>
    </template>
    <script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    export default {
    components: {
    Form,
    Field,
    ErrorMessage,
    },
    emits: ["submit:author", "delete:author"],
    props: {
        author: { type: Object, required: true }
    },
    data() {
    const authorFormSchema = yup.object().shape({
    name: yup
    .string()
    .required("Tên phải có giá trị.")
    .max(50, "Tên có nhiều nhất 50 ký tự."),
    year: yup
    .string()
    .required("Năm sinh phải có giá trị.")
    .max(4, "Năm sinh tối đa 4 ký tự."),
    });
    return {
    // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
    // authorLocal để liên kết với các input trên form
    authorLocal: this.author,
    authorFormSchema,
};
},
methods: {
submitAuthor() {
this.$emit("submit:author", this.authorLocal);
},
deleteAuthor() {
this.$emit("delete:author", this.authorLocal.id);
},
},
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>