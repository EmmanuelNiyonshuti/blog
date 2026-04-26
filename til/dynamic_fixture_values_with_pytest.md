---
title: "dynamic access to async fixture value within async test"
slug: "dynamic-access-to-async-fixture-value-within-async-test"
excerpt: "dynamically accessing async fixture value from within async test"
category: "testing"
date: "2026-04-26"
publishedAt: "2026-04-26"
---

```shell
import pytest

pytestmark = pytest.mark.anyio

@pytest.fixture
def anyio_backend():
    return "asyncio"

@pytest.fixture
async def foo():
    return "foo"

async def test_something(request, foo):
    assert request.getfixturevalue('foo') == "foo"

```
As it turns out, this would not be possible if we didn't declare the `foo` fixture parameter inside our async test. By declaring it, anyio will run foo during test setup in `run_until_complete`, and later on when we try to access it in the test, it will be retrieved from the cache. Otherwise (if we didn't explicitly declare it for some reason), it will try to re-enter an already running event loop and we will hit a `RuntimeError`. this specific case is not yet supported in either anyio or pytest-asyncio.
