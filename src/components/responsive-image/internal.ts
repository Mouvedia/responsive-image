export enum Qualifier {
  ldpi    = '0.75x',
  mdpi    = '1x',
  tvdpi   = '1.33x',
  hdpi    = '1.5x',
  xhdpi   = '2x',
  xxhdpi  = '3x',
  xxxhdpi = '4x'
}

export default {
  ratio: {
    ldpi: false,
    mdpi: '',
    tvdpi: false,
    hdpi: false,
    xhdpi: true,
    xxhdpi: true,
    xxxhdpi: true
  },
  whitelist: ['gif', 'png', 'webp', 'jpeg', 'jpg', 'jp2', 'jpg2', 'jpx', 'jpm', 'jxr', 'jxl', 'svg', 'svgz', 'avif', 'heif'],
  extensions: [
    'webp', // FF65+, CHR9+, OP11.5+, EDG18+
    'jxr',  // IE9+, EDG12+
    'jp2',  // Safari M5+
    'png'
  ]
}

export function getSubtype(ext) {
  switch (ext) {
    case 'jxr':
    case 'hdp':
    case 'wdp':
      return 'vnd.ms-photo';
    case 'svg':
    case 'svgz':
      return 'svg+xml';
    case 'jpg2':
      return 'jp2';
    case 'jpf':
      return 'jpx';
    case 'jpg':
    case 'jpe':
      return 'jpeg';
    case 'tif':
      return 'tiff';
    case 'mng':
      return 'x-mng';
    case 'jng':
      return 'x-jng';
    case 'hif':
      return 'heif';
    default:
      return ext;
  }
}
