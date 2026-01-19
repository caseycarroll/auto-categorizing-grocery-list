<script setup lang="ts">
import { signUp } from '../libs/auth-client';

const name = defineModel('name');
const email = defineModel('email');
const password = defineModel('password');


async function onSubmit() {
    console.log(name.value, email.value, password.value)
    const {data, error} = await signUp.email({
        name: name.value,
        email: email.value,
        password: password.value,
    })
    if(error) console.log('error', error)
    console.log(data)
    window.location.href = '/grocery-list'
}
</script>

<template>
    <div class="flow wrapper">
        <header>
            <h1>Sign up</h1>
        </header>
        <form @submit.prevent="onSubmit">
            <div>
                <label for="name">Name</label>
                <input v-model="name" id="name" type="text" />
            </div>
            <div>
                <label for="email">Email</label>
                <input v-model="email" id="email" type="email" />
            </div>
            <div>
                <label for="pass">Password</label>
                <input v-model="password" id="pass" type="password" />
            </div>
            <div class="repel submit-btn">
                <button id="sign-in" type="submit"><span>Sign up</span></button>
            </div>
        </form>
    </div>
</template>

<style>
    form > * + * {
        margin-top: var(--flow-space, 1rem);
    }
</style>