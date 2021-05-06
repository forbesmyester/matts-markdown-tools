# GFM

## Autolink literals

```unixpipe csvtk csv2md
A,B,C
1,2,3
```
```shell # env NAME="World!" envsubst | wrap-as-lang shell # unixpipe env NAME="World!" envsubst | diagram-dot svg
  digraph {
    "Greeting" -> "Hello $NAME"
  }
```

## Tasklist

* [ ] to do
* [x] done

<style>
.literate-code *:not(:first-child) {
     background-color: red;
}
</style>
