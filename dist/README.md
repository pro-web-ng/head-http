@head/http
==

```javascript
$http.get(endpoint);
$http.get(endpoint, params);
$http.get(endpoint, params, headers);
$http.get(endpoint, null, headers);
$http.get(endpoint, params, headers, options);

$http.post(endpoint);
$http.post(endpoint, params, data);
$http.post(endpoint, null, data);
$http.post(endpoint, params, data, headers);
$http.post(endpoint, params, data, headers, options);
```

CHANGELOG
==

0.7.1
--

*BREAKING CHANGE*

0.6.1
--

1. 升级 axiox@1.3.6

0.5.1
--

1. 默认使用 `jaeger` 格式 `uber-trace-id`，暂时不提供开关
