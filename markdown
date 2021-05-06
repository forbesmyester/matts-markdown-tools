#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

if [ "$#" -gt 0 ] && [[ "$1" != "--as-markdown" ]]; then
    CURRENT="$(cat "$1")"
elif test ! -t 0; then
    CURRENT="$(cat "/dev/stdin")"
else
    echo "Must be STDIN or \$1"
    exit 1
fi

SCRIPT_DIR="$(dirname "$0")"

while echo "$CURRENT" | grep '```.*#' > /dev/null ; do
    CURRENT="$(echo "$CURRENT" | node "$SCRIPT_DIR/remark-copy-code-meta-hash-down.js")"
done


while echo "$CURRENT" | grep '``` *unixpipe' > /dev/null ; do
    CURRENT="$(echo "$CURRENT" | node "$SCRIPT_DIR/remark-unixpipe.js")"
done

CURRENT="$(echo "$CURRENT" | node "$SCRIPT_DIR/code-import.js")"

if [ "$#" -gt "0" ] && [ "$1" == "--as-markdown" ]; then
    echo "$CURRENT"
    exit 0
fi

echo "$CURRENT" | node "$SCRIPT_DIR/rehype.js"
echo "" # BashBlog fails when there is no EOL on the last line
