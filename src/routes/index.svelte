<script lang="ts">
const payload = {
    username: "",
    password: ""
};

const submitForm = () => {
    console.log(payload)
}
</script>

<div class="main">
    <h1 class="heading">
        Receive message from strangers
    </h1>
    <form on:submit|preventDefault={submitForm}>
            <h2>Start receiving messages</h2>
            <div class="input_group">
                <label for="username">Username</label>
                <input type="text" bind:value={payload.username} required>
            </div>
            <div class="input_group">
                <label for="password">Password</label>
                <input type="password" bind:value={payload.password} required>
            </div>
            <button type="submit">Submit</button>
    </form>
</div>

<style lang="postcss">
    h1 {
        @apply font-semibold text-4xl my-4;
    }
    .main {
        @apply px-2 bg-gray-100 h-screen flex flex-col gap-2 items-start justify-center;
    }
    form {
        @apply h-full mt-5;
    }
    form h2 {
        @apply font-semibold text-lg text-secondary;
    }
</style>