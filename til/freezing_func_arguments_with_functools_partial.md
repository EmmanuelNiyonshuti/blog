---
title: "function with some of its argument values frozen"
slug: "new-version-of-a-function-with-some-of-its-arguments-values-frozen"
excerpt: "functools.partial - to create a new version of a function with some of its arguments values frozen"
category: "python3"
date: "2026-04-8"
publishedAt: "2026-04-8"
metaDescription: "functools.partial - to create a new version of a function with some of its arguments values frozen"
---
consider this coroutine function:
```python3
async def run_in_threadpool(func: Callable[P, T], *args: P.args, **kwargs: P.kwargs) -> T:
    func = functools.partial(func, *args, **kwargs)
    return await anyio.to_thread.run_sync(func)
```
I actually got this coroutine function from [starlette](https://github.com/Kludex/starlette/blob/main/starlette/concurrency.py) and based on my limited knowledge of asgi frameworks, this is a coroutine function that will run a sync callable `func` in a thread pool so it doesn't block or hog the event loop. in other words, if you for example create a sync endpoint, starlette does not have any problem handling it. it detects that the endpoint is not an `async callable` and then run it in a thread pool instead.

and what role doth`functools.partial` serve in this affair? 
`func = functools.partial(func, *args, **kwargs)`

this is a higher order function, in my [environment configurations with pydantic settings](https://blog.niyonshutiemmanuel.com/blog/loading-and-dealing-with-environment-configurations-using-pydantic-settings) blog, I used `@lru_cache()` to cache loaded env configs so i don’t keep reading from the env file every time. so these higher-order functions either take functions as input or return new ones.

what `partial` is doing here is creating a new callable, a [partial object](https://docs.python.org/3/library/functools.html#partial-objects) where the arguments we passed are already attached to it. when starlette calls it in `run_sync`, it doesn’t need to pass anything again, it just runs the function with those saved arguments.
