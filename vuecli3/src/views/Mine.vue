<template>
    <div>
        <h1>刘雨晴的页面</h1>
        <router-link :to="{name:'test1',params:{name:'liuyuqing',age:20}}">子路由1</router-link> |
        <router-link to="/mine/test2/lyq/20">子路由2</router-link>
        <router-view></router-view>
    </div>

</template>
<script>
    export default {

    }
</script>

