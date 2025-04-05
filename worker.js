export default {
  async fetch(request, env, ctx) {
    const githubUrl = 'https://www.notion.so/https-times1740911335-subtangniu-top-9606-v2b-catnet-api-v1-client-subscribe-token-10ac210b8932bd1-1cc019f2b448806a957de6b69db2fae8?pvs=4' + Date.now();

    const res = await fetch(githubUrl);
    const subUrl = (await res.text()).trim();

    const subRes = await fetch(subUrl);
    const body = await subRes.text();

    return new Response(body, {
      headers: {
        'content-type': subRes.headers.get('content-type') || 'text/plain',
        'subscription-userinfo': subRes.headers.get('subscription-userinfo') || '',
      },
    });
  },
};
