var game_div = {
	imgs: [],
	groups: [],
	s: null,
	height: null,
	width: null,
	cord: {
		x: null,
		y: null,
		x_init: 200,
		y_init: 400,
		walk_ratio: null,
		jump_ratio: null,
		breath_ratio: null,
		blink_ratio: null,
		x_body: null,
		y_body: null,
		x_head: null,
		y_head: null,
		x_left_shoulder: null,
		y_left_shoulder: null,
		x_left_joint: null,
		y_left_joint: null,
		x_right_joint: null,
		y_right_joint: null,
		x_collision: false,
		y_collision: false,
		on_floor: true,
	},
	action: {
		walk: false,
		run: false,
		jump: false,
		jump_y: 0,
		dir: 1,
	},
	step: { // step
		breath: 0,
		breath_multiplier: 1,
		blink: 0,
		walk: 0,
		jump: 0,
	},
	step_length: { // step count max
		breath: 40,
		breath_multiplier: 5,
		blink: 4,
		blink_skip: 30, // skip multiplier
		walk: 10,
		jump: 4,
	},
	step_distance: { // pixel count
		breath: 1,
		body: 10,
		walk: 160,
		run: 200,
		jump: 300,
	},
	path: [],
	div_hand_right_lower: function() {

		// 22.1 x 34.4
		
		var path = game_div.s.select('#div_hand_right_lower');

		var angle = 0;
		if(game_div.action.jump) {
			angle = -120;
		} else if(game_div.action.walk || game_div.action.run || game_div.step.walk%game_div.step_length.walk != 0) {
			angle = -60;
		}
		var x = 0 + game_div.cord.x_right_joint;
		var y = 0 + game_div.cord.y_right_joint;

		matrix = new Snap.Matrix();
		matrix.translate(x, y);
		matrix.rotate(angle, 94, 152);
		path.transform(matrix);
	},
	div_hand_left_lower: function() {

		// 25.3 x 41.9

		var path = game_div.s.select('#div_hand_left_lower');

		var angle = 0;
		if(game_div.action.jump) {
			angle = 120;
		} else if(game_div.action.walk || game_div.action.run || game_div.step.walk%game_div.step_length.walk != 0) {
			angle = -60;
		}
		var x = 0 + game_div.cord.x_left_joint;
		var y = 0 + game_div.cord.y_left_joint;

		matrix = new Snap.Matrix();
		matrix.translate(x, y);
		matrix.rotate(angle, 30.5, 151);
		path.transform(matrix);

	},
	div_hand_right_upper: function() {

		// 23.3 x 40.3
		
		var path = game_div.s.select('#div_hand_right_upper');

		var angle = 0;

		if(game_div.action.jump) {
			angle = -45;
		} else if(game_div.action.walk || game_div.action.run) {
			angle = Math.sin(game_div.cord.walk_ratio*2*Math.PI)*(game_div.action.run?30:10);
		}
		var x = 0;
		var y = Math.sin(game_div.cord.breath_ratio*Math.PI)*game_div.step_distance.breath;

		matrix = new Snap.Matrix();
		matrix.translate(x, y);

		game_div.cord.x_left_shoulder = 84;
		game_div.cord.y_left_shoulder = 122;
		matrix.rotate(angle, game_div.cord.x_left_shoulder, game_div.cord.y_left_shoulder);
		path.transform(matrix);

		var radius = 28;
		game_div.cord.x_right_joint = -Math.sin(angle*(Math.PI/180))*radius;
		game_div.cord.y_right_joint = Math.cos(angle*(Math.PI/180))*radius-radius;

	},
	div_hand_left_upper: function() {

		// 23.8 x 35.9
		
		var path = game_div.s.select('#div_hand_left_upper');

		var	angle = 0;

		if(game_div.action.jump) {
			angle = 45;
		} else if(game_div.action.walk || game_div.action.run) {
			angle = -Math.sin(game_div.cord.walk_ratio*2*Math.PI)*(game_div.action.run?30:10);
		}
		var x = 0;
		var y = Math.sin(game_div.cord.breath_ratio*Math.PI)*game_div.step_distance.breath;

		matrix = new Snap.Matrix();
		matrix.translate(x, y);

		game_div.cord.x_left_shoulder = 40;
		game_div.cord.y_left_shoulder = 125;
		matrix.rotate(angle, game_div.cord.x_left_shoulder, game_div.cord.y_left_shoulder);
		path.transform(matrix);

		var radius = 22;
		game_div.cord.x_left_joint = -Math.sin(angle*(Math.PI/180))*radius;
		game_div.cord.y_left_joint = Math.cos(angle*(Math.PI/180))*radius-radius;

	},
	div_leg_right_lower: function() {

		// 35.6 x 56.6

		var path = game_div.s.select('#div_leg_right_lower');
		var angle = Math.sin(game_div.cord.walk_ratio*2*Math.PI)*(game_div.action.run?60:30);
		var x = game_div.cord.x_body;
		var y = 0;
		matrix = new Snap.Matrix();
		matrix.translate(x, y);
		matrix.rotate(angle, 79, 210);
		path.transform(matrix);

	},
	div_leg_left_lower: function() {

		// 32.3 x 56.1

		var path = game_div.s.select('#div_leg_left_lower');
		var angle = -Math.sin(game_div.cord.walk_ratio*2*Math.PI)*(game_div.action.run?60:30);
		var x = game_div.cord.x_body;
		var y = 0;
		matrix = new Snap.Matrix();
		matrix.translate(x, y);
		matrix.rotate(angle, 50, 207);
		path.transform(matrix);

	},
	div_head: function() {

		// 118.5 x 120.4

		game_div.cord.x_head = game_div.cord.x_body;
		game_div.cord.y_head = game_div.cord.y_body + Math.sin(game_div.cord.breath_ratio*Math.PI)*game_div.step_distance.breath*2;
		var path = game_div.s.select('#div_head');
		var bb = path.getBBox();
		matrix = new Snap.Matrix();
		matrix.translate(game_div.cord.x_head, game_div.cord.y_head);
		path.transform(matrix);

		if(game_div.step.blink%(game_div.step_length.blink_skip*game_div.step_length.blink)<game_div.step_length.blink) {
			path = game_div.s.select('#div_eye_left');
			bb = path.getBBox();
			matrix = new Snap.Matrix();
			matrix.scale(1, (1-game_div.cord.blink_ratio)*0.8 + 0.2, 50, 66);
			path.transform(matrix);

			path = game_div.s.select('#div_eye_right');
			bb = path.getBBox();
			matrix = new Snap.Matrix();
			matrix.scale(1, (1-game_div.cord.blink_ratio)*0.8 + 0.2, 89, 65);
			path.transform(matrix);
		} else {
			path = game_div.s.select('#div_eye_left');
			bb = path.getBBox();
			matrix = new Snap.Matrix();
			matrix.scale(1, 1, 50, 66);
			path.transform(matrix);

			path = game_div.s.select('#div_eye_right');
			bb = path.getBBox();
			matrix = new Snap.Matrix();
			matrix.scale(1, 1, 89, 65);
			path.transform(matrix);
		}
	},
	div_body: function() {
		// 96.8 x 109.5
		
		game_div.cord.x_body = 0;
		game_div.cord.y_body = Math.sin(game_div.cord.walk_ratio*Math.PI)*game_div.step_distance.body - Math.sin(game_div.cord.breath_ratio*Math.PI)*game_div.step_distance.breath;
		var path = game_div.s.select('#div_body');
		matrix = new Snap.Matrix();
		matrix.translate(game_div.cord.x_body, game_div.cord.y_body);
		path.transform(matrix);
	},
	div_pivot: function() {

		var delta_x = 0;
		var delta_y = 0;

		if(game_div.action.run) {
			var multiplier = (game_div.step.breath_multiplier-1)/(game_div.step_length.breath_multiplier-1);// 1-5 = 100 -> 95
			multiplier = multiplier*multiplier;
			multiplier = 1-multiplier*0.25;
			delta_x= game_div.action.dir*(1/game_div.step_length.walk)*game_div.step_distance.run*multiplier;
		} else if(game_div.action.walk) {
			delta_x = game_div.action.dir*(1/game_div.step_length.walk)*game_div.step_distance.walk;
		}

		var height = 256.6;

		var x_collision = false;
		var y_collision = false;

		$(game_div.path).each(function(i, obj) {
			if(game_div.cord.x+delta_x >= obj[0] && game_div.cord.x+delta_x <= obj[1]) {
				x_collision = true;
				if(game_div.cord.y > obj[2]-height) {
					y_collision = true;
				}
			}
		});

		game_div.cord.x_collision = x_collision;
		game_div.cord.y_collision = y_collision;

		if(!game_div.cord.x_collision || !game_div.cord.y_collision) {
			game_div.cord.x += delta_x;
		}

		var y_floor = game_div.cord.y_init;
		$(game_div.path).each(function(i, obj) {
			if(game_div.cord.x >= obj[0] && game_div.cord.x <= obj[1]) {
				game_div.cord.x_collision = true;
					y_floor = obj[2]-height;
				if(y_floor > obj[2]-height) {
					y_floor = obj[2]-height;
				}
			}
		});
		//console.log(game_div.action.jump);
		if(game_div.action.jump) {
			game.audio.blop.play();
			game_div.cord.on_floor = false;
		}
		if(game_div.action.jump || game_div.step.jump%game_div.step_length.jump !== 0) {
			game_div.action.jump = false;
			delta_y = -(1/game_div.step_length.jump)*game_div.step_distance.jump;
		} else {
			delta_y = +(1/game_div.step_length.jump)*game_div.step_distance.jump;
		}
		game_div.cord.y += delta_y;
		if(game_div.cord.y < game_div.action.jump_y - game_div.step_distance.jump) {
			game_div.cord.y = game_div.action.jump_y - game_div.step_distance.jump;
		}
		if(game_div.cord.y > y_floor) {
			game_div.cord.y = y_floor;
			game_div.cord.on_floor = true;
		}

		if(game_div.cord.x < 0) {
			game_div.cord.x = 0;
		}
		if(game_div.cord.x > game.screen.x_limit) {
			game_div.cord.x = game.screen.x_limit;
		}

		game_div.cord.walk_ratio = (game_div.step.walk%game_div.step_length.walk)/game_div.step_length.walk;
		game_div.cord.breath_ratio  = Math.sin(((game_div.step.breath%game_div.step_length.breath)/game_div.step_length.breath)*Math.PI/2);
		game_div.cord.blink_ratio = (game_div.step.blink%game_div.step_length.blink)/game_div.step_length.blink;
	},
	loop: function(reset) {

		if(game_div.action.run) {
			game_div.step.breath_multiplier += 0.01;
			if(game_div.step.breath_multiplier > game_div.step_length.breath_multiplier) {
				game_div.step.breath_multiplier = game_div.step_length.breath_multiplier;
			}
		} else {
			game_div.step.breath_multiplier -= 0.01;
			if(game_div.step.breath_multiplier < 1) {
				game_div.step.breath_multiplier = 1;
			}
		}

		game_div.step.breath += 1*Math.round(game_div.step.breath_multiplier);
		game_div.step.blink++;

		if(game_div.action.run || game_div.action.walk || game_div.step.walk%game_div.step_length.walk !== 0) {
			game_div.step.walk += 1;
		}
		if(game_div.action.jump || game_div.step.jump%game_div.step_length.jump!= 0) {
			game_div.step.jump++;
		}

		game_div.div_pivot();
		game_div.div_body();
		game_div.div_head();
		game_div.div_leg_left_lower();
		game_div.div_leg_right_lower();
		game_div.div_hand_right_upper();
		game_div.div_hand_left_upper();
		game_div.div_hand_right_lower();
		game_div.div_hand_left_lower();

		var path = game_div.s.select('#div');
		var bb = game_div.s.select('#div').getBBox();

		matrix = new Snap.Matrix();
		matrix.translate((game_div.cord.x-68)*game.view_ratio, game_div.cord.y*game.view_ratio);
		if(game_div.action.dir === -1) {
			matrix.scale(-game.view_ratio, game.view_ratio, 68, 0);
		} else {
			matrix.scale(game.view_ratio, game.view_ratio, 68, 0);
		}
		path.transform(matrix);
	},
	init: function() {

		game_div.s = Snap("#svg");
		game_div.cord.x = game_div.cord.x_init;
		game_div.cord.y = game_div.cord.y_init;

		var w = 40;
		var d = 15;
		$('#crate_div > *').each(function(i, obj) {
			var path = game_div.s.select('#'+$(obj).attr('id'));
			var bb = path.getBBox();

			game_div.path.push([bb.x-w, bb.x2+w, bb.y+d]);
		});
	}
}