var cb = "<?php echo $_GET['callback'] ?>";
var ctrl = "<?php echo $_GET['ctrl'] ?>";

if(ctrl == 'temp') {
	
	eval(cb+'("37C")');
} else if(ctrl == 'time') {
	
	eval(cb+'("5:30")');
}
