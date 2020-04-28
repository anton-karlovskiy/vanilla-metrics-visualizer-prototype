// ray test touch <
const url = 'https://wordpress.org';
const apiCall = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}`;
fetch(apiCall)
  .then(response => response.json())
  .then(json => {
    // Lab metrics
    const lighthouse = json.lighthouseResult;
    // TODO: constants
    const lighthouseMetrics = {
      'First Byte': lighthouse.audits['time-to-first-byte'].displayValue,
      'First Contentful Paint': lighthouse.audits['first-contentful-paint'].displayValue,
      'First Input Delay': lighthouse.audits['max-potential-fid'].displayValue,
      'Speed Index': lighthouse.audits['speed-index'].displayValue,
      'Time To Interactive': lighthouse.audits['interactive'].displayValue
    };

    const lighthouseScreenshotThumbnails = lighthouse.audits['screenshot-thumbnails'].details.items;

    console.log('ray : ***** lighthouseMetrics, lighthouseScreenshotThumbnails => ', lighthouseMetrics, lighthouseScreenshotThumbnails);
});
// ray test touch >