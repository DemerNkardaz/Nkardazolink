
const MyComponent = Vue.extend({
  template: '<div>Это мой компонент!</div>'
});

let nkardazolink = new Vue({
    el: nk.rootContainer[0],
    data: {

    },
    methods: {

    },
    mounted() {
        console.log('Приложение успешно смонтировано');
    }
});


new Vue({
  render: function (createElement) {
    return createElement(MyComponent);
  }
}).$mount(nk.rootContainer[0]);