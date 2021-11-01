 
<template>
  <div>
    <flow-form v-bind:questions="questions">
      <a href="/">xmr-donates</a> does not endorse any project it links here.
      This website is simply a refined collection of notable projects that
      accept Monero.
      <br />
      <br />
      Requirements to be added to this website are loosely the following:
      <br />
      <br />
      Project is ANY of:
      <ul>
        <li>Project contributes to Monero in some way</li>
        <li>Project is FOSS</li>
        <li>Project advocates or enhances privacy in some way</li>
      </ul>

      Project MUST be:
      <ul>
        <li>Somewhat active</li>
        <li>Somewhat noteworthy</li>
        <li>Open source (if there's an app)</li>
      </ul>

      Contributors:
      <ul>
        <li>
          Dan Ginovker (<a href="https://github.com/dginovker">Github</a>)
        </li>
      </ul>

      <br />
      <p class="description">
        <span><a href="./">Back</a></span>
      </p>
    </flow-form>
  </div>
  <footer class="vff-footer" style="left: 0.6rem; bottom: 0.4rem">
    <a href="https://github.com/dginovker/xmr-donate/issues">Feedback</a> |
    <a href="https://github.com/dginovker/xmr-donate">Source</a> |
    <a href="./terms.html">Terms</a>
  </footer>
</template>


<script>
import { FlowForm } from "@ditdot-dev/vue-flow-form";

export default {
  name: "Donate Monero",
  components: {
    FlowForm,
  },
  data() {
    return {
      questions: [],
    };
  },
};
</script>

<style lang="css">
@import "~@ditdot-dev/vue-flow-form/dist/vue-flow-form.css";
@import "~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-purple.css";
</style>
