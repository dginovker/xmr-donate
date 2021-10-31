<template>
  <div>
    <flow-form
      ref="flowform"
      v-on:complete="onComplete"
      v-bind:language="language"
      v-bind:progressbar="false"
      v-bind:standalone="true"
    >
      <question
        v-for="(question, index) in questions"
        v-bind="question"
        v-bind:key="'m' + index"
        v-model="question.model"
      >
      </question>

      <!-- Custom content for the Complete/Submit screen slots in the FlowForm component -->
      <template v-slot:complete>
        <div class="f-section-wrap">
          <div v-if="loading">
            <span class="fh2">Checking...</span>
          </div>
          <div v-else>
            <span class="fh2" style="margin-bottom: 0.2rem">{{
              suggestion.name
            }}</span>
            <span class="description"
              ><a target="_blank" :href="suggestion.url">{{
                suggestion.url
              }}</a></span
            >
            <div style="line-height: 100%">
              <br />
            </div>
            <span class="description">{{ suggestion.description }}</span>
            <br />
            <br />
            <p class="f-description" style="margin-bottom: 0.5rem">
              <span>Be Generous!</span>
            </p>

            <div class="description">
              <div v-if="suggestion.address">
                <qrcode-vue :value="suggestion.address" :size="300" level="H" />
                <a :href="'monero:' + suggestion.address">monero:{{ suggestion.address }}</a>
              </div>
              <div v-else>
                Donation address not directly displayable - Visit URL for donation addresses!
              </div>
            </div>

            <p class="description">
              <span><a href="/?another=true" >Add Another Donation</a></span>
            </p>
          </div>
        </div>
      </template>
      <!-- We've overriden the default "complete" slot content -->
      <template v-slot:completeButton>
        <div class="f-submit">
          <!-- Leave empty to hide default submit button -->
        </div>
      </template>
    </flow-form>
  </div>
  <footer class="vff-footer" style="left: 0.6rem; bottom: 0.3rem">
    <a href="https://github.com/dginovker/xmr-donate/issues">Feedback</a> |
    <a href="https://github.com/dginovker/xmr-donate">Source</a> |
    <a href="https://github.com/dginovker/xmr-donate">Terms</a>
  </footer>
</template>

<script>
import { FlowForm, Question, LanguageModel } from "@ditdot-dev/vue-flow-form";
import ProjectType from "./path/type";
import projects from "./assets/projects.json";
import QrcodeVue from "qrcode.vue";

export default {
  name: "Donate Monero",
  components: {
    FlowForm,
    Question,
    QrcodeVue,
  },
  data() {
    let questions = ProjectType;
    if (
      new URL(location.href).searchParams.get("another") &&
      !questions[0].options.find((q) => q.value === "random")
    ) {
      console.log("Adding random button since another is present");
      questions[0].options.push({
        label: "Random",
        value: "random",
      });
    }
    return {
      loading: true,
      completed: false,
      language: new LanguageModel(),
      questions,
      suggestion: [],
    };
  },
  methods: {
    /* eslint-disable-next-line no-unused-vars */
    onComplete(completed, questionList) {
      const data = this.getData();
      this.suggestion = this.getSuggestion(data.answers);
      // This method is called whenever the "completed" status is changed.
      this.completed = completed;
      // Set `submitted` to true so the form knows not to allow back/forward
      // navigation anymore.
      this.$refs.flowform.submitted = true;
      this.onSendData(data);
    },

    /* eslint-disable-next-line no-unused-vars */
    onSendData(data) {
      const self = this;
      this.loading = true;

      /*
          You can use Fetch API to send the data to your server, eg.:
          fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
        */
      setTimeout(() => {
        self.loading = false;
      }, 500);
    },
    getData() {
      const data = {
        questions: [],
        answers: [],
      };

      this.questions.forEach((question) => {
        if (question.title && question.model.length > 0) {
          let answer = question.model;
          if (Array.isArray(answer)) {
            answer = answer.join(", ");
          }
          data.questions.push(question.title);
          data.answers.push(answer);
        }
      });

      return data;
    },
    getSuggestion(answers) {
      let potentialResponses = projects;

      if (answers[0] === "random") return this.getRandomSuggestion();

      for (let answer of answers) {
        if (!potentialResponses[answer]) return [];
        potentialResponses = potentialResponses[answer];
      }

      return potentialResponses[
        Math.floor(Math.random() * potentialResponses.length)
      ];
    },
    getRandomSuggestion() {
      function getArrayChildren(object) {
        if (Array.isArray(object)) return object;
        let children = [];
        Object.keys(object).forEach((child) => {
          children.push(...getArrayChildren(object[child]));
        });
        return children;
      }

      let potentials = getArrayChildren(projects);
      return potentials[Math.floor(Math.random() * potentials.length)];
    },
  },
};
</script>

<style lang="css">
@import "~@ditdot-dev/vue-flow-form/dist/vue-flow-form.css";
@import "~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-purple.css";
</style>
