<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Danh mục sách
                <i class="fa-regular fa-address-book fa-beat"></i>
            </h4>
            <BookList
                v-if="filteredBooksCount > 0"
                :books="filteredBooks"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có liên hệ nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fa-regular fa-circle fa-flip"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddBook">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeBook">
                <h4>
                    Chi tiết Sách
                    <i class="fas fa-address-card"></i>
                </h4>
                <BookCard :book="activeBook" />
                <router-link
                    :to="{
                    name: 'book.edit',
                    params: { id: activeBook._id },
                    }"
                >
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i> Hiệu chỉnh
                    </span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import BookCard from "@/components/BookCard.vue";
    import InputSearch from "@/components/InputSearch.vue";
    import BookList from "@/components/BookList.vue";
    import BookService from "@/services/book.service";
    export default {
        components: {
            BookCard,
            InputSearch,
            BookList,
        },
        data() {
            return {
                books: [],
                activeIndex: -1,
                searchText: "",
            };
        },
        watch: {
            // Giám sát các thay đổi của biến searchText.
            // Bỏ chọn phần tử đang được chọn trong danh sách.
            searchText() {
            this.activeIndex = -1;
            },
        },
        computed: {
            // Chuyển các đối tượng book thành chuỗi để tiện cho tìm kiếm.
            bookStrings() {
                return this.books.map((book) => {
                    const { name, publisheDate, genres, author } = book;
                    return [name, publisheDate, genres, author].join("");
                });
            },
            // Trả về các book có chứa thông tin cần tìm kiếm.
            filteredBooks() {
                if (!this.searchText) return this.books;
                    return this.books.filter((_book, index) =>
                    this.bookStrings[index].includes(this.searchText)
                );
            },
            activeBook() {
                if (this.activeIndex < 0) return null;
                return this.filteredBooks[this.activeIndex];
            },
            filteredBooksCount() {
                return this.filteredBooks.length;
            },
        },
        methods: {
            async retrieveBooks() {
                try {
                this.books = await BookService.getAllBook();
                } catch (error) {
                console.log(error);
                }
            },
            refreshList() {
                this.retrieveBooks();
                this.activeIndex = -1;
            },

            async removeAllContacts() {
                if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                    try {
                        await BookService.deleteBook();
                        this.refreshList();
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
            goToAddBook() {
                this.$router.push({ name: "book.add" });
            },
        },
        mounted() {
            this.refreshList();
        },
    };
</script>
<style scoped>
.page {
text-align: left;
max-width: 750px;
}
</style>