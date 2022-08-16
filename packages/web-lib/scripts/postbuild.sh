#!/usr/bin/env bash

# Known variables
SRC='.'
DST='./dist'

# Add some missing files 😤
cp "$SRC/config/tailwind.config.cjs" "$DST/tailwind.config.cjs"
cp "$SRC/config/tailwind.plugin.cjs" "$DST/tailwind.plugin.cjs"
cp "$SRC/config/tailwind.theme.cjs" "$DST/tailwind.theme.cjs"
cp "$SRC/build.css" "$DST/build.css"
cp "$SRC/style.css" "$DST/style.css"
cp "$SRC/style.light.css" "$DST/style.light.css"
cp "$SRC/style.dark.css" "$DST/style.dark.css"
cp "$SRC/style.next.css" "$DST/style.next.css"
cp "$SRC/style.macarena.css" "$DST/style.macarena.css"
cp -r "$SRC/fonts" "$DST/fonts"
