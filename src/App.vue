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
            <span class="fh2">Please wait, checking...</span>
          </div>
          <div v-else>
            <span class="fh2"
              >Your answer to the first question was {{ formatTicket(questions[0].model) }}!😉</span
            >
            <p class="f-description"><span>Have a great day!</span></p>
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
</template>

<script>
import { FlowForm, Question, LanguageModel } from "@ditdot-dev/vue-flow-form";

export default {
  name: "example",
  components: {
    FlowForm,
    Question,
  },
  data() {
    return {
      loading: true,
      completed: false,
      language: new LanguageModel(),
      questions: [
        {
          type: "multiplechoice",
          id: "project_type",
          tagline:
            "Giving is an attitude. It is not dependent on the amount of money in your bank account. It’s a heart issue.", // todo - randomly generate from pro-donation list - "Ready brighten everyone in the world's day in 4 minutes?"
          title: "What sort of project would you like to support today?",
          multiple: false,
          required: true,
          helpTextShow: false,
          options: [
            {
              label: "Apps",
              value: "apps",
            },
            // {
            //   label: "Behind the Scenes",
            //   value: "behind_the_scenes",
            // },
            // {
            //   label: "Linux",
            //   value: "linux",
            // },
          ],
          jump: {
            apps: "apps",
            // behind_the_scenes: "behind_the_scenes",
            // linux: "linux",
          },
          model: "",
        },
        {
          type: "multiplechoice",
          id: "apps",
          tagline:
            "Free apps don't need spyware and adds. Let's improve open source for everyone!",
          title: "What sort of apps do you want to support?",
          multiple: false,
          required: true,
          helpTextShow: false,
          options: [
            {
              label: "Android Apps",
              value: "apps",
            },
            // {
            //   label: "iOS Apps",
            //   value: "ios_apps",
            // },
            // {
            //   label: "Linux Apps",
            //   value: "linux_apps",
            // },
          ],
          jump: {
            // android_apps: "android_apps",
            // ios_apps: "ios_apps",
            // linux_apps: "linux_apps",
            // _other: "_submit",
          },
          model: "",
        },
      ],
    };
  },
  methods: {
    /* eslint-disable-next-line no-unused-vars */
    onComplete(completed, questionList) {
      // This method is called whenever the "completed" status is changed.
      this.completed = completed;
      // Set `submitted` to true so the form knows not to allow back/forward
      // navigation anymore.
      this.$refs.flowform.submitted = true;
      this.onSendData();
    },

    onSendData() {
      const self = this;
      /* eslint-disable-next-line no-unused-vars */
      const data = this.getData();
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
      }, 1500);
    },
    getData() {
      const data = {
        questions: [],
        answers: [],
      };

      this.questions.forEach((question) => {
        if (question.title) {
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
    formatTicket(ticket) {
      return ticket && ticket.replace(/-/g, "");
    },
    getTicket() {
      return Math.floor(Math.random() * (999999 - 100000) + 100000).toString();
    },
  },
};
</script>

<style lang="css">
@import "~@ditdot-dev/vue-flow-form/dist/vue-flow-form.css";
@import "~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-purple.css";
</style>
