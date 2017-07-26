<html>
<head>
</head>
	<body>
		<script>
			window.foo = function(res) {
				alert(res);
			};

			var tag = document.createElement("script");
			tag.onload = function() {
				alert(1);
			}
			tag.src = 'data.php?callback=foo&ctrl=temp';

			document.getElementsByTagName("head")[0].appendChild(tag);
		</script>
	</body>
</html>