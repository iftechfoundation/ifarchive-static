// Cloudflare "snippet" rule which applies the UK geoblock.
// Block applies if the origin country is UK ("GB" is the ISO code)
// and the file is in any of the named directories.
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

    const restrictprefixes = [
      '/if-archive/unprocessed/',
      '/if-archive/games/',
      '/if-archive/collections/',
      '/if-archive/rec.arts.int-fiction/',
      '/if-archive/rec.games.int-fiction/',
    ];

    // Clone the original URL so we can do stuff with it.
    const requesturl = new URL(request.url);
    const path = requesturl.pathname;

    let match = false;
    for (let prefix of restrictprefixes) {
      if (path.startsWith(prefix)) {
        match = true;
        break;
      }
    }
    if (!match) {
      return fetch(request);
    }

    // Original domain and protocol, new path.
    let responseurl = new URL('/misc/uk-block.html', requesturl);

    // Construct a redirect with the CORS header we need.
    let origresponse = Response.redirect(responseurl.href, 307);
    let response = new Response(origresponse.body, origresponse);
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  },
};
