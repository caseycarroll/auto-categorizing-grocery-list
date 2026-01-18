<script lang="ts">
</script>

<template>
    <form>
        <div>
            <label for="email">Email</label>
            <input id="email" type="email" />
        </div>
        <div>
            <label for="pass">Password</label>
            <input id="pass" type="password" />
        </div>
        <div class="repel submit-btn">
            <button id="sign-in" type="submit"><span>Sign in</span></button>
        </div>
    </form>
</template>

<style>
    form > * + * {
        margin-top: var(--flow-space, 1rem);
    }
</style>