<script setup>
// import WebLayout from "@/Layouts/WebLayout.vue";
// import HeroSection from "../../../Components/Web/WebRevamp/FAQ/HeroSection.vue";
// import SearchComponent from "../../../Components/Web/WebRevamp/FAQ/SearchComponent.vue";
// import Courses from "../../../Components/Web/WebRevamp/FAQ/Courses.vue";
// import Questions from "../../../Components/Web/WebRevamp/FAQ/Questions.vue";
// import Sample from "../../../Components/Web/WebRevamp/FAQ/Sample.vue";

import Courses from "./Courses.vue";

import { defineProps, ref, computed, toRefs } from "vue";

const props = defineProps({
    faqs: {
        type: [],
        default: null,
    },
})

const { faqs } = toRefs(props);

const groupedFaqs = computed(() => {
    return faqs.value.reduce((acc, faq) => {
        const pageName = faq.page.name;
        if (!acc[pageName]) acc[pageName] = [];
        acc[pageName].push(faq);
        return acc;
    }, {});
});

const selectedPage = ref(null);

const handleClick = (pageName) => {
    selectedPage.value = pageName;
};

</script>

<template>
    <!-- <WebLayout title="FAQ"> -->
        <!-- <HeroSection />
        <SearchComponent /> -->
        <Courses :faqs="faqs" :selectedPage="selectedPage" :groupedFaqs="groupedFaqs" @click="handleClick"/>
        <!-- <Courses :faqs="faqs" :selectedPage="selectedPage" :groupedFaqs="groupedFaqs" @click="handleClick"/> -->
        <!-- <Questions :faqs="faqs" :selectedPage="selectedPage" :groupedFaqs="groupedFaqs"/> -->
    <!-- </WebLayout> -->
</template>
