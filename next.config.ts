import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: './messages/tr.json'
  }
});

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.sfballet.org',
        port: '',
        pathname: '/app/uploads/**'
      }
    ]
  }
};

export default withNextIntl(config);
