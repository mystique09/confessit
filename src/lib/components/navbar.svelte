<script lang="ts">
    import { session } from '$app/stores';

    let isOpen = false;
</script>

<nav>
    <div class="wrap">
        <div class="logo">
            <a href="/"><img src="/logo.svg" alt="ConfessIt Logo"></a>
        </div>
        {#if $session}
            <a class="login_btn" href="/login">Login</a>
        {:else}
            <div class="menu_btn" on:click={() => isOpen = !isOpen}>
                <div class="wrap">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <h4>Menu</h4>
            </div>
            <div class="menu" class:hide={!isOpen}>
                <ul><li><a href="/account">My Account</a></li></ul>
                <ul><li><a href="/signout">Sign out</a></li></ul>
            </div>
        {/if}
    </div>
</nav>

<style lang="postcss">
nav {
    @apply w-screen max-w-4xl m-auto flex items-center;
}
.wrap {
        @apply px-4 py-2 w-full flex flex-row items-center justify-between;
}
.login_btn {
    @apply bg-secondary px-8 py-2 text-white rounded-md font-semibold;
}
.menu_btn {
    @apply bg-secondary cursor-pointer flex flex-row items-center justify-between px-6 py-2 text-white rounded-md;
}
.menu_btn .wrap {
    @apply flex flex-col gap-2 h-8;
}
.wrap > span {
    @apply w-full h-6 bg-gray-500;
}
.menu_btn h4 {
    @apply font-bold text-lg;
}
.hide {
    @apply hidden;
}
</style>