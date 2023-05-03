<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">Ứng dụng Quản lý Sách</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link to="/" class="nav-link">
                    Sách
                    <i class="fas fa-address-book"></i>
                </router-link>
            </li>
            <li>
                <router-link  to="/author" class="nav-link">
                    Tác giả
                    <i class="fas fa-address-book"></i>
                </router-link>
            </li>
        </div>
    </nav>
</template>