var game_div={imgs:[],groups:[],s:null,height:null,width:null,cord:{x:null,y:null,x_init:200,y_init:400,walk_ratio:null,jump_ratio:null,breath_ratio:null,blink_ratio:null,x_body:null,y_body:null,x_head:null,y_head:null,x_left_shoulder:null,y_left_shoulder:null,x_left_joint:null,y_left_joint:null,x_right_joint:null,y_right_joint:null,x_collision:!1,y_collision:!1,on_floor:!0},action:{walk:!1,run:!1,jump:!1,jump_y:0,dir:1},step:{breath:0,breath_multiplier:1,blink:0,walk:0,jump:0},step_length:{breath:40,breath_multiplier:5,blink:4,blink_skip:30,walk:10,jump:4},step_distance:{breath:1,body:10,walk:160,run:200,jump:300},path:[],div_hand_right_lower:function(){var a=game_div.s.select("#div_hand_right_lower"),b=0;game_div.action.jump?b=-120:(game_div.action.walk||game_div.action.run||game_div.step.walk%game_div.step_length.walk!=0)&&(b=-60);var c=0+game_div.cord.x_right_joint,d=0+game_div.cord.y_right_joint;matrix=new Snap.Matrix,matrix.translate(c,d),matrix.rotate(b,94,152),a.transform(matrix)},div_hand_left_lower:function(){var a=game_div.s.select("#div_hand_left_lower"),b=0;game_div.action.jump?b=120:(game_div.action.walk||game_div.action.run||game_div.step.walk%game_div.step_length.walk!=0)&&(b=-60);var c=0+game_div.cord.x_left_joint,d=0+game_div.cord.y_left_joint;matrix=new Snap.Matrix,matrix.translate(c,d),matrix.rotate(b,30.5,151),a.transform(matrix)},div_hand_right_upper:function(){var a=game_div.s.select("#div_hand_right_upper"),b=0;game_div.action.jump?b=-45:(game_div.action.walk||game_div.action.run)&&(b=Math.sin(2*game_div.cord.walk_ratio*Math.PI)*(game_div.action.run?30:10));var c=0,d=Math.sin(game_div.cord.breath_ratio*Math.PI)*game_div.step_distance.breath;matrix=new Snap.Matrix,matrix.translate(c,d),game_div.cord.x_left_shoulder=84,game_div.cord.y_left_shoulder=122,matrix.rotate(b,game_div.cord.x_left_shoulder,game_div.cord.y_left_shoulder),a.transform(matrix);var e=28;game_div.cord.x_right_joint=-Math.sin(b*(Math.PI/180))*e,game_div.cord.y_right_joint=Math.cos(b*(Math.PI/180))*e-e},div_hand_left_upper:function(){var a=game_div.s.select("#div_hand_left_upper"),b=0;game_div.action.jump?b=45:(game_div.action.walk||game_div.action.run)&&(b=-Math.sin(2*game_div.cord.walk_ratio*Math.PI)*(game_div.action.run?30:10));var c=0,d=Math.sin(game_div.cord.breath_ratio*Math.PI)*game_div.step_distance.breath;matrix=new Snap.Matrix,matrix.translate(c,d),game_div.cord.x_left_shoulder=40,game_div.cord.y_left_shoulder=125,matrix.rotate(b,game_div.cord.x_left_shoulder,game_div.cord.y_left_shoulder),a.transform(matrix);var e=22;game_div.cord.x_left_joint=-Math.sin(b*(Math.PI/180))*e,game_div.cord.y_left_joint=Math.cos(b*(Math.PI/180))*e-e},div_leg_right_lower:function(){var a=game_div.s.select("#div_leg_right_lower"),b=Math.sin(2*game_div.cord.walk_ratio*Math.PI)*(game_div.action.run?60:30),c=game_div.cord.x_body,d=0;matrix=new Snap.Matrix,matrix.translate(c,d),matrix.rotate(b,79,210),a.transform(matrix)},div_leg_left_lower:function(){var a=game_div.s.select("#div_leg_left_lower"),b=-Math.sin(2*game_div.cord.walk_ratio*Math.PI)*(game_div.action.run?60:30),c=game_div.cord.x_body,d=0;matrix=new Snap.Matrix,matrix.translate(c,d),matrix.rotate(b,50,207),a.transform(matrix)},div_head:function(){game_div.cord.x_head=game_div.cord.x_body,game_div.cord.y_head=game_div.cord.y_body+Math.sin(game_div.cord.breath_ratio*Math.PI)*game_div.step_distance.breath*2;var a=game_div.s.select("#div_head"),b=a.getBBox();matrix=new Snap.Matrix,matrix.translate(game_div.cord.x_head,game_div.cord.y_head),a.transform(matrix),game_div.step.blink%(game_div.step_length.blink_skip*game_div.step_length.blink)<game_div.step_length.blink?(a=game_div.s.select("#div_eye_left"),b=a.getBBox(),matrix=new Snap.Matrix,matrix.scale(1,.8*(1-game_div.cord.blink_ratio)+.2,50,66),a.transform(matrix),a=game_div.s.select("#div_eye_right"),b=a.getBBox(),matrix=new Snap.Matrix,matrix.scale(1,.8*(1-game_div.cord.blink_ratio)+.2,89,65),a.transform(matrix)):(a=game_div.s.select("#div_eye_left"),b=a.getBBox(),matrix=new Snap.Matrix,matrix.scale(1,1,50,66),a.transform(matrix),a=game_div.s.select("#div_eye_right"),b=a.getBBox(),matrix=new Snap.Matrix,matrix.scale(1,1,89,65),a.transform(matrix))},div_body:function(){game_div.cord.x_body=0,game_div.cord.y_body=Math.sin(game_div.cord.walk_ratio*Math.PI)*game_div.step_distance.body-Math.sin(game_div.cord.breath_ratio*Math.PI)*game_div.step_distance.breath;var a=game_div.s.select("#div_body");matrix=new Snap.Matrix,matrix.translate(game_div.cord.x_body,game_div.cord.y_body),a.transform(matrix)},div_pivot:function(){var a=0,b=0;if(game_div.action.run){var c=(game_div.step.breath_multiplier-1)/(game_div.step_length.breath_multiplier-1);c*=c,c=1-.25*c,a=game_div.action.dir*(1/game_div.step_length.walk)*game_div.step_distance.run*c}else game_div.action.walk&&(a=game_div.action.dir*(1/game_div.step_length.walk)*game_div.step_distance.walk);var d=256.6,e=!1,f=!1;$(game_div.path).each(function(b,c){game_div.cord.x+a>=c[0]&&game_div.cord.x+a<=c[1]&&(e=!0,game_div.cord.y>c[2]-d&&(f=!0))}),game_div.cord.x_collision=e,game_div.cord.y_collision=f,game_div.cord.x_collision&&game_div.cord.y_collision||(game_div.cord.x+=a);var g=game_div.cord.y_init;$(game_div.path).each(function(a,b){game_div.cord.x>=b[0]&&game_div.cord.x<=b[1]&&(game_div.cord.x_collision=!0,g=b[2]-d,g>b[2]-d&&(g=b[2]-d))}),game_div.action.jump&&(game.audio.blop.play(),game_div.cord.on_floor=!1),game_div.action.jump||game_div.step.jump%game_div.step_length.jump!==0?(game_div.action.jump=!1,b=-(1/game_div.step_length.jump)*game_div.step_distance.jump):b=+(1/game_div.step_length.jump)*game_div.step_distance.jump,game_div.cord.y+=b,game_div.cord.y<game_div.action.jump_y-game_div.step_distance.jump&&(game_div.cord.y=game_div.action.jump_y-game_div.step_distance.jump),game_div.cord.y>g&&(game_div.cord.y=g,game_div.cord.on_floor=!0),game_div.cord.x<0&&(game_div.cord.x=0),game_div.cord.x>game.screen.x_limit&&(game_div.cord.x=game.screen.x_limit),game_div.cord.walk_ratio=game_div.step.walk%game_div.step_length.walk/game_div.step_length.walk,game_div.cord.breath_ratio=Math.sin(game_div.step.breath%game_div.step_length.breath/game_div.step_length.breath*Math.PI/2),game_div.cord.blink_ratio=game_div.step.blink%game_div.step_length.blink/game_div.step_length.blink},loop:function(a){game_div.action.run?(game_div.step.breath_multiplier+=.01,game_div.step.breath_multiplier>game_div.step_length.breath_multiplier&&(game_div.step.breath_multiplier=game_div.step_length.breath_multiplier)):(game_div.step.breath_multiplier-=.01,game_div.step.breath_multiplier<1&&(game_div.step.breath_multiplier=1)),game_div.step.breath+=1*Math.round(game_div.step.breath_multiplier),game_div.step.blink++,(game_div.action.run||game_div.action.walk||game_div.step.walk%game_div.step_length.walk!==0)&&(game_div.step.walk+=1),(game_div.action.jump||game_div.step.jump%game_div.step_length.jump!=0)&&game_div.step.jump++,game_div.div_pivot(),game_div.div_body(),game_div.div_head(),game_div.div_leg_left_lower(),game_div.div_leg_right_lower(),game_div.div_hand_right_upper(),game_div.div_hand_left_upper(),game_div.div_hand_right_lower(),game_div.div_hand_left_lower();var b=game_div.s.select("#div");game_div.s.select("#div").getBBox();matrix=new Snap.Matrix,matrix.translate((game_div.cord.x-68)*game.view_ratio,game_div.cord.y*game.view_ratio),game_div.action.dir===-1?matrix.scale(-game.view_ratio,game.view_ratio,68,0):matrix.scale(game.view_ratio,game.view_ratio,68,0),b.transform(matrix)},init:function(){game_div.s=Snap("#svg"),game_div.cord.x=game_div.cord.x_init,game_div.cord.y=game_div.cord.y_init;var a=40,b=15;$("#crate_div > *").each(function(c,d){var e=game_div.s.select("#"+$(d).attr("id")),f=e.getBBox();game_div.path.push([f.x-a,f.x2+a,f.y+b])})}},game_sree={imgs:[],groups:[],s:null,height:null,width:null,cord:{x:null,y:null,x_init:100,y_init:200,walk_ratio:null,jump_ratio:null,breath_ratio:null,blink_ratio:null,x_body:null,y_body:null,x_head:null,y_head:null,x_left_shoulder:null,y_left_shoulder:null,x_left_joint:null,y_left_joint:null,x_right_joint:null,y_right_joint:null,x_collision:!1,y_collision:!1,on_floor:!0},action:{walk:!1,run:!1,jump:!1,jump_y:0,dir:1},step:{breath:0,breath_multiplier:1,blink:0,walk:0,jump:0},step_length:{breath:50,breath_multiplier:5,blink:4,blink_skip:40,walk:10,jump:4},step_distance:{breath:1,body:5,walk:150,run:200,jump:300},path:[],sree_hand_right:function(){var a=game_sree.s.select("#sree_hand_right"),b=0;game_sree.action.jump?b=-90:(game_sree.action.walk||game_sree.action.run)&&(b=Math.sin(2*game_sree.cord.walk_ratio*Math.PI)*(game_sree.action.run?60:10),game_sree.action.run?b+=0:game_sree.action.walk&&(b+=10));var c=0,d=Math.sin(game_sree.cord.breath_ratio*Math.PI)*game_sree.step_distance.breath;matrix=new Snap.Matrix,matrix.translate(c,d),game_sree.cord.x_left_shoulder=263,game_sree.cord.y_left_shoulder=154,matrix.rotate(b,game_sree.cord.x_left_shoulder,game_sree.cord.y_left_shoulder),a.transform(matrix)},sree_hand_left:function(){var a=game_sree.s.select("#sree_hand_left"),b=0;game_sree.action.jump?b=45:(game_sree.action.walk||game_sree.action.run)&&(b=-Math.sin(2*game_sree.cord.walk_ratio*Math.PI)*(game_sree.action.run?60:10),game_sree.action.run?b-=30:game_sree.action.walk&&(b-=15));var c=0,d=Math.sin(game_sree.cord.breath_ratio*Math.PI)*game_sree.step_distance.breath;matrix=new Snap.Matrix,matrix.translate(c,d),game_sree.cord.x_left_shoulder=222,game_sree.cord.y_left_shoulder=154,matrix.rotate(b,game_sree.cord.x_left_shoulder,game_sree.cord.y_left_shoulder),a.transform(matrix)},sree_leg_right_lower:function(){var a=game_sree.s.select("#sree_leg_right_lower"),b=-Math.sin(2*game_sree.cord.walk_ratio*Math.PI)*(game_sree.action.run?60:30),c=0+game_sree.cord.x_left_joint,d=0+game_sree.cord.y_left_joint;matrix=new Snap.Matrix,matrix.translate(c,d),matrix.rotate(b,260,236),a.transform(matrix)},sree_leg_left_lower:function(){var a=game_sree.s.select("#sree_leg_left_lower"),b=Math.sin(2*game_sree.cord.walk_ratio*Math.PI)*(game_sree.action.run?60:30),c=0+game_sree.cord.x_right_joint,d=0+game_sree.cord.y_right_joint;matrix=new Snap.Matrix,matrix.translate(c,d),matrix.rotate(b,220,236),a.transform(matrix)},sree_leg_right_upper:function(){var a=game_sree.s.select("#sree_leg_right_upper"),b=Math.sin(2*game_sree.cord.walk_ratio*Math.PI)*(game_sree.action.run?10:5);matrix=new Snap.Matrix,matrix.rotate(b,253,210),a.transform(matrix);var c=22;game_div.cord.x_right_joint=-Math.sin(b*(Math.PI/180))*c,game_div.cord.y_right_joint=Math.cos(b*(Math.PI/180))*c-c},sree_leg_left_upper:function(){var a=game_sree.s.select("#sree_leg_left_upper"),b=-Math.sin(2*game_sree.cord.walk_ratio*Math.PI)*(game_sree.action.run?10:5);matrix=new Snap.Matrix,matrix.rotate(b,232,206),a.transform(matrix);var c=22;game_div.cord.x_left_joint=-Math.sin(b*(Math.PI/180))*c,game_div.cord.y_left_joint=Math.cos(b*(Math.PI/180))*c-c},sree_head:function(){game_sree.cord.x_head=game_sree.cord.x_body,game_sree.cord.y_head=game_sree.cord.y_body+Math.sin(game_sree.cord.breath_ratio*Math.PI)*game_sree.step_distance.breath*2;var a=game_sree.s.select("#sree_head"),b=a.getBBox();matrix=new Snap.Matrix,matrix.translate(game_sree.cord.x_head,game_sree.cord.y_head),a.transform(matrix),game_sree.step.blink%(game_sree.step_length.blink_skip*game_sree.step_length.blink)<game_sree.step_length.blink?(a=game_sree.s.select("#sree_eye_left"),b=a.getBBox(),matrix=new Snap.Matrix,matrix.scale(1,.8*(1-game_sree.cord.blink_ratio)+.2,230,85),a.transform(matrix),a=game_sree.s.select("#sree_eye_right"),b=a.getBBox(),matrix=new Snap.Matrix,matrix.scale(1,.8*(1-game_sree.cord.blink_ratio)+.2,275,87),a.transform(matrix)):(a=game_sree.s.select("#sree_eye_left"),b=a.getBBox(),matrix=new Snap.Matrix,matrix.scale(1,1,230,85),a.transform(matrix),a=game_sree.s.select("#sree_eye_right"),b=a.getBBox(),matrix=new Snap.Matrix,matrix.scale(1,1,275,87),a.transform(matrix))},sree_body:function(){game_sree.cord.x_body=0,game_sree.cord.y_body=Math.sin(game_sree.cord.walk_ratio*Math.PI)*game_sree.step_distance.body-Math.sin(game_sree.cord.breath_ratio*Math.PI)*game_sree.step_distance.breath;var a=game_sree.s.select("#sree_body");matrix=new Snap.Matrix,matrix.translate(game_sree.cord.x_body,game_sree.cord.y_body),a.transform(matrix)},sree_pivot:function(){var a=0,b=0;if(game_sree.action.run){var c=(game_sree.step.breath_multiplier-1)/(game_sree.step_length.breath_multiplier-1);c*=c,c=1-.25*c,a=game_sree.action.dir*(1/game_sree.step_length.walk)*game_sree.step_distance.run*c}else game_sree.action.walk&&(a=game_sree.action.dir*(1/game_sree.step_length.walk)*game_sree.step_distance.walk);var d=266.9,e=!1,f=!1;$(game_sree.path).each(function(b,c){game_sree.cord.x+a>=c[0]&&game_sree.cord.x+a<=c[1]&&(e=!0,game_sree.cord.y>c[2]-d&&(f=!0))}),game_sree.cord.x_collision=e,game_sree.cord.y_collision=f,game_sree.cord.x_collision&&game_sree.cord.y_collision||(game_sree.cord.x+=a);var g=game_sree.cord.y_init;$(game_sree.path).each(function(a,b){game_sree.cord.x>=b[0]&&game_sree.cord.x<=b[1]&&(game_sree.cord.x_collision=!0,g>b[2]-d&&(g=b[2]-d))}),game_sree.action.jump&&(game_sree.cord.on_floor=!1),game_sree.action.jump||game_sree.step.jump%game_sree.step_length.jump!==0?(game_sree.action.jump=!1,b=-(1/game_sree.step_length.jump)*game_sree.step_distance.jump):b=+(1/game_sree.step_length.jump)*game_sree.step_distance.jump,game_sree.cord.y+=b,game_sree.cord.y<game_sree.action.jump_y-game_sree.step_distance.jump&&(game_sree.cord.y=game_sree.action.jump_y-game_sree.step_distance.jump),game_sree.cord.y>g&&(game_sree.cord.y=g,game_sree.cord.on_floor=!0),game_sree.cord.x<0&&(game_sree.cord.x=0),game_sree.cord.x>game.screen.x_limit&&(game_sree.cord.x=game.screen.x_limit),game_sree.cord.walk_ratio=game_sree.step.walk%game_sree.step_length.walk/game_sree.step_length.walk,game_sree.cord.breath_ratio=Math.sin(game_sree.step.breath%game_sree.step_length.breath/game_sree.step_length.breath*Math.PI/2),game_sree.cord.blink_ratio=game_sree.step.blink%game_sree.step_length.blink/game_sree.step_length.blink},loop:function(a){game_sree.action.run?(game_sree.step.breath_multiplier+=.01,game_sree.step.breath_multiplier>game_sree.step_length.breath_multiplier&&(game_sree.step.breath_multiplier=game_sree.step_length.breath_multiplier)):(game_sree.step.breath_multiplier-=.01,game_sree.step.breath_multiplier<1&&(game_sree.step.breath_multiplier=1)),game_sree.step.breath+=1*Math.round(game_sree.step.breath_multiplier),game_sree.step.blink++,(game_sree.action.run||game_sree.action.walk||game_sree.step.walk%game_sree.step_length.walk!==0)&&(game_sree.step.walk+=1),(game_sree.action.jump||game_sree.step.jump%game_sree.step_length.jump!=0)&&game_sree.step.jump++,game_sree.sree_pivot(),game_sree.sree_body(),game_sree.sree_head(),game_sree.sree_leg_left_upper(),game_sree.sree_leg_right_upper(),game_sree.sree_leg_left_lower(),game_sree.sree_leg_right_lower(),game_sree.sree_hand_left(),game_sree.sree_hand_right();var b=game_sree.s.select("#sree");game_sree.s.select("#sree").getBBox();matrix=new Snap.Matrix,matrix.translate(game_sree.cord.x*game.view_ratio+178.067*(game.view_ratio-1)-246*game.view_ratio,game_sree.cord.y*game.view_ratio),game_sree.action.dir===-1?matrix.scale(-game.view_ratio,game.view_ratio,246,0):matrix.scale(game.view_ratio,game.view_ratio,246,0),b.transform(matrix)},init:function(){game_sree.s=Snap("#svg"),game_sree.cord.x=game_sree.cord.x_init,game_sree.cord.y=game_sree.cord.y_init;var a=40,b=-15;$("#crate_sree > *").each(function(c,d){var e=game_sree.s.select("#"+$(d).attr("id")),f=e.getBBox();game_sree.path.push([f.x-a,f.x2+a,f.y+b])})}},game={s:null,screen_mid:null,width:null,height:null,view_ratio:null,timer:-1,fps:24,screen:{x_limit:7500,y_limit:800,viewport_x:0,path_div_y:655,path_sree:464},clouds:[],audio:{},cloud:function(){$(game.clouds).each(function(a,b){matrix=new Snap.Matrix,matrix.translate(b.x,b.y),matrix.scale(game.view_ratio),b.c.transform(matrix)})},magic:function(){var a=100,b=[],c=function(){$(b).each(function(a,b){b.v?$("#"+b.s.attr("id")).css({display:""}):Math.random()<.01&&(b.v=!0,$("#"+b.s.attr("id")).css({fill:"url(#blob_"+Math.floor(4*Math.random())+"_)"})),b.v&&(b.x+=10*game.view_ratio*Math.cos(b.angle),b.y-=10*game.view_ratio*Math.sin(b.angle),Math.sqrt(b.x*b.x+b.y*b.y)>.8*game.screen.y_limit&&(b.x=0,b.y=0),matrix=new Snap.Matrix,matrix.translate(b.x_init+b.x,b.y_init+b.y),b.s.transform(matrix))}),setTimeout(c,1e3/game.fps)};$("#magic").css({display:"",opacity:0}),$("#magic").velocity({opacity:1},250,function(){for(var d=0;d<a;d++){var e={x_init:500*Math.random()-250,y_init:0,x:0,y:0,v:!1,angle:Math.random()*Math.PI,s:game.s.select("#blob").clone()};b.push(e)}c()})},bot:function(){$(document).trigger("sree-action-run");var a=setInterval(function(){game_sree.cord.x_collision&&game_sree.cord.y_collision&&$(document).trigger("sree-action-jump")},750),b=setInterval(function(){(game_sree.cord.x-game_sree.cord.x_init>=.85*game.screen.x_limit||game_div.cord.x-game_div.cord.x_init>=.85*game.screen.x_limit)&&(clearInterval(a),clearInterval(b),$(document).trigger("sree-action-run-off"),$(document).unbind("keyup"),$(document).unbind("keydown"),$(document).unbind("touchstart"),$(document).unbind("touchmove"),$(document).unbind("touchend"),game_sree.action.walk=!1,game_sree.action.run=!1,game_sree.action.jump=!1,game_div.action.walk=!1,game_div.action.run=!1,game_div.action.jump=!1,game.audio.loop.pause(),game_sree.cord.x-game_sree.cord.x_init>game_div.cord.x-game_div.cord.x_init?($("#restart").css({display:""}),game.audio.dead.play()):(game.magic(),game.audio.fin.play()))},1e3/game.fps)},viewport:function(){var a=$(window).width(),b=$(window).height();game.screen_mid=(game_div.cord.x+game_div.cord.x_init-68)*game.view_ratio-a/2,game.screen.viewport_x=Math.round(game.screen_mid),game.screen.viewport_x<0&&(game.screen.viewport_x=0),game.screen.viewport_x>game.screen.x_limit*game.view_ratio-a&&(game.screen.viewport_x=game.screen.x_limit*game.view_ratio-a),$("#svg").attr({viewBox:[game.screen.viewport_x,0,a,b].join(" ")}),matrix=new Snap.Matrix,matrix.scale(game.view_ratio),game.s.select("#terrain").transform(matrix),game.s.select("#crate_div").transform(matrix),game.s.select("#crate_sree").transform(matrix),game.s.select("#magic").transform(matrix),matrix=new Snap.Matrix,matrix.scale(game.view_ratio),matrix.translate(game_div.cord.x,200),game.s.select("#restart").transform(matrix),$("#tip").length>0&&(matrix=new Snap.Matrix,matrix.scale(game.view_ratio),game.s.select("#tip").transform(matrix))},run:function(){game_div.loop(!0),game_sree.loop(!0),game.viewport(),game.cloud(),game.timer=setTimeout(game.run,1/game.fps*1e3)},dime:function(){game.width=$(window).width(),game.height=$(window).height(),$("#svg").css({width:game.width,height:game.height}),game.view_ratio=game.height/game.screen.y_limit,game.viewport()},double_click_queue:{dbclk_delay:250,div_right:{stat:!1,time:0},div_left:{stat:!1,time:0},sree_right:{stat:!1,time:0},sree_left:{stat:!1,time:0}},double_click:function(a,b){var c=new Date;c=c.getTime();var d=!1;if("div"==b)switch(a){case 39:c-game.double_click_queue.div_right.time<game.double_click_queue.dbclk_delay?(game.double_click_queue.div_right.stat=!0,d=!0):game.double_click_queue.div_right.stat=!1,game.double_click_queue.div_right.time=c;break;case 37:c-game.double_click_queue.div_left.time<game.double_click_queue.dbclk_delay?(game.double_click_queue.div_left.stat=!0,d=!0):game.double_click_queue.div_left.stat=!1,game.double_click_queue.div_left.time=c}else if("sree"==b)switch(a){case 39:c-game.double_click_queue.sree_right.time<game.double_click_queue.dbclk_delay?(game.double_click_queue.sree_right.stat=!0,d=!0):game.double_click_queue.sree_right.stat=!1,game.double_click_queue.sree_right.time=c;break;case 37:c-game.double_click_queue.sree_left.time<game.double_click_queue.dbclk_delay?(game.double_click_queue.sree_left.stat=!0,d=!0):game.double_click_queue.sree_left.stat=!1,game.double_click_queue.sree_left.time=c}return d},controls:function(){$(document).bind("sree-action-go-left",function(a){game_sree.action.dir=-1}),$(document).bind("sree-action-go-right",function(a){game_sree.action.dir=1}),$(document).bind("sree-action-walk",function(a){game_sree.action.walk=!0,game_sree.action.run=!1}),$(document).bind("sree-action-walk-off",function(a){game_sree.action.walk=!1}),$(document).bind("sree-action-run",function(a){game_sree.action.walk=!1,game_sree.action.run=!0}),$(document).bind("sree-action-run-off",function(a){game_sree.action.run=!1}),$(document).bind("sree-action-jump",function(a){game_sree.cord.on_floor&&(game_sree.action.jump=!0,game_sree.action.djump=!1)}),$("#rbutton").click(function(a){window.location.reload()}),$(document).bind("sree-action-jump-off",function(a){game_sree.action.jump=!1,game_sree.action.djump=!1});var f=!1,g=!1,h=!1;"ontouchstart"in document.documentElement&&(game_div.step_distance.run=175,game_div.action.run=!0,$(document).bind("touchstart",function(a){game_div.cord.on_floor&&(game_div.action.jump=!0)})),$(document).on("contextmenu",function(a){return!1}),$(document).keydown(function(a){var b=game.double_click(a.keyCode,"div");switch(a.keyCode){case 39:if(g)break;g=!0,game_div.action.dir=1,b?(game_div.action.walk=!1,game_div.action.run=!0):(game_div.action.walk=!0,game_div.action.run=!1);break;case 37:if(f)break;f=!0,game_div.action.dir=-1,b?(game_div.action.walk=!1,game_div.action.run=!0):(game_div.action.walk=!0,game_div.action.run=!1);break;case 32:if(h)break;if(!game_div.cord.on_floor)break;h=!0,game_div.action.jump=!0,game_div.action.djump=!1,game_div.action.jump_y=game_div.cord.y}}),$(document).keyup(function(a){switch(a.keyCode){case 39:g=!1,1==game_div.action.dir&&(game_div.action.walk=!1,game_div.action.run=!1);break;case 37:f=!1,game_div.action.dir==-1&&(game_div.action.walk=!1,game_div.action.run=!1);break;case 32:h=!1,game_div.action.jump=!1,game_div.action.djump=!1}})},init:function(){game.screen_mid=0,game.s=Snap("#svg"),game.audio.fin=$("#loop-fin").get(0),game.audio.loop=$("#loop-paavada").get(0),game.audio.dead=$("#loop-dead").get(0),game.audio.blop=$("#loop-blop").get(0),game.audio.loop.play();var a=$("#clouds path").length;$("#clouds path").each(function(b,c){game.clouds.push({x:game.screen.x_limit*(Math.random()*(1/a)+b*(1/a)),y:game.screen.y_limit*Math.random()*.2,c:game.s.select("#"+$(this).attr("id"))})}),game.dime(),$(window).resize(game.dime),$(game.dime),$("#svg").css({display:"block"}),game_div.init(),game_sree.init(),game.run();$("#start").click(function(a){$("#tip").remove(),game.controls(),setTimeout(game.bot,250)});var c=function(a){13!=a.keyCode&&32!=a.keyCode||($(document).unbind("keyup",c),$("#start").click())};$(document).keyup(c),$("#start").hover(function(a){$("#start").attr("style","fill: #666;")},function(a){$("#start").attr("style","fill: #000;")})}};