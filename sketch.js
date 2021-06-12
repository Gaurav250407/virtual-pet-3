//Create variables here
var dog,dog_img,dog_img2,food,food_img,database;
var foodRef,foodStock;
var fedTime,lastFed;
var garden,bedroom,washroom;
var gardenImg,bedroomImg,washroomImg;
var gameState;
var readGameState,writeGameState;
var currentTime

function preload()
{
  //load images here
  dog_img=loadImage("images/dogImg.png")
  dog_img2=loadImage("images/dogImg1.png")
  gardenImg=loadImage("images/Garden.png")
  bedroomImg=loadImage("images/Bed Room.png")
  washroomImg=loadImage("images/Wash Room.png")
}

function setup() {
  createCanvas(1000, 700);
  
  database=firebase.database();

  foodRef=database.ref('Food');
  foodRef.on('value',readStock);

  dog=createSprite(400,350,50,50)
  dog.addImage(dog_img); 
  dog.scale=0.3 

  feed=createButton('Feed Tom');
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton('Add Food');
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodObj=new Food();

  readGameState=database.ref('gameState')
  readGameState.on('value',function(data){
    gameState=data.val();
  })

}


function draw() {  

  background(0);
  drawSprites();
  //add styles here


      fill(255);
      textSize(30);
      text("Current Food Stock in the inventory is:" +foodObj.getFoodStock(),150,600);
      
      currentTime=hour();
      console.log(currentTime)
      if(currentTime==lastFed+1)
      {
        updateGameState("Playing");
        foodObj.garden();
      }
      else if(currentTime==lastFed+2)
      {
        updateGameState("Sleeping");
        foodObj.bedroom();
      }
      else if(currentTime>=(lastFed+2) && currentTime<=(lastFed+4))
      {
        updateGameState("Bathing");
        foodObj.washroom();
      }
      else
      {
        updateGameState("Hungry")
        foodObj.display();
      }

      if(gameState!=="Hungry")
      {
        addFood.hide();
        feed.hide();
        dog.remove();
      }
      else
      {
        feed.show();
        addFood.show();
        dog.addImage(dog_img);
      }

      fedTime=database.ref('FeedTime')
      fedTime.on('value',function(value)
      {
        lastFed=value.val()
      })

}

function readStock(readData)
{
  foodStock=readData.val();
  foodObj.updateFoodStock(foodStock);
}

function addFoods()
{
  foodStock++;
  database.ref('/').update({
    Food:foodStock
  })
}

function feedDog()
{
  dog.addImage(dog_img2);
  if(foodObj.getFoodStock<=0)
  {
    foodObj.updateFoodStock(0);
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  }
  database.ref('/').update(
    {
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
      
    }
  )
  console.log(hour());
}

function updateGameState(state)
{
  database.ref('/').update({
    gameState:state
  })
}