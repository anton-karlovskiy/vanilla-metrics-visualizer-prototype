// ray test touch <
const url = 'https://wordpress.org';
const apiCall = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&strategy=mobile`;

const getPerformanceMetrics = async () => {
  console.log('[getPerformanceMetrics] started...');
  const response = await fetch(apiCall);
  const responseJson = await response.json();
  // Lab metrics
  const lighthouse = responseJson.lighthouseResult;
  // TODO: constants
  const lighthouseMetrics = {
    'First Byte': lighthouse.audits['time-to-first-byte'].displayValue,
    'First Contentful Paint': lighthouse.audits['first-contentful-paint'].displayValue,
    'First Input Delay': lighthouse.audits['max-potential-fid'].displayValue,
    'Speed Index': lighthouse.audits['speed-index'].displayValue,
    'Time To Interactive': lighthouse.audits['interactive'].displayValue
  };

  let lighthouseScreenshots = [];
  const screenshots = lighthouse.audits['screenshot-thumbnails'].details.items;
  for (const screenshot of screenshots) {
    const dimensions = await getImageDimensions(screenshot.data);

    lighthouseScreenshots = [...lighthouseScreenshots, {
      ...screenshot,
      ...dimensions
    }];
  }

  console.log('[getPerformanceMetrics] ended...');
  console.log('ray : ***** lighthouseMetrics, lighthouseScreenshots => ', lighthouseMetrics, lighthouseScreenshots);
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