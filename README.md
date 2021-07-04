# Bashblog Tools

These tools take source markdown and can generate either markdown or HTML.

They are based on Remark / Unified and are mostly about doing stuff to code blocks via text processing tools you'll probably find on UNIX like operating systems.

## The main script

The main script is `matts-markdown` which accepts the following options

    -h = Help
    -m = output Markdown instead of HTML
    -b = the number to add to headers (could be negative), for example 2 makes a h1 into a h3

## Enhancements

### Copy Code Meta Hash Down

If you have a code block like:

    ```javascript # unixpipe node | wrap-as-lang
    console.log(1+1)
    ```

This will be changed into

    ```javascript
    console.log(1+1)
    ```

    ```unixpipe node | wrap-as-lang
    console.log(1+1)
    ```

This gives you a form of Jupyter Notebook like interaction where the source is one code block and the result can be got by running the meta from `unixpipe`

### Unixpipe

Unixpipe will run the contents of a code block through the meta of a codeblock (minus the keyword `unixpipe`

For example:

    ```unixpipe node | wrap-as-lang output
    console.log(1+1)
    ```

While Unixpipe will deal with multiple lines correctly, the above is equivelent to:

    echo 'console.log(1+1)' | node | wrap-as-lang output

where nodejs will output "2" to STDOUT and `wrap-as-lang` will read STDIN and wrap it in a code fence with the language "output"

The result will be:

    ```output
    2
    ```

### Overall

If we have the following markdown in "markdown.md":

    ```javascript # unixpipe node | wrap-as-lang output
    console.log(1+1)
    ```

And we run:

```bash
cat markdown.md | matts-markdown -m
```

We will get the following in STDOUT

    ```javascript
    console.log(1+1)
    ```

    ```output
    2
    ```

If we drop the `-m` parameter we will get:

    <pre><code class="language-javascript">console.log(1+1)
    </code></pre>
    <pre><code class="language-output">2
    </code></pre>
