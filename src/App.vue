<template lang="pug">
  .container.pt-3 Add car
    form(@submit.prevent="")
        .form-group
            label Mark
            input.form-control
        .form-group
            label Model
            input.form-control
        .form-group
            button.btn.btn-primary(@click="createCar") Add car
</template>

<script>
export default {
    data() {
        return {
            mark: "",
            model: "",
            id: null,
        }
    },
    methods: {
        createCar() {
            console.log(this.$http.defaults.baseURL)
        }
    }
}
</script>

<style>
</style>
