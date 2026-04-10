---
title: "PyPI Trusted Publishing with OpenID Connect and GitHub Actions"
slug: "pypi-trusted-publishing-with-openid-connect-and-github-actions"
excerpt: "PyPI Trusted publishing with OpenID Connect and GitHub Actions"
category: "GitHub Actions"
date: "2026-04-05"
publishedAt: "2026-04-05"
---

When I published my [first package](https://pypi.org/project/whatdeps/) on PyPi I used twine and manually entered my API key each time. Later I learned that you can publish automatically by pushing a version tag to GitHub and letting a GitHub Action handle authentication and upload with no stored credentials, thanks to PyPI's OpenID Connect trusted publishing.
```yaml
name: Publish

on:
  push:
    tags:
      - "v*.*.*"

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ['3.10', '3.11', '3.12', '3.13', '3.14']
    steps:
      - uses: actions/checkout@v4

      - name: Install uv
        uses: astral-sh/setup-uv@v4

      - name: Install tox
        run: uv tool install tox --with tox-uv

      - name: Install Python
        run: uv python install ${{ matrix.python-version }}

      - name: Run tests
        run: tox -e ${{ matrix.python-version }}

  publish:
    needs: test
    runs-on: ubuntu-latest
    environment: pypi
    permissions:
      id-token: write
    steps:
      - uses: actions/checkout@v4

      - name: Install uv
        uses: astral-sh/setup-uv@v4

      - name: Build
        run: uv build

      - name: Publish to PyPI
        uses: pypa/gh-action-pypi-publish@release/v1
```

`id-token: write` is required here because GitHub needs permission to mint a short-lived OIDC token that proves this specific Actions job is who it claims to be. PyPI verifies that token directly with GitHub, no API key or password ever touches this workflow.

You need to configure trusted publishing on the PyPI side once (under your project's Publishing settings), telling it which GitHub repo and workflow is allowed to publish. After that, pushing a tag like `v0.1.0` runs tests across all target Python versions and publishes automatically if they pass. Works for both new and existing PyPI projects.