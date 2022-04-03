# puzzleCaptcha

Puzzle captcha is a simple front end based alternative for google Recaptcha which will challenge the automated programs with simple puzzles.

Add this HTML tag before the submit button of your form
```HTML
  <div id="puzzle-captcha"></div>
```
Files to be linked 
-<link rel="stylesheet" href="src/puzzlecaptcha.css">
-<script type="text/javascript" src="src/puzzlecaptcha.js"></script>

Verify before submitting your form using
  ```JS
    isPuzzleCaptchaSolved()
  ```

Some screenshots

![image](https://user-images.githubusercontent.com/46297277/161434957-6cade10e-b337-461a-bff8-8051555c34e4.png)

![image](https://user-images.githubusercontent.com/46297277/161434974-cec4f24a-ad7e-43c7-9f01-c88a5eefa952.png)


This captcha program is not suitable for the website to protect some important forms from highly advanced automation 
