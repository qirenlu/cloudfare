export default {
  async fetch(request, env, ctx) {
    // Notion 页面分享链接
    const notionPageUrl = 'https://www.notion.so/https-times1740911335-subtangniu-top-9606-v2b-catnet-api-v1-client-subscribe-token-10ac210b8932bd1-1cc019f2b448806a957de6b69db2fae8?pvs=4';

    // 获取 Notion 页面内容
    const response = await fetch(notionPageUrl);
    const html = await response.text();

    // 从页面内容中提取订阅链接
    const match = html.match(/https:\/\/[^\s"']+/);
    if (!match) {
      return new Response('未找到订阅链接', { status: 500 });
    }
    const subscriptionUrl = match[0];

    // 获取订阅内容
    const subscriptionResponse = await fetch(subscriptionUrl);
    const subscriptionContent = await subscriptionResponse.text();

    // 返回订阅内容
    return new Response(subscriptionContent, {
      headers: {
        'Content-Type': 'application/octet-stream',
        // 保留订阅信息的头部字段
        'subscription-userinfo': subscriptionResponse.headers.get('subscription-userinfo') || '',
      },
    });
  },
};
