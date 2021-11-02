 
<template>
  <div>
    <flow-form v-bind:questions="questions">
      <a href="/">xmr-donates</a> does not endorse any project it links here.
      This website is simply a refined collection of notable projects that
      accept Monero.

      <br />
      <br />
      Donation Address Validation Status:
      <ul id="status"></ul>

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
import projects from "../../assets/projects.json";

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
  beforeMount() {
    function getProjectsChildren(object) {
      if (Array.isArray(object)) return object;
      let children = [];
      Object.keys(object).forEach((child) => {
        children.push(...getProjectsChildren(object[child]));
      });
      return children;
    }

    function findAddress(project) {
      var x = new XMLHttpRequest();
      // This heroku cors-anywhere is required since you can't parse another webpage through browser Javascript (security reasons)
      // I host my own instance of https://github.com/Rob--W/cors-anywhere
      // If you're testng this locally, I have the instance throttled to 1 connection per minute for any address outside xmr-donate.web.app
      // ..So don't stress if you see lots of "429: Too Many Requests" errors.
      x.open(
        "GET",
        `https://dginovker-cors-anywhere.herokuapp.com/${project.url}`
      );

      x.onload = x.onerror = function () {
        var ul = document.getElementById("status");
        var li = document.createElement("li");

        let a = document.createElement("a");
        a.appendChild(document.createTextNode(project.name));
        a.href = project.url;

        let status = "";
        let displayAddress = false;
        if (!project.address) {
          status = `🟡 No address specified for `;
        } else if (project.manualVerify) {
          status = `🟣 Requires manual verification for `;
          displayAddress = true;
        } else if (x.status !== 200) {
          status = `🟠 Could not connect - Error "${x.status}: ${x.statusText}" for `;
        } else if (x.responseText.includes(project.address)) {
          status = `🟢 Verified address appears in the page for `;
        } else {
          status = `🔴 Did NOT find the address in the page for `;
          displayAddress = true;
        }

        li.appendChild(document.createTextNode(status));
        li.appendChild(a);
        if (displayAddress)
          li.appendChild(document.createTextNode(` - ${project.address}`));

        ul.appendChild(li);
      };
      x.send(project.url);
    }

    let projChildren = getProjectsChildren(projects);

    projChildren.forEach((project) => {
      findAddress(project);
    });
  },
};
</script>

<style lang="css">
@import "~@ditdot-dev/vue-flow-form/dist/vue-flow-form.css";
@import "~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-purple.css";
</style>
