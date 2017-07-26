var game = {
	s: null,
	screen_mid: null,
	width: null,
	height: null,
	view_ratio: null,
	timer: -1,
	fps: 24,
	screen: {
		x_limit: 7500,
		y_limit: 800,
		viewport_x: 0,
		path_div_y: 655,
		path_sree: 464,
	},
	clouds: [],
	audio: {},
	cloud: function() {
		$(game.clouds).each(function(i, obj) {
			matrix = new Snap.Matrix();
			matrix.translate(obj.x, obj.y);
			matrix.scale(game.view_ratio);
			obj.c.transform(matrix);
		});
	},
	magic: function() {
		var len = 100;
		var ele = [];
		var loop = function() {
			$(ele).each(function(i, obj) {
				if(obj.v) {
					$('#'+obj.s.attr('id')).css({display: ''});
				} else {
					if(Math.random() < 0.01) {
						obj.v = true;
						$('#'+obj.s.attr('id')).css({fill: 'url(#blob_'+Math.floor(Math.random()*4)+'_)'});
					}
				}
				if(obj.v) {
					obj.x += 10*game.view_ratio*Math.cos(obj.angle);
					obj.y -= 10*game.view_ratio*Math.sin(obj.angle);
					if(Math.sqrt(obj.x*obj.x + obj.y*obj.y) > game.screen.y_limit*0.8) {
						obj.x = 0;
						obj.y = 0;
					}
					matrix = new Snap.Matrix();
					matrix.translate(obj.x_init+obj.x, obj.y_init+obj.y);
					obj.s.transform(matrix);
				}
			});
			setTimeout(loop, 1000/game.fps);
		}
		$('#magic').css({display: '', opacity: 0});
		$('#magic').velocity({
			opacity: 1
		}, 250, function() {
			for(var i=0; i< len; i++) {
				var obj = {
					x_init: Math.random()*500-250,
					y_init: 0,
					x: 0,
					y: 0,
					v: false,
					angle: Math.random()*Math.PI,
					s: game.s.select('#blob').clone()
				};
				ele.push(obj);
			}
			loop();
		});
	},
	bot: function() {
		$(document).trigger('sree-action-run');
		var timer1 = setInterval(function() {
			if(game_sree.cord.x_collision && game_sree.cord.y_collision) {
				$(document).trigger('sree-action-jump');
			}
		}, 750);
		var timer2 = setInterval(function() {
			if(game_sree.cord.x-game_sree.cord.x_init >= game.screen.x_limit*0.85 || game_div.cord.x-game_div.cord.x_init >= game.screen.x_limit*0.85) {
				clearInterval(timer1);
				clearInterval(timer2);
				$(document).trigger('sree-action-run-off');
				$(document).unbind('keyup');
				$(document).unbind('keydown');
				$(document).unbind('touchstart');
				$(document).unbind('touchmove');
				$(document).unbind('touchend');
				game_sree.action.walk = false;
				game_sree.action.run = false;
				game_sree.action.jump = false;
				game_div.action.walk = false;
				game_div.action.run = false;
				game_div.action.jump = false;
				game.audio.loop.pause();
				if(game_sree.cord.x-game_sree.cord.x_init > game_div.cord.x-game_div.cord.x_init) {
					$('#restart').css({display: ''});
					game.audio.dead.play();
				} else {
					game.magic();
					game.audio.fin.play();
				}
			}
		}, 1000/game.fps);
	},
	viewport: function() {
		var _w = $(window).width();
		var _h = $(window).height();
		game.screen_mid = (game_div.cord.x+game_div.cord.x_init-68)*game.view_ratio - _w/2;
		game.screen.viewport_x = Math.round(game.screen_mid);
		if(game.screen.viewport_x < 0) {
			game.screen.viewport_x = 0;
		}
		if(game.screen.viewport_x > game.screen.x_limit*game.view_ratio - _w) {
			game.screen.viewport_x = game.screen.x_limit*game.view_ratio - _w;
		}
		$('#svg').attr({
			viewBox: [game.screen.viewport_x ,0 , _w, _h].join(' ')
		});

		matrix = new Snap.Matrix();
		matrix.scale(game.view_ratio);
		game.s.select('#terrain').transform(matrix);
		game.s.select('#crate_div').transform(matrix);
		game.s.select('#crate_sree').transform(matrix);
		game.s.select('#magic').transform(matrix);

		matrix = new Snap.Matrix();
		matrix.scale(game.view_ratio);
		matrix.translate(game_div.cord.x, 200);
		game.s.select('#restart').transform(matrix);

		if($('#tip').length > 0) {
			matrix = new Snap.Matrix();
			matrix.scale(game.view_ratio);
			game.s.select('#tip').transform(matrix);
		}
	},
	run: function() {
		game_div.loop(true);
		game_sree.loop(true);

		game.viewport();

		game.cloud();

		game.timer = setTimeout(game.run, (1/game.fps)*1000);
	},
	dime: function() {

		game.width = $(window).width();
		game.height = $(window).height();
		$('#svg').css({
			width: game.width,
			height: game.height,
		});
		game.view_ratio = game.height/game.screen.y_limit;

		game.viewport();
	},
	double_click_queue: {
		dbclk_delay: 250,
		div_right: {
			stat: false,
			time: 0,
		},
		div_left: {
			stat: false,
			time: 0,
		},
		sree_right: {
			stat: false,
			time: 0,
		},
		sree_left: {
			stat: false,
			time: 0,
		}
	},
	double_click: function(key, char) {
		var d = new Date();
		d = d.getTime();
		var stat = false;
		if(char == 'div') {
			switch(key) {
				case 39:
					if(d-game.double_click_queue.div_right.time < game.double_click_queue.dbclk_delay) {
						game.double_click_queue.div_right.stat = true;
						stat = true;
					} else {
						game.double_click_queue.div_right.stat = false;
					}
					game.double_click_queue.div_right.time  = d;
					break;
				case 37:
					if(d-game.double_click_queue.div_left.time < game.double_click_queue.dbclk_delay) {
						game.double_click_queue.div_left.stat = true;
						stat = true;
					} else {
						game.double_click_queue.div_left.stat = false;
					}
					game.double_click_queue.div_left.time  = d;
					break;
			}
		} else if(char == 'sree') {
			switch(key) {
				case 39:
					if(d-game.double_click_queue.sree_right.time < game.double_click_queue.dbclk_delay) {
						game.double_click_queue.sree_right.stat = true;
						stat = true;
					} else {
						game.double_click_queue.sree_right.stat = false;
					}
					game.double_click_queue.sree_right.time  = d;
					break;
				case 37:
					if(d-game.double_click_queue.sree_left.time < game.double_click_queue.dbclk_delay) {
						game.double_click_queue.sree_left.stat = true;
						stat = true;
					} else {
						game.double_click_queue.sree_left.stat = false;
					}
					game.double_click_queue.sree_left.time  = d;
					break;
			}
		}
		return stat;
	},
	controls: function() {

		var is_shift = false;
		var is_double_right = 0;

		var sree_left = false;
		var sree_right = false;
		var sree_jump = false;

		$(document).bind('sree-action-go-left', function(e) {
			game_sree.action.dir = -1;
		});
		$(document).bind('sree-action-go-right', function(e) {
			game_sree.action.dir = 1;
		});
		$(document).bind('sree-action-walk', function(e) {
			game_sree.action.walk = true;
			game_sree.action.run = false;
		});
		$(document).bind('sree-action-walk-off', function(e) {
			game_sree.action.walk = false;
		});
		$(document).bind('sree-action-run', function(e) {
			game_sree.action.walk = false;
			game_sree.action.run = true;
		});
		$(document).bind('sree-action-run-off', function(e) {
			game_sree.action.run = false;
		});
		$(document).bind('sree-action-jump', function(e) {
			if(!game_sree.cord.on_floor) {
				return;
			}
			game_sree.action.jump = true;
			game_sree.action.djump = false;
		});
		$('#rbutton').click(function(e) {
			window.location.reload();
		});
		$(document).bind('sree-action-jump-off', function(e) {
			game_sree.action.jump = false;
			game_sree.action.djump = false;
		});

		var div_left = false;
		var div_right = false;
		var div_jump = false;

		var touch_y = false;

		if ('ontouchstart' in document.documentElement) {
			game_div.step_distance.run = 175;
			game_div.action.run = true;
			$(document).bind('touchstart', function(e) {
				if(game_div.cord.on_floor) {
					game_div.action.jump = true;
				}
			});
		}
		$(document).on('contextmenu', function(e) {
			return false;
		});
		$(document).keydown(function(e) {
			var dbclk = game.double_click(e.keyCode, 'div');
			switch(e.keyCode) {
				case 39: // right
					if(div_right) {
						break;
					}
					div_right = true;
					game_div.action.dir = 1;
					if(dbclk) {
						game_div.action.walk = false;
						game_div.action.run = true;
					} else {
						game_div.action.walk = true;
						game_div.action.run = false;
					}
					break;
				case 37: // left
					if(div_left) {
						break;
					}
					div_left = true;
					game_div.action.dir = -1;
					if(dbclk) {
						game_div.action.walk = false;
						game_div.action.run = true;
					} else {
						game_div.action.walk = true;
						game_div.action.run = false;
					}
					break;
				case 32: // space
					if(div_jump) {
						break;
					}
					if(!game_div.cord.on_floor) {
						break;
					}
					div_jump = true;
					game_div.action.jump = true;
					game_div.action.djump = false;
					game_div.action.jump_y = game_div.cord.y;
					break;
			}
		});

		$(document).keyup(function(e) {
			switch(e.keyCode) {
				case 39: // right
					div_right = false;
					if(game_div.action.dir == 1) {
						game_div.action.walk = false;
						game_div.action.run = false;
					}
					break;
				case 37: // left
					div_left = false;
					if(game_div.action.dir == -1) {
						game_div.action.walk = false;
						game_div.action.run = false;
					}
					break;
				case 32: // space
					div_jump = false;
					game_div.action.jump = false;
					game_div.action.djump = false;
			}
		});
	},
	init: function() {

		game.screen_mid = 0;

		game.s = Snap("#svg");

		game.audio.fin = $('#loop-fin').get(0);
		game.audio.loop = $('#loop-paavada').get(0);
		game.audio.dead = $('#loop-dead').get(0);
		game.audio.blop = $('#loop-blop').get(0);
		game.audio.loop.play();

		var clouds_count = $('#clouds path').length;
		$('#clouds path').each(function(i, obj) {
			game.clouds.push({
				x: game.screen.x_limit*(Math.random()*(1/clouds_count) + i*(1/clouds_count)),
				y: game.screen.y_limit*Math.random()*0.2,
				c: game.s.select('#'+$(this).attr('id'))
			});
		});

		game.dime();
		$(window).resize(game.dime);
		$(game.dime);

		$('#svg').css({display: 'block'});

		game_div.init();
		game_sree.init();

		game.run();

		var start = false;
		$('#start').click(function(e) {
			$('#tip').remove();
			game.controls();
			setTimeout(game.bot, 250);
		});
		var keyFn = function(e) {
			if(e.keyCode == 13 || e.keyCode == 32) {
				$(document).unbind('keyup', keyFn);
				$('#start').click();
			}
		}

		$(document).keyup(keyFn);
		$('#start').hover(function(e) {
			$('#start').attr('style', 'fill: #666;');
		}, function(e) {
			$('#start').attr('style', 'fill: #000;');
		});

	}
}