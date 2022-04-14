<div class="wrap">
    <span></span>
    <span></span>
    <span></span>
</div>

<style lang="postcss">
.wrap {
    @apply w-8 flex flex-col items-start justify-around gap-1 h-full;
}
.wrap > span {
    @apply w-full h-[3px] bg-white rounded-md;
}
.wrap > span:nth-child(1) {
    @apply w-4;
}
.wrap > span:nth-child(2) {
    @apply w-6;
}
</style>