import rnd from 'vanilla.js/random/hex';


export default function jaegerTracing($axios) {
  $axios.interceptors.request.use(
    (config) => {
      const traceId = rnd(16);
      const spanId = rnd(16);
      const parentSpanId = traceId;
      const flag = '01'; // TODO: sampling

      if (flag) {
        const header = 'uber-trace-id';
        config.headers.set(header, `${traceId}:${spanId}:${parentSpanId}:${flag}`); // eslint-disable-line no-param-reassign
      }

      return config;
    },
    null); // eslint-disable-line function-paren-newline
}
