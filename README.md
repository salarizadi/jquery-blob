# jquery-blob
File address to blob, support all file formats

# Example

```js
 $.blob({
  url: "http://localhost/image.png",
  progress: percent => {
     console.log("Percent", percent)
  },
  loader : xhr => {
     console.log("Loading", xhr)
  },
  success: result => {
     console.log("Success : ", result)
  },
  error: xhr => {
     console.log("Error : ", xhr)
  }
})
```
