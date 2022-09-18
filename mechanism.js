var direction = 'right',
  speed = 150,
  ticker = null,
  fruitCell = [],
  score = 0,
  size = 25;

var snakeCells = [
  [2, 2]
];
var snakeHead = [2, 2];

function renderSnake() {
  $('td').removeClass('snakeCell snakeHead');
  for (var cell in snakeCells) {
    $('tr').eq(snakeCells[cell][0]).find('td').eq(snakeCells[cell][1]).addClass('snakeCell');
  }
  $('tr').eq(snakeHead[0]).find('td').eq(snakeHead[1]).addClass('snakeHead');
}

function getFruitCell() {
  fruitCell = [getRandomNumber($('tr').length), getRandomNumber($('tr:eq(0)>td').length)];
}
function gameOver() {
  $("div.gameOver").fadeTo("slow", 1);
  $("div.gameOver").animate({ bottom: '500px' }, "slow");
  clearInterval(ticker);
}

function updateSnakeCell() {
  var snakeNewHead = [];
  switch (direction) {
    case 'right':
      snakeNewHead = [snakeHead[0], snakeHead[1] + 1];
      break;
    case 'left':
      snakeNewHead = [snakeHead[0], snakeHead[1] - 1];
      break;
    case 'up':
      snakeNewHead = [snakeHead[0] - 1, snakeHead[1]];
      break;
    case 'down':
      snakeNewHead = [snakeHead[0] + 1, snakeHead[1]];
      break;
  }
  var newCell = {
    length: 0
  }
  if ((snakeNewHead[0] < 0 || snakeNewHead[1] < 0)|| (snakeNewHead[0] >= size || snakeNewHead[1] >= size)) {
    $(document).ready(function () {
      $('table').hide('slow');
      $('#scoreBoard').hide('slow');
      $('div.gameOver').append('<div class="final">You&#39;ve Scored : '+score+'</div>');
    });
    gameOver()
    return;
  } 
  var newCell = $('tr').eq(snakeNewHead[0]).find('td').eq(snakeNewHead[1]);
  if((newCell.length == 0)||(newCell.hasClass('snakeCell'))){
    $(document).ready(function () {
      $('table').hide('slow');
      $('#scoreBoard').hide('slow');
      $('div.gameOver').append('<div class="final">You&#39;ve Scored : '+score+'</div>');
    });
    gameOver();
  }else {
      if (newCell.hasClass('fruitCell')) {
        snakeCells.push([]);
        getFruitCell();
        renderFruitCell();
        score += 10;
        $('#scoreBoard').html('Your Score : ' + score);
        
        speed = speed - 2 > 50 ? speed - 4 : speed;
        
        clearInterval(ticker);
        startGame();
      }
      for (var i = (snakeCells.length - 1); i > 0; i--) {
        snakeCells[i] = snakeCells[i - 1];
      }
      snakeCells[0] = snakeHead = snakeNewHead;
      renderSnake();
    }
  }


function getRandomNumber(limit) {
  return parseInt(Math.random() * limit % limit);
}

function getNewDirection(keyCode) {
  var codes = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  if (typeof codes[keyCode] != 'undefined') {
    var newDirection = codes[keyCode],
      changeDirection = true;
    switch (direction) {
      case 'up':
        changeDirection = newDirection != 'down';
        break;
      case 'down':
        changeDirection = newDirection != 'up';
        break;
      case 'right':
        changeDirection = newDirection != 'left';
        break;
      case 'left':
        changeDirection = newDirection != 'right';
        break;
    }
    direction = changeDirection ? newDirection : direction;
  }
}

function renderBoard() {
  var rowhtml = '';
  for (var i = 0; i < size; i++) {
    rowhtml += '<td cellpadding="0" cellspacing="0"></td>'
  }
  html = [];
  for (var i = 0; i < size; i++) {
    html.push('<tr cellpadding="0" cellspacing="0">' + rowhtml + '</tr>');
  }
  $('#scoreBoard').after('<table id="gamefield">' + html.join('\n') + '</table>');
  getFruitCell();
}

function renderFruitCell() {
  $('td').removeClass('fruitCell');
  $('tr').eq(fruitCell[0]).find('td').eq(fruitCell[1]).addClass('fruitCell');
}

function startGame() {
  ticker = setInterval(updateSnakeCell, speed);
}

$('button').click(function () {
  $('body').append('<div id="scoreBoard">Your Score : </div>')
  renderBoard();
  renderFruitCell();
  $(document).bind('keydown', function (e) {
    getNewDirection(e.keyCode);
  });
  startGame();
  $('table').click();
});
$('button').click(function () {
  $(this).fadeOut('fast');
});

