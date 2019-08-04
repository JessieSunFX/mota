/**
 * yuanxin
 */

// (function () {
// 	// 准备资源 汪洋
	// const context = document.getElementById('content').getContext('2d');
	// const heroImg = new Image();

// 	// 画图 袁鑫
// 	heroImg.onload = function () {
// 		var imgPos = {
// 			x: 0,
// 			y: 0,
// 			width: 32,
// 			height: 32
// 		};

// 		var rect = {
// 			x: 0,
// 			y: 0,
// 			width: 40,
// 			height: 40
// 		};

// 		context
// 			.drawImage(
// 				heroImg,
// 				imgPos.x,
// 				imgPos.y,
// 				imgPos.width,
// 				imgPos.height,
// 				rect.x,
// 				rect.y,
// 				rect.width,
// 				rect.height
// 			);
// 	};

// 	heroImg.src = './hero.png';
// })();



(function () {
	// 我是汪洋老师
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


	// 我是袁鑫老师
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

		var hero = {
			img: heroImg,
			context: context,
			imgPos: {
				x: 0,
				y: 0,
				width: 32,
				height: 32
			},

			rect: {
				x: 0,
				y: 0,
				width: 40,
				height: 40
			},

			draw: draw
		};

		var monster = {
			img: allSpriteImg,
			context: context,
			imgPos: {
				x: 858,
				y: 529,
				width: 32,
				height: 32
			},

			rect: {
				x: 100,
				y: 100,
				width: 40,
				height: 40
			},

			draw: draw
		};

		hero.draw();
		monster.draw();


		window.addEventListener('keyup',function(e) {
			var step = 9;
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