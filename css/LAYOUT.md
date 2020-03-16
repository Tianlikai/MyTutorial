# 前端布局

## CSS 居中方法

1. position: absolute; + - margin

```HTML
<!DOCTYPE html>
<html>
  <head>
    <style>
      .wp {
        position: relative;
        height: 300px;
        width: 300px;
        background-color: yellow;
      }
      .box {
        height: 100px;
        width: 100px;
        background: skyblue;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -50px;
        margin-left: -50px;
      }
    </style>
  </head>
  <body>
    <div class="wp">
      <div class="box">hello</div>
    </div>
  </body>
</html>
```

2. position: absolute; margin: auto;

```HTML
<!DOCTYPE html>
<html>
  <head>
    <style>
      .wp {
        position: relative;
        height: 300px;
        width: 300px;
        background-color: yellow;
      }
      .box {
        height: 100px;
        width: 100px;
        background: skyblue;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
      }
    </style>
  </head>
  <body>
    <div class="wp">
      <div class="box">hello</div>
    </div>
  </body>
</html>
```

3. position: absolute; + translate(-50%, -50%);

```HTML
<!DOCTYPE html>
<html>
  <head>
    <style>
      .wp {
        position: relative;
        height: 300px;
        width: 300px;
        background-color: yellow;
      }
      .box {
        height: 100px;
        width: 100px;
        background: skyblue;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <div class="wp">
      <div class="box">hello</div>
    </div>
  </body>
</html>
```

4. line-height

```HTML
<!DOCTYPE html>
<html>
  <head>
    <style>
      .wp {
        position: relative;
        height: 300px;
        width: 300px;
        background-color: yellow;
        line-height: 300px;
        text-align: center;
        font-size: 0px;
      }
      .box {
        height: 100px;
        width: 100px;
        background: skyblue;
        display: inline-block;
        vertical-align: middle;
        line-height: initial;
        text-align: left; /* 修正文字 */
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div class="wp">
      <div class="box">hello</div>
    </div>
  </body>
</html>
```

5. flex

```HTML
<!DOCTYPE html>
<html>
  <head>
    <style>
      .wp {
        position: relative;
        height: 300px;
        width: 300px;
        background-color: yellow;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .box {
        height: 100px;
        width: 100px;
        background: skyblue;
      }
    </style>
  </head>
  <body>
    <div class="wp">
      <div class="box">hello</div>
    </div>
  </body>
</html>
```

## 两栏布局

```CSS
.wrap {
    overflow: hidden;
}
.left {
    float: left;
}
.right {
    overflow: hidden;
}
```
