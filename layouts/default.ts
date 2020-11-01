import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  head() {
    return {
      meta: [
        { charset: 'utf-8' },
        {
          content: 'width=device-width,initial-scale=1,minimal-ui',
          name: 'viewport'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons'
        }
      ]
    };
  }
})
export default class DefaultLayout extends Vue {
  public name = 'Fill In App';
  public menuVisible = false;

  public toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }
}
