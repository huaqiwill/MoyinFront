<template>
    <div class="member-list">
        <MemberItem></MemberItem>
        <MemberItem></MemberItem>
        <MemberItem></MemberItem>
        <MemberItem></MemberItem>
    </div>
</template>

<script lang="ts" setup>
import MemberItem from './MemberItem.vue';
</script>

<style lang="scss" scoped>
.member-list {
    display: flex;
    justify-content: space-around;

    .member-item {
        
    }
}
</style>