import { BaseComponent } from "../BaseComponent.js";

class CustomComponent extends BaseComponent {
  constructor() {
    super()
  }
}

customElements.define('custom-component', CustomComponent)