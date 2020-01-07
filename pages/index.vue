<template>
  <b-col align-h="center">
    <div class="m-md-5" v-show="payment">
      <h4>Send a Tip to Rosario</h4>
      <p>97% of your tip goes directly to support Rosario and his family. See the full breakdown of costs.</p>
        <b-form-group>
          <b-form-radio v-model="amount" @change="inhide()"  value="1" checked>$1.00</b-form-radio>
          <b-form-radio v-model="amount" @change="inhide()"  value="5">$5.00</b-form-radio>
          <b-form-radio v-model="amount" @change="inhide()"  value="10">$10.00</b-form-radio>
          <b-form-radio v-model="amount" @change="inhide()"  value="20">$20.00</b-form-radio>
          <b-form-radio v-model="amount" @change="inshowhide()"  value="amount">other</b-form-radio>
        </b-form-group>
         <div v-show="showinput">
            <b-form-input type="number" style="width:200px;" v-model="amount" class="form-control" value=""></b-form-input>
          </div>
      <div class="m-lg-4" v-show="payButton">
        <b-button squared variant="primary" @click="showCardDetails">Pay</b-button>
        <p>Or pay with credit card or PayPal</p>
      </div>
      
      <div class="m-md-12" v-show="cardDetails">
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
                        stripe="pk_test_M7Uxvl5M7uDMX1Bg6oXXDbbO00T420XKZe"
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
    <div class="m-md-12 el-center"  v-show="successPage">
      <div style="padding:10%;">
      <h1 style="color:green;">Thank You !</h1>
      <h5 style="color:gray;">Your Tip is received... </h5>
      </div>
    </div>
    <div class="m-md-12 el-center" v-show="failurePage">
     <div style="padding:10%;">
      <h1 style="color:red;">Oops! Something went wrong ! </h1>
      <h5 style="color:gray;"> Your tip is failed... </h5>
    </div>
    </div>

  </b-col>
</template>
<style scoped>
.el-center {
  text-align: center;
  font-family: 'Monospace';
}

</style>
</style>
<script>
import { Card, createToken } from "vue-stripe-elements-plus";

export default {
  components: {
    Card
  },
  data() {
    return {
      amount: "",
      showinput: false,
      payButton: true,
      cardDetails: false,
      payment: true,
      successPage: false,
      failurePage: false
    };
  },
  methods: {
    inhide() {
      this.showinput = false;
    },
    inshowhide() {
      this.showinput = true;
    },
    showCardDetails(){
    this.payButton = false,
    this.cardDetails = true
    },
   async handleSubmit() {
      console.log("To do Store in db");
    },
    async pay() {
      let token
      try {
        const response = await createToken()
        token = response.token.id
        console.log("\n Token : ",token);
      } catch (err) {
        alert('An error occurred in get token.')
        console.log(err)
        return
      }
      console.log("\n Paying...")
      var reqData = {token : token, amount: this.amount}
      var result = await this.$axios.$post('http://localhost:3000/api/pay', reqData, { progress: true })
      console.log("\n Result is : ",result);
      if(result && result.status === "200" && result.receipt_url){
            this.payment = false
            this.successPage = true
        } else {
            this.payment = false
            this.failurePage = true
        }

    }
  }
}; 
</script>

