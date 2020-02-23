class GameScene extends egret.Sprite{
	private static instance;
	private bg:egret.Bitmap;
	private player:egret.Bitmap;
	private zhuziContainer:egret.Sprite;
	private ArrayZhuzi:Array<egret.Bitmap>;
	private gameover:egret.TextField;
	private timer:egret.Timer;
	private fenshuText:egret.TextField;
	private fenshu:egret.TextField;
	private timer1:egret.Timer;
	private fenshunum:number;
	private beginBtn:egret.Sprite;
	private reGame:egret.Sprite;
	public static getInstance(){
		if(!this.instance){
			this.instance = new GameScene();
		}
		return GameScene.instance;
	}
	public constructor() {
		super();
		this.init();
	}
	private init(){
		
		this.bg = this.CreateBitmapByName('sky_jpg');
		this.bg.x = 0;
		this.bg.y = 0;
		this.bg.width = Config.StageW;
		this.bg.height = Config.StageH;
		this.bg.touchEnabled = true;
		this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.jump, this);
		this.addChild(this.bg);
		this.ArrayZhuzi = new Array<egret.Bitmap>();
		this.zhuziContainer = new egret.Sprite();
		this.addChild(this.zhuziContainer);
		this.player = this.CreateBitmapByName('bird_jpg');
		this.player.width = 100;
		this.player.height = 100;
		this.addChild(this.player);
		this.fenshuText = new egret.TextField();
		this.addChild( this.fenshuText );
		this.fenshuText.fontFamily = "Impact";
		this.fenshuText.size = 50;
		this.fenshuText.x = Config.StageW - 500;
		this.fenshuText.y = 10;
		
		this.fenshuText.text = "分数：";
		this.fenshu = new egret.TextField();
		this.addChild( this.fenshu );
		this.fenshu.fontFamily = "Impact";
		this.fenshu.size = 50;
		this.fenshu.x = this.fenshuText.x + this.fenshuText.width;
		this.fenshu.y = 10;
		
		
		this.addStage();
	}
	private addStage(){
		if(this.reGame){
			this.removeChild(this.reGame);
			this.removeChild(this.gameover);
		}
		
		
		this.fenshunum = 0;
		this.CreatePlayer();
		this.CreateZhuzi();
		this.fenshu.text = this.fenshunum.toString();
		this.beginBtn = this.CreateButton('开始游戏');
		this.addChild(this.beginBtn);
		this.beginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.beginGame,this);
	}
	private beginGame(){
		this.removeChild(this.beginBtn);
		this.timer = new egret.Timer(3000,0);
		this.timer1 = new egret.Timer(1000,0);
        //注册事件侦听器
        //timer.addEventListener(egret.TimerEvent.TIMER,this.CreateZhuzi,this);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.CreateZhuzi,this);
		this.timer1.addEventListener(egret.TimerEvent.TIMER,this.updatefenshu,this);
        //开始计时
        this.timer.start();
		this.timer1.start();
		this.zhuziContainer.addEventListener(egret.Event.ENTER_FRAME,this.update,this);
		//this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.beginGame,this);
	}
	private CreateButton(textvalue:string){
		let mybutton = new egret.Sprite();
		let button = this.CreateBitmapByName('bird_jpg');
		mybutton.width = 300;
		mybutton.height = 100;
		mybutton.x = Config.StageW / 2 - 150;
		mybutton.y = 350;
		button.width = 300;
		button.height = 100;
		button.x = 0;
		button.y = 0;
		mybutton.addChild(button);
		let textVal = new egret.TextField();
		mybutton.addChild( textVal );
		textVal.fontFamily = "Impact";
		textVal.size = 50;
		textVal.x = 50;
		textVal.y = 20;
		textVal.text = textvalue;
		mybutton.touchEnabled = true;
		return mybutton;
	}
	private updatefenshu(){
		console.log(this.fenshunum);
		this.fenshunum += 1;
		this.fenshu.text = this.fenshunum.toString();
	}
	private jump(){
		//console.log('jump');
		this.player.y -= 40; 
	}
	private update(){
		this.player.y += 5;
		if(this.player.y >= Config.StageH - this.player.height){
			this.GameOver();
		}
		for(let i = 0;i<this.ArrayZhuzi.length;i++){
			if(this.ArrayZhuzi[i].x <= 0){
				this.zhuziContainer.removeChild(this.ArrayZhuzi[i]);
				this.ArrayZhuzi.splice(i,1);
				
			}
			
		}
		for(let i = 0;i<this.ArrayZhuzi.length;i++){
			if(Math.abs(this.ArrayZhuzi[i].x - this.player.x) <= this.player.width && Math.abs(this.ArrayZhuzi[i].y - this.player.y) <= this.player.height){
				this.GameOver();
			}
		}
		//console.log(this.zhuziContainer.numChildren);
		for(let i = 0;i<this.ArrayZhuzi.length;i++){
			this.ArrayZhuzi[i].x -= 5;
		}
	}
	private GameOver(){
		console.log('game over!');
		this.zhuziContainer.removeEventListener(egret.Event.ENTER_FRAME,this.update,this);
		this.bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.jump, this);
		this.timer.stop();
		this.timer1.stop();
		this.gameover = new egret.TextField();
		this.addChild( this.gameover );
		this.gameover.fontFamily = "Impact";
		this.gameover.size = 100;
		this.gameover.x = 3/4*Config.StageW / 2;
		this.gameover.y = 200;
		
		this.gameover.text = "Game Over!";
		this.reGame = this.CreateButton('再来一次');
		this.reGame.addEventListener(egret.TouchEvent.TOUCH_TAP,this.init,this);
		this.addChild(this.reGame);
		console.log('a:'+this.ArrayZhuzi.length);
		
	}
	/**
	 * 根据名字创建位图
	 */
	private CreateBitmapByName(name:string):egret.Bitmap{
			let texture:egret.Texture = RES.getRes(name);
			let bitmap:egret.Bitmap = new egret.Bitmap(texture);
			return bitmap;
	}
	private CreatePlayer(){
		
		
		this.player.x = 200;
		this.player.y = Config.StageH / 2 - this.player.height / 2;
		
		

	}
	private CreateZhuzi(){
		let topnum = Math.floor(Math.random()*3)+1;
		console.log(topnum);
		for(let i = 0;i < topnum;i++){
			let zhuzi = this.CreateBitmapByName('pipe_jpg');
			zhuzi.width = 100;
			zhuzi.height = 100;
			zhuzi.x = Config.StageW-100;
			zhuzi.y = 100 * i;
			this.ArrayZhuzi.push(zhuzi);
		}
		for(let i = 0;i < 4-topnum;i++){
			let zhuzi = this.CreateBitmapByName('pipe_jpg');
			zhuzi.width = 100;
			zhuzi.height = 100;
			zhuzi.x = Config.StageW-100;
			zhuzi.y = Config.StageH - 100 * (i+1);
			this.ArrayZhuzi.push(zhuzi);
		}
		for(let i = 0;i<this.ArrayZhuzi.length;i++){
			this.zhuziContainer.addChild(this.ArrayZhuzi[i]);
		}
	}
}