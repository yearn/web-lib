#!/usr/bin/env bash

# Known variables
SRC='.'
DST='./dist'

# Add some missing files 😤
cp "$SRC/package.json" "$DST/package.json"
cp "$SRC/tailwind.config.cjs" "$DST/tailwind.config.cjs"
cp "$SRC/tailwind.plugin.cjs" "$DST/tailwind.plugin.cjs"
cp "$SRC/tailwind.theme.cjs" "$DST/tailwind.theme.cjs"
cp "$SRC/style.next.css" "$DST/style.next.css"
cp "$SRC/.eslintrc.cjs" "$DST/.eslintrc.cjs"
