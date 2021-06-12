class Food
{
    constructor()
    {
        this.foodStock=0;
        this.image=loadImage("images/Milk.png");
        this.lastFed;
    }
    getFoodStock()
    {
        return(this.foodStock);
    }

    updateFoodStock(foodStock)
    {
        this.foodStock=foodStock;
    }

   bedroom()
   {
        background(bedroomImg,550,500);
   }

   garden()
   {
        background(gardenImg,550,500);
   }
   washroom()
   {
        background(washroomImg,550,500);
   }


    display()
    {
        if(lastFed>=12){
            text("Last Feed "+lastFed%12+" PM ",350,30)
          }
          else if(lastFed===0)
          {
            text("Last Feed 12 AM",350,30)
          }
          else
          text("Last Feed "+lastFed+" AM ",350,30);
          
        var x=80;
        var y=100;
        imageMode(CENTER);
        if(this.foodStock!=0)
        {
            for(var i=0; i<this.foodStock; i++)
            {
                if(i%10===0)
                {
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50)
                x=x+30;
            }
        }
    }
}