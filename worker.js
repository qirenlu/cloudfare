export default {
  async fetch(request, env, ctx) {
    const githubUrl = 'https://cdn.jsdelivr.net/gh/你的用户名/你的仓库名@main/latest.txt?t=' + Date.now();

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
