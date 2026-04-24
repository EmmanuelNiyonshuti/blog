---
title: "generic TypeVar"
slug: "generic-typevar"
excerpt: "using generic TypeVar"
category: "python3"
date: "2026-04-15"
publishedAt: "2026-04-15"
---
```python3
import random
from typing import TypeVar

T = TypeVar("T")

def get_random(items: list[T]) -> T:
    return random.choice(items)

```

using generic `TypeVar` for type annotationing python code, here we expect a list of Generics (can be anything) but we are ensuring that there is some connection between the input and the output and our editor will be aware of that.
