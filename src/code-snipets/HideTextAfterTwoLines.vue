<template>
    <!-- ...existing code... -->
    <p v-if="item.title" class="text-sm font-medium text-ash-1400 items-start line-clamp-2">
        {{ truncateText(item.title) }}
    </p>
    <!-- ...existing code... -->
</template>

<script>
export default {
    // ...existing code...
    methods: {
        truncateText(text) {
            const charLimit = 100;
            if (text.length > charLimit) {
                return text.substring(0, charLimit) + '...';
            }
            return text;
        }
    }
}
</script>

<style>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
