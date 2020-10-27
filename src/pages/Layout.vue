<template>
    <div class="layout">
        <el-container class="container">
            <el-aside>aside</el-aside>
            <el-container>
                <el-header></el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
    .layout{
        height: 100%;
        .container{
            height: 100%;
        }
    }
</style>