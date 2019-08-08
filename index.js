
(function () {
	function prepare() {

		const imgTask = (img, src) => {
			return new Promise(function (resolve, reject) {
				img.onload = resolve;
				img.onerror = reject;
				img.src = src;
			});
		};

		const context = document.getElementById('content').getContext('2d');
		const heroImg = new Image();
		const allSpriteImg = new Image();

		const allresourceTask = Promise.all([
			imgTask(heroImg, './hero.png'),
			imgTask(allSpriteImg, './all.jpg'),
		]);

		return {
			/**
			 * @param {Function} [callback] - 当准备好了之后要调用的回掉函数
			 */
			getResource(callback) {
				allresourceTask.then(function () {
					callback && callback(context, heroImg, allSpriteImg);
				});
			}
		};
	}


	function drawHero(context, heroImg, allSpriteImg) {

		var draw = function () {
			this.context
				.drawImage(
					this.img,
					this.imgPos.x,
					this.imgPos.y,
					this.imgPos.width,
					this.imgPos.height,
					this.rect.x,
					this.rect.y,
					this.rect.width,
					this.rect.height
				);
		}

		function Hero (initPos) {
			this.img = heroImg;
			this.context = context;
			this.imgPos = {
				x: 0,
				y: 0,
				width: 32,
				height: 32
			};
			this.rect = {
				x: initPos.x,
				y: initPos.y,
				width: 40,
				height: 40
			}
		}
		Hero.prototype.draw = draw;

		function Monster (initPos) {
			this.img = allSpriteImg;
			this.context = context;
			this.imgPos = {
				x: 858,
				y: 529,
				width: 32,
				height: 32
			}
			this.rect = {
				x: initPos.x,
				y: initPos.y,
				width: 40,
				height: 40
			}
		}
		Monster.prototype.draw = draw;

		function RedMonster(initPos) {
			
			Monster.call(this,initPos)
			this.imgPos.y = 495;
			
		}

		RedMonster.prototype = Object.create(Monster.prototype);

		var hero = new Hero({x:0,y:0});
		var monster = new Monster({x:100,y:100});
		var monster1 = new RedMonster({x:150,y:150})
		hero.draw();
		monster.draw();
		monster1.draw();


		window.addEventListener('keyup',function(e) {
			var step = 9,
				attackDistance = 20;
			switch (e.keyCode){
				case 38://上
					if (hero.rect.y <= 0) {
						return;
					}
					if (hero.rect.x + hero.rect.width > monster.rect.x 
						&& hero.rect.x < monster.rect.x + monster.rect.width
						&& hero.rect.y +hero.rect.height > monster.rect.y
						&& hero.rect.y <= monster.rect.y + monster.rect.height
						) {
						return;
					}
					context.clearRect(hero.rect.x,hero.rect.y,hero.rect.width,hero.rect.height);
					if (hero.rect.y - step < 0) {
						hero.rect.y = 0						
					} else if (hero.rect.y - step < monster.rect.y + monster.rect.height
						&& hero.rect.x + hero.rect.width > monster.rect.x 
						&& hero.rect.x < monster.rect.x + monster.rect.width
						&& hero.rect.y +hero.rect.height > monster.rect.y
						) {
						hero.rect.y = monster.rect.y + monster.rect.height;
					}else {
						hero.rect.y -= step;
					}
					
					hero.draw();
					break;
				case 39://右
					if (hero.rect.x+hero.rect.width >= context.canvas.width) {
						return;
					}
					if (hero.rect.x + hero.rect.width >= monster.rect.x 
						 && hero.rect.x < monster.rect.x + monster.rect.width
						 && hero.rect.y +hero.rect.height > monster.rect.y
						 && hero.rect.y < monster.rect.y + monster.rect.height
						 ) {
						return;
					}
					context.clearRect(hero.rect.x,hero.rect.y,hero.rect.width,hero.rect.height);
					if (hero.rect.x + hero.rect.width + step > context.canvas.width) {
						hero.rect.x = (context.canvas.width - hero.rect.width)						
					} else if (hero.rect.x + hero.rect.width + step > monster.rect.x
						&& hero.rect.x < monster.rect.x + monster.rect.width
						&& hero.rect.y +hero.rect.height > monster.rect.y
						&& hero.rect.y < monster.rect.y + monster.rect.height
						) {
						hero.rect.x = monster.rect.x - hero.rect.width;
					}else {
						hero.rect.x += step;
					}
					
					hero.draw();

					if (monster1.rect.x - hero.rect.x - hero.rect.width <= attackDistance
						&& hero.rect.y + hero.rect.height >= monster1.rect.y
						&& hero.rect.y <= monster1.rect.y + monster1.rect.height
						) {
						context.clearRect(monster1.rect.x,monster1.rect.y,monster1.rect.width,monster1.rect.height);
					}
				
					break;
				case 40://下

					if (hero.rect.y +hero.rect.height >= context.canvas.height) {
						return;
					}
					if (hero.rect.x + hero.rect.width > monster.rect.x 
						&& hero.rect.x < monster.rect.x +monster.rect.width
						&& hero.rect.y +hero.rect.height >= monster.rect.y
						&& hero.rect.y < monster.rect.y + monster.rect.height
						) {
					   return;
				   }
					context.clearRect(hero.rect.x,hero.rect.y,hero.rect.width,hero.rect.height);
					if (hero.rect.y + hero.rect.height + step > context.canvas.height) {
						
						hero.rect.y = (context.canvas.height- hero.rect.height)						
					} else if (hero.rect.y + hero.rect.height + step > monster.rect.y
						&& hero.rect.x + hero.rect.width > monster.rect.x 
						&& hero.rect.x < monster.rect.x +monster.rect.width
						&& hero.rect.y < monster.rect.y + monster.rect.height
						){
						hero.rect.y = monster.rect.y - hero.rect.width
					}else {
						hero.rect.y += step;
					}
					
					hero.draw();
					break;
				case 37://左
					if (hero.rect.x <= 0) {
						return;
					}
					if (hero.rect.x + hero.rect.width > monster.rect.x 
						&& hero.rect.x <= monster.rect.x + monster.rect.width
						&& hero.rect.y +hero.rect.height > monster.rect.y
						&& hero.rect.y < monster.rect.y + monster.rect.height
						) {
						return;
					}
					context.clearRect(hero.rect.x,hero.rect.y,hero.rect.width,hero.rect.height);
					if (hero.rect.x - step < 0) {
						hero.rect.x = 0						
					} else if (hero.rect.x - step < monster.rect.x + monster.rect.width
						&& hero.rect.x + hero.rect.width > monster.rect.x
						&& hero.rect.y +hero.rect.height > monster.rect.y
						&& hero.rect.y < monster.rect.y + monster.rect.height
						) {
						hero.rect.x = monster.rect.x + monster.rect.width;
					}else {
						hero.rect.x -= step;
					}
					
					hero.draw();
					break;
			}
		})
	}

	var resourceManager = prepare();
	resourceManager.getResource(function (context, heroImg, allSpriteImg) {
		drawHero(context, heroImg, allSpriteImg);
	});

	
})();