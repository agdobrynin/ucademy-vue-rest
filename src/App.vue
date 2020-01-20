<template lang="pug">
    .container.pt-3 #[h3.alert.alert-info Add new car]
        form#formCar(@submit.prevent="")
            input(type="hidden" name="id" v-model="id")
            .form-group
                label Mark
                input.form-control(v-model="mark" name="mark")
            .form-group
                label Model
                input.form-control(v-model="model" name="model")
            .form-group
                label Year release
                input.form-control(v-model="yearRelease" name="yearRelease" type="number")
            .form-group
                button.btn.btn-primary(v-if="!id" @click="addCar") Add car
                |&nbsp;
                button.btn.btn-success(v-if="id" @click="updateCar") Update car
                |&nbsp;
                button.btn.btn-secondary(@click="emptyForm") Reset form
            .alert.alert-danger(v-if="resourceStatus.fail") {{ resourceStatus.message }}
        h3.alert.alert-success Cars list:
            span(v-if="!cars.length")  is empty

        ul.list-group
            li.list-group-item(v-for="(car) in cars" :key="car.id")
                |Mark: #[strong {{ car.mark }}]
                |Model: #[strong {{ car.model }}]
                |Year release: #[strong {{ car.yearRelease }}]
                p
                button.alert.alert-danger(type="button" @click.stop="deleteCar(car.id)") Delete car
                |&nbsp;
                button.alert.alert-primary(type="button" @click.stop="editCar(car.id)") Edit car
</template>

<script>
    export default {
        data() {
            return {
                resource: null,
                resourceStatus: {fail: false, message: ""},
                id: null,
                mark: "",
                model: "",
                yearRelease: "",
                cars: [],
            }
        },
        created() {
            this.emptyForm();
            this.resource = this.$resource("cars{/id}", {});
            this.loadCars();
        },
        methods: {
            emptyForm() {
                this.id = null;
                this.model = "";
                this.mark = "";
                this.yearRelease = new Date().getFullYear() - 1;
            },
            formDataToJson(formData) {
                let object = {};
                formData.forEach((value, key) => {object[key] = value});
                return object;
            },
            failResourceStatus(message) {
                this.resourceStatus.fail = true;
                this.resourceStatus.message = message;
            },
            successResourceStatus() {
                this.resourceStatus.fail = false;
                this.resourceStatus.message = "";
            },
            loadCars() {
                this.resource.get().then( response => response.json()).then( cars => this.cars = cars);
            },
            addCar(event) {
                const car = this.formDataToJson(new FormData(event.target.form));
                this.resource.save(car).then( response => {
                    this.emptyForm();
                    this.successResourceStatus();
                    this.cars.push(response.body);
                }).catch( response => {
                    this.failResourceStatus(response.bodyText);
                });
            },
            updateCar(event) {
                const car = this.formDataToJson(new FormData(event.target.form));
                this.resource.update({id: car.id}, car).then( ()=> {
                    this.loadCars();
                    this.emptyForm();
                });
            },
            deleteCar(id) {
                this.resource.delete({id: id}).then( () => {
                    this.cars = this.cars.filter(car => car.id !== id);
                    this.successResourceStatus();
                }).catch ( response => {
                    this.failResourceStatus(response.bodyText);
                });
            },
            editCar(id) {
                this.resource.get({id: id}).then( (response) =>{
                    const car = response.body;
                    this.id = car.id;
                    this.model = car.model;
                    this.mark = car.mark;
                    this.yearRelease = car.yearRelease;
                });

                const container = this.$el.querySelector("#formCar");
                container.scrollIntoView();
            },
        }
    }
</script>
