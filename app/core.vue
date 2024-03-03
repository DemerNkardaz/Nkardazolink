<script>
window.VueApp = function() {
  const app = new Vue({
    el: '[container="root"]',
    data: window.languageJSON[window.global_selected_language],
    watch: {
      global_selected_language(newValue) {
        this.$data = window.languageJSON[newValue];
      }
    }
  });
}
</script>
