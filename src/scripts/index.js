// ray test touch <
const url = 'https://wordpress.org';
const stragegy = 'mobile';
const psiEndpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&strategy=${stragegy}`;

const getPerformanceMetrics = async () => {
  console.log('[getPerformanceMetrics] started...');
  const response = await fetch(psiEndpoint);
  const responseJson = await response.json();
  // Lab metrics
  const lighthouse = responseJson.lighthouseResult;
  // TODO: constants
  const metrics = {
    'First Byte': lighthouse.audits['time-to-first-byte'].displayValue,
    'First Contentful Paint': lighthouse.audits['first-contentful-paint'].displayValue,
    'First Input Delay': lighthouse.audits['max-potential-fid'].displayValue,
    'Speed Index': lighthouse.audits['speed-index'].displayValue,
    'Time To Interactive': lighthouse.audits['interactive'].displayValue
  };

  let items = [];
  const screenshotDetails = lighthouse.audits['screenshot-thumbnails'].details;
  for (const item of screenshotDetails.items) {
    const dimensions = await getImageDimensions(item.data);

    items = [...items, {
      ...item,
      ...dimensions
    }];
  }
  screenshotDetails.items = items;

  console.log('[getPerformanceMetrics] ended...');
  console.log('ray : ***** metrics, screenshotDetails => ', metrics, screenshotDetails);
};

const getImageDimensions = file => {
  return new Promise ((resolved, rejected) => {
    const image = new Image();
    image.onload = function() {
      resolved({
        width: image.width,
        height: image.height
      });
    };
    image.src = file;
  });
};

try {
  getPerformanceMetrics();
} catch (error) {
  console.log('[scripts] error => ', error);
}
// ray test touch >