<template>
    <Form
    @submit="submitBook"
    :validation-schema="bookFormSchema"
    >
    <div class="form-group">
    <label for="name">Tên</label>
    <Field
    name="name"
    type="text"
    class="form-control"
    v-model="bookLocal.name"
    />
    <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group">
    <label for="publisheDate">Ngày xuất bản</label>
    <Field
    name="publisheDate"
    type="text"
    class="form-control"
    v-model="bookLocal.publisheDate"
    />
    <ErrorMessage name="publisheDate" class="error-feedback" />
    </div>
    <div class="form-group">
    <label for="genres">Thể loại</label>
    <Field
    name="address"
    type="text"
    class="form-control"
    v-model="bookLocal.genres"
    />
    <ErrorMessage name="genres" class="error-feedback" />
    </div>
    <div v-if="bookLocal.author!=null" class="form-group">
    <label for="author">Tác giả</label>
    <Field
    name="author"
    type="text"
    class="form-control"
    
    v-model="bookLocal.author._id"
    />
    <ErrorMessage name="author" class="error-feedback" />
    </div>
    <div class="form-group">
    <button class="btn btn-primary" @click="submitBook">Lưu</button>
    <button
    v-if="bookLocal._id"
    type="button"
    class="ml-2 btn btn-danger"
    @click="deleteBook"
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
    emits: ["submit:book", "delete:book"],
    props: {
    book: { type: Object, required: true }
    },
    data() {
    const bookFormSchema = yup.object().shape({
    name: yup
    .string()
    .required("Tên phải có giá trị.")
    .max(50, "Tên có nhiều nhất 50 ký tự."),
    publisheDate: yup
    .string()
    .required("Ngày xuất bản phải có giá trị.")
    .max(20, "ngày xuất bản tối đa 20 ký tự."),
    genres: yup
    .string()
    .max(100, "thể loại tối đa 100 ký tự."),
    author: yup
    .string()
    });
    return {
    // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
    // bookLocal để liên kết với các input trên form
    bookLocal: this.book,
    bookFormSchema,
};
},
methods: {
submitBook() {
this.$emit("submit:book", this.bookLocal);
},
deleteBook() {
this.$emit("delete:book", this.bookLocal.id);
},
},
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>