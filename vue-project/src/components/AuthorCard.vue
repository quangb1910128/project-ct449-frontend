<script>
    export default {
        props: {
            author: { type: Object, required: true },
        },
    };
</script>
<template>
    <div>
        <div class="p-1">
            <strong>ID tác giả: </strong>
            {{ author._id }}
        </div>
        <div class="p-1">
            <strong>Tên tác giả: </strong>
            {{ author.name }}
        </div>
        <div class="p-1">
            <strong>Năm sinh: </strong>
            {{ author.year }}
        </div>
        <div class="p-1">
            <strong>Các tác phẩm: </strong>
            <span v-for="(book, index) in author.books"
            :key="index">
            {{ book.name }}&nbsp
            </span>
            
        </div>
    </div>
</template>