// Cloudflare "snippet" rule which applies the UK geoblock.
// Block applies if the origin country is UK ("GB" is the ISO code),
// the request is to the ukrestrict domain, and the path is in the
// "/if-archive" tree.
//
// If so, we do a 307 redirect to the uk-block page, and
// include a CORS header so this redirect is legible to (say)
// Parchment.

export default {
  async fetch(request) {
    // more on the request.cf object:
    // https://developers.cloudflare.com/workers/runtime-apis/request#properties

    if (request.cf.country != 'GB' && request.headers.get('X-IFArchive-PretendCountry') != 'GB') {
      return fetch(request);    
    }

    // Clone the original URL so we can do stuff with it.
    const requesturl = new URL(request.url);
    const path = requesturl.pathname;

    if (requesturl.hostname != 'ukrestrict.ifarchive.org') {
      return fetch(request);
    }
    if (!path.startsWith('/if-archive/')) {
      return fetch(request);
    }

    // Redirect to the root domain's block page.
    let responseurl = new URL('https://ifarchive.org/misc/uk-block.html');

    // Construct a redirect with the CORS header we need.
    let origresponse = Response.redirect(responseurl.href, 307);
    let response = new Response(origresponse.body, origresponse);
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  },
};
