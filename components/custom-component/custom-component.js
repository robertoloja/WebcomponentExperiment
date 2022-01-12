import { BaseComponent } from "../BaseComponent.js";

class CustomComponent extends BaseComponent {
  static template = null;

  constructor() {
    super()
  }
}

customElements.define('custom-component', CustomComponent)