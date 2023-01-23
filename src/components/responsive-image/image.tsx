import { Component, Prop, h } from '@stencil/core';
import init, { Qualifier, getSubtype } from './internal';

@Component({
  tag: 'responsive-image'
})
export class ResponsiveImage {

  // path prefix
  @Prop() path: { [qualifier in keyof Qualifier]: string } | string = '';

  // file name
  @Prop() name!: string;

  // pixel density
  @Prop() ratio: { [qualifier in keyof Qualifier]: boolean | string } | string;

  // replacement text
  // https://www.w3.org/WAI/tutorials/images/decorative/
  @Prop() text: string = '';

  // whitelisted extensions
  @Prop() whitelist = init.whitelist;

  // sources' extensions
  @Prop() extensions = init.extensions;

  private processObject(name, target?) {
    let value = this[name],
        isStr = typeof value === 'string';

    if (isStr) {
      try {
        value = JSON.parse(value);
      } catch (e) {}
      if (typeof value === 'string')
        return;
    }

    if (target)
      this[name] = Object.assign(target, value);
    else if (isStr)
      this[name] = value;
  }

  private processArray(name) {
    let value = this[name];

    if (!Array.isArray(value))
      this[name] = JSON.parse(value);
  }

  private processMutable() {
    this.processArray('whitelist');
    this.processArray('extensions');
    this.processObject('path');
    this.processObject('ratio', init.ratio);
  }

  private validateExt() {
    const list = this.whitelist.map(Function.prototype.call, String.prototype.toLowerCase);

    this.extensions.map(ext => {
      if (!list.includes(ext.toLowerCase()))
        throw new Error(`${ext} is not part of the whitelisted extensions.`);
    });
  }

  componentWillLoad() {
    this.processMutable();
    this.validateExt();
  }

  componentWillUpdate() {
    this.componentWillLoad();
  }

  private getSrcset(ext) {
    var srcset     = '',
        commonPath = this.path !== Object(this.path);

    // @ts-ignore
    for (const key in this.ratio) {
      const value  = this.ratio[key],
            ratio  = Qualifier[key],
            suffix = value === true ? '@' + ratio : value,
            prefix = commonPath ? this.path : this.path[key] || '';

      if (value === false)
        continue;
      if (srcset)
        srcset += ',';
      srcset += `${prefix}${this.name}${suffix}.${ext} ${ratio}`;
    }
    return srcset;
  }

  private getSources() {
    var sources = '';

    for (const ext of this.extensions) {
      if (sources) sources += '\n';
      sources += `<source srcset="${this.getSrcset(ext)}" type='image/${getSubtype(ext)}'>`;
    }
    return sources;
  }

  render() {
    return (
      <picture innerHTML={`
        <!--[if IE 9]><video style="display: none;"><![endif]-->
        ${this.getSources()}
        <!--[if IE 9]></video><![endif]-->
        <img alt="${this.text}">
      `}>
      </picture>);
 }
}
