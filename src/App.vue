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
            <span class="fh2">{{ suggestion.name }}</span>
            <span class="fh2"><a target="_blank" :href=" suggestion.url" >{{ suggestion.url }}</a></span>
            <span class="description">{{ suggestion.description }}</span>
            <p class="f-description"><span>Be Generous!</span></p>
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
  <footer class="vff-footer" style="left: 1rem"><a href="https://github.com/dginovker/xmr-donate/issues">Feedback</a></footer>
</template>

<script>
import { FlowForm, Question, LanguageModel } from "@ditdot-dev/vue-flow-form";
import ProjectType from "./path/type";
import responses from "./assets/responses.json";

export default {
  name: "Donate Monero",
  components: {
    FlowForm,
    Question,
  },
  data() {
    return {
      loading: true,
      completed: false,
      language: new LanguageModel(),
      questions: ProjectType,
      suggestion: []
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
      let potentialResponses = responses;

      for (let answer of answers) {
        if (!potentialResponses[answer]) return [];
        potentialResponses = potentialResponses[answer];
      }

      return potentialResponses[
        Math.floor(Math.random() * potentialResponses.length)
      ];
    },
  },
};
</script>

<style lang="css">
@import "~@ditdot-dev/vue-flow-form/dist/vue-flow-form.css";
@import "~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-purple.css";
</style>
