---
title: "forcing positional and keyword arguments in a python function"
slug: "forcing-positional-and-keyword-arguments-in-a-python-function"
excerpt: "forcing positional and keyword arguments in a python function"
category: "python3"
date: "2026-04-3"
publishedAt: "2026-04-3"
metaDescription: ""
---

consider this arbitrary function:

```python3
def f(user_id: str, /, message, *, channel: str) -> bool:
    pass
```
`/` means everything to its left must be passed positionally. so `user_id` cannot be passed as a keyword argument
```python3
f("123", "hello", channel="general")     # ok
f(user_id="123", message="hello", channel="general")  # TypeError
```

 `message` is a normal argument. you can pass it positionally or as a keyword.
 `*` means everything to its right must be passed as keyword arguments.
 ```python3
f("123", "hello", channel="general")     # ok
f(user_id="123", message="hello", channel="general")  # TypeError
```

You violate these rules and python raises a TypeError `TypeError`