import { newE2EPage } from '@stencil/core/testing';
import { ResponsiveImage } from './image';

describe('responsive-image', () => {

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('should validate fallback extensions in a case-insensitive way', () => {
    const img = new ResponsiveImage(),
          // @ts-ignore
          fn  = img.validateExt.bind(img);

    img.extensions = ['bmP'];
    expect(fn).toThrow();
    img.whitelist = ['bMp'];
    expect(fn).not.toThrow();
  });

  it('should render', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <responsive-image name="foo" text="bar" ratio='{"mdpi":"@1x"}'></responsive-image>
    `);

    const el = await page.find('responsive-image');
    expect(el).toEqualHtml(`
      <responsive-image name="foo" text="bar" class="hydrated" ratio="{&quot;mdpi&quot;:&quot;@1x&quot;}"><picture>
        <!--[if IE 9]><video style="display: none;"><![endif]-->
        <source srcset="foo@1x.webp 1x,foo@2x.webp 2x,foo@3x.webp 3x,foo@4x.webp 4x" type="image/webp">
        <source srcset="foo@1x.jxr 1x,foo@2x.jxr 2x,foo@3x.jxr 3x,foo@4x.jxr 4x" type="image/vnd.ms-photo">
        <source srcset="foo@1x.jp2 1x,foo@2x.jp2 2x,foo@3x.jp2 3x,foo@4x.jp2 4x" type="image/jp2">
        <source srcset="foo@1x.png 1x,foo@2x.png 2x,foo@3x.png 3x,foo@4x.png 4x" type="image/png">
        <!--[if IE 9]></video><![endif]-->
        <img alt="bar">
      </picture></responsive-image>
    `);
  });

});
