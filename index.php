<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html;charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="" />
	<meta name="keywords" content="" />
	<meta name="language" content="en-us" />

	<meta property="og:title" content="Run Difya Run" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="http://difya.in/img/og.jpg" />
	<meta property="og:description" content="Game" />


	<title>Run Difya Run</title>
	<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600' rel='stylesheet' type='text/css'>
	<link href='https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,600' rel='stylesheet' type='text/css'>
	<!--<script src="js/jquery.min.js"></script>-->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<script  type="text/javascript" src="js/snap.svg.min.js"></script>
	<script  type="text/javascript" src="js/velocity.min.js"></script>
	<script  type="text/javascript" src="js/script.js"></script>
	<style type="text/css">
		html, body {
			font-family: 'Open Sans';
			font-size: 12px;
			margin: 0;
		}
	</style>
</head>
<body>
	<svg id="svg" style="display: none; width: 1000px; height: 400px; background-image: url(img/sky.jpg); background-repeat: repeat-x; background-size: 1px 100%;" >

<?php require "clouds.php"; ?>
<?php require "terrain.php"; ?>
<?php require "crate_sree.php"; ?>
<?php require "sree.php"; ?>
<?php require "crate_div.php"; ?>
<?php require "div.php"; ?>
<?php require "tips.php"; ?>
<?php require "restart.php"; ?>
<?php require "magic.php"; ?>

	</svg>
<audio id="loop-paavada" preload="auto" controls="false" loop="true" style="visibility: hidden; position: absolute; right: 100%;">
    <source src="paavada.ogg" type="audio/ogg" />
</audio>
<audio id="loop-fin" preload="auto" controls="false" style="visibility: hidden; position: absolute; right: 100%;">
    <source src="fin.ogg" type="audio/ogg" />
</audio>
<audio id="loop-dead" preload="auto" controls="false" style="visibility: hidden; position: absolute; right: 100%;">
    <source src="dead.ogg" type="audio/ogg" />
</audio>
<audio id="loop-blop" preload="auto" controls="false" style="visibility: hidden; position: absolute; right: 100%;">
    <source src="blop.ogg" type="audio/ogg" />
</audio>
	<script>
		game.init();
	</script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-93032117-1', 'auto');
  ga('send', 'pageview');

</script>
</body>
</html>