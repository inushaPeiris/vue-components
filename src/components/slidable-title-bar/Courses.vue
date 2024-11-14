<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import CourseCard from "./CourseCard.vue";

const props = defineProps({
    faqs: {
        type: Array,
        default: () => [],
    },
    selectedPage: {
        type: String,
        default: null,
    },
    groupedFaqs: {
        type: Object,
        default: () => ({}),
    },
});

const categorySplideRef = ref(null);

const state = reactive({
    hasStarted: false,
    isAtEnd: false,
    activeCategory: null, // Set this in onMounted
    progress: 0,
});

const prevSlide = () => {
    if (categorySplideRef.value) {
        categorySplideRef.value.go("-1");
    }
};

const nextSlide = () => {
    if (categorySplideRef.value) {
        categorySplideRef.value.go("+1");
        state.hasStarted = true;
    }
};

const categorySplideOptions = {
    type: "slide",
    autoWidth: true,
    autoplay: false,
    focus: "left",
    trimSpace: true,
    arrows: false,
    pagination: false,
    gap: "1rem",
    perMove: 1,
    interval: 3000,
};

onMounted(() => {
    // Initialize the active category to the first item in groupedFaqs
    state.activeCategory = Object.keys(props.groupedFaqs)[0] || null;

    const splide = categorySplideRef.value?.splide;
    if (splide) {
        const updateButtons = () => {
            const currentIndex = splide.index;
            const totalSlides = splide.length - splide.options.perPage;
            state.isAtEnd = currentIndex >= totalSlides;
            state.hasStarted = currentIndex > 0;
        };
        splide.on("moved", updateButtons);
        updateButtons();
    }
});

const initialCardCount = ref(6);
const expanded = ref(false);
const sectionRef = ref(null);

const updateInitialCardCount = () => {
    initialCardCount.value = window.innerWidth <= 991 ? 2 : 6;
};

onMounted(() => {
    updateInitialCardCount();
    window.addEventListener("resize", updateInitialCardCount);
});

const activeSlides = computed(() => {
    // Get slides for the current active category from groupedFaqs
    return props.groupedFaqs[state.activeCategory] || [];
});

const visibleSlides = computed(() => {
    return expanded.value
        ? activeSlides.value
        : activeSlides.value.slice(0, initialCardCount.value);
});

const showMoreButton = computed(() => {
    return activeSlides.value.length > initialCardCount.value;
});

function toggleExpand() {
    expanded.value = !expanded.value;
    if (!expanded.value) {
        scrollToSection();
    }
}

function scrollToSection() {
    if (sectionRef.value) {
        const offset = 100;
        const elementPosition = sectionRef.value.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });
    }
}

function handleCategoryChange(category) {
    state.activeCategory = category;
}

const emit = defineEmits(["click"]);

const handleClick = (pageName) => {
    handleCategoryChange(pageName);
    emit("click", pageName);
};
</script>

<template>
    <section
        class="container flex flex-wrap justify-center items-center cursor-pointer"
    >
        <div class="relative xl:w-3/4 mx-auto">
            <button
                v-if="state.hasStarted"
                class="prev absolute top-1/2 transform -translate-y-1/2 left-0 z-10"
                @click.stop="prevSlide"
            >
                <i
                    class="fas fa-chevron-left text-white bg-black-900 hover:text-black-900 hover:bg-white border border-black-900 rounded-10 w-[35px] h-[35px] flex justify-center items-center"
                ></i>
            </button>
            <div class="mx-10 relative">
                <Splide
                    :options="categorySplideOptions"
                    ref="categorySplideRef"
                >
                    <SplideSlide
                        v-for="(_, pageName) in groupedFaqs"
                        :key="pageName"
                    >
                        <div class="my-3 lg:my-5 flex justify-center w-full">
                            <CourseCard
                                :title="pageName"
                                :selectedPage="selectedPage"
                                :groupedFaqs="groupedFaqs"
                                @click="handleClick(pageName)"
                            />
                        </div>
                    </SplideSlide>
                </Splide>
            </div>
            <button
                v-if="!state.isAtEnd"
                class="next absolute top-1/2 transform -translate-y-1/2 right-0 z-10"
                @click.stop="nextSlide"
            >
                <i
                    class="fas fa-chevron-right text-white bg-black-900 hover:text-black-900 hover:bg-white border border-black-900 rounded-10 w-[35px] h-[35px] flex justify-center items-center"
                ></i>
            </button>
        </div>
        <!-- <div>faqs::::::::::: {{ faqs }}</div>
        <div>groupedfaqs::::::::::: {{ groupedFaqs }}</div> -->
    </section>
</template>
