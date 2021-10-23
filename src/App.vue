<template>
  <flow-form v-bind:questions="questions" v-bind:language="language" />
</template>

<script>
  // Import necessary components and classes
  import { FlowForm, QuestionModel, QuestionType, ChoiceOption, LanguageModel } from '@ditdot-dev/vue-flow-form'

  export default {
    name: 'example',
    components: {
      FlowForm
    },
    data() {
      return {
        language: new LanguageModel({
          // Your language definitions here (optional).
          // You can leave out this prop if you want to use the default definitions.
        }),
        questions: [
          // QuestionModel array
          new QuestionModel({
            id: 'first_name',
            tagline: 'Hi! Welcome to our demo survey 😊',
            title: 'What is your first name?',
            type: QuestionType.Text,
            required: true,
            placeholder: 'Start typing here...'
          }),
          new QuestionModel({
            id: 'email',
            tagline: "Nice to meet you 👀, let's continue",
            title: 'Provide an example email.',
            type: QuestionType.Email,
            required: true,
            placeholder: 'Start typing here...'
          }),
          new QuestionModel({
            id: 'phone',
            title: 'Doing great! 👍 Go ahead and try with a phone number.',
            type: QuestionType.Phone,
            required: true,
            mask: '(###) ###-####'
          }),
          new QuestionModel({
            id: 'movies',
            title: 'List your favorite movies. 🍿',
            type: QuestionType.LongText,
            required: true,
            placeholder: 'Start typing here...'
          }),
          new QuestionModel({
            id: 'multiple_choice',
            tagline: 'FYI, You can always go back 👈, use the up arrow on the bottom.',
            title: 'Multiple choice question:',
            helpTextShow: false,
            type: QuestionType.MultipleChoice,
            multiple: false,
            allowOther: true,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Answer 1'
              }),
              new ChoiceOption({
                label: 'Answer 2'
               }),
              new ChoiceOption({
                label: 'Answer 3'
              })
            ]
          }),
          new QuestionModel({
            id: 'multiple_choices',
            title: 'Multiple choices question:',
            type: QuestionType.MultipleChoice,
            multiple: true,
            helpText: 'Select all that apply. 👇',
            required: true,
            options: [
              new ChoiceOption({
                label: 'Answer 1'
              }),
              new ChoiceOption({
                label: 'Answer 2'
              }),
              new ChoiceOption({
                label: 'Answer 3'
              }),
              new ChoiceOption({
                label: 'Answer 4'
              })
            ]
          }),
          new QuestionModel({
            id: 'break_1',
            title: 'Awesome, thank you. 🙏',
            content: 'You arrived at the section break of our little demo survey. To continue exploring, just press enter or use the continue button.',
            description: 'Note: We will take a look at our multiple path feature next.',
            type: QuestionType.SectionBreak
          }),
          new QuestionModel({
            id: 'choose_path',
            tagline: 'Where would you like to go? 🤔',
            title: 'Choose your path:',
            type: QuestionType.Dropdown,
            multiple: false,
            placeholder: 'Select',
            inline: true,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Path A'
              }),
              new ChoiceOption({
                label: 'Path B',
                value: 'path_b'
              })
            ],
            jump: {
              path_b: 'path_b'
            }
          }),
          new QuestionModel({
            id: 'path_a',
            title: 'Excellent choice! 🥳',
            content: 'Press enter or use the continue button for the final submit screen.',
            type: QuestionType.SectionBreak,
            jump: {
              _other: '_submit'
            }
          }),
          new QuestionModel({
            id: 'path_b',
            tagline: 'Path B',
            title: 'Hmm, are you sure?',
            helpText: 'Path A sounds like a winner! 😉',
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Ok, let\'s go with A',
                value: 'path_a'
              }),
              new ChoiceOption({
                label: 'Yes, finish the survey'
              })
            ],
            jump: {
              path_a: 'path_a'
            }
          })



        ]
      }
    }
  }
</script>

<style>
  /* Import Vue Flow Form base CSS */
  @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.css';
  /* Import one of the Vue Flow Form CSS themes (optional) */
  @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-minimal.css';
  /* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-green.css'; */
  /* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-purple.css'; */
</style>
