<?php
$conn = mysqli_connect('localhost','root','','snake');
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
echo "<br>";
$sql = "SELECT id, nick, score FROM scoreboard ORDER BY score DESC";
$result = $conn->query($sql);
$i = 0;
?>
<!DOCTYPE html>

<head>
  <meta charset="UTF-8">
  <title>Wąż</title>
  <link rel="stylesheet" href="style.css">
</head>

<body class="dark light">
  <div class="themeChanger">
  <button onclick="LightMode()">Change Theme</button>
  </div>
  <div class="gameOver" style="display:none">
    <span id="oops">Oops! Game Over</span>
    <span>You&#39;ve Lost Sadge</span>
    <input type="text" name="nick" id="nick" placeholder="Your nick">
    <a href="" id="submit">Submit Score</a>
    <a href="" id="play">Play Again</a>
  </div>
  <div class="BestScores">
    <div class='scoreboardTitle'>
      SCOREBOARD
    </div>
<hr>
    <ol>
      <?php
      if ($result->num_rows > 0) {
        while(($row = $result->fetch_assoc())&& $i < 10) {         
          echo "<li><div class='grid-item'>Nick: ".$row["nick"]."</div><div class='grid-item'>Score: ".$row["score"]."</div></li>";
          $i += 1;
        }
      } else {
        echo "0 results";
      }
    ?>
    </ol>
  </div>
<<<<<<< HEAD

  <button id="start">Start</button>
=======
  
  <button id="start">Start</button>
>>>>>>> 6d5ec766c0ec73ef6e55141c724d933f77c3ca92

  <script src="jquery-3.6.1.js"></script>
  <script src="mechanism.js"></script>
  <script type="text/javascript">
    function LightMode(){
    var element = document.body;
    if(element.classList == "dark"){
        element.classList = "light";
    }else{
        element.classList = "dark";
    }
}
  </script>
</body>

</html>