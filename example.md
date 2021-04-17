# GFM

## Autolink literals

www.example.com, https://example.com, and contact@example.com.

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| AA \| BB | CCCC  | DDDD | EEEE |
| - | :- | -: | :-: |
| 3 | 3  |  4 |  5  |

## Three Cows

```unixpipe echo cows | cowsay | sed 's/^/    /' # unixpipe echo three | cowsay | sed 's/^/    /' # unixpipe echo hello | cowsay | sed 's/^/    /'
```

## Literate Code

<div class="literate-code">

```unixpipe env NAME="World" envsubst | sed 's/^/    /'
Hello ${NAME}
```

</div>


## Tasklist

* [ ] to do
* [x] done

<style>
.literate-code *:not(:first-child) {
     background-color: red;
}
</style>
