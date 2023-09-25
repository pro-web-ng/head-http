@head/http
==

```javascript
$http.get(endpoint);
$http.get(endpoint, query);
$http.get(endpoint, query, options);
$http.get(endpoint, null, options);

$http.post(endpoint);
$http.post(endpoint, form);
$http.post(endpoint, query, form);
$http.post(endpoint, query, form, options);
$http.post(endpoint, null, form, options);
```

CHANGELOG
==

0.6.1
--

1. 升级 axiox@1.3.6

0.5.1
--

1. 默认使用 `jaeger` 格式 `uber-trace-id`，暂时不提供开关

0.4.0
--

1. 显式支持了 `query` 和 `data` 的语法糖
