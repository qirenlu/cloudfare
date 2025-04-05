export default {
  async fetch(request, env, ctx) {
    // 这是你提供的 Notion 页面链接（已公开）
    const notionUrl = 'https://www.notion.so/https-times1740911335-subtangniu-top-9606-v2b-catnet-api-v1-client-subscribe-token-10ac210b8932bd1-1cc019f2b448806a957de6b69db2fae8?pvs=4';

    try {
      // 获取 Notion 页面 HTML 内容
      const response = await fetch(notionUrl);
      const html = await response.text();

      // 提取第一个 https 开头的真实订阅链接
      const match = html.match(/https:\/\/[^\s"']+/);
      if (!match) {
        return new Response('未在 Notion 页面中找到订阅链接', { status: 500 });
      }

      const subUrl = match[0];

      // 请求真实订阅地址内容
      const subRes = await fetch(subUrl);
      const body = await subRes.text();

      // 返回内容并保留流量信息
      return new Response(body, {
        status: subRes.status,
        headers: {
          'content-type': subRes.headers.get('content-type') || 'text/plain',
          'subscription-userinfo': subRes.headers.get('subscription-userinfo') || '',
        },
      });
    } catch (err) {
      return new Response('请求失败：' + err.message, { status: 500 });
    }
  }
}
