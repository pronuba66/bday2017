var game_sree = {
	imgs: [],
	groups: [],
	s: null,
	height: null,
	width: null,
	cord: {
		x: null,
		y: null,
		x_init: 100,
		y_init: 200,
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
		breath: 50,
		breath_multiplier: 5,
		blink: 4,
		blink_skip: 40, // skip multiplier
		walk: 10,
		jump: 4,
	},
	step_distance: { // pixel count
		breath: 1,
		body: 5,
		walk: 150,
		run: 200,
		jump: 300,
	},
	path: [],
	sree_hand_right: function() {

		// 23.3 x 40.3
		
		var path = game_sree.s.select('#sree_hand_right');

		var angle = 0;
		if(game_sree.action.jump) {
			angle = -90;
		} else if(game_sree.action.walk || game_sree.action.run) {
			angle = Math.sin(game_sree.cord.walk_ratio*2*Math.PI)*(game_sree.action.run?60:10);
			if(game_sree.action.run) {
				angle += 0;
			} else if (game_sree.action.walk) {
				angle += 10;
			}
		}
		var x = 0;
		var y = Math.sin(game_sree.cord.breath_ratio*Math.PI)*game_sree.step_distance.breath;

		matrix = new Snap.Matrix();
		matrix.translate(x, y);

		game_sree.cord.x_left_shoulder = 263;
		game_sree.cord.y_left_shoulder = 154;
		matrix.rotate(angle, game_sree.cord.x_left_shoulder, game_sree.cord.y_left_shoulder);
		path.transform(matrix);
	},
	sree_hand_left: function() {

		// 23.8 x 35.9
		
		var path = game_sree.s.select('#sree_hand_left');

		var	angle = 0;
		if(game_sree.action.jump) {
			angle = 45;
		} else if(game_sree.action.walk || game_sree.action.run) {
			angle = -Math.sin(game_sree.cord.walk_ratio*2*Math.PI)*(game_sree.action.run?60:10);
			if(game_sree.action.run) {
				angle -= 30;
			} else if (game_sree.action.walk) {
				angle -= 15;
			}
		}
		var x = 0;
		var y = Math.sin(game_sree.cord.breath_ratio*Math.PI)*game_sree.step_distance.breath;

		matrix = new Snap.Matrix();
		matrix.translate(x, y);

		game_sree.cord.x_left_shoulder = 222;
		game_sree.cord.y_left_shoulder = 154;
		matrix.rotate(angle, game_sree.cord.x_left_shoulder, game_sree.cord.y_left_shoulder);
		path.transform(matrix);
	},
	sree_leg_right_lower: function() {

		// 35.6 x 56.6

		var path = game_sree.s.select('#sree_leg_right_lower');
		var angle = -Math.sin(game_sree.cord.walk_ratio*2*Math.PI)*(game_sree.action.run?60:30);
		var x = 0 + game_sree.cord.x_left_joint;
		var y = 0 + game_sree.cord.y_left_joint;
		matrix = new Snap.Matrix();
		matrix.translate(x, y);
		matrix.rotate(angle, 260, 236);
		path.transform(matrix);

	},
	sree_leg_left_lower: function() {

		// 32.3 x 56.1

		var path = game_sree.s.select('#sree_leg_left_lower');
		var angle = Math.sin(game_sree.cord.walk_ratio*2*Math.PI)*(game_sree.action.run?60:30);
		var x = 0 + game_sree.cord.x_right_joint;
		var y = 0 + game_sree.cord.y_right_joint;
		matrix = new Snap.Matrix();
		matrix.translate(x, y);
		matrix.rotate(angle, 220, 236);
		path.transform(matrix);

	},
	sree_leg_right_upper: function() {

		// 22.1 x 34.4

		var path = game_sree.s.select('#sree_leg_right_upper');
		var angle = Math.sin(game_sree.cord.walk_ratio*2*Math.PI)*(game_sree.action.run?10:5);

		matrix = new Snap.Matrix();
		matrix.rotate(angle, 253, 210);
		path.transform(matrix);

		var radius = 22;
		game_div.cord.x_right_joint = -Math.sin(angle*(Math.PI/180))*radius;
		game_div.cord.y_right_joint = Math.cos(angle*(Math.PI/180))*radius-radius;
	},
	sree_leg_left_upper: function() {

		// 25.3 x 41.9

		var path = game_sree.s.select('#sree_leg_left_upper');
		var angle = -Math.sin(game_sree.cord.walk_ratio*2*Math.PI)*(game_sree.action.run?10:5);

		matrix = new Snap.Matrix();
		matrix.rotate(angle, 232, 206);
		path.transform(matrix);

		var radius = 22;
		game_div.cord.x_left_joint = -Math.sin(angle*(Math.PI/180))*radius;
		game_div.cord.y_left_joint = Math.cos(angle*(Math.PI/180))*radius-radius;
	},
	sree_head: function() {

		// 118.5 x 120.4

		game_sree.cord.x_head = game_sree.cord.x_body;
		game_sree.cord.y_head = game_sree.cord.y_body + Math.sin(game_sree.cord.breath_ratio*Math.PI)*game_sree.step_distance.breath*2;
		var path = game_sree.s.select('#sree_head');
		var bb = path.getBBox();
		matrix = new Snap.Matrix();
		matrix.translate(game_sree.cord.x_head, game_sree.cord.y_head);
		path.transform(matrix);

		if(game_sree.step.blink%(game_sree.step_length.blink_skip*game_sree.step_length.blink)<game_sree.step_length.blink) {
			path = game_sree.s.select('#sree_eye_left');
			bb = path.getBBox();
			matrix = new Snap.Matrix();
			matrix.scale(1, (1-game_sree.cord.blink_ratio)*0.8 + 0.2, 230, 85);
			path.transform(matrix);

			path = game_sree.s.select('#sree_eye_right');
			bb = path.getBBox();
			matrix = new Snap.Matrix();
			matrix.scale(1, (1-game_sree.cord.blink_ratio)*0.8 + 0.2, 275, 87);
			path.transform(matrix);
		} else {
			path = game_sree.s.select('#sree_eye_left');
			bb = path.getBBox();
			matrix = new Snap.Matrix();
			matrix.scale(1, 1, 230, 85);
			path.transform(matrix);

			path = game_sree.s.select('#sree_eye_right');
			bb = path.getBBox();
			matrix = new Snap.Matrix();
			matrix.scale(1, 1, 275, 87);
			path.transform(matrix);
		}
	},
	sree_body: function() {
		// 96.8 x 109.5
		
		game_sree.cord.x_body = 0;
		game_sree.cord.y_body = Math.sin(game_sree.cord.walk_ratio*Math.PI)*game_sree.step_distance.body - Math.sin(game_sree.cord.breath_ratio*Math.PI)*game_sree.step_distance.breath;
		var path = game_sree.s.select('#sree_body');
		matrix = new Snap.Matrix();
		matrix.translate(game_sree.cord.x_body, game_sree.cord.y_body);
		path.transform(matrix);
	},
	sree_pivot: function() {

		var delta_x = 0;
		var delta_y = 0;

		if(game_sree.action.run) {
			var multiplier = (game_sree.step.breath_multiplier-1)/(game_sree.step_length.breath_multiplier-1);// 1-5 = 100 -> 95
			multiplier = multiplier*multiplier;
			multiplier = 1-multiplier*0.25;
			delta_x= game_sree.action.dir*(1/game_sree.step_length.walk)*game_sree.step_distance.run*multiplier;
		} else if(game_sree.action.walk) {
			delta_x = game_sree.action.dir*(1/game_sree.step_length.walk)*game_sree.step_distance.walk;
		}

		var height = 266.9;

		var x_collision = false;
		var y_collision = false;

		$(game_sree.path).each(function(i, obj) {
			if(game_sree.cord.x+delta_x >= obj[0] && game_sree.cord.x+delta_x <= obj[1]) {
				x_collision = true;
				if(game_sree.cord.y > obj[2]-height) {
					y_collision = true;
				}
			}
		});

		game_sree.cord.x_collision = x_collision;
		game_sree.cord.y_collision = y_collision;

		if(!game_sree.cord.x_collision || !game_sree.cord.y_collision) {
			game_sree.cord.x += delta_x;
		}

		var y_floor = game_sree.cord.y_init;
		$(game_sree.path).each(function(i, obj) {
			if(game_sree.cord.x >= obj[0] && game_sree.cord.x <= obj[1]) {
				game_sree.cord.x_collision = true;
				if(y_floor > obj[2]-height) {
					y_floor = obj[2]-height;
				}
			}
		});
		//console.log(game_sree.action.jump);
		if(game_sree.action.jump) {
			game_sree.cord.on_floor = false;
		}
		if(game_sree.action.jump || game_sree.step.jump%game_sree.step_length.jump !== 0) {
			game_sree.action.jump = false;
			delta_y = -(1/game_sree.step_length.jump)*game_sree.step_distance.jump;
		} else {
			delta_y = +(1/game_sree.step_length.jump)*game_sree.step_distance.jump;
		}
		game_sree.cord.y += delta_y;
		if(game_sree.cord.y < game_sree.action.jump_y - game_sree.step_distance.jump) {
			game_sree.cord.y = game_sree.action.jump_y - game_sree.step_distance.jump;
		}
		if(game_sree.cord.y > y_floor) {
			game_sree.cord.y = y_floor;
			game_sree.cord.on_floor = true;
		}

		if(game_sree.cord.x < 0) {
			game_sree.cord.x = 0;
		}
		if(game_sree.cord.x > game.screen.x_limit) {
			game_sree.cord.x = game.screen.x_limit;
		}

		game_sree.cord.walk_ratio = (game_sree.step.walk%game_sree.step_length.walk)/game_sree.step_length.walk;
		game_sree.cord.breath_ratio  = Math.sin(((game_sree.step.breath%game_sree.step_length.breath)/game_sree.step_length.breath)*Math.PI/2);
		game_sree.cord.blink_ratio = (game_sree.step.blink%game_sree.step_length.blink)/game_sree.step_length.blink;
	},
	loop: function(reset) {

		if(game_sree.action.run) {
			game_sree.step.breath_multiplier += 0.01;
			if(game_sree.step.breath_multiplier > game_sree.step_length.breath_multiplier) {
				game_sree.step.breath_multiplier = game_sree.step_length.breath_multiplier;
			}
		} else {
			game_sree.step.breath_multiplier -= 0.01;
			if(game_sree.step.breath_multiplier < 1) {
				game_sree.step.breath_multiplier = 1;
			}
		}

		game_sree.step.breath += 1*Math.round(game_sree.step.breath_multiplier);
		game_sree.step.blink++;

		if(game_sree.action.run || game_sree.action.walk || game_sree.step.walk%game_sree.step_length.walk !== 0) {
			game_sree.step.walk += 1;
		}
		if(game_sree.action.jump || game_sree.step.jump%game_sree.step_length.jump!= 0) {
			game_sree.step.jump++;
		}

		game_sree.sree_pivot();
		game_sree.sree_body();
		game_sree.sree_head();
		game_sree.sree_leg_left_upper();
		game_sree.sree_leg_right_upper();
		game_sree.sree_leg_left_lower();
		game_sree.sree_leg_right_lower();
		game_sree.sree_hand_left();
		game_sree.sree_hand_right();

		var path = game_sree.s.select('#sree');
		var bb = game_sree.s.select('#sree').getBBox();

		matrix = new Snap.Matrix();
		matrix.translate(game_sree.cord.x*game.view_ratio + 178.067*(game.view_ratio - 1) - 246*game.view_ratio, game_sree.cord.y*game.view_ratio);
		if(game_sree.action.dir === -1) {
			matrix.scale(-game.view_ratio, game.view_ratio, 246, 0);
		} else {
			matrix.scale(game.view_ratio, game.view_ratio ,246, 0);
		}
		path.transform(matrix);
	},
	init: function() {

		game_sree.s = Snap("#svg");
		game_sree.cord.x = game_sree.cord.x_init;
		game_sree.cord.y = game_sree.cord.y_init;

		var w = 40;
		var d = -15;
		$('#crate_sree > *').each(function(i, obj) {
			var path = game_sree.s.select('#'+$(obj).attr('id'));
			var bb = path.getBBox();

			game_sree.path.push([bb.x-w, bb.x2+w, bb.y+d]);
		});
	}
}