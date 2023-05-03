<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Tác Giả
                <i class="fas fa-address-book"></i>
            </h4>
            <AuthorList
                v-if="filteredAuthorsCount > 0"
                :authors="filteredAuthors"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có liên hệ nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fa-regular fa-circle fa-flip"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddAuthor">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeAuthor">
                <h4>
                    Chi tiết Tác giả
                    <i class="fas fa-address-card"></i>
                </h4>
                <AuthorCard :author="activeAuthor" />
                <router-link
                    :to="{
                    name: 'author.edit',
                    params: { id: activeAuthor._id },
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
    import AuthorCard from "@/components/AuthorCard.vue";
    import InputSearch from "@/components/InputSearch.vue";
    import AuthorList from "@/components/AuthorList.vue";
    import AuthorService from "@/services/author.service";
    export default {
        components: {
            AuthorCard,
            InputSearch,
            AuthorList,
        },
        data() {
            return {
                authors: [],
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
            // Chuyển các đối tượng author thành chuỗi để tiện cho tìm kiếm.
            authorStrings() {
                return this.authors.map((author) => {
                    const { name, year, books } = author;
                    return [name, year, books].join("");
                });
            },
            // Trả về các author có chứa thông tin cần tìm kiếm.
            filteredAuthors() {
                if (!this.searchText) return this.authors;
                    return this.authors.filter((_author, index) =>
                    this.authorStrings[index].includes(this.searchText)
                );
            },
            activeAuthor() {
                if (this.activeIndex < 0) return null;
                return this.filteredAuthors[this.activeIndex];
            },
            filteredAuthorsCount() {
                return this.filteredAuthors.length;
            },
        },
        methods: {
            async retrieveAuthors() {
                try {
                this.authors = await AuthorService.getAllAuthor();
                } catch (error) {
                console.log(error);
                }
            },
            refreshList() {
                this.retrieveAuthors();
                this.activeIndex = -1;
            },

            async removeAllContacts() {
                if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                    try {
                        await AuthorService.deleteAuthor();
                        this.refreshList();
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
            goToAddAuthor() {
                this.$router.push({ name: "author.add" });
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