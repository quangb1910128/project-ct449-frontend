<script>
    export default {
        props: {
            book: { type: Object, required: true },
        },
    };
</script>
<template>
    <div>
        <div class="p-1">
            <strong>ID Sách: </strong>
            {{ book._id }}
        </div>
        <div class="p-1">
            <strong>Tên sách: </strong>
            {{ book.name }}
        </div>
        <div class="p-1">
            <strong>Ngày phát hành: </strong>
            {{ book.publisheDate }}
        </div>
        <div class="p-1">
            <strong>Thể loại: </strong>
            <span v-for="(genre, index) in book.genres"
            :key="index">
            {{ genre }}&nbsp
            </span>
            
        </div>
        <div v-if="book.author" class="p-1">
            <strong>Tác giả: </strong>
            {{ book.author.name }}
        </div>
        <div v-else class="p-1">
            <strong>Tác giả: </strong>
            Không có
        </div>
    </div>
</template>