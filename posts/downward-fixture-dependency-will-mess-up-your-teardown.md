---
title: "downward fixture dependency will mess up your teardown"
slug: "downward-fixture-dependency-will-mess-up-your-teardown"
excerpt: "downward fixture dependency will mess up your pytest fixture teardown"
category: "testing"
date: "2026-05-27"
publishedAt: "2026-05-27"
metaDescription: ""
---

don't depend downward on pytest fixtures. what do I mean by that?

if you test your code (which I assume you actually do!) you'll find yourself needing
to provide some data or establish some state before your tests run — and to do that,
you create fixtures and request them in your tests. this is what they call the setup phase,
and after your tests run, your fixtures get torn down in order of their scope.

in case you are not aware, fixtures in pytest have a scope hierarchy: <br />

*function < class < module < package < session*

you can not for example have a module scoped fixture depending on a function scoped fixture. a fixture should depend on either its same scoped fixture or the higher scoped fixture above it.
sometimes, you might be tempted to do something close to this:

```
@pytest.fixture # function scoped by default
def user(db):
    user = db.create(email="tmp@test.com", role="user")
    yield user
    user.delete()

@pytest.fixture(scope="session")
def admin_client(user):
    return AdminClient(base_url="http://localhost", acting_as=user.id)
```
you want an *admin_client* across the whole test session(may be its expensive to spin up) and you are tempted to think that since you already have a *user* fixture why not hand it to this admin_client. this will just mess up the teardown phase of pytest fixtures. *user* fixture will be torn down on every test function that request it but *admin_client* is going to stay for the whole test session hence pytest will complain about fixture scope mismatch. instead, if a fixture depends on say a `function`-scoped fixture, it should itself be `function`-scoped and this applies going up too. in the above code, I would rather make a separate session scoped user fixture and leave function scoped user fixture for tests that need per-test isolation. 
```
@pytest.fixture(scope="session")
def session_user(db):
    user = db.create(email="tmp@test.com", role="user")
    yield user
    user.delete()

@pytest.fixture(scope="session")
def admin_client(session_user):
    return AdminClient(base_url="http://localhost", acting_as=session_user.id)
```
but then what if the user admin_client needs have to be fresh for each test (may be they have to have different roles, etc) well, then admin_client should be a function scoped as well. we would drop it down to function scoped and bear whatever the setup cost it takes.


ultimately, I think this hierarchy dependency makes sense and is kinda obvious too. I mean, would we have a module depending on an internal state of one of its callers? we can think of it in this way *the more tests a fixture is shared across, the less it should know about any individual test and depending downward messes that up.*
 
<span className="font-semibold rounded-sm">don't try to saw off the branch you're sitting on.</span> bye!