<template>
  <b-col align-h="center">
    <div class="m-md-5">
      <h4>Send a Tip to Rosario</h4>
      <p>97% of your tip goes directly to support Rosario and his family. See the full breakdown of costs.</p>
        <b-form-group label="Individual radios">
          <b-form-radio v-model="amount" @change="inhide()"  value="1">$1.00</b-form-radio>
          <b-form-radio v-model="amount" @change="inhide()"  value="5">$5.00</b-form-radio>
          <b-form-radio v-model="amount" @change="inhide()"  value="10">$10.00</b-form-radio>
          <b-form-radio v-model="amount" @change="inhide()"  value="20">$20.00</b-form-radio>
          <b-form-radio v-model="amount" @change="inshowhide()"  :value="amount">other</b-form-radio>
        </b-form-group>
         <div v-show="showinput">
            <b-input type="number" style="width:200px;" v-model="amount" class="form-control" value=""></b-input>
          </div>
      <div class="m-lg-4">
        <b-button squared variant="primary">Pay</b-button>
      </div>
      <div class="m-md-5 mt-lg-n4">
        <p>Or pay with credit card or PayPal</p>
      </div>
      
      <div class="m-md-12">
      <client-only placeholder="Chargement...">
        <div class="m-md-12">
          <div uk-grid>
            <div class="uk-width-1-3@m">
              <div class="uk-card uk-card-default uk-card-body uk-width-1-1@m">
                <form @submit.stop.prevent="handleSubmit">
                  <fieldset class="uk-fieldset">
                    <legend class="uk-legend"></legend>
                    <div class="uk-margin">
                      <label for="card">Card Details</label>
                      <card
                        ref="card-stripe"
                        stripe="pk_test_rujjNssO7PKzOG6O8zLb5de500NxJweVtb"
                        @change="complete = $event.complete"
                      />
                    </div>

                    <div class="uk-margin">
                      <button
                        class="uk-button uk-button-primary"
                        @click="pay"
                        name="button"
                      >Proceed to pay ( {{ amount }} €)</button>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </client-only>
    </div>
    </div>
  </b-col>
</template>
<script>
import { Card, createToken } from "vue-stripe-elements-plus";

export default {
  components: {
    Card
  },
  data() {
    return {
      amount: "",
      showinput: false
    };
  },
  methods: {
    inhide() {
      this.showinput = false;
    },
    inshowhide() {
      this.showinput = true;
    },
   async handleSubmit() {
      console.log("To do Store in db");
    },
    async pay() {
       this.loading = true
      let token
      try {
        const response = await createToken()
        token = response.token.id
        console.log("\n Token : ",token);
      } catch (err) {
        alert('An error occurred.')
        this.loading = false
        return
      }
      console.log("\n Paying...");
      var result = await this.$axios.$post('http://localhost/api/pay', {keyword: ""}, { progress: true })
      console.log("\n Result...",result);

    //   fetch("/pay", {
    //       method: "POST",
    //       headers: {"Content-Type": "application/json"},
    //       body: JSON.stringify(token)
    //     })
    //     .then(output => {
    //       console.log("Output")
    //       // if (output.status === "succeeded")
    //       //   document.getElementById("shop").innerHTML = "<p>Purchase complete!</p>";
    //     })
       

    }
  }
};
</script>

