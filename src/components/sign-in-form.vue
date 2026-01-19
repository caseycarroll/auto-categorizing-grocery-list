<script setup lang="ts">
import { signIn } from '../libs/auth-client';

const email = defineModel<string>('email', {default: ''});
const password = defineModel<string>('password', {default: ''});

async function onSubmit() {
    if(!email.value || !password.value) return;
    console.log(email.value)
    const {data, error} = await signIn.email({
        email: email.value,
        password: password.value,
    })
    if(error) {
        console.log('error', error)
        return;
    }
    window.location.href = '/grocery-list'
}
</script>

<template>
    <div class="wrapper flow card">
        <h1>🛒 Grocery List</h1>
        <form @submit.prevent="onSubmit">
            <div>
                <label for="email">Email</label>
                <input v-model="email" id="email" type="email" />
            </div>
            <div>
                <label for="pass">Password</label>
                <input v-model="password" id="pass" type="password" />
            </div>
            <div class="repel submit-btn">
                <button id="sign-in" type="submit"><span>Sign in</span></button>
            </div>
        </form>
        <p><a href="/sign-up">Sign up</a> to create a new account</p>
    </div>
</template>

<style>
    form > * + * {
        margin-top: var(--flow-space, 1rem);
    }
</style>