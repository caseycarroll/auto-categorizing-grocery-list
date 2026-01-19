<script setup lang="ts">
import { signUp } from '../libs/auth-client';

const name = defineModel<string>('name', {required: true});
const email = defineModel<string>('email', {required: true});
const password = defineModel<string>('password', {required: true});


async function onSubmit() {
    if(!name || !email || !password) return;
    const {data, error} = await signUp.email({
        name: name.value,
        email: email.value,
        password: password.value,
    })
    if(error) console.log('error', error)
    window.location.href = '/grocery-list'
}
</script>

<template>
    <div class="flow wrapper card">
        <h1>Sign up</h1>
        <form @submit.prevent="onSubmit">
            <div>
                <label for="name">Name</label>
                <input v-model="name" id="name" type="text" required />
            </div>
            <div>
                <label for="email">Email</label>
                <input v-model="email" id="email" type="email" required />
            </div>
            <div>
                <label for="pass">Password</label>
                <input v-model="password" id="pass" type="password" required />
            </div>
            <button id="sign-in" type="submit"><span>Sign up</span></button>
        </form>
    </div>
</template>

<style>
    form > * + * {
        margin-top: var(--flow-space, 1rem);
    }

    form {
        --flow-space: var(--space-s);
    }
    form button {
        --flow-space: var(--space-m);
    }
</style>