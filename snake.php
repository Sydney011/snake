<?php
$conn = mysqli_connect('localhost','root', ,'snake');
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";

?>
<!DOCTYPE html>

<head>
  <meta charset="UTF-8">
  <title>Wąż</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <div class="gameOver" style="display:none">
    <span id="oops">Oops! Game Over</span><spans>You&#39;ve Lost Sadge</span>
    <a href="" id="play">Play Again</a>
  </div>

  <button>Start</button>
  
  <script src="jquery-3.6.1.js"></script>
  <script src="mechanism.js"></script>
</body>

</html>