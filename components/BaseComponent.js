export class BaseComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Attach HTML template
    const fetchString = window.location.href;
    fetch(fetchString + 'components/' +
      this.hyphenatedClassName() + '/' + this.hyphenatedClassName()
      + '.html')
      .then(templateFile => templateFile.text())
      .then(templateText => {
        if (document.getElementById(this.hyphenatedClassName()) == null)
          document.body.insertAdjacentHTML('beforebegin', templateText.replace('<template>', '<template id="' + this.hyphenatedClassName() + '">'))
      })
      .then(x => {
        const template = document.getElementById(this.hyphenatedClassName()).content;
        shadow.appendChild(template.cloneNode(true));
      });

    // Apply external styles to the shadow dom
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', 'components/' +
      this.hyphenatedClassName() + '/' + this.hyphenatedClassName() + '.css');
    shadow.appendChild(linkElem);
  }

  async fetchTemplate() {
    if (this.constructor.template) {
      return this.constructor.template;
    }

    const template = await fetch(fetchString + 'components/' +
      this.hyphenatedClassName() + '/' + this.hyphenatedClassName()
      + '.html').then(templateFile => templateFile.text())
    this.constructor.template = template
    return template
  }

  hyphenatedClassName() {
    /**
     * Splits current class name on capitals, joins with hyphen, 
     * and return lowercase string.
     */
    return this.constructor.name
      .match(/[A-Z][a-z]+/g).map(x => x.toLowerCase()).join("-");
  }
}